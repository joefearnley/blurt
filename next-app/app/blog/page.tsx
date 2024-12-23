"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import { Pagination } from "@nextui-org/pagination";
import { redirect } from 'next/navigation';
import { isAuthenticated } from "../../utils/Auth";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [postsOffset, setPostsOffset] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = dateString => {
    let date = new Date(dateString);

    const mediumTime = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    });

    return mediumTime.format(date);
  };

  const fetchPosts = () => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tumblr-posts?&pagination[page]=${postsOffset}&pagination[pageSize]=30&sort=date_created:desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setPosts(response.data);
        setTotalPages(response.meta.pagination.pageCount);
        setCurrentPage(response.meta.pagination.page);
        setPostsOffset(response.meta.pagination.page < response.meta.pagination.pageSize ? response.meta.pagination.page + 1 : postsOffset);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
  };
 
  useEffect(() => {
    fetchPosts();

    const authenticated = isAuthenticated();
    if (!authenticated) {
      redirect('/');
    }
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
                <div className="text-small tracking-tight text-default-600">{formatDate(post.date_created)}</div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-600">
              <h2 className="text-2xl mb-3">
              {post.post_type === 'link' ? (
                  <div>
                    <a href={post.link_url} className="underline flex" target="_blank">
                      <span className="mr-4">{post.summary}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <div>
                    {post.summary}
                  </div>
                )}
                </h2>
              <div className="blog-body">
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
                
                {post.post_type === 'photo' && (
                  <div className="my-4 flex flex-wrap gap-4">
                    {post.photos.map((photo, i) => (
                      <div key={i} className="">
                        <Image
                            alt={post.summary}
                            src={photo.original_size.url}
                          />
                      </div>
                    ))}

                  </div>
                )}

                {post.post_type === 'video' && post.player[1].embed_code !== false && (
                  <div dangerouslySetInnerHTML={{ __html: post.player[1].embed_code }} />
                )}
              </div>
            </CardBody>
            <CardFooter className="gap-4">
              <div className="flex gap-2 items-center">
                {post.tags && post.tags.split(',').map((hashtag, i) => (
                  <span key={i} className="pt-2 text-default-400">
                    <a href={`/tagged/${hashtag}`} target="_blank">#{hashtag}</a>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}

      <Pagination 
        total={totalPages}
        color={'default'}
        initialPage={1}
        page={currentPage} 
        showControls={true}
        onChange={fetchPosts} />
    </div>
  );
}
