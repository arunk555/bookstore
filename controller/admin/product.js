const Product = require('../../model/admin/product');

const allproducts=async (req, res)=>{
    try {
      const allprod = await Product.find();
      return res.status(200).json(allprod);
    } catch (error) {
       return res.status(500).json({
        success: false,
        message: error.message
       });
    }
};




module.exports = { allproducts };