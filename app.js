const express = require('express');
const connectDB = require('./db/connect');
const Person = require('./models/person');

// Initialize Express app
const app = express();
app.use(express.json()); // For parsing application/json

// Connect to the database
connectDB();

// Function to create many records
const createManyPeople = async (arrayOfPeople) => {
    try {
        const savedPeople = await Person.create(arrayOfPeople);
        console.log('People saved:', savedPeople);
    } catch (err) {
        console.error('Error saving people:', err);
    }
};

// array of people
const arrayOfPeople = [
    { name: 'Adan Ali', age: 25, favoriteFoods: ['Apple Pie', 'Sushi'] },
    { name: 'Aish Smith', age: 40, favoriteFoods: ['Steak', 'Salad'] },
    { name: 'John Kim', age: 35, favoriteFoods: ['Pizza', 'Burger'] },
    { name: 'John Doe', age: 29, favoriteFoods: ['Pasta', 'Ice Cream'] },
    { name: 'Eve Black', age: 22, favoriteFoods: ['Chocolate', 'Berries'] }
];

// Function to find people by name
const findPeopleByName = async (personName) => {
    try {
        const people = await Person.find({ name: personName });
        console.log(`People found with name ${personName}:`, people);
    } catch (err) {
        console.error('Error finding people:', err);
    }
};

// find all people named "Adan Ali"
findPeopleByName('Adan Ali');

// Call the function to create and save multiple people
createManyPeople(arrayOfPeople);

// Function to find one person by a favorite food
const findPersonByFavoriteFood = async (food) => {
    try {
        const person = await Person.findOne({ favoriteFoods: { $in: [food] } });
        if (person) {
            console.log(`Person found with favorite food ${food}:`, person);
        } else {
            console.log(`No person found with favorite food ${food}`);
        }
    } catch (err) {
        console.error('Error finding person:', err);
    }
};

// find one person who likes "Pizza"
findPersonByFavoriteFood('Pizza');


// Declare and initialize the variable
//const somePersonId = '66b66c78d4da4341a4d5a1b2'; 

// Function to find one person by _id
const findPersonById = async (personId) => {
    try {
        const person = await Person.findById(personId);
        if (person) {
            console.log(`Person found with _id ${personId}:`, person);
        } else {
            console.log(`No person found with _id ${personId}`);
        }
    } catch (err) {
        console.error('Error finding person by _id:', err);
    }
};

//const somePersonId = '66b66c78d4da4341a4d5a1b2';
//findPersonById(somePersonId);

// Function to find a person by _id, update their favoriteFoods, and save
const updateFavoriteFoods = async (personId) => {
    try {
        const person = await Person.findById(personId);
        if (person) {
            person.favoriteFoods.push('Hamburger');

            // Save the updated document
            const updatedPerson = await person.save();
            console.log(`Person updated with new favorite food:`, updatedPerson);
        } else {
            console.log(`No person found with _id ${personId}`);
        }
    } catch (err) {
        console.error('Error updating person:', err);
    }
};

//const somePersonId = '66b66c78d4da4341a4d5a1b2';
updateFavoriteFoods(somePersonId);

// Function to find a person by name and update their age to 20
const updatePersonAge = async (personName) => {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName },      
            { age: 20 },              
            { new: true }             
        );

        if (updatedPerson) {
            console.log(`Person updated:`, updatedPerson);
        } else {
            console.log(`No person found with the name ${personName}`);
        }
    } catch (err) {
        console.error('Error updating person:', err);
    }
};

updatePersonAge('John Doe');

// Function to delete a person by _id
const deletePersonById = async (personId) => {
    try {
        const deletedPerson = await Person.findByIdAndRemove(personId);

        if (deletedPerson) {
            console.log(`Person deleted:`, deletedPerson);
        } else {
            console.log(`No person found with _id ${personId}`);
        }
    } catch (err) {
        console.error('Error deleting person:', err);
    }
};

const somePersonId = '66b66c78d4da4341a4d5a1b2';
deletePersonById(somePersonId);

// Function to delete all people with the name "John"
const deletePeopleByName = async (name) => {
    try {
        // Use remove() to delete documents matching the query
        const result = await Person.remove({ name: name });

        console.log(`Deleted ${result.deletedCount} person(s) with the name ${name}`);
    } catch (err) {
        console.error('Error deleting people:', err);
    }
};

// delete all people named "John"
deletePeopleByName('John');

// Function to find people who like pizza, sort by name, limit to 2, and hide their age
const findPeopleWhoLikePizza = (done) => {
    Person.find({ favoriteFoods: 'Pizza' })      
        .sort({ name: 1 })                         
        .limit(2)                                 
        .select('-age')                           
        .exec((err, data) => {                     
            if (err) {
                return done(err);                   
            }
            done(null, data);                      
        });
};

findPeopleWhoLikePizza((err, data) => {
    if (err) {
        console.error('Error finding people:', err);
    } else {
        console.log('Found people:', data);
    }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
