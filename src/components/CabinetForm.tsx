import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const CabinetForm: React.FC = () => {
  const [cabinetName, setCabinetName] = useState('');
  const [cabinetCode, setCabinetCode] = useState('');
  const [cabinets, setCabinets] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCabinets();
  }, []);

  const fetchCabinets = async () => {
    const { data, error } = await supabase.from('cabinets').select('*');
    if (error) {
      console.error('Error fetching cabinets:', error);
    } else {
      setCabinets(data);
    }
  };

  const handleCreateCabinet = async () => {
    const code = uuidv4();
    const { data, error } = await supabase
      .from('cabinets')
      .insert([{ name: cabinetName, id: code }])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating cabinet:', error);
    } else {
      console.log('Cabinet created:', data);
      setCabinetName('');
      setCabinetCode(code); // Display the code to the user
      fetchCabinets(); // Refresh the list of cabinets
    }
  };

  const handleDeleteCabinet = async (id: string) => {
    try {
      // Delete related cabinet members
      const { error: deleteMembersError } = await supabase
        .from('cabinet_members')
        .delete()
        .eq('cabinet_id', id);

      if (deleteMembersError) {
        throw deleteMembersError;
      }

      // Delete the cabinet itself
      const { error: deleteCabinetError } = await supabase
        .from('cabinets')
        .delete()
        .eq('id', id);

      if (deleteCabinetError) {
        throw deleteCabinetError;
      }

      setCabinets(cabinets.filter((cabinet) => cabinet.id !== id));
    } catch (error) {
      console.error('Error deleting cabinet:', error);
      setError('Error deleting cabinet. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cabinetName}
        onChange={(e) => setCabinetName(e.target.value)}
        placeholder="Cabinet Name"
      />
      <button onClick={handleCreateCabinet}>Create Cabinet</button>
      {cabinetCode && (
        <div>
          <p>Your cabinet code: {cabinetCode}</p>
        </div>
      )}
      <h2>Existing Cabinets</h2>
      <ul>
        {cabinets.map((cabinet) => (
          <li key={cabinet.id}>
            {cabinet.name} {cabinet.id}
            <button onClick={() => handleDeleteCabinet(cabinet.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CabinetForm;
