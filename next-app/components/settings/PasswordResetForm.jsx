"use client";

import { useState, useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getCookie } from "cookies-next";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { EyeFilledIcon } from "../../components/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon.jsx";

export const PasswordResetForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const updatePassword = event => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/change-password`;
    const token = getCookie('blurt-jwt');
    setIsLoading(true);
    setErrors([]);

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: newPasswordConfirmation,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          let validationErrors = [];

          if (response.error.details.errors) {
            validationErrors = response.error.details.errors.map(error => error.message);
          } else {
            validationErrors.push(response.error.message);
          }

          setErrors(validationErrors);
          setIsLoading(false);
          return;
        }

        setCookie('blurt-jwt', response.jwt);
        setCookie('blurt-user', JSON.stringify({
          id : response.user.id,
          username : response.user.username,
        }));
      })
      .catch(error => {
        console.log(error);
        setErrors(error);
        setIsLoading(false);
      });
  }

  return (
    <Card className="basis-1/2 mt-6 md:mt-0">
      <CardHeader className="flex gap-6">
        <div className="flex flex-col">
          <p className="text-lg">Password</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="my-4">
        {successMessage && (
          <div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <div className="ms-3 text-sm font-medium">
            {successMessage}
            </div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
        )}
        <form className="flex flex-col gap-5">
          <Input
            label="Current Password"
            variant="bordered"
            placeholder="enter your current password"
            onChange={(event) => setCurrentPassword(event.target.value)}
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
          <Input
            label="New Password"
            variant="bordered"
            placeholder="confirm your new password"
            onChange={(event) => setNewPassword(event.target.value)}
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
          <Input
            label="Confirm New Password"
            variant="bordered"
            placeholder="confirm your new password"
            onChange={(event) => setNewPasswordConfirmation(event.target.value)}
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
          {errors && errors.map((errorMessage, i) => (
            <div key={i} className="text-sm text-danger-300">{errorMessage}</div>
          ))}
        </form>
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-between">
        <Button 
          color="default"
          variant="flat"
          isLoading={isLoading}
          onPress={updatePassword}
        >
          Update Password
        </Button>
      </CardFooter>
    </Card>
  )
}