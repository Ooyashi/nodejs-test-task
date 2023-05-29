const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      required: true,
      type: Number,
    },
    checkInDate: {
      required: false,
      type: Date,
    },
    checkInHour: {
      required: false,
      type: String,
    },
    checkOutDate: {
      required: false,
      type: Date,
    },
    checkOutHour: {
      required: false,
      type: String,
    },
    min: {
      required: false,
      type: Number,
    },
    max: {
      required: false,
      type: Number,
    },
    amenities: {
      required: false,
      type: [String],
    },
    rating: {
      required: true,
      type: Number,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  { versionKey: false }
);

roomSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  },
});

roomSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

roomSchema.plugin(mongoosePaginate);

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;
