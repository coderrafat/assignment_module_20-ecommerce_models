const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const DataSchema = new Schema({

    user: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    items: [
        {
            product: {
                type: ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                // Check if the value is a positive number
                return value >= 0;
            },
            message: 'Price must be a positive value.',
        },

    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }

}, { timestamps: true, versionKey: false });

const OrderModel = model('orders', DataSchema);

module.exports = OrderModel;