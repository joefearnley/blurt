"use client";

import { useState, useEffect } from "react";
import { title } from "@/components/primitives";

export default function BlogPage() {

  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(true);
 
  useEffect(() => {
      fetch('http://localhost:1337/api/tweets', {
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
      <h1 className={title()}>Feed</h1>

      <ul>
      {posts.map(post => (
        <li key={post.id}>{post.attributes.full_text}</li>
      ))}
    </ul>
    </div>
  );
}
