"use client";

import { useState, useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getCookie } from "cookies-next";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { EyeFilledIcon } from "../../components/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon.jsx";

export default function SettingsPage() {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const updateSettings  = event => {
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
        console.log(response);

        if (response.error) {
          setError(response.error.message);
          setLoading(false);
          return;
        }

        // setCookie('blurt-jwt', response.jwt);
        // setCookie('blurt-user', JSON.stringify({
        //   id : response.user.id,
        //   username : response.user.username,
        // }));

        // redirect('/dashboard');
      });
  }

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

      <Card className="mx-auto max-w-[600px]">
        <CardHeader className="flex gap-6">
          <div className="flex flex-col">
            <p className="text-lg">Settings</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className="my-4">
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
            label="Email"
            placeholder="Enter your email"
            value={user.email}
            onChange={updateField} />

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
            onPress={updateSettings}
          >
            Log In
          </Button>
          <Link href="/signup" className="text-sm text-default-500">Sign Up</Link>
        </CardFooter>
      </Card>
  );
}
