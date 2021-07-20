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

    async insertEmployee(firstname:string, lastname:string, companyname: string, contact:number){
        const newEmployee = new this.employeeModel({
            firstname:firstname, 
            lastname:lastname,
            companyname:companyname,
            contact:contact
        });

        const result = await newEmployee.save();
        return result.id as string;
    }
    
    async getEmployees(){
       const employees = await this.employeeModel.find().exec();
        return employees.map((emp)=> ({
            id:emp.id, 
            firstname:emp.firstname,
            lastname:emp.lastname,
            companyname:emp.companyname,
            contact:emp.contact,
        }));
    }


    async getSingleEmployee(employeeId:string){
        const employee = await this.findEmployee(employeeId);
        return {
            id:employee.id, 
            firstname:employee.firstname, 
            lastname:employee.lastname, 
            companyname:employee.companyname, 
            contact:employee.contact};
    }


    async updateEmployee(
        employeeId:string, 
        firstname:string, 
        lastname:string, 
        companyname:string, 
        contact:number){
        const updatedEmployee = await this.findEmployee(employeeId);
    
       
        if(firstname){
            updatedEmployee.firstname = firstname;
        }
        if(lastname){
            updatedEmployee.lastname = lastname;
        }
        if(companyname){
            updatedEmployee.companyname = companyname;
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