const readChunk = require('read-chunk');
const fileType = require('file-type');

exports.detectFromFile = async filePath => {
  const buffer = readChunk.sync(filePath, 0, 4100);
  return await fileType.fromBuffer(buffer);
};