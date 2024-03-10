import React, { useState } from 'react';
import axios from 'axios';

function AddPage() {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  const [picName, setPicName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
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
        Data: data,
        pic_name : response.data.data
      });
 
      // Handle success, clear form fields if needed
      setName('');
      setData('');
      setImage(null);
      setPicName('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Add Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Data"
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
