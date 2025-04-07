import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UserWithClients } from '@/features/addTask/AddTask';
import SelectClient from '@/features/selectClient/SelectClient';

const AddClient = ({ user }: { user: UserWithClients }) => {
  return (
    <>
      <SelectClient user={user!} />
      <Popover>
        <PopoverTrigger asChild>
          <Button>Nouveau client</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>add client</p>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddClient;
