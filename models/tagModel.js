const mongoose = require('mongoose');
const slugify = require('slugify');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A Tag must have a name'],
  },
  slug: String,
}, {
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
});

tagSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true});
  next();
})

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;