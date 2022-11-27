const Adminuser = require('../../model/admin/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_KEY, SALT} = process.env;

const register= async (req, res)=>{
   const { name, email, password } = req.body;
   if(!(name && email && password)){
    return res.status(400).json({
        success: false,
        message: 'Bad request'
    });
   } 
   const admuserobj = new Adminuser({ name, email, password });
   try {
     const isalready = await Adminuser.findOne({email});
     if(isalready) throw new Error('Admin user already exists!');
     const salt = await bcryptjs.genSalt(SALT*1);
     const hashedpwd = await bcryptjs.hash(password, salt);
     if(admuserobj.password){
        admuserobj.password = hashedpwd;
     }
    const result = await admuserobj.save();
    let token=null;
    if(result){
        token=jwt.sign({id: result._id}, JWT_KEY, { expiresIn: '2h'} );
        refresh_token=jwt.sign({id: result._id}, JWT_KEY); 
    }
    return res.status(201).json({
        name: result.name,
        email: result.email,
        access_token: token,
        refresh_token: refresh_token,
        createdAt: result.createdAt
    });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
   }
};

const login= async (req, res)=>{
    const { email, password } = req.body;
    if(!(email && password)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    } 
    try {
      const admuser = await Adminuser.findOne({email});
      if(admuser && (await bcryptjs.compare(password, admuser.password))) {
        const token=jwt.sign({id: admuser._id}, JWT_KEY, { expiresIn: '2h'} );
        const refresh_token=jwt.sign({id: admuser._id}, JWT_KEY); 
        return res.status(201).json({
            name: admuser.name,
            email: admuser.email,
            access_token: token,
            refresh_token: refresh_token,
            createdAt: admuser.createdAt
        });  
    }else{
        throw new Error('Invalid login credentials!');
      }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
 };

 const profile=async(req, res)=>{
   const admuser = await Adminuser.findById(req.admuser.id);
   return res.status(200).json(admuser);
 }


module.exports = { register, login, profile };