const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    user: {
        type: ObjectId,
        required: true,
        ref: 'users'

    },
    product: {
        type: ObjectId,
        required: true,
        ref: 'products'
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value.'
        }
    },




}, { timestamps: true, versionKey: false });

const CartItemModel = model('cartItems', DataSchema);

module.exports = CartItemModel;