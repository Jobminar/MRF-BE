import { Schema, model } from "mongoose";

const salesReportSchema = new Schema({
  location: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  sales: [
    {
      date: { type: Date, required: true },
      tyreSize: { type: Number, required: true },
      comment: { type: String },
      quantity: { type: String },
      SSP: { type: String },
    },
  ],
});

const SalesReport = model("SalesReport", salesReportSchema);

export default SalesReport;
