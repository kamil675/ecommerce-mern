import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    razorpay_order_id: {
      type: String,
    },

    razorpay_payment_id: {
      type: String,
    },

    paymentStatus: {
      type: String,
      default: "Pending", // Pending | Paid
    },

    deliveryStatus: {
      type: String,
      default: "Processing", // Processing | Shipped | Delivered
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
