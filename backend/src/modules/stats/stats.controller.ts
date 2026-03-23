import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Stats')
@ApiBearerAuth()
@Controller('modules/stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('overview')
  getOverview() {
    return this.statsService.getOverview();
  }

  @Get('success-rate')
  getSuccessRate() {
    return this.statsService.getSuccessRate();
  }

  @Get('monthly-inscriptions')
  getMonthlyInscriptions() {
    return this.statsService.getMonthlyInscriptions();
  }
}
