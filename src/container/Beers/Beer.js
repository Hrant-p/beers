import React from 'react';

const Beer = ({ beer: { name, image_url, tagline } }) => {

    return (
        <div className='beer'>
            <h5>{name}</h5>
            <p>{tagline}</p>
            <img src={image_url} alt={name} style={{width: '100px'}}/>
        </div>
    )
};

export default Beer
