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
import LogOut from '@/features/header/LogOut';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { image, name } = session?.user ?? { image: '', name: '' };

  return (
    <div className="flex justify-between gap-4 bg-gray-300 px-8 py-2">
      <p>Freelance-Flow</p>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={image} />
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
        <Link href="/compte">
          <Button>compte</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
