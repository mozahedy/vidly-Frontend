import React, { PureComponent } from 'react';

const MovieForm = ({ match, history }) => {
    return ( 
        <div>
            <h3>Movie Form</h3>
            {match.params.id}
            <button onClick={() => {
                history.push('/movies');}} className="btn btn-primary">Back</button>
        </div>
        
     );
}
 
export default MovieForm;