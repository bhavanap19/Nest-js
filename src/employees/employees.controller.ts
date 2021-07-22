import  {Body, Controller, Post, Get, Param, Patch,Delete} from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController{

    constructor(private readonly employeesService: EmployeesService){}
    @Post()
    async addEmployee(
         @Body('firstName') empfirstName:string, 
         @Body('lastName') emplastName:string,
         @Body('companyName') empcompanyName:string,
         @Body('contact') empcontact:number
        
        ) {
        const generatedId = await this.employeesService.insertEmployee(
            empfirstName,
            emplastName,
            empcompanyName,
            empcontact
            );
            return {id:generatedId};
    }

    @Get()
    async getAllEmployees(){
       const employees = await this.employeesService.getEmployees();
       return employees;
    }

    @Get(':id')
    getEmployee(@Param('id') empId:string,){
        return this.employeesService.getSingleEmployee(empId);
    }


    @Patch(':id')
    async updateEmployee(@Param('id') empId:string, @Body('firstName') empfirstName:string, @Body('lastName') emplastName:string , @Body('companyName') empcompanyName:string, @Body('contact') empcontact:number) {
        await this.employeesService.updateEmployee(empId,empfirstName,emplastName,empcompanyName,empcontact);
        return null;
    }


    @Delete(':id')
    async removeEmployee(@Param('id') empId:string){
        await this.employeesService.deleteEmployee(empId);
        return null;
    }
}