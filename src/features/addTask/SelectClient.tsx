import { useSession } from '@/auth/auth-client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@prisma/client';

interface UserWithClients extends User {
  clients: {
    id: string;
    name: string;
  }[];
}

const SelectClient = () => {
  const { data } = useSession();
  const user = data?.user as unknown as UserWithClients;
  console.log(data);
  return (
    <div className="w-full">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="client" />
        </SelectTrigger>
        <SelectContent>
          {user?.clients?.map(({ name, id }) => (
            <SelectItem value={id} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectClient;
