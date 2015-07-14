// Setup
var mongoose = require("mongoose");

// what does the next line do? Connects mongoose to the MongoDB
mongoose.connect("mongodb://localhost/mongoRelationships");

var Schema = mongoose.Schema;


// Referenced Data

// what does this code block do? Declares variable's "name" and "ingredients" under the Schema
var foodSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  ingredients: [{
    type: Schema.Types.ObjectId,  // what does this line do? Sets a point of reference for the Ingredients
    ref: 'Ingredient'
  }]
});

// what does this code block do? Declares variable's "title" and "origin" under the Schema; and as referenced by foodSchema
var ingredientSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  origin: {
    type: String,
    default: ""
  }
})


// what do these next two lines do? Sets the main variables using mongoose; to be referenced in the server JS
var Food = mongoose.model("Food", foodSchema);
var Ingredient = mongoose.model("Ingredient", ingredientSchema);

// Embedded Data
// what does this code block do? Declares variable's "body" under the tweet Schema
var tweetSchema = new Schema({
  body: {
    type: String,
    default: ""
  }
});

// what does this code block do? Declares variable's "name" and "tweets" under the user Schema
var userSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  tweets: [tweetSchema]   // what does this line do? Embeds the tweetSchema under "tweets" to this userSchema variable
});

// what do these next two lines do? Sets the main variables using mongoose; to be referenced in the server JS
var User = mongoose.model("User", userSchema);
var Tweet = mongoose.model("Tweet", tweetSchema);


// Export all our models
module.exports.Food = Food;
module.exports.Ingredient = Ingredient;
module.exports.User = User;
module.exports.Tweet = Tweet;

// For the purposes of these console exercises,
// we'll close the database connection when we type
// command + C in the terminal.
// Don't worry about exactly how this works.
// If you're curious feel free to look it up.
process.on('SIGINT', function() {
  console.log('About to exit...');
  mongoose.disconnect(function(){
    console.log("Disconnected DB")
    process.exit(); // now exit the node app
  });
});
