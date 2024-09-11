"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BlogPage() {

  const [posts, setPosts] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [postsOffset, setPostsOffset] = useState(1);
  const [repliesOffset, setRepliesOffset] = useState(1);

  const formatDate = dateString => {
    let date = new Date(dateString);

    const mediumTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    });

    return mediumTime.format(date);
  };

  const fetchMorePosts = () => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tweets?filters[is_reply][$eq]=false&pagination[page]=${postsOffset}&sort=tweet_created_at:desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {

        if (response.meta.pagination.page > 1) {
          setPosts((currentPosts) => [...currentPosts, ...response.data]);
        }

        setHasMorePosts(false);
        setLoading(false);

        if (response.meta.pagination.page < response.meta.pagination.pageSize) {
          setHasMorePosts(true);
          setPostsOffset(response.meta.pagination.page + 1);
        }
      });
  };

  const fetchMoreReplies = () => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/tweets?filters[is_reply][$eq]=true&sort=tweet_created_at:desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setReplies(response.data);
        setLoading(false);
        setHasMoreReplies(false);

        if (response.meta.pagination.page < response.meta.pagination.pageSize) {
          setHasMoreReplies(true);
          setRepliesOffset(response.meta.pagination.page + 1);
        }
      });
  };
 
  useEffect(() => {
    fetchMorePosts();
    // fetchMoreReplies();
  }, []);

  return (
    <div>
      <Tabs aria-label="Posts">
        <Tab key="posts" title="Posts">
          {isLoading &&
            <div className="my-6">
              <Spinner color="default" />
            </div>
          }

          <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMorePosts}
                loader={<Spinner color="default" />}
              >
              {posts.map(post => (
                <div key={post.id} className="mb-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between w-full">
                        <div className="flex gap-5 justify-between">
                          <Avatar isBordered radius="full" size="md" src="https://pbs.twimg.com/profile_images/1706195482/n12108490_39723495_4373.jpg" />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Joe Fearnley</h4>
                            <h5 className="text-small tracking-tight text-default-400">@joefearnley</h5>
                          </div>
                        </div>
                        <div className="text-small tracking-tight text-default-600">{formatDate(post.attributes.tweet_created_at)}</div>
                      </div>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-600">
                      <p>{post.attributes.full_text}</p>
                      {post.attributes.entities &&
                        post.attributes.entities.media &&
                        post.attributes.entities.media.map((mediaItem, i) => (
                          <div key={i} className="media-item my-4">
                            <Image
                              height={mediaItem.sizes.small.h}
                              width={mediaItem.sizes.small.w}
                              alt={post.attributes.full_text}
                              src={mediaItem.media_url_https}
                            />
                          </div>
                        ))}
                      <div className="flex gap-2">
                      {post.attributes.entities && post.attributes.entities.hashtags.map((hashtag, i) => (
                        <span key={i} className="pt-2 text-default-400">
                          <a href={`https://twitter.com/hashtag/${hashtag.text}?src=hashtag_click`} target="_blank">#{hashtag.text}</a>
                        </span>
                      ))}
                      </div>
                    </CardBody>
                    <CardFooter className="gap-4">
                      <div className="flex gap-1 items-center">
                        <p className=" text-default-400 text-small">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                        </p>
                        <p className="text-default-400 text-small">{post.attributes.retweet_count}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <p className="text-default-400 text-small">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                        </p>
                        <p className="text-default-400 text-small">{post.attributes.favorite_count}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </InfiniteScroll>
        </Tab>
        <Tab key="replies" title="Replies">
          {isLoading &&
            <div className="my-6">
              <Spinner color="default" />
            </div>
          }

            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreReplies}
              hasMore={hasMoreReplies}
              loader={<Spinner color="default" />}
            >
            {replies.map(post => (
            <div key={post.id} className="mb-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between w-full">
                    <div className="flex gap-5 justify-between">
                      <Avatar isBordered radius="full" size="md" src="https://pbs.twimg.com/profile_images/1706195482/n12108490_39723495_4373.jpg" />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Joe Fearnley</h4>
                        <h5 className="text-small tracking-tight text-default-400">@joefearnley</h5>
                      </div>
                    </div>
                    <div className="text-small tracking-tight text-default-600">{formatDate(post.attributes.tweet_created_at)}</div>
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-600">
                  <p>{post.attributes.full_text}</p>
                  {post.attributes.entities && 
                    post.attributes.entities.media && 
                    post.attributes.entities.media.map((mediaItem, i) => (
                      <div key={i} className="media-item my-4">
                        <Image
                          height={mediaItem.sizes.small.h}
                          width={mediaItem.sizes.small.w}
                          alt={post.attributes.full_text}
                          src={mediaItem.media_url_https}
                        />
                      </div>
                    ))}
                  <div className="flex gap-2">
                  {post.attributes.entities && post.attributes.entities.hashtags.map((hashtag, i) => (
                    <span key={i} className="pt-2 text-default-400">
                      <a href={`https://twitter.com/hashtag/${hashtag.text}?src=hashtag_click`} target="_blank">#{hashtag.text}</a>
                    </span>
                  ))}
                  </div>
                </CardBody>
                <CardFooter className="gap-4">
                  <div className="flex gap-1 items-center">
                    <p className=" text-default-400 text-small">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </p>
                    <p className="text-default-400 text-small">{post.attributes.retweet_count}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-default-400 text-small">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </p>
                    <p className="text-default-400 text-small">{post.attributes.favorite_count}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
            ))}
            </InfiniteScroll>
        </Tab>
      </Tabs>
    </div>
  );
}
