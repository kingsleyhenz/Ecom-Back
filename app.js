import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoDB } from './config/db.js';
import userRoute from './route/userRoute.js';
import cartRouter from './route/cartRoute.js';
import itemRoute from './route/productRoute.js';
import adminRoute from './route/adminRoute.js';
// import {
//   handleStripeWebhook,
//   handlePaystackWebhook,} from './controller/payment.js';


dotenv.config();
const app = express();
app.use(express.json());
mongoDB();

app.use(cors({
  origin: '*'
}));

app.options('*', cors());

app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: "*"
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/products", itemRoute);
app.use("/api/v1/admin", adminRoute); 

// // Webhook endpoints
// app.post('/webhooks/stripe', handleStripeWebhook);
// app.post('/webhooks/paystack', handlePaystackWebhook);

const PORT = process.env.PORT || 2000;
app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
