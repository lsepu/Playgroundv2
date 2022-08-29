const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//debe ser una función normal y no una flecha para que sirva el this
UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model( 'User', UserSchema );