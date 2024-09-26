import { blogPosts } from './blogposts.js'

const formatCreatedAtDate = createdAt => {
    let date = new Date(createdAt);
    return date.toISOString();
};

// loop through each tweet and post a new entry to strapi

console.log(`\n---------------------------------`);
console.log(`Importing ${blogPosts.length} blog posts...`);
console.log(`--------------------------------\n`);

for (const blogPost of blogPosts) {

    console.log(`Importing blog post with ID ${blogPost.id}`);

    const body = {
        title: blogPost.title,
        body: blogPost.body,
        post_url: blogPost.post_url,
        data_created: blogPost.data_created,
        short_url: blogPost.short_url,
        summary: blogPost.summary,
        tumblr_id: blogPost.tumblr_id,
        post_type: blogPost.post_type,
        format: blogPost.format,
        caption: blogPost.caption,
        reblog: blogPost.reblog,
        trail: blogPost.trail,
        image_permalink: blogPost.image_permalink,
        photos: blogPost.photos,
    };

    const response = await fetch('http://localhost:1337/api/tumblr-posts', {
        method: 'POST',
        body: JSON.stringify({
            data: body
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    });

    const post = await response.json();

    console.log(post);
}

console.log(`\n---------------------------------`);
console.log(`Import Complete!`);
console.log(`---------------------------------\n`);