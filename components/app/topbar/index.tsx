"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Search } from "@/components/app/topbar/search";
import { Button } from "@/components/ui/button";
import * as PokeAPI from "@/lib/pokeapi";

import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed z-50 min-w-full border-b bg-white dark:bg-black">
      <div className="flex h-16 items-center px-4">
        {pathname !== "/" && (
          <div className="mr-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                router.back();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight">
          {pathname !== "/"
            ? PokeAPI.beautifyName(pathname.slice(1))
            : "PokéRiddle"}
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
