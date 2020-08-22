import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Pagination extends Component {
    render() { 
       const { itemCount, pageSize, currentPage, onPageChange} = this.props;
       const pageCount = Math.ceil( itemCount / pageSize ); 
       const pages = _.range(1, pageCount +1);
        return ( 
            
            <nav aria-label="...">
                <ul className="pagination">
                    {pages.map(page => (
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'} ><a className="page-link" onClick={ () => onPageChange(page)} >{page}</a></li>
                    ))}
                </ul>
            </nav>
         );
    }
}
 
Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;