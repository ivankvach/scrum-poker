/*import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Task } from '../types';

interface AddTaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = async () => {
    if (taskName.trim() === '') return;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ name: taskName, votes: [] }])
      .single();
    if (error) {
      console.error('Error adding task:', error);
    } else {
      onTaskAdded(data);
      setTaskName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;*/
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Task } from '../types';

interface AddTaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = async () => {
    if (taskName.trim() === '') return;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ name: taskName, votes: [] }])
      .select('*')
      .single();
    if (error) {
      console.error('Error adding task:', error);
    } else {
      onTaskAdded(data);
      setTaskName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
