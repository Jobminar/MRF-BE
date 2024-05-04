import express from "express";

import tyreStockController from "../controller/tyreStockController.js";
import vehicleController from "../controller/vehicleController.js";
import adminController from "../controller/adminController.js";
import userController from "../controller/userController.js";
import stockController from "../controller/stockController.js";

import salesController from "../controller/salesController.js";

const router = express.Router();

router.post("/admin/signup", adminController.signup);
router.post("/admin/login", adminController.login);

router.post("/user/signup", userController.signUp);
router.post("/user/login", userController.login);

router.post("/post-tyres", tyreStockController.createTyre);
router.get("/get-tyres", tyreStockController.getAllTyres);
router.put("/update-tyre/:date", tyreStockController.updateTyre); // Update tyre route

router.post("/post-vehicle", vehicleController.createVehicle);
router.get("/get-vehicle", vehicleController.getAllVehicle);
router.put("/update-vehicle/:date", vehicleController.updateVehicle); // Update vehicle route

router.get("/open-stock-report", stockController.getOpenStockReport);
router.get("/stock-report/:status", stockController.getStockReportByStatus);
router.post("/start-sales", stockController.startSales);
router.post("/stop-sales", stockController.stopSales);

// Routes for sales reports
router.get("/sales-report/:date", salesController.getSalesReportByDate);
router.post("/add-sales-report", salesController.addSalesReport);

export default router;
