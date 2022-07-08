const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'You must add a username'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'You must add an email'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

AuthSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Auth', AuthSchema);
