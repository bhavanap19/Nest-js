import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    companyname: { type: String, required: true },
    contact: { type: Number, required: true },

});


export interface Employee extends mongoose.Document {


    id: string;
    firstname: string;
    lastname: string;
    companyname: string;
    contact: number;

}





