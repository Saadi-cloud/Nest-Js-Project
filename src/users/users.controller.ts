import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { identity } from 'rxjs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // handle the routes like /users
export class UsersController {
  // GET /users
  // GET /users/:id
  // POST /users
  // PATCH /users/:id
  // DELETE /users/:id

  constructor(private readonly UsersService: UsersService) {} // inject the service

  @Get()  // GET /users or /user?role=value
  findAll(@Query('role') role?: 'admin' | 'intern' | 'engineer') {
    return this.UsersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.findOne(id);
  }

  @Get('interns') // GET /users/:interns
  findallinterns() {
    return ['John', 'Jane'];
  }

  @Post() // POST /users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.UsersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id', ParseIntPipe) id: number , @Body(ValidationPipe) userUpdate: UpdateUserDto) {
    return this.UsersService.update(id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id 
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.delete(id);
  }
}
