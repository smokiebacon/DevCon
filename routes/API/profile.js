const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const Profile = require("../../models/Profile");
const Auth = require("../../models/Auth");

//GET /api/profile/test
// @desc tests auth route
//@access is public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works"
  })
);

//GET /api/profile/ instead of :id, can get JWT token to uniquely identiy user
// @desc get current user profile
//@access is private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const errors = {};
    try {
      const foundProfile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name']);
      console.log(foundProfile,'THIS IS FOUND PROFILE FROM PROFILE.JS')
      res.json(foundProfile);
      if (!foundProfile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
    } catch (err) {
      res.status(404).json(err);
    }
  }
);
//GET /api/profile/all
// @desc Get all profiles
//@access is public
router.get("/all", async (req, res) => {
  const errors = {};
  try {
    const allUsers = await Profile.find({}).populate("user", ["name"]);
    if (!allUsers) {
      errors.noprofile = "No profiles to display";
      return res.status(404).json(errors);
    }
    res.json(allUsers);
  } catch (errs) {
    res.status(404).json({
      profile: "There are no profiles"
    });
  }
});

//GET /api/profile/handle/:id
// @desc Get Profile by handle
//@access is public
router.get("/handle/:handle", async (req, res) => {
  const errors = {};
  try {
    const foundHandle = await Profile.findOne({
      handle: req.params.handle
    }).populate("user", ["name"]);
    if (!foundHandle) {
      errors.noprofile = "There is no profile for this user";
      res.status(404).json(errors);
    }
    res.json(foundHandle);
  } catch (errs) {
    res.status(404).json(errs);
  }
});

//GET /api/profile/user/:user_id
// @desc Get Profile by user ID
//@access is public
router.get("/user/:user_id", async (req, res) => {
  const errors = {};
  try {
    const foundHandle = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);
    if (!foundHandle) {
      errors.noprofile = "There is no profile for this user";
      res.status(404).json(errors);
    }
    res.json(foundHandle);
  } catch (errs) {
    res.status(404).json({
      profile: "There is no profile for this user"
    });
  }
});

//GET /api/profile/
// @desc CREATE user profile
//@access is Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills, split into arrays b/c coming in as comma separated values
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
      const foundUser = await Profile.findOne({
        user: req.user.id
      }).populate("user", "name");

      if (foundUser) {
        //find and update
        await Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        );
        console.log(foundUser);
        res.json(foundUser);
      } else {
        //create
        //check if handle exists
        await Profile.findOne({
          handle: profileFields.handle
        });
        if (foundUser) {
          errors.handle = "Handle already exists";
          res.status(400).json(errors);
        }

        await new Profile(profileFields).save();
        res.json(foundUser);
      }
    } catch (err) {
      res.json(err);
    }
  }
);

//GET /api/profile/experience
// @desc Add Experience to Profile
//@access is Private
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(404).json(errors);
    }
    const foundProfile = await Profile.findOne({
      user: req.user.id
    });
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    foundProfile.education.unshift(newEdu);
    foundProfile.save();
    res.json(foundProfile);
  }
);

// @route   DELETE api/profile/EXPERIENCE/:exp_id
// @desc    Delete experience to profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    try {
      const deleteExperience = await Profile.findOne({ user: req.user.id });
      const removeIndex = deleteExperience.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      deleteExperience.experience.splice(removeIndex, 1);
      deleteExperience.save();
      res.json(deleteExperience);
    } catch (errors) {
      res.status(404).json(errors);
    }
  }
);

// @route   DELETE api/profile/EDUCATION/:edu_id
// @desc    Delete EDUCATION from profile
// @access  Private
router.delete(
  "/education/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    try {
      const deleteEdu = await Profile.findOne({ user: req.user.id });
      const removeIndex = deleteEdu.education
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      deleteEdu.education.splice(removeIndex, 1);
      deleteEdu.save();
      res.json(deleteEdu);
    } catch (errors) {
      res.status(404).json(errors);
    }
  }
);

// @route   DELETE api/profile/education
// @desc    Deletes both USER and PROFILE
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    try {
      const deleteProfile = await Profile.findOneAndRemove({
        user: req.user.id
      });
      const deleteUser = await Auth.findOneAndRemove({ _id: req.user.id });
      console.log(deleteProfile, "PROFILE DEL");
      console.log(deleteUser, "USER DELETED");
      res.json({ success: true });
    } catch (errors) {
      res.json(errors);
    }
  }
);

module.exports = router;
