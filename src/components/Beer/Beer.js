import React from 'react';
import { withRouter } from 'react-router';
import Spinner from '../Spinner/Spinner';
import Star from '../Star/Star';
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

    return (
      <div className='beer'>
        {loading && <Spinner />}
        <div className="beer-image">
          <img
            src={beer.get('image_url')}
            alt={beer.get('name')}
            onClick={() => handleDetail(id, history)}
          />
        </div>

        <Star
          id={id}
          handleFavourite={handleFavourite}
          removeFromFavourite={removeFromFavourite}
          favouriteList={favouriteList}
        />
        <h5>{beer.get('name')}</h5>
        <p>{beer.get('tagline')}</p>
      </div>
    );
}

export default withRouter(Beer);
