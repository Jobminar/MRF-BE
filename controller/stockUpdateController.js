import StockUpdate from "../model/stockUpdateModel.js";

const stockUpdateController={

    register:async(req,res)=>{
        try{
            const {date,tyreSize,comment,quantity,SSP,location}=req.body

            if(!date || !tyreSize || !comment || !quantity || !SSP || !location){
                return res.status(400).json({message:"Required fields Missing !!"})
            }
            const newRegister=new StockUpdate({date,tyreSize,comment,quantity,SSP,location})
            await newRegister.save()
           res.status(201).json({message:"Successfully data added "})

        }
        catch(error){
            console.log(error)
            res.status(500).json({error:"Internal server error"})
        }
    },
    getAllRegister:async(req,res)=>{
        try{
            const getData=await StockUpdate.find()
            res.status(201).json(getData)
        }
        catch(error){
            console.log(error)
            res.status(500).json({error:"Failed to get the data"})
        }
    }

}
export default stockUpdateController