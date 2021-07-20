import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeSchema } from "./employee.model";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
    imports:[MongooseModule.forFeature([{name:'Employee', schema: EmployeeSchema}])],
    controllers: [EmployeesController],
    providers:[EmployeesService],
    
})
export class EmployeesModule{}