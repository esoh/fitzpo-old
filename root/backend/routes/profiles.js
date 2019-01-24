const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const profilePictureUpload = require('../services/s3-file-upload')('gymmate-profile-pictures');
const coverPhotoUpload = require('../services/s3-file-upload')('gymmate-cover-photos');
const aws = require('aws-sdk')
const config = require('../config/config')

const singleProfileUpload = profilePictureUpload.upload.single('image'); // key is 'image'
const singleCoverUpload = coverPhotoUpload.upload.single('cover-image');

aws.config.update({
    secretAccessKey: config.S3.secretAccessKey,
    accessKeyId: config.S3.accessKeyId,
    region: config.S3.region
})

const s3 = new aws.S3()

router.get('/:username', (req, res, next) => {
    Profile.findOne({username: req.params.username}, (err, profile) => {
        if (!profile) {
            return res.json({success: false, msge: 'User not found'})
        } else {
            let data = {
                img: profile.img,
                coverPhoto: profile.coverPhoto,
                firstName: profile.firstName,
                lastName: profile.lastName,
                bio: profile.bio,
                age: profile.age,
                height: profile.height,
                weight: profile.weight,
                goals: profile.goals
            }

            return res.json(data)
        }
    })
})

// update profile info
router.put('/', (req, res, next) => {
    Profile.findOne({username: req.body.username}, (err, profile) => {
        if (!profile) {
            return res.json({success: false, msg: 'User not found'})
        } else {
            profile.firstName = req.body.firstName,
            profile.lastName = req.body.lastName,
            profile.bio = req.body.bio,
            profile.age = req.body.age,
            profile.height = req.body.height,
            profile.weight = req.body.weight,
            profile.goals = req.body.goals
            profile.save(err => {
                if (err) {
                    return ( res.json({success: false, msg: 'Could not save to db'}))
                } else {
                    return ( res.json({success: true, msg: 'Successfully saved to db'}))
                }
            })
        }
    })
})

// upadate profile picture
router.post('/profile-pictures/:username/:imgName', (req, res) => {
    singleProfileUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        Profile.findOne({username: req.params.username}, (err, profile) => {
            if (!profile) {
                return res.json({success: false, msg: 'User not found'})
            } else {
                profile.img = req.file.location
                profile.save(err => {
                    if (err) {
                        return( res.json({success: false, msg: 'Could not save to db'}))
                    } else {

                        if (req.params.imgName !== "none") {
                            s3.deleteObject({
                                Bucket: 'gymmate-profile-pictures',
                                Key: req.params.imgName
                            },function (err, data) {
                                if (err) console.log(err, err.stack)
                                else console.log(data)
                            })
                        }

                        return( res.json({success: true, msg: 'Successfully saved to db'}))
                    }
                })
            }
        })
        //return res.json({'imageUrl': req.file.location});
    });
});

router.post('/cover-photos/:username/:imgName', (req, res) => {
    singleCoverUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        Profile.findOne({username: req.params.username}, (err, profile) => {
            if (!profile) {
                return res.json({success: false, msg: 'User not found'})
            } else {
                profile.coverPhoto = req.file.location
                profile.save(err => {
                    if (err) {
                        return( res.json({success: false, msg: 'Could not save to db'}))
                    } else {
                        if (req.params.imgName !== "none") {
                            s3.deleteObject({
                                Bucket: 'gymmate-cover-photos',
                                Key: req.params.imgName
                            },function (err, data) {
                                if (err) console.log(err, err.stack)
                                else console.log(data)
                            })
                        }
                        return( res.json({success: true, msg: 'Successfully saved to db'}))
                    }
                })
            }
        })
        //return res.json({'imageUrl': req.file.location});
    });
});

// router.post('/profile-pictures/:username', upload.single('image'), function (req, res, next) {
//     res.send("Uploaded!");
// });

module.exports = router;
