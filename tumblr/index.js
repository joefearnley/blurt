const fs = require('node:fs');
const tumblr = require('tumblr.js');

const getPostsFromApi = async () => {
    const client = tumblr.createClient({
        consumer_key: process.env.TUMBLR_API_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_API_CONSUMER_SECRET,
        token: process.env.TUMBLR_API_TOKEN,
        token_secret: process.env.TUMBLR_API_TOKEN_SECRET
      });

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

      return posts;
};


(async() => {

    const posts = getPostsFromApi();

    console.log(`total posts: ${posts.length}`);
  
    fs.writeFileSync('blogposts.json', JSON.stringify(posts));

})();


const blogPosts = JSON.parse(fs.readFileSync(`blogposts.json`, 'utf8'));

console.log(blogPosts.length);

// import posts into Strapi
