import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    username: { type: String, required: true },
    creator: { type: String, required: true },
    tags: { type: [String], required: true },
    selectedFile: {
        type: String,
        default: "data:image/png;base64,",
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Post = mongoose.model('Posts', postSchema);

export default Post;