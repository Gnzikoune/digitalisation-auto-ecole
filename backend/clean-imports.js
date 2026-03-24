const fs = require('fs');
const path = require('path');

const filesToClean = [
  'src/modules/auto-ecoles/auto-ecoles.controller.ts',
  'src/modules/candidats/candidats.controller.ts',
  'src/modules/examens/examens.controller.ts',
  'src/modules/moniteurs/moniteurs.controller.ts',
  'src/modules/paiements/paiements.controller.ts',
  'src/modules/stats/stats.controller.ts',
  'src/modules/vehicules/vehicules.controller.ts',
];

for (const f of filesToClean) {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf-8');
    content = content.replace(/ApiResponse,\s*/g, '');
    content = content.replace(/\{\s*\}/g, '{}');
    fs.writeFileSync(p, content);
  }
}

const pCtrl = path.join(__dirname, 'src/modules/paiements/paiements.controller.ts');
if (fs.existsSync(pCtrl)) {
  let content = fs.readFileSync(pCtrl, 'utf-8');
  content = content.replace(/Patch,\s*/g, '');
  fs.writeFileSync(pCtrl, content);
}

const fCtrl = path.join(__dirname, 'src/modules/files/files.controller.ts');
if (fs.existsSync(fCtrl)) {
  let content = fs.readFileSync(fCtrl, 'utf-8');
  content = content.replace(/UseGuards,\s*/g, '');
  content = content.replace(/import { JwtAuthGuard } from '\.\.\/auth\/guards\/jwt-auth\.guard';\n/, '');
  fs.writeFileSync(fCtrl, content);
}

const aDto = path.join(__dirname, 'src/modules/auto-ecoles/dto/create-auto-ecole.dto.ts');
if (fs.existsSync(aDto)) {
  let content = fs.readFileSync(aDto, 'utf-8');
  content = content.replace(/IsEmail,\s*/g, '');
  fs.writeFileSync(aDto, content);
}

const pService = path.join(__dirname, 'src/modules/paiements/paiements.service.ts');
if (fs.existsSync(pService)) {
  let content = fs.readFileSync(pService, 'utf-8');
  content = content.replace(/import { UpdatePaiementDto } from '\.\/dto\/update-paiement\.dto';\n/, '');
  fs.writeFileSync(pService, content);
}

console.log('Cleanup script finished');
