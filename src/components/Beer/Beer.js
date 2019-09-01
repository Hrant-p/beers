import React, { useEffect, useState } from 'react';
import {withRouter} from "react-router";
import Spinner from "../Spinner/Spinner";
import blue from "../../img/blue-star.svg";
import yellow from  '../../img/yellow-star.svg';
import './Beer.scss';

function Beer(props) {
    const {
        loading,
        handleDetail,
        handleFavourite,
        removeFromFavourite,
        beer,
        history,
        favouriteList,
    } = props;

    const id = beer.get('id');
    const [className, setClassName] = useState('star');
    useEffect(() => {
        if (favouriteList.filter(item => item.get('id') === id).size) {
            setClassName('highlight');
        } else {
            setClassName('star');
        }
    }, [favouriteList, id]);

    let handleStarButton = className === 'star' ?
        <img
            className={className}
            src={blue}
            alt='Add to favourites'
            onClick={handleFavourite.bind(this, id)}
        /> : <img
            className={className}
            src={yellow}
            alt="Remove from favourites"
            onClick={removeFromFavourite.bind(this, id)}
        />;

    return (
        <div className='beer' key={id}>
            {loading && <Spinner/>}
            {handleStarButton}
            <h5>{beer.get('name')}</h5>
            <p>{beer.get('tagline')}</p>
            <img
                src={beer.get('image_url')}
                alt={beer.get('name')}
                style={{width: '100px'}}
                onClick={() => handleDetail(id, history)}
            />
        </div>
    );
}

export default withRouter(Beer)
