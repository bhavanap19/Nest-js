import { Injectable , NotAcceptableException, NotFoundException} from "@nestjs/common";
import { Employee } from "./employee.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class EmployeesService{
   private employees: Employee[] = [];

   constructor(
       @InjectModel('Employee') private readonly employeeModel: Model<Employee>
       ) {}

    async insertEmployee(firstName:string, lastName:string, companyName: string, contact:number){
        const newEmployee = new this.employeeModel({
            firstName:firstName, 
            lastName:lastName,
            companyName:companyName,
            contact:contact
        });

        const result = await newEmployee.save();
        return result.id as string;
    }
    
    async getEmployees(){
       const employees = await this.employeeModel.find().exec();
        return employees.map((emp)=> ({
            id:emp.id, 
            firstName:emp.firstName,
            lastName:emp.lastName,
            companyName:emp.companyName,
            contact:emp.contact,
        }));
    }


    async getSingleEmployee(employeeId:string){
        const employee = await this.findEmployee(employeeId);
        return {
            id:employee.id, 
            firstName:employee.firstName, 
            lastName:employee.lastName, 
            companyName:employee.companyName, 
            contact:employee.contact};
    }


    async updateEmployee(
        employeeId:string, 
        firstName:string, 
        lastName:string, 
        companyName:string, 
        contact:number){
        const updatedEmployee = await this.findEmployee(employeeId);
    
       
        if(firstName){
            updatedEmployee.firstName = firstName;
        }
        if(lastName){
            updatedEmployee.lastName = lastName;
        }
        if(companyName){
            updatedEmployee.companyName = companyName;
        }
        if(contact){
            updatedEmployee.contact = contact;
        }
        updatedEmployee.save();   
     }

   async deleteEmployee(empId:string) {
      await this.employeeModel.deleteOne({_id:empId}).exec();
    }


    private async findEmployee(id:string): Promise<Employee> {
        let employee;
        try{
           employee = await this.employeeModel.findById(id).exec();
        }
        catch(error){
            throw new NotFoundException('Not find employee');
        }
        if(!employee){
            throw new NotFoundException('Not find employee');
        }
        return employee;
    }


    
}