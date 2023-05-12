const mongoose=require("mongoose")

const CartSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
})

const Cart = new mongoose.model("Cart",CartSchema);
module.exports = Cart;