//Auto Generated Express Routes

const express = require('express');
const router = express.Router();

router.post("/add", async (req, res) => {
            try {
              const customer = require("../models/customer.js");
              await customer.sync();
              const customerRecord = await customer.create({
                    				name : req.body.name,
				email : req.body.email,
				address : req.body.address,
				status : req.body.status,

                });
              return res.status(200).json({
                data: customerRecord,
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


          module.exports = router;
