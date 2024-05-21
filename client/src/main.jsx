import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './errorPage';
import Applications from './routes/applications';
import Stats from './routes/stats';
import Sign from './routes/signContainer';
import SignInForm from './components/signInForm';
import SignUpForm from './components/signUpForm';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LandingPage from './routes/landingPage';
import PublicationsContainer from './routes/publicationsContainer';
import ApplicationForm from './components/applicationForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Sign component={<SignUpForm />} />
  },
  {
    path: '/signin',
    element: <Sign component={<SignInForm />} />
  },
  {
    path: "/home",
    element: <Root />,
    children: [
      {
        path: "/home/postulaciones",
        element: <Applications />,
      },
      {
        path: "/home/postulaciones/agregar",
        element: <ApplicationForm />
      },
      {
        path: "/home/publicaciones",
        element: <PublicationsContainer />,
      },
      {
        path: "/home/estadisticas",
        element: <Stats />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
