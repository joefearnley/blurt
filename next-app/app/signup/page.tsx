"use client";

import React from "react";
import { useState } from "react";
import { redirect } from 'next/navigation';
import { setCookie } from "cookies-next";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../components/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon.jsx";

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submitSignupForm = () => {
    setLoading(true);
    setError('');

    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: username,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(response => {

        console.log(response);

        if (response.error) {
          setError(response.error.message);
          setLoading(false);
          return;
        }

        setCookie('blurt-jwt', response.jwt);
        setCookie('blurt-user', JSON.stringify({
          id : response.user.id,
          username : response.user.username,
        }));

        redirect('/dashboard');
      });
  };

  return (
    <div>
      <Card className="mx-auto max-w-[600px]">
        <CardHeader className="flex gap-6">
          <div className="flex flex-col">
            <p className="text-lg">Sign up for an Account</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className="my-4">
          <form action="" className="flex flex-col gap-5">
            <Input
              isClearable
              type="text"
              label="Username"
              variant="bordered"
              placeholder="enter your @username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              isClearable
              type="email"
              label="Email Address"
              variant="bordered"
              placeholder="enter your emailaddress@domain.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="enter your password"
              onChange={(event) => setPassword(event.target.value)}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            {error ? (
              <div className="text-sm text-danger-300">{error}</div>
            ) : null }
            {isLoading ? (
              <div>
                <Spinner color="default" />
              </div>
            ) : null }
          </form>
        </CardBody>
        <Divider/>
        <CardFooter className="flex justify-between">
          <Button 
            color="default"
            onClick={submitSignupForm}
          >
            Sign Up
          </Button>
          <Link href="/login" className="text-sm text-default-500">Log In</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
