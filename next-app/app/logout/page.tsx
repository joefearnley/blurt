"use client";

import { useEffect } from "react";
import { redirect } from 'next/navigation';
import { deleteCookie } from "cookies-next"; 

export default function LogoutPage() {
  useEffect(() => {
    deleteCookie('blurt-jwt');
    redirect('/');
  }, []);
}
