import React from 'react';
import Spinner from "../Spinner/Spinner";

import './Beer.scss';

function Beer(props) {
    const {
        loading,
        handleDetail,
        beer: {
            name,
            id,
            image_url,
            tagline
        }
    } = props;

    return (
        <div className='beer'>
            <h5>{name}</h5>
            <p>{tagline}</p>
            <img
                src={image_url}
                alt={name}
                style={{width: '100px'}}
                onClick={() => handleDetail(id)}
            />
        </div>
    );
}

export default Beer
