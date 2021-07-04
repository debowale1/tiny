const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A category must have a name'],
    unique: true
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  count:{
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
});

categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    lower: true
  })
  next()
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;