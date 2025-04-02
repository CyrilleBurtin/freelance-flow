'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const LogOut = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>Déconnexion</DropdownMenuItem>
  );
};

export default LogOut;
