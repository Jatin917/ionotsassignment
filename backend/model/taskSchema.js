import { mongoose, model } from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false, 
  },
  points: {
    type: Number, 
    default: 10,
  },
});

export default model('Task', taskSchema);
