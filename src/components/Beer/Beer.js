import React from 'react';
import Spinner from "../Spinner/Spinner";

import './Beer.scss';

const Beer = ({ loading, beer: { name, id, image_url, tagline } }) => {
    let infoOrLoading = loading ? <Spinner/> : (
        <>
            <h5>{name}</h5>
            <p>{tagline}</p>
            <img src={image_url} alt={name} style={{width: '100px'}}/>
        </>
    );

    return (
        <div className='beer'>
            {infoOrLoading}
        </div>
    )
};

export default Beer
