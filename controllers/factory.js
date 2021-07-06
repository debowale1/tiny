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