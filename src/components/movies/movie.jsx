import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../../services/movieService.js';
import SearchBox from '../SearchBox';
import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';
import { getGenres } from '../../services/genreService';
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
        searchQuery: '',
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
     }

     handleDelete = async (movie)=>{
         const originalMovies = this.state.movies;

        const movies = originalMovies.filter(m=> m._id !== movie._id);
        this.setState({movies});

        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if(ex.response && ex.response.status === 404)
                alert('This movie has already been deleted.');
            this.setState(originalMovies);
        }
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

     async componentDidMount(){
        const { data } = await getGenres();
        const { data: movies } = await getMovies(); 
         
        const genres = [{_id: "", name: 'All Genres'},...data];
         
        this.setState({ movies , genres: genres});
     }
     
     handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1, searchQuery: '' });
     }

     handleSort = (sortColumn) => {
         this.setState({sortColumn});
     }

     handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1, selectedGenre: null })
      }

     getPageData = () => {
        const  { pageSize, currentPage, movies, selectedGenre, sortColumn, searchQuery } = this.state;

        let filtered;
        if(searchQuery) 
            filtered = _.filter(movies, m => {
            return m.title.toLowerCase().startsWith(searchQuery.toLowerCase());
          }); 
         else 
            filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
          
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const allMovies = paginate(sorted, currentPage, pageSize);

        
        return { totalCount: filtered.length, data: allMovies, pageSize, currentPage, sortColumn, searchQuery }
     }

    render() { 
        const { length: count } = this.state.movies;
        
        if(count === 0) return <p>There are no movies</p>
       
        const { totalCount, data: allMovies, pageSize, currentPage, sortColumn, searchQuery} = this.getPageData(); 
        const { user } = this.props;

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
                {user && <NavLink className="btn btn-primary mb-4" to='/movies/new' >New Movie</NavLink>}
                <h5>Showing {totalCount} movies</h5>
                <SearchBox  value={searchQuery} onChange={this.handleSearch}/>
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