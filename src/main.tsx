import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import PokemonInfo from './pages/pokemonInfo';
import Habitats from './pages/habitats';
import Types from './pages/types';
import About from './pages/about';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonInfo/>,
  },
  {
    path: "/types/:page?",
    element: <Types/>,
  },
  {
    path: "/habitats",
    element: <Habitats/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
