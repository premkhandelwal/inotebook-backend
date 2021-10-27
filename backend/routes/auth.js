const express= require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({ min: 5 })
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    
    }

    try {
      let user = await  User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"User already exists"})
    }else{
     user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })}
    //   .then(user => res.json(user)).catch(err=>{console.log(err);
    //   res.json({error: " Please enter a valid email" ,message: err.message})}
    //   );
      res.json({"Nice": "nice"})
    } catch (error) {
      res.status(500).send("Some error occured")
    }

    

});

module.exports = router;