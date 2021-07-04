const Category = require('./../models/categoryModel');

exports.getAllCategories = async(req, res, next) => {
  const categories = await Category.find();

  if(!categories) return next(res.status(500).json({ status: 'error', message:'No categories'}));
  res.status(200).json({
    status: 'success',
    result: categories.length,
    data: {
      categories
    }
  });
}

exports.createcategory = async (req, res, next) => {
  const {name, description} = req.body;
  newCategory = await Category.create({ 
    name,
    description
  });
  
  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory
    }
  })
}

exports.getCategory = async (req, res, next) => {
  const {id} = req.params;

  const category = await Category.findById(id);

  res.status(200).json({
    status: 'success',
    data:{
      category
    }
  })

}
exports.updateCategory = async (req, res, next) => {
  const {id} = req.params;

  const category = await Category.findById(id);
  category.name = req.body.name;
  //the save method is used so that the pre save hook in the model is run. 
  await category.save();

  res.status(200).json({
    status: 'success',
    data:{
      category
    }
  })

}
exports.deleteCategory = async (req, res, next) => {
  const {id} = req.params;

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    data:{
      category: null
    }
  })

}