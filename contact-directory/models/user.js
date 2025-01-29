const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: String,
    name: String,
    email: String,
    avatar: String
});

module.exports = mongoose.model('User', userSchema);