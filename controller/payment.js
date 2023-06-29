import https from 'https';
import Product from "../models/Products.js";
import Stripe from "stripe";
import dotenv from 'dotenv'
import UserMod from "../models/UserModel.js";
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_KEY);

export const payWithStripe = async (req, res) => {
    if (!req.userAuth) {
        return res.status(401).json({
          status: 'error',
          message: 'User not logged in',
        });
      }
    const { productId } = req.params;
    try {
      const user = await UserMod.findById(req.userAuth);
      const product = await Product.findById(productId);
    //   console.log('Retrieved product:', product);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: `Payment For ${product.Model} by ${user.name}`,
              },
              unit_amount: 100 * product.price,
            },
            quantity: 2
          },
        ],
        mode: 'payment',
        success_url: 'https://www.instagram.com',
        cancel_url: 'https://www.facebook.com',
      });
      res.send({ url: session.url });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  

  export const payWPaystack = async (req, res) => {
    if (!req.userAuth) {
        return res.status(401).json({
          status: 'error',
          message: 'User not logged in',
        });
      }
    const { email, productId } = req.body;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        });
      }
      const params = JSON.stringify({
        email,
        amount: product.price * 100, // Multiply by 100 to convert to kobo (lowest currency unit)
        metadata: {
          productId,
        },
      });
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk_test_6ed1301c2a6dfd6c22016a653128b78ac135e2c8',
          'Content-Type': 'application/json',
        },
      };
      const reqPaystack = https.request(options, (resPay) => {
        let data = '';
        resPay.on('data', (chunk) => {
          data += chunk;
        });
        resPay.on('end', () => {
          console.log(JSON.parse(data));
        });
      }).on('error', (error) => {
        console.error(error);
      });
      reqPaystack.write(params);
      reqPaystack.end();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve product',
      });
    }
  };