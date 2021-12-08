const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/add", async (req, res) => {
  try {
    const location = require("../release/models/location");
    // const loc = location.create();
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    });

    return res.status(200).json({
      data: newProduct,
      status: true,
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
      data: null,
      status: false,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    let response = await Product.findAll();
    const locations = require("../release/models/location");

    await locations.sync()
  
    const loc = await locations.create({
      id: 1,
      name: "Karc",
      status: 2,
    });

    return res.status(200).json({ response, loc });
  } catch (error) {
    console.log(error)
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
    let response = await Product.findAll({
      where: {
        id: id,
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
