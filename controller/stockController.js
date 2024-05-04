import StockReport from "../model/stockReport.js";

import authMiddleware from "./authMiddleware.js";

const stockController = {
  verifyToken: authMiddleware, // Use authMiddleware for token verification

  getOpenStockReport: async (req, res) => {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const previousDate = new Date(currentDate);
      previousDate.setDate(previousDate.getDate() - 1);

      const openStockReport = await StockReport.findOne({
        date: previousDate,
        status: "existing-stock",
      });

      if (!openStockReport) {
        return res.status(404).json({
          message: "Open stock report not found for the previous day",
        });
      }

      res.status(200).json(openStockReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get open stock report" });
    }
  },

  getStockReportByStatus: async (req, res) => {
    try {
      const { status } = req.params;

      const stockReports = await StockReport.find({ status });

      res.status(200).json(stockReports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get stock reports" });
    }
  },

  startSales: async (req, res) => {
    try {
      const { date, numberOfTyres, numberOfVehicles, amount } = req.body;
      if (!date || !numberOfTyres || !numberOfVehicles || !amount) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      // Find or create the stock report for the current date
      let stockReport = await StockReport.findOne({
        date,
        status: "existing-stock",
      });
      if (!stockReport) {
        stockReport = new StockReport({ date, status: "existing-stock" });
      }

      // Update the existing stock report
      stockReport.existingStock.push({
        date,
        numberOfTyres,
        numberOfVehicles,
        amount,
      });
      await stockReport.save();

      res.status(200).json({ message: "Sales started successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to start sales" });
    }
  },

  stopSales: async (req, res) => {
    try {
      const { date, numberOfTyres, numberOfVehicles, amount } = req.body;
      if (!date || !numberOfTyres || !numberOfVehicles || !amount) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      // Find the existing stock report for the current date
      const stockReport = await StockReport.findOne({
        date,
        status: "existing-stock",
      });
      if (!stockReport) {
        return res
          .status(404)
          .json({ message: "Existing stock report not found" });
      }

      // Update the existing stock report
      stockReport.closedStock.push({
        date,
        numberOfTyres,
        numberOfVehicles,
        amount,
      });
      stockReport.status = "closed-stock";
      await stockReport.save();

      res.status(200).json({ message: "Sales stopped successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to stop sales" });
    }
  },
};

export default stockController;
