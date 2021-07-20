import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

//pass-JPMqpJHjIc7ODjU1
@Module({
  imports: [EmployeesModule, MongooseModule.forRoot('mongodb+srv://root:JPMqpJHjIc7ODjU1@cluster0.ptlaf.mongodb.net/nestjs?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
