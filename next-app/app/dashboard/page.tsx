"use client";

import { useState, useEffect } from "react";
import { title } from "@/components/primitives";

export default function DashboardPage() {
  const [numberOfPosts, setNumberOfPosts] = useState(0);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tumblr-posts?sort=date_created:desc`;

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setNumberOfPosts(response.meta.pagination.total);
      });
  }, []);

  return (
    <div>
      <h1 className={title()}>Dashboard</h1>

      <div className="flex flex-wrap -mx-6 mt-8">
        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">{numberOfPosts}</h4>
              <div className="text-gray-500">Posts</div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
              </svg>
            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">200,521</h4>
              <div className="text-gray-500">Clicks</div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">215,542</h4>
              <div className="text-gray-500">Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
