import React, { useState, useEffect } from 'react';
import './card.css'; // Import your custom CSS file

function AlbumPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [insectData, setInsectData] = useState([]);

  useEffect(() => {
    // Fetch insect data from the server
    const apiUrl = searchQuery ? `http://localhost:3333/search?q=${encodeURIComponent(searchQuery)}` : 'http://localhost:3333/insects';
    const token = localStorage.getItem('token')
    fetch('http://localhost:3333/authen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          //alert('authen succers')

        } else {
          //alert('authen fall')
          window.location = '/Login'
          localStorage.removeItem('token');

        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch(apiUrl)
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
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location ='/Login'
  }

  const createCard = (insect) => (
    <li key={insect.id} className="card">
      <h2 className="card-title">{insect.name}</h2>
      <p className="card-text">{insect.data}</p>
      <img className="card-img" src={`${insect.pic_name}`} alt={insect.name} />
      <div className="card-info">

          <a href={`/view/${insect.id}`} className="view-link"> View</a> {/* Add the Edit button link */}
        <a href={`/Edit/${insect.id}`} className="edit-link">Edit</a> {/* Add the Edit button link */}
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
     <h1 className="album-title">Search Insects</h1>
    <div className="search-bar-container"> {/* Add container div */}
      <input
        type="text"
        placeholder="Enter insect name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
    </div>
      <h1 className="album-title">สายพันธุ์แมลงภายในโดมจำลอง</h1> {/* Apply the album-title class */}
      <div className="add-insect-button-container">
      <button className="add-insect-button" onClick={handleLogout}>
            Logout
          </button>
          <button className="add-insect-button">
          <a href="/AddPage" className="add-insect-button">
            Add Insect
          </a>
          </button>
      </div>
      {chunkedInsectData.map((row, rowIndex) => (
        <ul key={rowIndex} className="card-container"> {/* Apply the card-container class */}
          {row.map((insect) => createCard(insect))}
        </ul>
      ))}
    </div>
  );
}

export default AlbumPage;
