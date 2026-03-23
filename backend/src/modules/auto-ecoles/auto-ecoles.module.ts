import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoEcolesService } from './auto-ecoles.service';
import { AutoEcolesController } from './auto-ecoles.controller';
import { DrivingSchool } from './entities/driving-school.entity';
import { DrivingSchoolDocument } from './entities/driving-school-document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrivingSchool, DrivingSchoolDocument])],
  controllers: [AutoEcolesController],
  providers: [AutoEcolesService],
})
export class AutoEcolesModule {}
