const httpStatus = require('http-status');
const { File } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a file
 * @param {Object} fileBody
 * @returns {Promise<User>}
 */
const createFile = async (fileBody) => {
  return File.create(fileBody);
};

/**
 * Query for files
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFiles = async (filter, options) => {
  const { parentId } = filter;
  const fileInfo = parentId === 'home' ? { } : await getFileById(parentId);
  const files = await File.paginate(filter, options);
  const newFile = {
    fileInfo,
    ...files,
  };

  return newFile;
};

/**
 * Get file by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getFileById = async (id) => {
  return File.findById(id);
};

/**
 * Update file by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateFileById = async (fileId, updateBody) => {
  const file = await getFileById(fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }

  Object.assign(file, updateBody);
  await file.save();
  return file;
};

/**
 * Delete file by id
 * @param {ObjectId} fileId
 * @returns {Promise<User>}
 */
const deleteFileById = async (fileId) => {
  const file = await getFileById(fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  await file.remove();
  return file;
};

module.exports = {
  createFile,
  queryFiles,
  getFileById,
  updateFileById,
  deleteFileById,
};
