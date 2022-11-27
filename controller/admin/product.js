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

const add=async (req, res)=>{
    const {name, price } = req.body; 
    if(!( name && price)) throw new Error("Mandatory fields are missing");
    const prodobj = new Product({name, price });
    try {
      const isAlready = await Product.findOne({name});
      if(isAlready)  throw new Error("Product already exists");
      

      return res.status(200).json(allprod);
    } catch (error) {
       return res.status(400).json({
        success: false,
        message: error.message
       });
    }
};





module.exports = { allproducts };