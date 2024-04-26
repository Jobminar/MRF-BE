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
    },
    deleteStock:async(req,res)=>{
   
        try{
        const {id}=req.params
        const removeItem=await StockUpdate.findByIdAndDelete(id)

        if(!removeItem){
            return res.status(400).json({message:"user not found"})
        }
        res.status(200).json({message:"deleted successfully"})
        }
        catch(error){
            res.status(500).json({error:"Delete failed "})
        }


    }

}
export default stockUpdateController