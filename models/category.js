import { Schema, model } from "mongoose";


const CategorySchema = Schema({
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
    }

})


CategorySchema.methods.toJSON = function () {
    const { __v, status, ...category } = this.toObject();
    return category
}


export default model('Category', CategorySchema)