const Category = require('./../models/categoryModel');
const { updateOne, deleteOne, getOne, createOne, getAll } = require('./factory');

exports.getAllCategories = getAll(Category) 

// exports.updateCategory = async (req, res, next) => {
//   const {id} = req.params;

//   const category = await Category.findById(id);
//   category.name = req.body.name;
//   //the save method is used so that the pre save hook in the model is run. 
//   await category.save();

//   res.status(200).json({
//     status: 'success',
//     data:{
//       category
//     }
//   })

exports.createcategory = createOne(Category)
exports.getCategory = getOne(Category)
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
