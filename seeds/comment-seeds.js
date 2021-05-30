const { Comment } = require('../models');

const commentData = [{
        comment_text: "Lorem ipsum dolor sit amet",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "consectetur adipiscing elit",
        user_id: 2,
        post_id: 4
    },
    {
        comment_text: "I don't even know if I want to code anymore",
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: "Don't let yourself get burnt out",
        user_id: 4,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;