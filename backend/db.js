const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect("mongodb+srv://admin:wm99Vt0MKblWycBF@cluster0.yktrtu5.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
      username : String,
      password : String,
      firstname : String,
      lastname : String
})

const accountSchema = new mongoose.Schema({
      userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            require : true
      },
      balance : {
            type : Number,
            required :true
      }
})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = {
      User,Account
}