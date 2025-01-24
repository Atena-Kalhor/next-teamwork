import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {

    answer: {
      type: { type: String, required: true },
    },
    id:{}
  },

);

export default mongoose.models.Answer ||
  mongoose.model("Answer", answerSchema);