const express = require("express");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../middlewares");

const router = express.Router();

//****************router for getting user account balance ************************************** 
router.get("/balance", authMiddleware, async (req, res) => {
      const account = await Account.findOne({
          userId: req.userId
      });
      console.log(account);
  
      res.json({
          balance: account.balance
      })
  });


//********************* rouer for transation ***************************************** */
router.post("/transfer",authMiddleware , async (req,res) => {
      const session = await mongoose.startSession();


      session.startTransaction(); // tranasction start

      const { to , amount }  = req.body;

      const account_find = await Account.findOne({ userId : req.userId }).session(session);
      if( !account_find ||  account_find.balance < amount ){
            session.abortTransaction();  // aborting transation
            return res.status(400).json({message: "Insufficient balance"});
      }

      const toAccount = await Account.findOne({ userId : to}).session(session);
      if(!toAccount){
            session.abortTransaction();
            return res.status(400).json({message : "Invalid account"})
      }

      await Account.updateOne({ userId : req.userId } , {$inc : {balance : -amount}}).session(session)
      await Account.updateOne({ userId : to} , {$inc : {balance : amount}}).session(session)

      await session.commitTransaction();

      
      res.json({ message : "Transcation completed"});
})


module.exports = router;