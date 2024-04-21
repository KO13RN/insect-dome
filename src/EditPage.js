import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editpage.css';
import { useParams } from 'react-router-dom';

function EditInsectPage() {
  const [name, setName] = useState('');
  const [common_name, setCommon_name] = useState('');
  const [scientific_name, setScientific_name] = useState('');
  const [family, setFamily] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  const [picName, setPicName] = useState('');
  const { id } = useParams();

  const [insect, setInsect] = useState({
    name: '',
    common_name:'',
    scientific_name:'',
    family:'',
    data: '',
    pic_name: '',
  });

  useEffect(() => {
    // Fetch insect data from the server based on the provided id
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInsect((prevInsect) => ({
      ...prevInsect,
      [name]: value,
    }));
  };


  const handleEditSubmit = async () => {
    if(!insect.name){
      alert("Name?")
      return false
    }
    if(!insect.data){
      alert("data?")
      return false
    }
 
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Common_name', common_name);
    formData.append('Scientific_name', scientific_name);
    formData.append('Family', family);

    formData.append('Data', data);
    formData.append('pic_name', picName);
    formData.append('image', image);
    try {
      let pathUpload = null;
      // Upload
      if (image) {
        const responseUpload = await axios.post('http://localhost:3333/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log('Response:', responseUpload.data);
        pathUpload = responseUpload.data.data
      }

      // Send the edited insect data to the server
      fetch(`http://localhost:3333/insects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: insect.name ?? undefined,
          Common_name: insect.common_name ?? undefined,
          Scientific_name: insect.scientific_name ?? undefined,
          Family: insect.family ?? undefined,
          Data: insect.data ?? undefined,
          pic_name: pathUpload ?? undefined
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            console.log('Insect data updated successfully:', data.message);
            // Redirect to the AlbumPage or another appropriate route


            // Handle success, clear form fields if needed
            setName('');
            setCommon_name('');
            setScientific_name('');
            setFamily('');
            setData('');
            setImage(null);
            setPicName('');
          } else {
            console.error('Error updating insect data:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error updating insect data:', error);
        });
    }
    catch (error) {
      console.error('Error:', error);
      // Handle error
    }

  };

  return (
    <div className="edit-page-container">
      <h1>Edit Insect</h1>
      <form>
        <div>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={insect.name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>common Name : </label>
          <input
            type="text"
            name="common_name"
            value={insect.common_name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Scientific Name : </label>
          <input
            type="text"
            name="scientific_name"
            value={insect.scientific_name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Family Name : </label>
          <input
            type="text"
            name="family"
            value={insect.family}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Data : </label>
          <textarea
            name="data"
            value={insect.data}
            required
            onChange={handleInputChange}
            style={{ width: '300px', height: '100px' }}
          />
        </div>
        <div>
          <label>Picture Name : </label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button className="edit-form button" type="button" onClick={handleEditSubmit}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditInsectPage;
