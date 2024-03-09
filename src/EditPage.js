import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditInsectPage() {
  const { id } = useParams();
  const [insect, setInsect] = useState({
    name: '',
    data: '',
    pic_name: '',
  });

  useEffect(() => {
    // Fetch insect data from the server based on the provided id
    fetch(`http://localhost:3333/insects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setInsect(data.insect);
        } else {
          console.error('Error fetching insect data:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching insect data:', error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInsect((prevInsect) => ({
      ...prevInsect,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    // Send the edited insect data to the server
    fetch(`http://localhost:3333/insects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insect),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          console.log('Insect data updated successfully:', data.message);
          // Redirect to the AlbumPage or another appropriate route
        } else {
          console.error('Error updating insect data:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating insect data:', error);
      });
  };

  return (
    <div>
      <h1>Edit Insect</h1>
      <form>
        <div>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={insect.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Data : </label>
          <textarea
            name="data"
            value={insect.data}
            onChange={handleInputChange}
            style={{ width: '300px', height: '100px' }}
          />
        </div>
        <div>
          <label>Picture Name : </label>
          <input
            type="text"
            name="pic_name"
            value={insect.pic_name}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleEditSubmit}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditInsectPage;
