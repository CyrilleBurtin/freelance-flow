import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTasks } from '@/features/taskList/api/getUserTaskList';
import { formatDeadline } from '@/lib/formatDate/formatDate';
import { getUser } from '@/lib/getUser/getUser';

async function TasksList() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="py-4 text-center text-amber-600">
        Vous n'êtes pas connecté
      </div>
    );
  }

  const { tasks, error } = await getTasks();

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="py-4 text-center">Aucune tâche trouvée</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="mb-4">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.clientId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>deadline : {formatDeadline(task.deadline)}</p>
          </CardContent>
          <CardFooter>
            <p>{task.status}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default TasksList;
