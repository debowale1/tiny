const asyncHandler = require('express-async-handler')

exports.deleteOne = (Model) => {
  return asyncHandler (async (req, res) => {
    
    const { id } = req.params
    const doc = await Model.findByIdAndDelete(id)
    if(!doc){
      res.status(404)
      throw new Error('Document not found')
    }

    //send response to client
    res.status(204).json({
      status: 'success',
      data: {
        doc: null
      }
    });
  });
}


exports.updateOne = Model => asyncHandler(async (req, res) => {
  const { id } = req.params;
  
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if(!doc){
      res.status(404)
      throw new Error('No document found with that ID')
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    })
})

exports.createOne = Model => asyncHandler( async (req, res, next) => {

    const doc = await Model.create(req.body);
    if(!doc){
      res.status(404)
      throw new Error('No document created')
    }
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    })

})

exports.getOne = (Model, populateOption) => asyncHandler(async (req, res) => {
  
  // const doc = await Model.findById(req.params.id).populate('comments');

  let query = Model.findById(req.params.id);
  // let query = Model.findOne(req.params.slug);
  if(populateOption) {
    query = query.populate(populateOption);
  }

  const doc = await query

  if(!doc){
    res.status(404)
    throw new Error('Not Found')
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});


exports.getAll = Model => asyncHandler(async (req,res) => {
  
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
      const limit = +req.query.limit || 10;
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