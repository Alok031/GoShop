const mongoose=require("mongoose")

const OrderSchema = new mongoose.Schema({
    cart:{
        type:[],
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    ordertime:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
    
})

const MyOrder = new mongoose.model("MyOrder",OrderSchema);
module.exports = MyOrder;