-- ==========================================================
-- 🇬🇦 Plateforme Nationale Auto-Écoles & Examens (Gabon)
-- Script de création de base de données (PostgreSQL)
-- Phase 1 : Schéma Initial - Version 1.0.0
-- ==========================================================

-- Configuration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================
-- 1. ENTITÉS INSTITUTIONNELLES
-- ==========================================================

CREATE TABLE ministries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE dgtt (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ministry_id UUID REFERENCES ministries(id),
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    contact_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE cnepc (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ministry_id UUID REFERENCES ministries(id),
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    contact_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================================
-- 2. AUTO-ÉCOLES
-- ==========================================================

CREATE TABLE driving_schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    legal_name VARCHAR(255) NOT NULL,
    commercial_name VARCHAR(255),
    approval_number VARCHAR(100) UNIQUE NOT NULL,
    approval_issue_date DATE,
    approval_expiry_date DATE,
    status VARCHAR(50) DEFAULT 'active', -- active, suspended, closed
    address TEXT,
    city VARCHAR(100),
    gps_lat DOUBLE PRECISION,
    gps_lng DOUBLE PRECISION,
    capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE driving_school_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driving_school_id UUID REFERENCES driving_schools(id) ON DELETE CASCADE,
    doc_type VARCHAR(100) NOT NULL, -- agrément, assurance, autorisation, inspection
    file_url TEXT NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================================
-- 3. VÉHICULES
-- ==========================================================

CREATE TABLE training_vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driving_school_id UUID REFERENCES driving_schools(id),
    plate_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50), -- B, C, D, etc.
    insurance_status BOOLEAN DEFAULT true,
    technical_control_status BOOLEAN DEFAULT true,
    gps_enabled BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================================
-- 4. MONITEURS
-- ==========================================================

CREATE TABLE instructors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driving_school_id UUID REFERENCES driving_schools(id),
    full_name VARCHAR(255) NOT NULL,
    national_id VARCHAR(100) UNIQUE NOT NULL,
    professional_id VARCHAR(100) UNIQUE NOT NULL,
    certification_level VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================================
-- 5. CANDIDATS
-- ==========================================================

CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driving_school_id UUID REFERENCES driving_schools(id),
    full_name VARCHAR(255) NOT NULL,
    national_id VARCHAR(100) UNIQUE NOT NULL,
    birth_date DATE,
    phone VARCHAR(50),
    email VARCHAR(255),
    registration_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'enrolled', -- enrolled, training, ready, licensed, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE candidate_training_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    theory_hours_completed INTEGER DEFAULT 0,
    practical_hours_completed INTEGER DEFAULT 0,
    attendance_rate DECIMAL(5,2) DEFAULT 0.00,
    last_session_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- 6. EXAMENS
-- ==========================================================

CREATE TABLE exam_centers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    location TEXT,
    gps_lat DOUBLE PRECISION,
    gps_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_center_id UUID REFERENCES exam_centers(id),
    session_date DATE NOT NULL,
    exam_type VARCHAR(50) NOT NULL, -- theory, practical
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, ongoing, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE examiners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    professional_id VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_session_id UUID REFERENCES exam_sessions(id),
    candidate_id UUID REFERENCES candidates(id),
    examiner_id UUID REFERENCES examiners(id),
    result VARCHAR(50), -- pass, fail, absent
    score INTEGER,
    attempt_number INTEGER DEFAULT 1,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- 7. CONFORMITÉ & CONTRÔLE
-- ==========================================================

CREATE TABLE inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driving_school_id UUID REFERENCES driving_schools(id),
    institution_type VARCHAR(50), -- DGTT, CNEPC
    inspector_name VARCHAR(255),
    inspection_date DATE NOT NULL,
    result VARCHAR(50), -- compliant, non_compliant, warning
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sanctions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driving_school_id UUID REFERENCES driving_schools(id),
    inspection_id UUID REFERENCES inspections(id),
    sanction_type VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- 8. ANALYTICS & AUDIT
-- ==========================================================

CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50), -- school, instructor, candidate
    entity_id UUID NOT NULL,
    success_rate DECIMAL(5,2),
    failure_rate DECIMAL(5,2),
    anomaly_score DECIMAL(5,2),
    last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE anomaly_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50),
    entity_id UUID,
    anomaly_type VARCHAR(100),
    severity VARCHAR(50), -- low, medium, high, critical
    description TEXT,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- 9. SÉCURITÉ & TRAÇABILITÉ
-- ==========================================================

CREATE TABLE system_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- admin, state, inspector, school, exam_center
    institution_id UUID, -- Link to ministry, dgtt, cnepc, or driving_school
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES system_users(id),
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100),
    entity_id UUID,
    client_ip VARCHAR(50),
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- 10. INTEROPÉRABILITÉ ÉTAT
-- ==========================================================

CREATE TABLE external_registry_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_system VARCHAR(100) NOT NULL, -- DGTT_ID, NATIONAL_NUM, etc.
    local_entity_type VARCHAR(50),
    local_entity_id UUID,
    external_id VARCHAR(255) NOT NULL,
    sync_status VARCHAR(50) DEFAULT 'idle',
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour la performance
CREATE INDEX idx_driving_schools_status ON driving_schools(status);
CREATE INDEX idx_candidates_national_id ON candidates(national_id);
CREATE INDEX idx_exam_candidates_candidate ON exam_candidates(candidate_id);
CREATE INDEX idx_access_logs_user ON access_logs(user_id);
CREATE INDEX idx_anomaly_logs_entity ON anomaly_logs(entity_id);
