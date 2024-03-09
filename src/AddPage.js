import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { red, green } from '@mui/material/colors';
import './card.css';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function Album() {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3333/authen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          //alert('authen success');
        } else {
          //alert('authen failed');
          window.location = '/Login';
          localStorage.removeItem('token');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/Login';
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const JsonData ={
      name: data.get('Name'),
      data: data.get('Data'),
      pic_name: data.get('pic_name'),
    };

    // Send the form data to the Node.js server
    fetch('http://localhost:3333/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(JsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
        // Clear form after successful upload
        setName('');
        setData('');
        setImage(null);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit} name="add_name" id="add_name" method="POST">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
          <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                  required
                  fullWidth
                  id="Data"
                  label="Data"
                  name="Data"
                />
          </Grid>
          <Grid item xs={12}>
          <TextField
                  required
                  fullWidth
                  id="pic_name"
                  label="picname"
                  name="pic_name"
                />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add more
            </Button>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider>
  );
}

export default Album;
