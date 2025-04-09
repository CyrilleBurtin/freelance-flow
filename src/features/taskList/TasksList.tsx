'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Task } from '@prisma/client';
import { useEffect, useState } from 'react';

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const TasksList = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    }
  };

  useEffect(() => {
    TasksList();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Card>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.clientId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              deadline :{' '}
              {new Date(task.deadline).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </CardContent>
          <CardFooter>
            <p>{task.status}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TasksList;
