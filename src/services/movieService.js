import httpService from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
    return httpService.get(apiEndpoint);
}

export function getMovie(movieId) {
  return httpService.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if(movie._id){
    let body = movie;
    //delete body._id;
    console.log(movie);
    return httpService.put( movieUrl(movie._id), body);
  } else {
    console.log(movie);
    return httpService.post( apiEndpoint, movie);
  }
}

export function deleteMovie(movieId) {
    httpService.delete(apiEndpoint + '/' + movieId);
}
