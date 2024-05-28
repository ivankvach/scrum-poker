import React, { useState, useMemo, useEffect } from 'react';
import { Task } from '../types';
import VotingComponent from './VotingComponent';
import { supabase } from '../services/supabaseClient';

interface TaskItemProps {
  task: Task;
  addVote: (taskId: number, vote: number) => void;
  deleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, addVote, deleteTask }) => {
  const [voted, setVoted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (userId && task.votes.includes(parseInt(userId))) {
      setVoted(true);
    }
  }, [userId, task.votes]);

  const handleVote = (vote: number) => {
    console.log(task.id);
    addVote(task.id, vote);
    setVoted(true);
    if (!voted && userId) {
      addVote(task.id, vote);
      setVoted(true);
    }
  };

  const averageVote = useMemo(() => {
    if (task.votes.length === 0) return 0;
    const total = task.votes.reduce((sum, vote) => sum + vote, 0);
    return (total / task.votes.length).toFixed(2);
  }, [task.votes]);

  return (
    <div className="task-item">
      <h3>{task.name}</h3>
      <button onClick={() => deleteTask(task.id)}>Delete Task</button>
      <VotingComponent onVote={handleVote} disabled={voted} />
      <div>Votes: {task.votes.join(', ')}</div>
      <div>Total Votes: {task.votes.length}</div>
      <div>Average Vote: {averageVote}</div>
    </div>
  );
};

export default TaskItem;
