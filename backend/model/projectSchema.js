import { mongoose, model } from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', 
      },
    ],
  });
export default model('Project', projectSchema);  