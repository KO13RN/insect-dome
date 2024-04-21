import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ViewPage.css'; // Import the CSS file

const ViewPage = () => {
  const { id } = useParams();
  const [insect, setInsect] = useState(null);

  useEffect(() => {
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
    <div className="view-page-container">
      {insect && (
        <div className="page-content">
          <h1 className="page-title">Insect Details</h1>
          <div className="insect-details">
            <h2>{insect.name}</h2>
            <p><strong>ชื่อสามัญ:</strong> {insect.common_name}</p>
            <p><strong><em>ชื่อวิทยาศาสตร์:</em></strong> <em>{insect.scientific_name}</em></p>
            <p><strong>วงศ์:</strong> {insect.family}</p>
            <p><strong>Data:</strong> {insect.data}</p>
            <img src={insect.pic_name} alt={insect.name} className="insect-image" />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ViewPage;
