import React, { Component } from 'react';
import { getMovies } from '../../services/fakeMovieService';

import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';
import { getGenres } from '../../services/fakeGenreService';
import ListGroup from '../common/listGroup';
import MoviesTable from '../moviesTable';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

class Movie extends Component {
    state = { 
        movies: [],
        pageSize:4,
        currentPage: 1,
        genres: [],
        sortColumn: {path: 'title', order: 'asc'}
     }

     handleDelete = (movie)=>{
        const movies = this.state.movies.filter(m=> m._id !== movie._id);
        this.setState({movies});
     }

     handleNew = (movie) => {
         //const movies = this.state.movies;
         //this.setState()
        console.log('from handle nwe');
     }

     handlePageChange = page => {
         this.setState({currentPage: page});
     }

     handleGenre = genre => {
        const movies = this.state.movies.filter( m => m.genre._id === genre._id);
        this.setState({ movies });
     }

     componentDidMount(){
         const genres = [{_id: "", name: 'All Genres'},...getGenres()];
         this.setState({movies: getMovies(), genres: genres});
     }
     
     handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
     }

     handleSort = (sortColumn) => {
         this.setState({sortColumn});
     }

     getPageData = () => {
        const  { pageSize, currentPage, movies, selectedGenre, sortColumn } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const allMovies = paginate(sorted, currentPage, pageSize);

        
        return { totalCount: filtered.length, data: allMovies, pageSize, currentPage, sortColumn }
     }

    render() { 
        const { length: count } = this.state.movies;
        
        if(count === 0) return <p>There are no movies</p>
       
        const { totalCount, data: allMovies, pageSize, currentPage, sortColumn} = this.getPageData(); 
        return ( 
        <div className="row">
            <div className="col-sm-3" >
                <ListGroup 
                items={this.state.genres} 
                onItemSelect={this.handleGenreSelect} 
                selectedItem={this.state.selectedGenre}/>
                {/* <Menu genres={genres} onGenreChange={this.handleGenre} /> */}
            </div>
            <div className="col">
                <NavLink className="btn btn-primary mb-4" to={{pathname:'/movies/new', onNew:'asdf'}} >New Movie</NavLink>
                <h5>Showing {totalCount} movies</h5>
                <MoviesTable allMovies={allMovies} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} sortColumn={sortColumn} />
                <Pagination itemCount={totalCount} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage}  />                
            </div>
        </div>
        );
    }
    handleLike(movie){
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }
}
 
export default Movie;