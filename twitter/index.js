
import { tweets } from './tweets.js';
const https = require('https');

tweets.forEach(tweet => {

    const options = {
        host: 'http://localhost:1337',
        path: '/api/tweets',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    };



    const body = {

    }

    // http://localhost:1337/api/tweets
/*
    retweeted
source
entities
favorite_count
in_reply_to_status_id_str
id_str
in_reply_to_user_id
truncated
retweet_count
tweet_id
in_reply_to_status_id
tweet_created_at
favorited
full_text
in_reply_to_screen_name
in_reply_to_user_id_str
*/

fetch('http://localhost:1337/api/tweets', {
    method: 'POST',
    body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
})
.then((response) => response.json())
.then((json) => console.log(json))
.catch(error => {
    console.log(error)
});

    console.log(tweet.tweet.entities.media);
});
