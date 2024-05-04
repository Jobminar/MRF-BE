import SalesReport from "../model/salesReport.js";
import StockReport from "../model/stockReport.js";
import authMiddleware from "./authMiddleware.js";

const salesController = {
  // Middleware to verify JWT token
  verifyToken: authMiddleware,

  // Get sales report for a specific date
  // GET /api/sales/:date
  getSalesReportByDate: async (req, res) => {
    try {
      const { date } = req.params;

      // Find the sales report for the given date
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

  // Add a new sales report
  // POST /api/sales
  addSalesReport: async (req, res) => {
    try {
      const { date, tyreSize, comment, quantity, SSP } = req.body;
      if (!date || !tyreSize || !comment || !quantity || !SSP) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      // Create a new sales report
      const salesReport = new SalesReport({
        date,
        sales: [{ date, tyreSize, comment, quantity, SSP }],
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
        tyreSize,
        comment,
        quantity,
        SSP,
      });
      await stockReport.save();

      res.status(200).json({ message: "Sales report added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add sales report" });
    }
  },
};

// Add authMiddleware as a middleware for all salesController methods
Object.keys(salesController).forEach((key) => {
  if (typeof salesController[key] === "function") {
    salesController[key] = [authMiddleware, salesController[key]];
  }
});

export default salesController;
