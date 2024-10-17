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
import { 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { usePathname } from 'next/navigation'
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { isAuthenticated } from "../utils/Auth";

export const Navbar = () => {
  const authenticated = isAuthenticated();
  const pathname = usePathname();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-xl text-inherit">BLURT</p>
          </NextLink>
        </NavbarBrand>
        {authenticated && siteConfig.navItems.map((item, i) => (
          <NavbarItem key={i} isActive={pathname === item.href}>
            <Link href={item.href} color="foreground">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {authenticated ? (
        <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">
                  @joefearnley
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {siteConfig.navMenuItems.map((item, i) => (
                  <DropdownItem key={`${i}`} variant="flat">
                    <Link href={item.href} color="foreground">
                      {item.label}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
        </NavbarContent>
      ) : (
          <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
          >
            <NavbarItem textValue="Log In">
              <Link href={"/login"} color="foreground">Log In</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={"/signup"} color="foreground">Sign Up</Link>
            </NavbarItem>
        </NavbarContent>
      )}

      {authenticated && (  
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
          <NavbarMenu>
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, i) => (
                <NavbarMenuItem key={`${item.href}-${i}`} textValue={item.label}>
                  <Link href={item.href} color="foreground" size="lg">
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </NavbarContent>
      )}
    </NextUINavbar>
  );
};
