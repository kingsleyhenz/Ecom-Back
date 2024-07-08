// import https from 'https';
// import Product from "../models/Products.js";
// import Stripe from "stripe";
// import dotenv from 'dotenv'
// import UserMod from "../models/UserModel.js";
// import Order from '../models/Order.js';
// import Payment from '../models/Payment.js'; // Import the Payment model
// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_KEY);

// export const payWithStripe = async (req, res) => {
//   if (!req.userAuth) {
//     return res.status(401).json({
//       status: 'error',
//       message: 'User not logged in',
//     });
//   }
//   const { orderId } = req.params;
//   try {
//     const order = await Order.findById(orderId).populate('user');
//     if (!order) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Order not found',
//       });
//     }
//     const user = order.user;
//     const totalPrice = order.totalPrice;
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'USD',
//             product_data: {
//               name: `Payment for Order ${order._id} by ${user.name}`,
//             },
//             unit_amount: Math.round(totalPrice * 100),
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'https://www.instagram.com', // Update with your success URL
//       cancel_url: 'https://www.facebook.com', // Update with your cancel URL
//       payment_intent_data: {
//         metadata: {
//           orderId: order._id.toString(),
//         },
//       },
//     });
//     res.send({ url: session.url });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// export const payWPaystack = async (req, res) => {
//   if (!req.userAuth) {
//     return res.status(401).json({
//       status: 'error',
//       message: 'User not logged in',
//     });
//   }
//   const { email, orderId } = req.body;
//   try {
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Order not found',
//       });
//     }
//     const totalPrice = order.totalPrice;
//     const params = JSON.stringify({
//       email,
//       amount: Math.round(totalPrice * 100),
//       metadata: {
//         orderId: order._id.toString(),
//       },
//     });

//     const options = {
//       hostname: 'api.paystack.co',
//       port: 443,
//       path: '/transaction/initialize',
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     };
//     const reqPaystack = https.request(options, (resPay) => {
//       let data = '';
//       resPay.on('data', (chunk) => {
//         data += chunk;
//       });
//       resPay.on('end', () => {
//         console.log(JSON.parse(data));
//       });
//     }).on('error', (error) => {
//       console.error(error);
//     });
//     reqPaystack.write(params);
//     reqPaystack.end();
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: 'Failed to retrieve order',
//     });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   const payload = req.body;
//   const stripeSignature = req.headers['stripe-signature'];
//   try {
//     const event = stripe.webhooks.constructEvent(payload, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET);
//     switch (event.type) {
//       case 'charge.succeeded':
//         await handleSuccessfulCharge(event);
//         break;
//       case 'charge.failed':
//         await handleFailedCharge(event);
//         break;
//       // Add more cases for other event types as needed
//       default:
//         // Handle other events
//         break;
//     }
//     res.json({ received: true });
//   } catch (error) {
//     console.error("Failed to process Stripe webhook:", error);
//     res.status(500).json({ error: 'Webhook processing failed' });
//   }
// };

// export const handlePaystackWebhook = async (req, res) => {
//   const event = req.body;
//   try {
//     switch (event.event) {
//       case 'charge.success':
//         await handleSuccessfulCharge(event);
//         break;
//       case 'charge.failed':
//         await handleFailedCharge(event);
//         break;
//       default:
//         break;
//     }
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Failed to process Paystack webhook:", error);
//     res.sendStatus(500);
//   }
// };

// const handleSuccessfulCharge = async (event) => {
//   try {
//     const orderId = event.data.metadata.orderId;
//     const paymentReference = getPaymentReference(event);
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { paymentReference, paymentStatus: 'Successful' },
//       { new: true }
//     );

//     // Save payment document
//     const payment = new Payment({
//       user: updatedOrder.user,
//       order: updatedOrder._id,
//       paymentMethod: 'Stripe',
//       paymentReference,
//       amount: updatedOrder.totalPrice,
//       status: 'Success',
//       createdAt: Date.now(),
//     });
//     await payment.save();

//     console.log('Payment successful:', updatedOrder);
//   } catch (error) {
//     console.error('Failed to handle successful charge:', error);
//   }
// };

// const handleFailedCharge = async (event) => {
//   try {
//     const orderId = event.data.metadata.orderId;
//     const paymentReference = getPaymentReference(event);
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { paymentReference, paymentStatus: 'Failed' },
//       { new: true }
//     );

//     // Save payment document
//     const payment = new Payment({
//       user: updatedOrder.user,
//       order: updatedOrder._id,
//       paymentMethod: 'Stripe',
//       paymentReference,
//       amount: updatedOrder.totalPrice,
//       status: 'Failed',
//       createdAt: Date.now(),
//     });
//     await payment.save();

//     console.log('Payment failed:', updatedOrder);
//   } catch (error) {
//     console.error('Failed to handle failed charge:', error);
//   }
// };
