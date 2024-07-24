const user=require('../schema/userSchema');

exports.add=async(req,res)=>{
    try{
        const userModel=new user(req.body);
        const data=await userModel.save();
        res.json({message:"success..",data:data});

    }
    catch(err)
    {
        res.status(500).json(err);
    }

}
