import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    creator: { type: String, required: true },
    postId: { type: String, required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Comment = mongoose.model('Comments', commentSchema);

export default Comment;