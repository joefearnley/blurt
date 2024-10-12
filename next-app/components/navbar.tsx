"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { usePathname } from 'next/navigation'
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { isAuthenticated } from "../utils/Auth";
import path from "path";

export const Navbar = () => {
  const authenticated = isAuthenticated();
  const pathname = usePathname()

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-xl text-inherit">BLURT</p>
          </NextLink>
        </NavbarBrand>
        {siteConfig.navItems.map((item, i) => (
          <NavbarItem key={i} isActive={pathname === item.href}>
            <Link href={item.href}  color="foreground">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        { authenticated ? (
            <NavbarItem key={"/logout"}>
              <NextLink href={"logout"}> Log Out</NextLink>
            </NavbarItem>
          ) : (
            <NavbarItem key={"/login"}>
              <NextLink href={"login"}>Log In</NextLink>
            </NavbarItem>
          )
        }
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
