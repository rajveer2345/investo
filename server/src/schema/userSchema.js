const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    }
    
},{
    timestamps:true//record add update kiya to uska time note ho jata hai
});

const user=mongoose.model('user',userSchema);
module.exports=user;
