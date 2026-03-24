import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  receivedAt: { type: Date, default: Date.now },
});

const leadModel = mongoose.model("lead", leadSchema);
export default leadModel;
