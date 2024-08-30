
import { tweets } from './tweets.js';

tweets.forEach(tweet => {
    console.log(`--------------------`);
    console.log(tweet.tweet.full_text);
    console.log(tweet.tweet.created_at);
    console.log(`--------------------`);
});
