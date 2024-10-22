"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { UserAccountSettingsForm } from "../../components/settings/UserAccountSettingsForm.jsx"
import { PasswordResetForm } from "../../components/settings/PasswordResetForm.jsx"

export default function SettingsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-12">
      <UserAccountSettingsForm />

      <PasswordResetForm />
    </div>
  );
}
