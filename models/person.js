const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Person schema
const personSchema = new Schema({
    name: {
        type: String,
        required: true, 
        trim: true      // removes any leading or trailing whitespace
    },
    age: {
        type: Number,
        min: 0,         
        default: 0      
    },
    favoriteFoods: {
        type: [String], 
        default: []     // default value is an empty array
    }
});

// Create and export the Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
