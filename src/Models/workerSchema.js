const mongoose = require('mongoose'),
 Schema = mongoose.Schema;
 ObjectId = Schema.Types.ObjectId

 var workerSchema = new Schema({
    _id: {type:ObjectId, auto:true},
    name: {
        type: String,
        required: true,
    },
    company: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    workOrders: [{
        type: ObjectId,
        ref: 'Order'
    }]
  });

const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;