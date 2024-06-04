import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './views/root';
import ErrorPage from './errorPage';
import Applications from './views/applications';
import Stats from './views/stats';
import Sign from './views/signContainer';
import SignInForm from './components/signInForm';
import SignUpForm from './components/signUpForm';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LandingPage from './views/landingPage';
import PublicationsContainer from './views/publicationsContainer';
import ApplicationForm from './components/applicationForm';
import ProfileView from './views/profileView';
import PrivateRoute from './components/privateRoute';

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
    element: <PrivateRoute><Root /></PrivateRoute>,
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
      },{
        path: "/home/perfil",
        element: <ProfileView />,
      },
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
