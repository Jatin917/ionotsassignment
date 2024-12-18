import { mongoose, model } from "mongoose";


const acceptedProjectSchema = new mongoose.Schema({
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project', 
      required: true,
    },
    tasks: [
      {
        task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task', 
          required: true,
        },
        isCompleted: {
          type: Boolean,
          default: false, 
        },
      },
    ],
    progress: {
      type: Number, 
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  });
  
export default model('acceptedProject', acceptedProjectSchema);