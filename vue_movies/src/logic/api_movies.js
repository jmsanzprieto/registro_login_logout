// LLAMADA A LA API DE LAS PELÍCULAS
// api_moves.js

import axios from 'axios';
import { getAccessToken } from './auth'; // Importa la función para obtener el token de acceso
import { API_MOVIES } from './config';

// Obtener la lista de películas
async function getMovies() {
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.get(`${API_MOVIES}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } else {
      console.error('Token de acceso no disponible');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener películas:', error);
    return null;
  }
}

// Obtener detalles de una película por ID
async function getMovieById(movieId) {
  try {
    const token = getAccessToken(); // Obtiene el token de acceso

    if (token) {
      const response = await axios.get(`${API_MOVIES}/movies/${movieId}/`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } else {
      console.error('Token de acceso no disponible');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error);
    return null;
  }
}

export { getMovies, getMovieById };
