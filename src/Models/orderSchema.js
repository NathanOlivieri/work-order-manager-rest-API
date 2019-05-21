const mongoose = require('mongoose'),
        Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId

let orderSchema = new Schema({
    _id: {type:ObjectId, auto:true},
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    deadline: {
          type:Date,
          required: true,
          default:Date.now
    },
    assignedWorkers: {
      type: [{
        type: ObjectId,
        ref: 'Worker'
      }],
      validate: [validateArr, '{PATH} exceeds the limit of 5 workers per order']
    }
  });

// validate array of assignedWorkers
function validateArr(val) {
  return val.length <= 4;
}
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;