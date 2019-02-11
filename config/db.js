const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});

module.exports = mongoose