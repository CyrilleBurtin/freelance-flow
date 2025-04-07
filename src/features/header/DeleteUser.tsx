'use client';

import deleteUser from '@/actions/deleteUser/action';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const DeleteUser = () => {
  const router = useRouter();
  const handleDeleteAccount = async () => {
    await deleteUser();
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleDeleteAccount}>Supprimer</DropdownMenuItem>
  );
};

export default DeleteUser;
