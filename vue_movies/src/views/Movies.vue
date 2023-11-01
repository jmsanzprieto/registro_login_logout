<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <div v-else>
          <table class="table">
            <!-- Encabezados de la tabla -->
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Género</th>
                <th>Año</th>
                <th>Director</th>
                <!-- Agrega aquí más encabezados si hay más detalles -->
              </tr>
            </thead>
            <tbody>
              <!-- Mostrar películas según la página actual -->
              <tr v-for="(movie, index) in paginatedMovies" :key="index">
                <td>{{ movie.id }}</td>
                <td>{{ movie.title_movie }}</td>
                <td>{{ movie.gender_movie }}</td>
                <td>{{ movie.year_movie }}</td>
                <td>{{ movie.director_movie }}</td>
                <!-- Muestra más detalles si es necesario -->
              </tr>
            </tbody>
          </table>

          <!-- Botones de paginación -->
          <div>
            <p><span><strong>Página</strong> {{ currentPage }}</span></p>
          </div>
          <div >
            <button class="btn btn-primary" style="margin-left: 20px;" @click="previousPage" :disabled="currentPage === 1">Anterior</button>
            <button class="btn btn-secondary" @click="nextPage" :disabled="isLastPage">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authenticateAndGetTokens } from '@/logic/auth';
import { username, password } from '@/logic/config';
import { getMovies, getMovieById } from '@/logic/api_movies'; // Importa las funciones del archivo api_movies

export default {
  data() {
    return {
      movies: [], // Inicializa la lista de películas como un array vacío
      errorMessage: '', // Variable para almacenar mensajes de error
      currentPage: 1, // Página actual
      itemsPerPage: 10 // Cantidad de películas por página
    };
  },
  computed: {
    paginatedMovies() {
      // Cálculo de películas por página basado en la página actual
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.movies.slice(startIndex, endIndex);
    },
    isLastPage() {
      return this.currentPage === Math.ceil(this.movies.length / this.itemsPerPage);
    }
  },
  async mounted() {
    try {
      const tokens = await authenticateAndGetTokens(username, password);
      if (tokens) {
        console.log('Autenticación exitosa:', tokens);
        this.getMoviesAndDetails(tokens.access_token);
      } else {
        this.errorMessage = 'Error en la autenticación';
      }
    } catch (error) {
      console.error('Error al conectarse a la API:', error);
      this.errorMessage = 'Error al conectar con la API';
    }
  },
  methods: {
    async getMoviesAndDetails(accessToken) {
      try {
        const movies = await getMovies(accessToken);
        if (movies) {
          console.log('Lista de películas:', movies);
          this.movies = movies;
        } else {
          this.errorMessage = 'Error al obtener la lista de películas';
        }
      } catch (error) {
        console.error('Error al obtener películas:', error);
        this.errorMessage = 'Error al obtener películas desde la API';
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (!this.isLastPage) {
        this.currentPage++;
      }
    }
  }
};
</script>
<style >
.btn {margin-right: 10px;}
</style>