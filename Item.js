const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
    itemName: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true,
        default: 1
    },
    isPurchased: { 
        type: Boolean, 
        default: false 
    }
});

// Make sure it is exported exactly like this
module.exports = mongoose.model('GroceryItem', GrocerySchema);