import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserWithClients } from '@/features/addTask/AddTask';

const SelectClient = ({ user }: { user: UserWithClients }) => {
  return (
    <>
      <Label htmlFor="clientId">Client (optionnel)</Label>
      <Select>
        <SelectTrigger>
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
    </>
  );
};

export default SelectClient;
