const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middlewares");


//***************************signup page ******************************
const signupBody = zod.object({
      username: zod.string().email(),
        firstname: zod.string(),
        lastname: zod.string(),
        password: zod.string()
  })
  
  router.post("/signup", async (req, res) => {
      console.log(req.body);
      const { success, data, error } = signupBody.safeParse(req.body);
      if (!success) {
        return res.status(400).json({
          message: "Incorrect inputs",
          error: error.errors // Return specific validation errors
        });
      }
  
      const existingUser = await User.findOne({
          username: req.body.username
      })
  
      if (existingUser) {
          return res.status(411).json({
              message: "Email already taken/Incorrect inputs"
          })
      }
  
      const user = await User.create({
          username: req.body.username,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
      })
      const userId = user._id;

      //crating new accoutn for user with giving balance

      try{
            const account = await Account.create({
                  userId ,
                  balance :  Math.floor(1 + Math.random() * 10000)
            })
            console.log(account)

      }catch(err){
            console.log(err);
      }
  
      const token = jwt.sign({
          userId
      }, JWT_SECRET);
  
      res.json({
          message: "User created successfully",
          token: token
      })
  })
//*************************** sign in router ******************************
const signinValidate = zod.object({
      username : zod.string(),
      password : zod.string()
})

router.post('/signin' , async (req,res) => {
      const user = req.body;
      
      const validate_user = signinValidate.safeParse(user);

      if(!validate_user){
            return res.status(404).json({msg : "Go to signup page"});
      }

      const find_user = await User.find({
            username : user.username,
            password : user.password
      })

      if(find_user){
            const userId = find_user._id;
            const token = jwt.sign({
                  userId : userId
            },JWT_SECRET);

            return res.json({
                  token : token
            })
      }else{
            return res.status(411).json({
                msg: "Error while logging in"
            })

      }

})
//*************** all account detailsc ****************** */

router.get('/all' , async (req,res) => {
      const all_user = await User.find();
      const all_account = await Account.find();

      return res.json({user : all_user ,account : all_account });
})


//***************************update details route ******************************

const updateValidation = zod.object({
      password: zod.string().optional(),
      firstname : zod.string().optional(),
      lastname : zod.string().optional()
})


router.put('/' , authmiddleware ,async (req,res) => {
      const body = req.body;

      const validate_user = updateValidation.safeParse(body);

      if(!validate_user){
            return res.json({message: "Error while updating information"});
      }
      try {
            await User.updateOne({_id : req.userId }, req.body);
            res.json({
                  message: "Updated successfully"
            })
      }catch(err){
            return res.status(404).json({msg : "cant update data"})
      }


})
//***************************get user info route ******************************

router.get("/bulk" ,async (req,res) => {
      const filter = req.query.filter || "";
      
      const users = await User.find({
            $or:  [
                  { firstname : { "$regex" : filter }},
                  {lastname : { "$regex" : filter}}
            ]
      })
      res.json({
            users : users.map(user =>({
                  username : user.username,
                  firstname : user.firstname,
                  lastname : user.lastname,
                  _id : user._id
            }))
      })
})

module.exports = router;