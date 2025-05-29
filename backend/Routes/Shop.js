const express = require('express');
const router = express.Router();        // rowter hya hya el app bs zy branch mnha 3ashan asa8r code el app.js (hena esmo server.js) 

//this route open when url is /shop/
router.use('/', (req, res, next) => {
    res.send('<h1>Hello from Shop Page</h1>');
  });
module.exports = router;           //dh 3ashan a3ml export ly file aw module dh kolo globally ay had y2dar yshofo