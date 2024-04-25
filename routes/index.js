import express from 'express'
import stockUpdateController from '../controller/stockUpdateController.js'

const router=express.Router()

router.post("/post-update-stock",stockUpdateController.register)
router.get("/get-update-stock",stockUpdateController.getAllRegister)//

export default router