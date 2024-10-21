import express from 'express';
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import connectDB from './config/db.js';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.246.179:5173'
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(compression());

// Connect to database
connectDB();

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Yay!! Backend of wanderlust app is now accessible');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
