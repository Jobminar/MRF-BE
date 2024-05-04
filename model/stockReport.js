import mongoose from "mongoose";

const { Schema } = mongoose;

const stockItemSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  numberOfTyres: {
    type: Number,
    required: true,
  },
  numberOfVehicles: {
    type: Number,
    required: true,
  },
});

const stockReportSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  openStock: [stockItemSchema],
  existingStock: [stockItemSchema],
  closedStock: [stockItemSchema],
  status: {
    type: String,
    enum: ["open-stock", "existing-stock", "closed-stock"],
    default: "open-stock",
  },
  sales: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      numberOfTyres: {
        type: Number,
        required: true,
      },
      numberOfVehicles: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const StockReport = mongoose.model("StockReport", stockReportSchema);

export default StockReport;
