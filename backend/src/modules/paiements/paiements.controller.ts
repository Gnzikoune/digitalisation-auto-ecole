import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PaiementsService } from './paiements.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Paiements')
@ApiBearerAuth()
@Controller('modules/paiements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaiementsController {
  constructor(private readonly paiementsService: PaiementsService) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer un nouveau paiement (virement, espèces, etc.)' })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  create(@Body() createPaiementDto: CreatePaiementDto) {
    return this.paiementsService.create(createPaiementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les paiements (Admin seul)' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.paiementsService.findAll();
  }

  @Get('candidate/:id')
  @ApiOperation({ summary: "Récupérer l'historique des paiements d'un candidat" })
  findByCandidate(@Param('id') id: string) {
    return this.paiementsService.findByCandidate(id);
  }

  @Get('candidate/:id/balance')
  @ApiOperation({ summary: "Calculer le solde restant d'un candidat" })
  getBalance(@Param('id') id: string) {
    return this.paiementsService.getBalance(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Annuler un paiement (Soft delete)' })
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.paiementsService.remove(id);
  }
}
