import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/post.js';
import Comment from '../models/comment.js';

const router = express.Router();

const validatePost = (post) => {

    if (post.title.length < 3 || post.title.length > 50 || post.message.length < 50 || post.title.length > 500 || post.tags.length < 1 || post.tags.length > 314)
        return false;

    if (post.tags.length < 1 || post.tags.length > 15) {
        return false;
    }

    for (let i = 0; i < post.tags.length; i++) {
        if (post.tags[i].trim().length === 0) {
            return false;
        }
    }

    return true;
}

export const getPosts = async (req, res) => {
    const now = Date.now();
    const { page } = req.query;

    const LIMIT = 8; // limit number of posts
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    try {
        const total = await Post.countDocuments({});
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        const numberOfPages = Math.ceil(total / LIMIT);

        const later = Date.now()
        console.log(Math.abs(later - now))
        return res.status(200).json({ posts, currentPage: Number(page), numberOfPages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const getRecommendedPosts = async (req, res) => {
    const { id } = req.params;

    const LIMIT = 8;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `Post: ${id} not found` });

        const post = await Post.findById(id, { creator: 1 });

        if (!post) return res.status(404).json({ error: `Post: ${id} not found` });

        const posts = await Post.find({ $and: [{ creator: post.creator }, { _id: { $nin: [post._id] } }] }).sort({ _id: -1 }).limit(LIMIT);

        return res.status(200).json({ recommendedPosts: posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export const getPostInfo = async (req, res) => {
    const now = Date.now();
    const { id } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `Post: ${id} not found` });

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ error: `Post: ${id} not found` });

        const later = Date.now()
        console.log(Math.abs(later - now))
        return res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { search, tags, page } = req.query;

    const LIMIT = 8; // limit number of posts
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const title = new RegExp(search, "i");

    try {
        if (search.length === 0 && tags.length === 0)
            return res.status(200).json({ searchPosts: [], currentPage: Number(page), numberOfPages: 1 });

        if (search.length === 0) {
            const total = await Post.countDocuments({ tags: { $in: tags.split(',') } });
            const posts = await Post.find({ tags: { $in: tags.split(',') } }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
            const numberOfPages = Math.ceil(total / LIMIT);
            return res.status(200).json({ searchPosts: posts, currentPage: Number(page), numberOfPages });
        }

        if (tags.length === 0) {
            const total = await Post.countDocuments({ title });
            const posts = await Post.find({ title }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
            const numberOfPages = Math.ceil(total / LIMIT);
            return res.status(200).json({ searchPosts: posts, currentPage: Number(page), numberOfPages });
        }

        const total = await Post.countDocuments({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        const numberOfPages = Math.ceil(total / LIMIT);
        return res.status(200).json({ searchPosts: posts, currentPage: Number(page), numberOfPages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    const { id } = req.params;
    const { page } = req.query;

    const LIMIT = 8; // limit number of posts
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    try {
        // retrieve posts
        const total = await Post.countDocuments({ creator: id });
        const posts = await Post.find({ creator: id }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        const numberOfPages = Math.ceil(total / LIMIT);
        return res.status(200).json({ userPosts: posts, currentPage: Number(page), numberOfPages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment, username } = req.body;

    try {

        if (mongoose.Types.ObjectId.isValid(id)) {

            const existingPost = await Post.findById(id, { _id: 1 });

            if (!existingPost) return res.status(404).json({ error: `Post: ${id} not found` });

            const data = await Comment.create({ comment, username, creator: req.userId, postId: id });
            return res.status(200).json({ data });
        }

        return res.status(404).json({ error: `Cannot post comment` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export const getPostComments = async (req, res) => {
    const { id } = req.params;
    const { numOfDisplayedComments } = req.query;

    const LIMIT = 16;
    const startIndex = Number(numOfDisplayedComments);

    try {

        if (mongoose.Types.ObjectId.isValid(id)) {

            const total = await Comment.countDocuments({ postId: id });
            const comments = await Comment.find({ postId: id }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            const newNumOfDisplayedComments = Number(numOfDisplayedComments) + comments.length > total ? total : Number(numOfDisplayedComments) + comments.length;
            const newRemainingComments = total - (Number(numOfDisplayedComments) + comments.length) < 0 ? 0 : total - (Number(numOfDisplayedComments) + comments.length);

            return res.status(200).json({ comments, numOfDisplayedComments: newNumOfDisplayedComments, remainingComments: newRemainingComments });
        }

        return res.status(404).json({ error: `Cannot get comments` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, tags, selectedFile, username } = req.body;

    try {
        const post = {
            username: username,
            title: title.trim(),
            message: message.trim(),
            tags: tags.replace(/\s/g, '').split(','),
            selectedFile: selectedFile.trim(),
            creator: req.userId
        }

        if (!validatePost(post)) return res.status(400).json({ error: "Check post requirements" });

        const data = await Post.create(post);

        return res.status(200).json({ data, message: "Post created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const updatePost = async (req, res) => {
    const { title, tags, message, selectedFile } = req.body;
    const { id } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `Post: ${id} not found` });

        const existingPost = await Post.findById({ _id: id }, { creator: 1, selectedFile: 1, _id: 0 });

        if (!existingPost) return res.status(404).json({ error: `Post: ${id} not found` });

        if (String(req.userId) !== String(existingPost.creator)) return res.status(403).json({ error: "Forbidden" });

        const updatedPost = {
            title: title.trim(),
            tags: tags.replace(/\s/g, '').split(','),
            message: message.trim(),
            selectedFile: selectedFile ? selectedFile.trim() : existingPost.selectedFile,
        }

        if (!validatePost(updatedPost)) return res.status(404).json({ error: "Post does not meet post requirements" });

        const data = await Post.findByIdAndUpdate(id, updatedPost);

        return res.status(200).json({ data, message: "Post updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `Post: ${id} not found` });

        const existingPost = await Post.findById(id, { creator: 1, _id: 0 });

        if (!existingPost) return res.status(404).json({ error: `Post: ${id} not found` });

        if (String(req.userId) !== String(existingPost.creator)) return res.status(403).json({ error: "Forbidden" });

        await Post.findByIdAndDelete(id);
        await Comment.deleteMany({ postId: id });

        return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `Post: ${id} not found` });

        const post = await Post.findById(id, { likes: 1, _id: 0 });

        if (!post) return res.status(404).json({ error: `Post: ${id} not found` });

        const index = post.likes.findIndex((id) => id === String(req.userId));

        console.log(index)
        if (index === -1)
            post.likes.push(req.userId);
        else
            post.likes = post.likes.filter((id) => id !== String(req.userId));

        const data = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true }).select({ likes: 1, _id: 0 });

        console.log(data)
        return res.status(200).json({ data: data.likes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

export default router;