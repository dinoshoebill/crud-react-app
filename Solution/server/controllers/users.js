import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js'

const router = express.Router();

dotenv.config();

const validatePassword = (password) => {
    if (password.length < 10 || password.length > 50)
        return false;
    else
        return true;
}

const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const validateUsername = (username) => {
    if (username.length < 2 || username.length > 30)
        return false;
    else
        return true;
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }, { email: 1, password: 1, username: 1 });

        if (!user) return res.status(404).send({ error: `No user with email: ${email}` });

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        return res.status(200).json({ result: { _id: user._id, username: user.username }, token, message: "You successfully logged in" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {

        if (!validateUsername(username)) return res.status(400).json({ error: "Check username requirements" });

        const existingUsername = await User.findOne({ username }, { username: 1, _id: 0 });

        if (existingUsername) return res.status(400).json({ error: `Username ${username} is already taken` });

        if (!validateEmail(email)) return res.status(400).json({ error: `Email ${email} not valid` });

        const existingEmail = await User.findOne({ email }, { email: 1, _id: 0 });

        if (existingEmail) return res.status(400).json({ error: `Email ${email} is already taken` });

        if (!validatePassword(password)) return res.status(400).json({ error: "Check password requirements" });

        if (password !== repeatPassword) return res.status(400).json({ error: "Passwords do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const data = await User.create({ email, password: hashedPassword, username: username });

        const token = jwt.sign({ email: data.email, id: data._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        return res.status(200).json({ result: { _id: data._id, username: data.username }, token, message: "You successfully signed up" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const getUserInfo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ error: `No user with id: ${id}` });

        if (String(id) !== String(req.userId)) return res.status(403).json({ error: `Forbidden` });

        const user = await User.findOne({ _id: req.userId })

        return res.status(200).json({ userInfo: { _id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

// check if req.userId is null instea of new funciton?
export const getUserInfoNoAuth = async (req, res) => {
    const { id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await User.findOne({ _id: id });

            if (user) return res.status(200).json({ userInfo: { username: user.username } });

            const userPost = await Post.findOne({ creator: id });

            if (userPost) return res.status(200).json({ userInfo: { username: userPost.username } });
        } else {
            const userPost = await Post.findOne({ creator: id });

            if (userPost) return res.status(200).json({ userInfo: { username: userPost.username } });

            const userComment = await Comment.findOne({ creator: id })

            if (userComment) return res.status(200).json({ userInfo: { username: userComment.username } });
        }

        return res.status(404).send({ error: `No user with id: ${id}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ error: `No user with id: ${id}` });

        if (String(id) !== String(req.userId)) return res.status(403).json({ error: `Forbidden` });

        await User.findByIdAndDelete(req.userId);
        await Comment.updateMany({ creator: req.userId }, { username: "[deleted]" });
        await Post.updateMany({ creator: req.userId }, { username: "[deleted]" });

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const updateUser = async (req, res) => {
    const { password, repeatPassword, username } = req.body;
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ error: `No user with id: ${id}` });

        if (String(id) !== String(req.userId)) return res.status(403).json({ error: `Forbidden` });

        const user = await User.findOne({ _id: req.userId });

        if (!username.length && !password.length && !repeatPassword.length) return res.status(400).json({ error: "Nothing to update" });

        if (password.length || repeatPassword.length) {
            if (!validatePassword(password)) return res.status(400).json({ error: "Password must contain at least 10 characters" });

            if (password !== repeatPassword) return res.status(400).json({ error: "Passwords do not match" });

            const hashedPassword = await bcrypt.hash(password, 12);

            user.password = hashedPassword;
        }

        if (username.length) {
            if (!validateUsername(username)) return res.status(400).json({ error: "Username must contain at least 2 characters" });

            const existingUsername = await User.findOne({ username });

            if (existingUsername) return res.status(400).json({ error: `Username ${username} is already taken` });

            user.username = username;

            await Comment.updateMany({ creator: req.userId }, { username: username });
            await Post.updateMany({ creator: req.userId }, { username: username });
        }

        await User.findByIdAndUpdate(id, user);

        return res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export default router;