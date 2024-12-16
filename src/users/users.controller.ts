import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { identity } from 'rxjs';

@Controller('users') // handle the routes like /users
export class UsersController {
  // GET /users
  // GET /users/:id
  // POST /users
  // PATCH /users/:id
  // DELETE /users/:id

  @Get()  // GET /users or /user?role=value
  findAll() {
    return [];
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Get('interns') // GET /users/:interns
  findallinterns() {
    return ['John', 'Jane'];
  }

  @Post() // POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string , @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // DELETE /users/:id 
  delete(@Param('id') id: string) {
    return { id };
  }
}
