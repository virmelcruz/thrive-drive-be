const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    fileType: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

/**
 * @typedef File
 */
const File = mongoose.model('File', fileSchema);

module.exports = File;
