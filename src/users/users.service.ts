import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'saad',
      email: 'muhammadsaadm95@gmail.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'khawar',
      email: 'khawar@gmail.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'suleman',
      email: 'suleman@gmail.com',
      role: 'admin',
    },
    {
      id: 4,
      name: 'muqeet',
      email: 'muqeet@gmail.com',
      role: 'admin',
    },
  ];
  findAll(role?: 'admin' | 'intern' | 'engineer') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: CreateUserDto) {
    const userByhighestId = [...this.users].sort((a, b) => (b.id - a.id));
    const newUser = { id: userByhighestId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateUsers: UpdateUserDto,
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUsers };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
