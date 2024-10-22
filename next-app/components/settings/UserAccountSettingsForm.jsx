"use client";

import { useState, useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getCookie } from "cookies-next";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export const UserAccountSettingsForm = (props) => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const updateSettings  = event => {
    setLoading(true);

    const token = getCookie('blurt-jwt');
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/${user.id}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `BEARER ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setLoading(false);

        console.log(response);

        if (response.error) {
          setError(response.error.message);
          return;
        }

        console.log('setting message...');

        setSuccessMessage('Settings updated.');
        setShowSuccessMessage(true);
      });
  }

  const closeSuccessMessage = event => {

  };

  const updateField = event => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };


  useEffect(() => {
    const token = getCookie('blurt-jwt');
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`;

    fetch(url, {
      headers: {
        Authorization: `BEARER ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setUser(response);
      });
  }, []);

  return (
    <Card className="basis-1/2">
      <CardHeader className="flex gap-6">
        <div className="flex flex-col">
          <p className="text-lg">Account Settings</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="my-4">
        {successMessage !== '' && showSuccessMessage && (
          <div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <div className="ms-3 text-sm font-medium">
            {successMessage}
            </div>
            <button 
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" 
              data-dismiss-target="#alert-3"
              aria-label="Close"
              onClick={(event) => setShowSuccessMessage(false)}>
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
        )}
        <form action="" className="flex flex-col gap-5">
          <Input 
            isClearable
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your @username"
            value={user.username} 
            onChange={updateField} />
          <Input 
            isClearable
            type="text"
            name="name"
            label="Name"
            placeholder="Enter your full name"
            value={user.name}
            onChange={updateField} />
          <Input
            isClearable
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your address"
            value={user.email}
            onChange={updateField} />
          {error ? (
            <div className="text-sm text-danger-300">{error}</div>
          ) : null }
        </form>
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-between">
        <Button 
          color="default"
          variant="flat"
          isLoading={isLoading}
          onPress={updateSettings}
        >
          Update Settings
        </Button>
      </CardFooter>
    </Card>
  );
};