'use strict';

/**
 * tumblr-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tumblr-post.tumblr-post');
