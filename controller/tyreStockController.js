import Tyre from "../model/tyreModel.js";
const tyreStockController={

    createTyre:async(req,res)=>{
        try{
        const {date,tyreSize,comment,quantity,SSP,location,amount}=req.body
        if(!date || !tyreSize || !comment || !quantity || !SSP || !location || !amount){
            return res.status(400).json({message:"Required fields missing !! date tyreSize comment quantity SSP location"})
        }

        const newTyre=new Tyre({date,tyreSize,comment,quantity,SSP,location,amount})
         await newTyre.save()
         res.status(201).json({message:"Successfully data added"})

        }
        catch(error){
            console.log(error)
            res.status(500).json({error:"Internal server error"})
        }
    },
    getAllTyres:async(req,res)=>{
        try{
            const getData=await Tyre.find()
            res.status(201).json(getData)
        }
        catch(error){
            res.status(500).json({error:"Failed to get the data"})
        }
    },

    deleteTyre: async (req, res) => {
        try {
            const { id } = req.params;
            const removeItem = await Tyre.findByIdAndDelete(id);
            if (!removeItem) {
                return res.status(404).json({ message: "Item not found !!" });
            }
            res.status(200).json({ message: "Deleted successfully " });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete" });
        }
    }

}
export default tyreStockController