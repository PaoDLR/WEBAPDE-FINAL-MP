//Create a module made only for the base connection. This way there is only 1
//major connection created
const mongoose = require('mongoose');
mongoose.connect('mongodb://hotdawg:hotdawg123@ds233452.mlab.com:33452/hotdawgdb');

module.exports.connection = mongoose;