const catchAsync = require('./../utils/catchAsync');

exports.deleteOne = (Model) => {
  return catchAsync (async (req, res, next) => {
    
    const { id } = req.params
    const doc = await Model.findByIdAndDelete(id)
    if(!doc) return next(res.status(404).json({status: 'error', message: 'doc not found'}));

    //send response to client
    res.status(204).json({
      status: 'success',
      data: {
        doc: null
      }
    });
  });
}


exports.updateOne = Model => catchAsync(async (req, res) => {
  const { id } = req.params;
  
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if(!doc) return next(res.status(404).json({status: 'error', message: 'No document found with that ID'}));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    })
})

exports.createOne = Model => catchAsync( async (req, res, next) => {

    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    })

})

exports.getOne = (Model, populateOption) => catchAsync(async (req, res, next) => {
  
  // const doc = await Model.findById(req.params.id).populate('comments');

  const query = Model.findById(req.params.id);
  if(populateOption) {
    query = query.populate(populateOption);
  }

  const doc = await query

  if(!doc) return next(res.status(404).json({status: 'fail', message: 'Not Found'}));

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});


exports.getAll = Model => catchAsync(async (req,res) => {
  
    //save a copy of req.query
    const queryObj = {...req.query};
    
  
    //remove some keywords from req.query
    //1) Filtering
    const excludedFields = ['fields', 'sort', 'limit', 'page'];
    excludedFields.forEach(el => delete queryObj[el]);

    let query = Model.find(queryObj); //returns a query

    // 2) SORTING: if query object consists of 'sort' field
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    }else{
      query.sort('-createdAt');
    }

    //3) FIELDS SELECTION
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    }else{
      query.select('-__v');
    }

    //4) PAGINATION
    if(req.query.page){
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 100;
      const skip = limit * (page - 1);
      query.skip(skip).limit(limit);
    }

    // await doc here
    const doc = await query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    })
})