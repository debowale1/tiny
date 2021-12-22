const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'], 
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'editor', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: {
      //only works with create() and save()
      validator: function(el){
        return el === this.password;
      }
    },
    message: 'Passwords are not the same'
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
},{
  timestamps: true,
});

//DOCUMENT MDDLEWARE
//hash password before save
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  // const salt = bcrypt.genSaltSync(12);
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//INSTANCE METHODS
//compare entered password and hashed password
userSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

//QUERY MIDDLEWARE
userSchema.pre(/^find/, function(next){
  this.find({ active: { $ne: false } });
  next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;