import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  addVote: (taskId: number, vote: number) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, addVote, deleteTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          addVote={addVote}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
