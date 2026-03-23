import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Vehicle } from './entities/vehicule.entity';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  create(createVehiculeDto: CreateVehiculeDto) {
    const vehicle = this.vehicleRepository.create(createVehiculeDto);
    return this.vehicleRepository.save(vehicle);
  }

  findAll(schoolId?: string) {
    if (schoolId) {
      return this.vehicleRepository.find({
        where: { driving_school_id: schoolId },
      });
    }
    return this.vehicleRepository.find({ relations: ['driving_school'] });
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['driving_school'],
    });
    if (!vehicle) {
      throw new NotFoundException(`Véhicule #${id} non trouvé`);
    }
    return vehicle;
  }

  async update(id: string, updateVehiculeDto: UpdateVehiculeDto) {
    const vehicle = await this.findOne(id);
    this.vehicleRepository.merge(vehicle, updateVehiculeDto);
    return this.vehicleRepository.save(vehicle);
  }

  async remove(id: string) {
    const vehicle = await this.findOne(id);
    return this.vehicleRepository.softRemove(vehicle);
  }
}
