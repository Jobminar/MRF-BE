import { Schema,model } from "mongoose";

const stockSchema=new Schema({
    date:{type:Date,required:true},
    tyreSize:{type:String,required:true},
    comment:{type:String,required:true},
    quantity:{type:Number,required:true},
    SSP:{type:String,required:true},
    location:{type:String,required:true},
})
const StockUpdate=model("StockUpdate",stockSchema)
export default StockUpdate