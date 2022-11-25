const Adminuser = require('../../model/admin/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_KEY, SALT} = process.env;

const register= async (req, res)=>{
   const { name, email, password } = req.body;
   if(!(name && email && password)){
    return res.status(400).json({
        success: false,
        message: req.body
    });
   } 
   const admuserobj = new Adminuser({ name, email, password });
   try {
     const salt = await bcryptjs.genSalt(SALT*1);
     const hashedpwd = await bcryptjs.hash(password, salt);
     if(admuserobj.password){
        admuserobj.password = hashedpwd;
     }
    const result = await admuserobj.save();
    if(result){
        const token=jwt.sign({id: result._id}, JWT_KEY, { expiresIn: '2h'} );
        admuserobj.access_token=token;
        await admuserobj.save();
    }
    return res.status(201).json(result);
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
   }
};

const login=(req, res)=>{
    const { name, email, password } = req.body;
    return res.status('201').json(req.body);
 };


module.exports = { register, login };