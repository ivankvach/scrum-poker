/*import React, { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import { Task } from './types';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Auth from './components/Auth';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
    fetchTasks();
    subscribeToTaskChanges();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data);
    }
  };

  const addVote = async (taskId: number, vote: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedVotes = [...task.votes, vote];
      const { error } = await supabase
        .from('tasks')
        .update({ votes: updatedVotes })
        .eq('id', taskId);

      if (error) {
        console.error('Error adding vote:', error);
      } else {
        setTasks(
          tasks.map((t) =>
            t.id === taskId ? { ...t, votes: updatedVotes } : t
          )
        );
      }
    }
  };

  const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const subscribeToTaskChanges = () => {
    const taskChannel = supabase
      .channel('public:tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
    };
  };

  return (
    <div className="App">
      <h1>Scrum Poker Voting</h1>
      {session ? (
        <>
          <AddTaskForm onTaskAdded={handleTaskAdded} />
          <TaskList tasks={tasks} addVote={addVote} deleteTask={deleteTask} />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;*/
import React, { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import { Task } from './types';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

import CabinetForm from './components/CabinetForm';
import CabinetList from './components/CabinetList';
import JoinCabinet from './components/JoinCabinet';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
    subscribeToTaskChanges();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      console.log('Fetched tasks:', data); // Debug line
      setTasks(data);
    }
  };

  const addVote = async (taskId: number, vote: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedVotes = [...task.votes, vote];
      const { data, error } = await supabase
        .from('tasks')
        .update({ votes: updatedVotes })
        .eq('id', taskId);

      if (error) {
        console.error('Error adding vote:', error);
        console.log(data);
      } else {
        setTasks(
          tasks.map((t) =>
            t.id === taskId ? { ...t, votes: updatedVotes } : t
          )
        );
      }
    }
    console.log('delete');
  };

  const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const subscribeToTaskChanges = () => {
    const taskChannel = supabase
      .channel('public:tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          fetchTasks();
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
    };
  };

  return (
    <div className="App">
      <h1>Scrum Poker Voting</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} addVote={addVote} deleteTask={deleteTask} />
      <CabinetForm />
      <CabinetList />
      <JoinCabinet />
    </div>
  );
};

export default App;
