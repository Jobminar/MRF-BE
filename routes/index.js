import express from 'express'
import stockUpdateController from '../controller/stockUpdateController.js'
import tyreStockController from '../controller/tyreStockController.js'
import vehicleController from '../controller/vehicleController.js'


const router=express.Router()

router.post("/post-update-stock",stockUpdateController.register)
router.get("/get-update-stock",stockUpdateController.getAllRegister)
router.delete("/delete/:id",stockUpdateController.deleteStock)


router.post("/post-tyres",tyreStockController.createTyre)
router.get("/get-tyres",tyreStockController.getAllTyres)
router.delete("/delete-item/:id",tyreStockController.deleteTyre)

router.post("/post-vehicle",vehicleController.createVehicle)
router.get("/get-vehicle",vehicleController.getAllVehicle)

export default router 