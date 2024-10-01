"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postsOffset, setPostsOffset] = useState(1);

  const formatDate = dateString => {
    let date = new Date(dateString);

    const mediumTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    });

    return mediumTime.format(date);
  };

  const fetchPosts = () => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tumblr-posts?&pagination[page]=${postsOffset}&sort=date_created:desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {

        setPosts(response.data);
        setHasMorePosts(false);
        setLoading(false);

        if (response.meta.pagination.page < response.meta.pagination.pageSize) {
          setHasMorePosts(true);
          setPostsOffset(response.meta.pagination.page + 1);
        }
      });
  };
 
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
    {isLoading &&
      <div className="my-6">
        <Spinner color="default" />
      </div>
      }
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
                <div className="text-small tracking-tight text-default-600">{formatDate(post.attributes.date_created)}</div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-600">
              <h2 className="text-2xl mb-3">{post.attributes.summary}</h2>
              <div className="blog-body">
                <div dangerouslySetInnerHTML={{ __html: post.attributes.body }} />
              </div>
            </CardBody>
            <CardFooter className="gap-4">
              <div className="flex gap-2 items-center">
                {post.attributes.tags && post.attributes.tags.split(',').map((hashtag, i) => (
                  <span key={i} className="pt-2 text-default-400">
                    <a href={`/tagged/${hashtag}`} target="_blank">#{hashtag}</a>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
