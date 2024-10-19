"use client";

import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { getCookie } from "cookies-next";

export default function SettingsPage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(getCookie('blurt-user'));

    // setUser(getCookie('key'));
  }, []);

  return (
    <div>
      <h1 className={title()}>Settings</h1>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input size="lg" type="email" label="Email" placeholder="Enter your email" />
        </div>
    </div> 
    </div>
  );
}
