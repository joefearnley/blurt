"use client";

import { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

export default function BlogPage() {

  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(true);
 
  useEffect(() => {
      fetch('http://localhost:1337/api/tweets?filters[is_reply][$eq]=false', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          setPosts(response.data);
          setLoading(false);
        });
  }, []);

  return (
    <div>
        {posts.map(post => (
          <div key={post.id}>
            <Card className="max-w-[340px]">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                    <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>{post.attributes.full_text}</p>
                <span className="pt-2">
                  #FrontendWithZoey 
                  <span className="py-2" aria-label="computer" role="img">
                    💻
                  </span>
                </span>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">4</p>
                  <p className=" text-default-400 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">97.1K</p>
                  <p className="text-default-400 text-small">Followers</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
    </div>
  );
}
