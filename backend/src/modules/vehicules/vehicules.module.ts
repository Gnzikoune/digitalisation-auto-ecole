import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculesService } from './vehicules.service';
import { VehiculesController } from './vehicules.controller';
import { Vehicle } from './entities/vehicule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiculesController],
  providers: [VehiculesService],
})
export class VehiculesModule {}
