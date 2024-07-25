const mongoose = require("mongoose");

async function connect(){
try{
await mongoose.connect(
    "mongodb+srv://SinghTejinder:TejiSingh6222@teji.hfyncnw.mongodb.net/NCNUTRITION?retryWrites=true&w=majority&appName=Teji"
);
console.log("Mongodb connected");
}catch(error){
    console.log(error);
}
}

module.exports = {connect};