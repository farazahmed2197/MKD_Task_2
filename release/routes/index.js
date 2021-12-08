//Auto Generated Routes Index

const express = require('express');
          const router = express.Router();
          
        const location = require('./location');
        router.use("/location", location);
        
        const user = require('./user');
        router.use("/user", user);
        
        const customer = require('./customer');
        router.use("/customer", customer);
        

          router.use((req, res, next) => {
            const error = new Error('Routes not found, Please Build Files by using Model_builder.js file');
            error.status = 404;
            next(error);
          });
          
          module.exports = router;