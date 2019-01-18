const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../config/config')

// custom file filter middleware to ensure only jpg and png files are submitted
module.exports = function (bucket) {

    var module = {};

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Invalid Mime Type, only JPEG and PNG'), false)
        }
    }


    // setting up aws connection with appropriate keys and region
    aws.config.update({
        secretAccessKey: config.S3.secretAccessKey,
        accessKeyId: config.S3.accessKeyId,
        region: config.S3.region
    })


    const s3 = new aws.S3()

    module.upload = multer({
        fileFilter: fileFilter,
        storage: multerS3({
            s3: s3,
            bucket: bucket,
            acl: 'public-read',
            // metadata: function (req, file, cb) {
            //     cb(null, {fieldName: file.fieldName})
            // },
            key: function (req, file, cb) {
                cb(null, Date.now().toString())
            }
        })
    })
    return module;
}
