const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   value: { type: Number, required: true },
});

module.exports = mongoose.model('sequences', sequenceSchema);
