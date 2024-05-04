import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editpage.css';
import { useParams } from 'react-router-dom';

function EditInsectPage() {
  const [name, setName] = useState('');
  const [scientific_name, setscientific_name] = useState('');
  const [order_name, setorder_name] = useState('');
  const [family, setFamily] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  const [picName, setPicName] = useState('');
  const { id } = useParams();

  const [insect, setInsect] = useState({
    name: '',
    scientific_name:'',
    order_name:'',
    family:'',
    data: '',
    pic_name: '',
  });

  useEffect(() => {

    
      // Fetch insect data from the server
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
  },
   [id]);

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
    formData.append('scientific_name', scientific_name);
    formData.append('order_name', order_name);
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
          scientific_name: insect.scientific_name ?? undefined,
          order_name: insect.order_name ?? undefined,
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
            setscientific_name('');
            setorder_name('');
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
          <label>ชื่อ : </label>
          <input
            type="text"
            name="name"
            value={insect.name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ชื่อวิทยาศาสตร์ : </label>
          <input
            type="text"
            name="scientific_name"
            value={insect.scientific_name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>อันดับ : </label>
          <input
            type="text"
            name="order_name"
            value={insect.order_name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>วงศ์ : </label>
          <input
            type="text"
            name="family"
            value={insect.family}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ความสำคัญ : </label>
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
