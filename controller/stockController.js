import StockReport from "../model/stockReport.js";
import authMiddleware from "./authMiddleware.js"; // Import the authMiddleware

const stockController = {
  addStock: async (req, res) => {
    try {
      authMiddleware(req, res, async () => {
        const { date, tyreSize, quantity } = req.body;

        let stockReport = await StockReport.findOne({
          date,
          status: "existing-stock",
        });

        if (!stockReport) {
          stockReport = new StockReport({ date, status: "existing-stock" });
        }

        const existingItemIndex = stockReport.existingStock.findIndex(
          (item) => item.tyreSize === tyreSize,
        );

        if (existingItemIndex !== -1) {
          stockReport.existingStock[existingItemIndex].quantity += quantity;
        } else {
          stockReport.existingStock.push({ tyreSize, quantity });
        }

        await stockReport.save();

        res.status(200).json({ message: "Stock updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update stock" });
    }
  },

  sellTyresFromStock: async (req, res) => {
    try {
      authMiddleware(req, res, async () => {
        const { date, tyreSize, quantity } = req.body;

        let stockReport = await StockReport.findOne({
          date,
          status: "existing-stock",
        });

        if (!stockReport) {
          return res.status(404).json({ message: "Stock not found" });
        }

        const existingItemIndex = stockReport.existingStock.findIndex(
          (item) => item.tyreSize === tyreSize,
        );

        if (existingItemIndex !== -1) {
          if (
            stockReport.existingStock[existingItemIndex].quantity < quantity
          ) {
            return res
              .status(400)
              .json({ message: "Not enough stock available" });
          }

          stockReport.existingStock[existingItemIndex].quantity -= quantity;
          await stockReport.save();

          res.status(200).json({ message: "Stock updated successfully" });
        } else {
          res.status(404).json({ message: "Tyre size not found in stock" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update stock" });
    }
  },

  getClosedStock: async (req, res) => {
    try {
      authMiddleware(req, res, async () => {
        const { date } = req.params;

        const stockReport = await StockReport.findOne({
          date,
          status: "closed-stock",
        });

        if (!stockReport) {
          return res.status(404).json({
            message: "Closed-stock report not found for the given date",
          });
        }

        res.status(200).json(stockReport);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get closed-stock report" });
    }
  },
};

export default stockController;
