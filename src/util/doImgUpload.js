const aws = require('aws-sdk');
const decodeBase64 = require('./decodeBase64');

const {
  DO_SPACES_ENDPOINT,
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_REGION,
} = process.env;

const s3 = new aws.S3({
  endpoint: new aws.Endpoint(DO_SPACES_ENDPOINT),
  accessKeyId: DO_SPACES_KEY,
  secretAccessKey: DO_SPACES_SECRET,
  region: DO_SPACES_REGION,
});

module.exports = async (bucketName, filename, base64Img) => {
  // https://medium.com/@mayneweb/upload-a-base64-image-data-from-nodejs-to-aws-s3-bucket-6c1bd945420f
  const { base64Data, type } = decodeBase64(base64Img);

  const params = {
    Bucket: bucketName,
    Key: `${new Date().valueOf()}_${filename}.${type}`, // type is not required
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };

  const { Key } = await s3.upload(params).promise();

  return Key;
};
