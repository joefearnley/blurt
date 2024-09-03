import { tweets } from './tweets.js';

const formatCreatedAtDate = createdAt => {
    let date = new Date(createdAt);
    return date.toISOString();
};

// loop through each tweet and post a new entry to strapi

for (const tweet of tweets) {
    const tweetData = tweet.tweet;

    const body = {
        retweeted: tweetData.retweeted,
        source: tweetData.source,
        entities: tweetData.entities,
        favorite_count: tweetData.favorite_count,
        tweet_id: tweetData.id,
        id_str: tweetData.id_str,
        in_reply_to_status_id_str: (typeof in_reply_to_status_id_str === 'undefined') ? null: tweetData.in_reply_to_status_id_str,
        in_reply_to_status_id: (typeof tweetData.in_reply_to_status_id === 'undefined') ? null: tweetData.in_reply_to_status_id,
        is_reply: (typeof tweetData.in_reply_to_user_id === 'undefined') ? false: true,
        in_reply_to_user_id: (typeof tweetData.in_reply_to_user_id === 'undefined') ? null: tweetData.in_reply_to_user_id,
        in_reply_to_screen_name: (typeof tweetData.in_reply_to_screen_name === 'undefined') ? null: tweetData.in_reply_to_screen_name,
        in_reply_to_user_id_str: (typeof tweetData.in_reply_to_user_id_str === 'undefined') ? null: tweetData.in_reply_to_user_id_str,
        truncated: tweetData.truncated,
        retweet_count: tweetData.retweet_count,
        tweet_created_at: formatCreatedAtDate(tweetData.created_at),
        favorited: tweetData.favorited,
        full_text: tweetData.full_text,
    };

    const response = await fetch('http://localhost:1337/api/tweets', {
        method: 'POST',
        body: JSON.stringify({
            data: body
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    });

    const post = await response.json();

    console.log(post.data.id);
}
