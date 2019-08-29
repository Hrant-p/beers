import React from 'react';
import Spinner from "../Spinner/Spinner";

import './Beer.scss';

function Beer(props) {
    const {
        loading,
        handleDetail,
        handleFavourite,
        clearFavourite,
        removeFromFavourite,
        beer
    } = props;

    return (
        <>
            {loading && <Spinner/>}
            <div className='beer'>
                <button onClick={() => handleFavourite(beer.get('id'))}>
                    Add
                </button>
                <button onClick={() => removeFromFavourite(beer.get('id'))}>
                    remove
                </button>
                <button onClick={clearFavourite}>
                    clear
                </button>

                <h5>{beer.get('name')}</h5>
                <p>{beer.get('tagline')}</p>
                <img
                    src={beer.get('image_url')}
                    alt={beer.get('name')}
                    style={{width: '100px'}}
                    onClick={() => handleDetail(beer.get('id'))}
                />
            </div>
        </>

    );
}

export default Beer
