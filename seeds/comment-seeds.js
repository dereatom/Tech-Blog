const { Comment } = require('../models');

const commentData = [{
        comment_text: "come and you will learn the spice of life",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "getting cray with spring weather",
        user_id: 2,
        post_id: 4
    },
    {
        comment_text: "I don't even know if i use this app any more",
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: "take it easy, do not mad on crazy comments",
        user_id: 4,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData, {individualHooks: true});

module.exports = seedComments;