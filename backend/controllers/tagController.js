const Tag = require('./../models/tagModel');
const { getAll, createOne, getOne, deleteOne } = require('./factory');


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
exports.getAllTags = getAll(Tag);
exports.createTag = createOne(Tag);
exports.getTag = getOne(Tag);
exports.deleteTag = deleteOne(Tag);