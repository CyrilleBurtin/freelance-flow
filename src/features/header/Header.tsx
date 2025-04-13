import { auth } from '@/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LogOut from '@/features/header/LogOut';
import SignIn from '@/features/header/SignIn';
import { headers } from 'next/headers';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { user } = session || {};
  const { image, name } = user || {};

  return (
    <div className="fixed flex w-full justify-between gap-4 bg-gray-300 px-8 py-2">
      <p>Freelance-Flow</p>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={image || undefined}
                alt={name || "avatar de l'utilisateur"}
              />
              <AvatarFallback>{name?.[0] ?? '?'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Facturation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogOut />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button>compte</Button>
          </PopoverTrigger>
          <PopoverContent>
            <SignIn />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default Header;
