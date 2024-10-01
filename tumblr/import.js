import { blogPosts } from './blogposts.js'

const formatCreatedAtDate = createdAt => {
    let date = new Date(createdAt);
    return date.toISOString();
};

const truncatePosts = async () => {
    let allPosts = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        let url = `http://localhost:1337/api/tumblr-posts?pagination[page]=${currentPage}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });

        const jsonResponse = await response.json();
        const pageData = jsonResponse.data;

        if (!pageData) {
            break;
        }

        allPosts = [...allPosts, ...pageData];

        hasNextPage = currentPage < jsonResponse.meta.pagination.pageCount;
        currentPage++;
    }

    console.log(`\n---------------------------------`);
    console.log(`Deleting ${allPosts.length} tumblr posts from Strapi...`);
    console.log(`--------------------------------\n`);

    for (const post of allPosts) {
        console.log(`Deleting blog post with ID ${post.id}`);
        await fetch(`http://localhost:1337/api/tumblr-posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });
    }
};

const importPosts = async () => {
    for (const blogPost of blogPosts) {

        console.log(`Importing blog post with ID ${blogPost.id}`);
    
        const body = {
            title: blogPost.title,
            body: blogPost.body,
            post_url: blogPost.post_url,
            date_created: formatCreatedAtDate(blogPost.date),
            short_url: blogPost.short_url,
            summary: blogPost.summary,
            slug: blogPost.slug,
            tumblr_id: blogPost.id,
            post_type: blogPost.type,
            format: blogPost.format,
            caption: blogPost.caption,
            reblog: blogPost.reblog,
            trail: blogPost.trail,
            image_permalink: blogPost.image_permalink,
            photos: blogPost.photos,
            timestamp: blogPost.timestamp,
            tags: blogPost.tags.join(','),
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
    
        console.log(`strapi tumblr post ID: ${post.data.id}`);
    }
}


(async() => {
    // delete any posts that are there already....
    console.log(`\n---------------------------------`);
    console.log(`Deleting tumblr posts from Strapi...`);
    console.log(`--------------------------------\n`);
    truncatePosts();

    // loop through each tumblr post and post a new entry to strapi
    console.log(`\n---------------------------------`);
    console.log(`Importing ${blogPosts.length} blog posts...`);
    console.log(`--------------------------------\n`);
    importPosts();

    console.log(`\n---------------------------------`);
    console.log(`Import Complete!`);
    console.log(`---------------------------------\n`);
})();