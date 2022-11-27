const router = require('express').Router();
const { allproducts } = require('../../controller/admin/product');

router.get('/product', allproducts);

router.get('/product/:id', (req, res)=>{

});

/*router.post('/product', (req, res)=>{

});*/

router.patch('/product/:id', (req, res)=>{

});

router.delete('product/:id', (req, res)=>{

});



module.exports = router;