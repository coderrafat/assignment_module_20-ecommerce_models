const { Schema, model } = require('mongoose');

const DataSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                // Check if the value is a positive number
                return value >= 0;
            },
            message: 'Price must be a positive value.',
        }
    },
    stock: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                // Check if the value is a non-negative integer
                return Number.isInteger(value) && value >= 0;
            },
            message: 'Stock must be a non-negative integer.',
        },
    },
    category: {
        type: String,
        required: true,
    },
    imageURL: String,


}, { timestamps: true, versionKey: false });

const ProductModel = model('products', DataSchema);

module.exports = ProductModel;