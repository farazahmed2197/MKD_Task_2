//Auto Generated Express Routes

const express = require('express');
const router = express.Router();

router.post("/add", async (req, res) => {
            try {
              const user = require("../models/user.js");
              await user.sync();
              const userRecord = await user.create({
                    				name : req.body.name,
				email : req.body.email,
				status : req.body.status,

                });
              return res.status(200).json({
                data: userRecord,
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
