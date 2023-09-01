const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const DataSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        encrypto: true,
    },
    address: String,

    phoneNumber: String

}, { timestamps: true, versionKey: false });



// Use a pre-save hook to hash the password before saving the document
DataSchema.pre('save', async (next) => {
    try {
        // Check if the password has been modified, if not, don't rehash it
        if (!this.isModified('password')) {
            return next();
        }

        // Generate hash the password
        const hashedPassword = await bcrypt.hash(this.password, 12);

        // Replace the plain text password with the hashed one
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Add pre-remove middleware to the User model
DataSchema.pre('remove', async (next) => {
    try {
        // Remove associated cart items
        await CartItem.deleteMany({ user: this._id });

        // Remove associated orders
        await Order.deleteMany({ user: this._id });

        next();
    } catch (error) {
        next(error);
    }
});

const UserModel = model('users', DataSchema);

module.exports = UserModel;