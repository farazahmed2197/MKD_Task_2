const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const STRIPE_KEY =
  "sk_test_51K3yNwCg0qtN0mvWfsVjQGlSKpyvcO0fj73c6sg2TUr5Qi1dbBIGv553dMuFiqHOs2Rl9azYCIjEhQXfT4FjX5sy00jtdC82OG";
const stripe = require("stripe")(STRIPE_KEY);

router.post("/add", async (req, res) => {
  try {
    
    let product = await Product.findByPk(req.body.productId);
    
    // if product is not available
    if (!product) throw new Error("No Product Found");

    const charge = await stripe.charges.create({
        amount: product.price,
        currency: 'usd',
        source: 'tok_mastercard',
        description: product.description,
      });

    const newOrder = await Order.create({
      productId: req.body.productId,
      stripe_id: charge.id,
      total: charge.amount,
      status: charge.paid ? "Paid" : "Failed",
    });

    return res.status(200).json({
      data: newOrder,
      stripe: charge,
      status: true,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      data: null,
      status: false,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    let response = await Order.findAll();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(402).json({
      error: error,
      data: [],
      status: false,
    });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await Order.findAll({
      where: {
        orderId: id,
      },
    });

    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(402).json({
      error: error,
      data: [],
      status: false,
    });
  }
});

module.exports = router;
