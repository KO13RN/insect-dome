import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewPage = () => {
  const { id } = useParams();
  const [insect, setInsect] = useState(null);

  useEffect(() => {
    // Assuming you have a function to fetch insect data based on the ID
    fetch(`http://localhost:3333/insects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setInsect(data.insect[0]);
        } else {
          console.error('Error fetching insect data:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching insect data:', error);
      });
  }, [id]);

  return (
    <div>
      <h1>Insect Details</h1>
      {insect ? (
        <div>
          <h2>{insect.name}</h2>
          <p>{insect.data}</p>
          <img src={insect.pic_name} alt={insect.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewPage;
