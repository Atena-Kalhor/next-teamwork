import mongoose from "mongoose";

  const questionSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    {
      timestamps: true, 
    }
  );
  
  
  export default mongoose.models.Question ||
    mongoose.model("Question",questionSchema);





    // const questionSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   answer: {
//     type: Array,
//   },
// });

// export default mongoose.models.Question ||
//   mongoose.model("Question", questionSchema);