const Tag = require('./../models/tagModel');

exports.getAllTags = async(req, res, next) => {
  const tags = await Tag.find();

  if(!tags) return next(res.status(500).json({ status: 'error', message:'No tags'}));
  res.status(200).json({
    status: 'success',
    result: tags.length,
    data: {
      tags
    }
  });
}

exports.createTag = async (req, res, next) => {
  const {name, description} = req.body;
  newTag = await Tag.create({name, description});
  
  res.status(201).json({
    status: 'success',
    data: {
      tag: newTag
    }
  })
}

exports.getTag = async (req, res, next) => {
  const {id} = req.params;

  const tag = await Tag.findById(id);

  res.status(200).json({
    status: 'success',
    data:{
      tag
    }
  })

}
exports.updateTag = async (req, res, next) => {
  const {id} = req.params;

  const tag = await Tag.findById(id);
  tag.name = req.body.name;
  //the save method is used so that the pre save hook in the model is run. 
  await tag.save();

  res.status(200).json({
    status: 'success',
    data:{
      tag
    }
  })

}
exports.deleteTag = async (req, res, next) => {
  const {id} = req.params;

  await Tag.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    data:{
      tag: null
    }
  })

}