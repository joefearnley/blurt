"use client";

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
