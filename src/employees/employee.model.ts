import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: { type: String, required: true },
    contact: { type: Number, required: true },

});


export interface Employee extends mongoose.Document {


    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
    contact: number;

}





