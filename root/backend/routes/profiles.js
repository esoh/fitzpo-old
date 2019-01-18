const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const profilePictureUpload = require('../services/s3-file-upload')('gymmate-profile-pictures');
const coverPhotoUpload = require('../services/s3-file-upload')('gymmate-cover-photos');

const singleProfileUpload = profilePictureUpload.upload.single('image'); // key is 'image'
const singleCoverUpload = coverPhotoUpload.upload.single('cover-image');

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
                    console.log("Could not save to db")
                    return ( res.json({success: false, msg: 'Could not save to db'}))
                } else {
                    console.log("Successfully saved to db\nError: " + err)
                    return ( res.json({success: true, msg: 'Successfully saved to db'}))
                }
            })
        }
    })
})

// upadate profile picture
router.post('/profile-pictures/:username', (req, res) => {
    singleProfileUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        Profile.findOne({username: req.params.username}, (err, profile) => {
            console.log(profile)
            if (!profile) {
                return res.json({success: false, msg: 'User not found'})
            } else {
                profile.img = req.file.location
                profile.save(err => {
                    if (err) {
                        console.log("Could not save to db")
                        return( res.json({success: false, msg: 'Could not save to db'}))
                    } else {
                        console.log("Successfully saved pic to db")
                        return( res.json({success: true, msg: 'Successfully saved to db'}))
                    }
                })
            }
        })
        //return res.json({'imageUrl': req.file.location});
    });
});

router.post('/cover-photos/:username', (req, res) => {
    singleCoverUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        Profile.findOne({username: req.params.username}, (err, profile) => {
            console.log(profile)
            if (!profile) {
                return res.json({success: false, msg: 'User not found'})
            } else {
                profile.coverPhoto = req.file.location
                profile.save(err => {
                    if (err) {
                        console.log("Could not save to db")
                        return( res.json({success: false, msg: 'Could not save to db'}))
                    } else {
                        console.log("Successfully saved pic to db")
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
