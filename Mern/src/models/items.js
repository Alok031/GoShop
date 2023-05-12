const mongoose=require("mongoose")

const ItemSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    items:[{
        itemName:{
            type:String,
            required:true
        },
        quantity:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
        },
        shopid:{
            type:String, 
            required:true
        }
    }]
})

const Item = new mongoose.model("Item",ItemSchema);
module.exports = Item;