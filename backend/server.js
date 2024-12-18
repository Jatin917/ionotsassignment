import express, { json } from 'express';
import router from './routes/route.js';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

// Configurations
config();
const app = express();
app.use(cors());
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
