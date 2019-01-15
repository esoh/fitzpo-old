const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

// custom file filter middleware to ensure only jpg and png files are submitted
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false)
    }
}

// setting up aws connection with appropriate keys and region
aws.config.update({
    secretAccessKey: 'G0p7/R3ZZe0yC0xmUvlfZ3V+DnRUGMAsy54xWSYB',
    accessKeyId: 'AKIAJ2OTWUCIADAQHTSA',
    region: 'us-east-1'
})


const s3 = new aws.S3()

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'gymmate-profile-pictures',
        acl: 'public-read',
        // metadata: function (req, file, cb) {
        //     cb(null, {fieldName: file.fieldName})
        // },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload
