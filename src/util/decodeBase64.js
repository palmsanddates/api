const Buffer = require('buffer').Buffer;

module.exports = (base64str) => {
  const base64Data = new Buffer.from(
    base64str.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  const type = base64str.split(';')[0].split('/')[1];

  return {
    base64Data,
    type,
  };
};
