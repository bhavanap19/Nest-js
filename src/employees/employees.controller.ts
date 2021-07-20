import  {Body, Controller, Post, Get, Param, Patch,Delete} from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController{

    constructor(private readonly employeesService: EmployeesService){}
    @Post()
    async addEmployee(
         @Body('firstname') empfirstname:string, 
         @Body('lastname') emplastname:string,
         @Body('companyname') empcompanyname:string,
         @Body('contact') empcontact:number
        
        ) {
        const generatedId = await this.employeesService.insertEmployee(
            empfirstname,
            emplastname,
            empcompanyname,
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
    async updateEmployee(@Param('id') empId:string, @Body('firstname') empfirstname:string, @Body('lastname') emplastname:string , @Body('companyname') empcompanyname:string, @Body('contact') empcontact:number) {
        await this.employeesService.updateEmployee(empId,empfirstname,emplastname,empcompanyname,empcontact);
        return null;
    }


    @Delete(':id')
    async removeEmployee(@Param('id') empId:string){
        await this.employeesService.deleteEmployee(empId);
        return null;
    }
}