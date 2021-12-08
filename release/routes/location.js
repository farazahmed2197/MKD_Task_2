//Auto Generated Express Routes

const express = require('express');
const router = express.Router();

router.post("/add", async (req, res) => {
            try {
              const location = require("../models/location.js");
              await location.sync();
              const locationRecord = await location.create({
                    				name : req.body.name,
				status : req.body.status,

                });
              return res.status(200).json({
                data: locationRecord,
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
