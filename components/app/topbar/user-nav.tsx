import { useClerk, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { typedBoolean } from "@/lib/utils";

export function UserNav() {
  const { resolvedTheme } = useTheme();

  const clerk = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();

  const appearance = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;

  if (!isLoaded || !isSignedIn) {
    return (
      <Button
        variant="outline"
        onClick={() => {
          clerk.openSignIn({ appearance });
        }}
      >
        Sign In
      </Button>
    );
  }

  const userNames = [user.firstName, user.lastName].filter(typedBoolean);
  const userName = userNames.length ? userNames.join(" ") : "Unknown";
  const nameAbrev = userNames.length
    ? userNames.reduce((acc, cur) => `${acc}${cur[0]}`, "")
    : "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full" variant="ghost">
          <Avatar className="h-8 w-8">
            <AvatarImage alt={userName} src={user.imageUrl} />
            <AvatarFallback>{nameAbrev}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            {user.primaryEmailAddress && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.primaryEmailAddress.emailAddress}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            clerk.openUserProfile({ appearance });
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            clerk.signOut();
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
