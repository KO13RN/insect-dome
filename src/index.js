import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import LoginPage from "./Login";
import AlbumPage from "./Album";
import AlbumPage2 from "./Album2";
import RegisterPage from "./Register";
import AddPage from "./AddPage";
import EditPage from './EditPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Album",
    element: <AlbumPage />,
  },
  {
    path: "/Album2",
    element: <AlbumPage2 />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/AddPage",
    element: <AddPage />,
  },
  {
    path: '/Edit/:id', // Define the route for EditPage with a parameter ":id"
    element: <EditPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
