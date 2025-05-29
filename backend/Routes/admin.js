const express = require('express');
const router = express.Router();        // router hya hya el app bs zy branch mnha 3ashan asa8r code el app.js (hena esmo server.js) 

//this route reach to /admin/add-product =>get
router.get('/add-product', (req, res, next) => {      //hya hya nafs app.get bs hena esmha router 3ashan msh mawgooda fy file app lakn lw kant mawgooda fy file app.js kan hayb2a esmha app.get 3ady
  res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

//this route reach to /admin/add-product =>post
router.post('/add-product', (req, res, next) => {    
  console.log(req.body);
    res.redirect('/');
});

module.exports = router;           //dh 3ashan a3ml export ly file aw module dh kolo globally ay had y2dar yshofo