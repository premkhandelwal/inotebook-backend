const express= require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({ min: 5 })
], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user =await User.create({
        name: req.body.name,
        email: req.body.password,
        password: req.body.password,
      })
    //   .then(user => res.json(user)).catch(err=>{console.log(err);
    //   res.json({error: " Please enter a valid email" ,message: err.message})}
    //   );
});

module.exports = router;