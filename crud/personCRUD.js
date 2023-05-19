//importing our model 
const Person = require("../model/person");

//Create and Save a Record of a Model
const createAndSavePerson = (fulfilled) => {
    let nawressL  = new Person({
      name: "nawress laouissi",
      age: 26,
      favoriteFoods: ["chocolate", "cheese"],
    });
  
    nawressL.save((err, data) => {
      if (err) return console.error(err);
      fulfilled(null, data);
    });
  };
  
//Create Many Records with model.create()
const arrayOfPeople = [
    { name: "lilly", age: 23, favoriteFoods: ["tacos"] },
    { name: "jenny", age: 25, favoriteFoods: ["fries"] },
    { name: "timothée", age: 30, favoriteFoods: ["noodles"] },
  ];
  
  const createManyPeople = (arrayOfPeople, fulfilled) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.log(err);
      fulfilled(null, people);
    });
  };

  //Use model.find() to Search Your Database
  const findPeopleByName = (personName, fulfilled) => {
    Person.find({ name: personName }, (err, personIsFound) => {
      if (err) return console.log(err);
      done(null, personIsFound);
    });
  };
  //Use model.findOne() to Return a Single Matching Document from Your Database
  const findOneAccordingToFood = (food, fulfilled) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return console.log(err);
      fulfilled(null, data);
    });
  };
  //Use model.findById() to Search Your Database By _id
  const findPersonBasedOnId = (personId, fulfilled) => {
    Person.findById(personId, (err, data) =>
      err ? console.log(err) : fulfilled(null, data)
    );
  };
//Perform New Updates on a Document Using model.findOneAndUpdate()
const updatePerson =(personName, fulfilled)=>{
    Person.findByIdAndUpdate(personName, {$set: {age: 20}}, { new: true },
        (err, data) => (err ? done(err, data) : fulfilled(null, data))
      );
    };
    
//Delete One Document Using model.findByIdAndRemove
const deleteOneperson= ( personId, fulfilled)=>{
    Person.findByIdAndRemove(personId,(err, data) => (err ? done(err, data) : fulfilled(null, data))
    )
}
 // MongoDB and Mongoose - Delete Many Documents with model.remove()
 const removeManyPeople = (fulfilled) => {
    const mustbeRemovedName = "Mary";
    Person.remove({ name: mustbeRemovedName }, (err, data) =>
      err ? done(err, data) : fulfilled(null, data)
    );
  };
//   Chain Search Query Helpers to Narrow Search Results
const chainedQuery = (fulfilled) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) =>
        err
          ? console.error("error getting data: ", err.message)
          : fulfilled(null, dataNext)
      );
  };
  module.exports={chainedQuery, removeManyPeople, deleteOneperson, createManyPeople, 
    findPeopleByName, findOneAccordingToFood, findPersonBasedOnId, createAndSavePerson}