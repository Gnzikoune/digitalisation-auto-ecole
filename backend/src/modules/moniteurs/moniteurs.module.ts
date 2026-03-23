import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoniteursService } from './moniteurs.service';
import { MoniteursController } from './moniteurs.controller';
import { Instructor } from './entities/moniteur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  controllers: [MoniteursController],
  providers: [MoniteursService],
})
export class MoniteursModule {}
