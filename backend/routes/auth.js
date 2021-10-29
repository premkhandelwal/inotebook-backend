const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'MainhoonDon';
var fecthUser = require('../middleware/fetchUser');
const fetchUser = require('../middleware/fetchUser');

router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must contain at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "User already exists" })
    } else {
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
    }
    //   .then(user => res.json(user)).catch(err=>{console.log(err);
    //   res.json({error: " Please enter a valid email" ,message: err.message})}

    //   );
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })
  } catch (error) {
    res.status(500).send("Internal server error");
  }



});


router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists(),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });

      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken })

    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");

    }}
)


    router.post('/getUser', fetchUser,
      async (req, res) => {
        try {
          userId = req.user.id;
          const user = await User.findById(userId).select("-password");
          res.send({user})
        } catch (error) {
          console.log(error);
          res.status(500).send("Internal server error");
        }
      })


module.exports = router;