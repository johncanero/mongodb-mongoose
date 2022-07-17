// jshint esversion: 6
const mongoose = require("mongoose");

// CONNECTION
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useUnifiedTopology: true, });

// SCHEMA
    const fruitSchema = new mongoose.Schema ({
        // Required Name
       name : { 
        type: String, 
        required: [true, "Name is required" ] 
       },
       rating: {
        type: Number, 
        min: 1,
        max: 10
       },
       review: String
    });

// MODEL
    const Fruit = mongoose.model("Fruit", fruitSchema);

// FRUIT
    const fruit = new Fruit({
        name: "Peaches",
        rating: 10,
        review: "Peaches are so Yummy!",
    });

    
    // FRUIT SAVE
    fruit.save();
    
    // PEOPLE
    const peopleSchema = new mongoose.Schema({
        name: String,
        age: Number,
    });
    
    const Person = mongoose.model("Person", peopleSchema);
    const person = new Person({
        name: "John",
        age: 37,
    });

    // person.save();


    // const kiwi = new Fruit({
    //     name: "Kiwi",
    //     rating: 10,
    //     review: "The best Fruit!",
    // })

    // const orange = new Fruit({
    //     name: "Orange",
    //     score: 6,
    //     review: "Kinda sour",
    // })


    // const banana = new Fruit({
    //     name: "Banana",
    //     score: 8,
    //     review: "Delicious Fruit!",
    // })


// INSERT MANY
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else console.log("successfully added all the fruits");
// });


// FIND
Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        // CLOSE CONNECTION (!NOT WORKING)
        mongoose.connection.close();

        // ONLY FRUITS NAME
        fruits.forEach(function (fruit){
            console.log(fruit.name)
        });
    }
});





// INSERT DOCUMENTS
const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Insert some documents
    collection.insertMany(
        [
            {
                name: "Apple",
                score: 8,
                review: "Great Fruit",
            },
            {
                name: "Orange",
                score: 6,
                review: "Kinda sour",
            },
            {
                name: "Banana",
                score: 8,
                review: "Delicious Fruit!",
            },
        ],
        function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        }
    );
};

// FIND DOCUMENTS
const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
};