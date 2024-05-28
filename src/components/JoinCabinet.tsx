import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const JoinCabinet: React.FC = () => {
  const [cabinetCode, setCabinetCode] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const isValidUUID = (str: string) => {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(str);
  };

  function setLocalStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  const handleJoinCabinet = async () => {
    /*if (!isValidUUID(userId)) {
      setError('Invalid User ID. Please enter a valid UUID.');
      return;
    }*/

    const { data: cabinetData, error: cabinetError } = await supabase
      .from('cabinets')
      .select('id')
      .eq('id', cabinetCode)
      .single();

    if (cabinetError || !cabinetData) {
      console.error('Error finding cabinet:', cabinetError);
      setError('Cabinet not found. Please check the cabinet code.');
      return;
    }

    const { data, error } = await supabase
      .from('cabinet_members')
      .insert([{ user_id: userId, cabinet_id: cabinetData.id }]);

    if (error) {
      console.error('Error joining cabinet:', error);
      setError('Error joining cabinet. Please try again.');
    } else {
      console.log('Joined cabinet:', data);
      setCabinetCode('');
      setUserId('');
      setError('');
      setLocalStorageItem(cabinetData.id, userId);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cabinetCode}
        onChange={(e) => setCabinetCode(e.target.value)}
        placeholder="Cabinet ID"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <button onClick={handleJoinCabinet}>Join Cabinet</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JoinCabinet;
