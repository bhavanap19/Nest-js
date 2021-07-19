import  {Body, Controller, Post, Get, Param, Patch,Delete} from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController{

    constructor(private readonly employeesService: EmployeesService){}
    @Post()
    addEmployee(
        @Body('firstname') empfirstname:string, 
        @Body('lastname') emplastname:string,
        @Body('companyname') empcompanyname:string,
        @Body('contact') empcontact:number
        ) {
        const generatedId = this.employeesService.insertEmployee(
            empfirstname,
            emplastname,
            empcompanyname,
            empcontact
            );
            return {id:generatedId};
    }

    @Get()
    getAllEmployees(){
        return this.employeesService.getEmployees();
    }

    @Get(':id')
    getEmployee(@Param('id') empId:string,){
        return this.employeesService.getSingleEmployee(empId);
    }


    @Patch(':id')
    updateEmployee(@Param('id') empId:string, @Body('firstname') empfirstname:string, @Body('lastname') emplastname:string , @Body('companyname') empcompanyname:string, @Body('contact') empcontact:number) {
        this.employeesService.updateEmployee(empId,empfirstname,emplastname,empcompanyname,empcontact);
        return null;
    }


    @Delete(':id')
    removeEmployee(@Param('id') empId:string){
        this.employeesService.deleteEmployee(empId);
        return null;
    }
}