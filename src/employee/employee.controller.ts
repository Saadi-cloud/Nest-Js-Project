import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly logger = new MyLoggerService(EmployeeController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.employeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'admin' | 'intern' | 'engineer',
  ) {
    this.logger.log(`Request for all employees \t${ip}`, EmployeeController.name); // Added context
    return this.employeeService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.employeeUpdateInput,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
