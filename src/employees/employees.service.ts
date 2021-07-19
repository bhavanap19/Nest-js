import { Injectable , NotAcceptableException, NotFoundException} from "@nestjs/common";
import { Employee } from "./employee.model";

@Injectable()

export class EmployeesService{
   private employees: Employee[] = [];

    insertEmployee(firstname:string, lastname:string, companyname: string, contact:number){
        const empId = Math.random().toString();
        const newEmployee = new Employee(empId, firstname,lastname,companyname,contact);
        this.employees.push(newEmployee);
        return empId;
    }
    
    getEmployees(){
        return [...this.employees];
    }


    getSingleEmployee(employeeId:string){
        const employee = this.findEmployee(employeeId)[0];
        return {...employee};
    }


    updateEmployee(employeeId:string, firstname:string, lastname:string, companyname:string, contact:number){
        const [employee, index] = this.findEmployee(employeeId);
        const updatedEmployee = {...employee};
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
        this.employees[index] = updatedEmployee;
    }

    deleteEmployee(empId:string) {
        const index = this.findEmployee(empId)[1];
        this.employees.splice(index, 1)
    }


    private findEmployee(id:string):[Employee, number] {
        const employeeIndex = this.employees.findIndex((emp) => emp.id == id);
        const employee = this.employees[employeeIndex];
        if(!employee){
            throw new NotFoundException('Not find employee');
        }
        return [employee, employeeIndex];
    }


    
}