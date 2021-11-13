const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});

schema.pre("save", function (next) {
  let user = this;
  if (!user.isModified('password')) next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, result)  => {
        if (err) return cb(err)
        cb(result)
    })
}

const User = mongoose.model("User", schema);

module.exports = User;
