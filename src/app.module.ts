import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeeModule],
  controllers: [CatsController],
  // providers: [AppService],
})
export class AppModule {}
