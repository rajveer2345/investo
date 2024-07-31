const User = require('../schema/userSchema');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rajveershekhar.singh@gmail.com',
    pass: 'qkbldjatxrfwdpwu',
  },
});


exports.signup = async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log("signup running", req.body)

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    let password = req.body.password;
    password = await bcrypt.hash(password, 12)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user = new User({ name, email, password, verificationToken });

    await user.save();
    console.log("user saved")

    const verificationLink = `${process.env.VERIFY_URL}${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    });

    res.status(201).json({ message: 'User created. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err}` });
    console.log("Error: ", err)
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(200).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(200).json({ message: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(200).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.status(200).json({ message: 'success', token: token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.isExist = async (req, res) => {

  try {

    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ message: false });
    }

    const userExists = await User.findById(userId).exec();

    if (userExists) {
      res.status(200).json({ message: true });
    } else {
      res.status(200).json({ message: false });
    }
  } catch (err) {
    console.error('Error checking user existence:', err);
    res.status(500).json({ message: 'Server error' });
  }

}

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(200).json({ message: false });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getUserData = async (req, res) => {
  console.log('started')
  try {
    const userId = req.user.id; // ID from the verified JWT token
    console.log('userid: ', userId)
    const user = await User.findById(userId).select('-password -verificationToken'); // Exclude sensitive data

    if (!user) return res.status(200).json({ message: 'User not found' });

    res.status(200).json({
      message: 'success',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      }

    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }


}
