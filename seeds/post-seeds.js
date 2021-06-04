const { Post } = require('../models');

const postData = [{
        title: 'Workplace Rules and Regulation',
        content: 'Maintain punctuality, Follow rules, Know Operating Procedures, Know dress code...'

    },
    {
        title: 'Summer Capms',
        content: 'I will take my kids to summer camps this year',
        user_id: 2
    },
    {
        title: 'Celebtrating our Final Graduation',
        content: 'when we finished our courses we will celebrate our graduation',
        user_id: 3
    },
    {
        title: "I miss socializing",
        content: "COVID-19 missing up our way of life...",
        user_id: 4
    }
];

const seedPosts = () => Post.bulkCreate(postData, {individualHooks: true});

module.exports = seedPosts;

// const seedPosts = () => {
//     postData.forEach(item=> {
//         Post.create({
//             title: item.title,
//             content: item.content,
//             user_id: item.user_id,
//          })
//     })
// }
// module.exports = seedPosts;