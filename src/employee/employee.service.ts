import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}
 async create(createEmployeeDto: Prisma.employeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'admin' | 'intern' | 'engineer') {
    if(role) return this.databaseService.employee.findMany({
      where: {
        role,
        },
    });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  async update(id: number, updateEmployeeDto: Prisma.employeeUpdateInput) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
