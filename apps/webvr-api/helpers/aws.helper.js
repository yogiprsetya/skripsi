const fs = require('fs');
const AWS = require('aws-sdk');
const AWSMock = require('mock-aws-s3');
AWSMock.config.basePath = 'vr-content';

const S3 = new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET
});

function s3Params(dir, fileContent) {
  return {
    'Bucket': process.env.S3_BUCKET,
    'Key': dir,
    'Body': fileContent,
    'ACL': 'public-read-write'
  }
};

exports.uploadFile = async (file, dir) => {
  try {
    const params = await s3Params(dir, fs.createReadStream(file.path));

    const content = await new Promise(async (resolve, reject) => {
      S3.upload(params, async (err, data) => {
        if (err) {
          return reject(err);
        }

        await fs.unlink(file.path, function (err) {
          if (err) {
            return reject(err);
          }
        });

        return resolve(data)
      });
    })

    return content;
  }
  catch (err) {
    return false
  }
}

exports.removeFile = async dir => {
  try {
    const checkdir = await S3.listObjects({ Bucket: process.env.S3_BUCKET, Prefix: dir }).promise();
    if (checkdir.Contents.length === 0) return true

    await new Promise(async (resolve, reject) => {
      const results = await checkdir.Contents.map(item => {
        if (item.Key.includes(dir)) {
          const Key = item.Key
          return { Key }
        }
      });

      const params = {
        Bucket: process.env.S3_BUCKET,
        Delete: {
          Objects: results,
          Quiet: false
        }
      };

      const res = await S3.deleteObjects(params).promise();
      return resolve(res)
    })

    return true
  }
  catch (err) {
    return false
  }
}
