import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`} >{movie.title}</Link>},
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        { key: "like", content: movie => <Like onClick={()=> this.props.onLike(movie)} liked={movie.liked}  />},
        { key: "delete", content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn-sm btn btn-danger">Delete</button>}
    ];


    render() { 
        const { allMovies, onSort, sortColumn } = this.props;

        return ( 
            <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={allMovies} />
         );
    
    }
}
 
export default MoviesTable;