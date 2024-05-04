import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editpage.css';

function AddPage() {
  const [name, setName] = useState('');
  const [scientific_name, setscientific_name] = useState('');
  const [order_name, setorder_name] = useState('');
  const [family, setFamily] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  const [picName, setPicName] = useState('');

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
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('scientific_name', scientific_name);
    formData.append('order_name', order_name);
    formData.append('Family', family);
    formData.append('Data', data);
    formData.append('pic_name', picName);
    formData.append('image', image);
    try {
      // Upload
      const response = await axios.post('http://localhost:3333/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // You can include authorization headers if needed
        },
      });

      console.log('Response:', response.data);
      
      // Save
       await axios.post('http://localhost:3333/save_insects', {
        Name : name,
        scientific_name : scientific_name,
        order_name : order_name,
        Family : family,
        Data: data,
        pic_name : response.data.data
      });
      // Handle success, clear form fields if needed
      setName('');
      setscientific_name('');
      setorder_name('');
      setFamily('');
      setData('');
      setImage(null);
      setPicName('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="edit-page-container">
      <h1>Add Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="ชื่อวิทยาศาสัตร์"
          value={scientific_name}
          onChange={(e) => setscientific_name(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="อันดับ"
          value={order_name}
          onChange={(e) => setorder_name(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="วงศ์"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="ความสำคัญ"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <br />
        <br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



export default AddPage;
