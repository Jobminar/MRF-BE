import { Schema, model } from "mongoose";

const salesReportSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, unique: true },
  sales: [
    {
      date: { type: Date, required: true },
      numberOfTyres: { type: Number, required: true },
      numberOfVehicles: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
});

const SalesReport = model("SalesReport", salesReportSchema);

export default SalesReport;
