import React, { useState, useEffect } from 'react';
import './card.css'; // Import your custom CSS file

function AlbumPage() {
  const [insectData, setInsectData] = useState([]);

  useEffect(() => {
    // Fetch insect data from the server


    fetch('http://localhost:3333/insects')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setInsectData(data.insects);
        } else {
          console.error('Error fetching insect data:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching insect data:', error);
      });
  }, []);

  const createCard = (insect) => (
    <li key={insect.id} className="card">
      <h2 className="card-title">{insect.name}</h2>
      <p className="card-text">{insect.data}</p>
      <img className="card-img" src={`/${insect.pic_name}`} alt={insect.name} />
      <div className="card-info">
      </div>
    </li>
  );

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedInsectData = chunkArray(insectData, 4);

  return (
    <div>
      <h1 className="album-title">สายพันธุ์แมลงภายในโดมจำลอง</h1> {/* Apply the album-title class */}
      {chunkedInsectData.map((row, rowIndex) => (
        <ul key={rowIndex} className="card-container"> {/* Apply the card-container class */}
          {row.map((insect) => createCard(insect))}
        </ul>
      ))}
    </div>
  );
}

export default AlbumPage;
