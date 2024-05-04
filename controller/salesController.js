import SalesReport from "../model/salesReport.js";
import StockReport from "../model/stockReport.js";
import jwt from "jsonwebtoken";
import authMiddleware from "./authMiddleware.js";

const salesController = {
  verifyToken: authMiddleware, // Use authMiddleware for token verification

  getSalesReportByDate: async (req, res) => {
    try {
      const { date } = req.params;

      const salesReport = await SalesReport.findOne({ date });

      if (!salesReport) {
        return res.status(404).json({
          message: "Sales report not found for the given date",
        });
      }

      res.status(200).json(salesReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get sales report" });
    }
  },

  addSalesReport: async (req, res) => {
    try {
      const { date, numberOfTyres, numberOfVehicles, amount } = req.body;
      if (!date || !numberOfTyres || !numberOfVehicles || !amount) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const salesReport = new SalesReport({
        date,
        numberOfTyres,
        numberOfVehicles,
        amount,
      });
      await salesReport.save();

      // Update the stock report with sales information
      let stockReport = await StockReport.findOne({
        date,
        status: "existing-stock",
      });
      if (!stockReport) {
        stockReport = new StockReport({ date, status: "existing-stock" });
      }
      stockReport.sales.push({
        date,
        numberOfTyres,
        numberOfVehicles,
        amount,
      });
      await stockReport.save();

      res.status(200).json({ message: "Sales report added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add sales report" });
    }
  },
};

export default salesController;
