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
  const {name} = req.body;
  newCategory = await Category.create({name});
  
  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory
    }
  })
}