const fs = require('node:fs');
const HTMLParser = require('node-html-parser');
const minify = require('html-minifier').minify;
const tumblr = require('tumblr.js');

const client = tumblr.createClient({
  consumer_key: process.env.TUMBLR_API_CONSUMER_KEY,
  consumer_secret: process.env.TUMBLR_API_CONSUMER_SECRET,
  token: process.env.TUMBLR_API_TOKEN,
  token_secret: process.env.TUMBLR_API_TOKEN_SECRET
});

(async() => {

    let posts = [];
    let response = null;

    for(let i = 1; i < 300; i = i + 50) {
        response = await client.blogPosts('joefearnley', {
            offset: i,
            limit: 50,
        });

        console.log(`adding ${response.posts.length} posts`);
        console.log(``);

        posts.push(...response.posts);
    }

    console.log(`total posts: ${posts.length}`);

    fs.writeFileSync('blogposts.json', JSON.stringify(posts));

})();


const posts = JSON.parse(fs.readFileSync(`blogposts.json`, 'utf8'));

console.log(posts.length);

console.log(response.posts.length);


const readAHTMLFiles = () => {
    const directory_name = './html';

    const filenames = fs.readdirSync(directory_name); 

    filenames.forEach((file) => {
        const fileString = fs.readFileSync(`${directory_name}/${file}`, 'utf8');

        root = HTMLParser.parse(fileString);

        const bodyHTML = root.querySelector('body');

        var result = minify(bodyHTML, {
            removeAttributeQuotes: true
        });

        console.log(result);
    });
}