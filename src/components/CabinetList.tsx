import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const CabinetList = () => {
  interface Cabinet {
    user_id: string;
    cabinet_id: string;
    code: string;
  }

  const [cabinets, setCabinets] = useState<Cabinet[]>([]);

  console.log(cabinets);

  useEffect(() => {
    const fetchCabinets = async () => {
      const { data, error } = await supabase
        .from('cabinet_members')
        .select('*');
      if (error) {
        console.error('Error fetching cabinets:', error);
      } else {
        setCabinets(data);
      }
    };

    fetchCabinets();
  }, []);

  return (
    <div>
      <h2>Cabinets</h2>
      <ul>
        {cabinets.map((cabinet) => (
          <li key={cabinet.user_id}>
            {cabinet.user_id} - Code: {cabinet.cabinet_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CabinetList;
