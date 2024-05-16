import { Schema, model } from "mongoose";


const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: String,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    available: { type: Boolean, default: true }

})


ProductSchema.methods.toJSON = function () {
    const { __v, status, ...product } = this.toObject();
    return product
}


export default model('Product', ProductSchema)