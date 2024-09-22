const fs = require('node:fs');
// const HTMLParser = require('node-html-parser');
// const minify = require('html-minifier').minify;

// const directory_name = './html';

// const filenames = fs.readdirSync(directory_name); 

// filenames.forEach((file) => {

//     console.log(file);

//     const fileString = fs.readFileSync(`${directory_name}/${file}`, 'utf8');

//     root = HTMLParser.parse(fileString);

//     console.log(file);
//     console.log(fileString);
//     console.log(root);

//     const bodyHTML = root.querySelector('body');

//     var result = minify(bodyHTML, {
//         removeAttributeQuotes: true
//       });

//     console.log(result);

// });


const tumblr = require('tumblr.js');
const client = tumblr.createClient({
  consumer_key: process.env.TUMBLR_API_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_API_CONSUMER_SECRET,
  token: process.env.TUMBLR_API_TOKEN,
  token_secret: process.env.TUMBLR_API_TOKEN_SECRET
});

(async() => {
    const response = await client.blogPosts('joefearnley');

    console.log(JSON.stringify(response.posts.length));

    // fs.writeFileSync('response.txt', JSON.stringify(response));
})();


// const response = JSON.parse(fs.readFileSync(`response.json`, 'utf8'));

// console.log(response.posts.length);
