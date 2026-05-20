import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../model/Order.js";

/* ===========================
   CREATE ORDER
=========================== */

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // rupees → paise
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===========================
   VERIFY PAYMENT + SAVE ORDER
=========================== */

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      totalAmount,
    } = req.body;

    // Step 1: Generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    // Step 2: Compare signature
    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }

    // Step 3: Save order in DB
    const newOrder = new Order({
      userId,
      products: items,
      totalAmount,
      razorpay_order_id,
      razorpay_payment_id,
      paymentStatus: "Paid",
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified & order saved",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
