import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  async log(data: {
    action: string;
    entity_name: string;
    entity_id: string;
    user_id?: string;
    old_values?: any;
    new_values?: any;
    ip_address?: string;
  }) {
    const log = this.auditRepository.create(data);
    return this.auditRepository.save(log);
  }

  findAll() {
    return this.auditRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
      take: 100,
    });
  }
}
