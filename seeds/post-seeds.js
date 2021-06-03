const { Post } = require('../models');

const postData = [{
        title: 'Lorem Ipsum I',
        content: 'Lorem ipsum dolor sit amet eet nbbil.',
        user_id: 1

    },
    {
        title: 'Lorem Ipsum II',
        content: 'Amet aliquam id diam maecenas',
        user_id: 2
    },
    {
        title: 'Lorem Ipsum III',
        content: 'Ut etiam sit amet nisl purus.',
        user_id: 3
    },
    {
        title: "I miss socializing",
        content: "I got into tech for a better life.",
        user_id: 4
    }
];

// const seedPosts = () => Post.bulkCreate(postData);

// module.exports = seedPosts;

const seedPosts = () => {
    postData.forEach(item=> {
        Post.create({
            title: item.title,
            content: item.content,
            user_id: item.user_id,
         })
    })
}
module.exports = seedPosts;