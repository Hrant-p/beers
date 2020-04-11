import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Spinner from '../Spinner/Spinner';
import Star from '../Star/Star';
import './Beer.scss';

const Beer = ({
  loading,
  handleDetail,
  handleFavourite,
  removeFromFavourite,
  beer,
  favouriteList,
}) => {
  const id = beer.get('id');
  const history = useHistory();

  return (
    <div className="beer">
      {loading && <Spinner />}
      <div className="beer-image">
        <a
          href="#!"
          target="#"
          className="icon"
          rel="noopener noreferer"
          onClick={e => {
            e.preventDefault();
            handleDetail(id, history);
          }}
        >
          <img
            src={beer.get('image_url')}
            alt={beer.get('name')}
          />
        </a>
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
};

Beer.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleDetail: PropTypes.func.isRequired,
  handleFavourite: PropTypes.func.isRequired,
  removeFromFavourite: PropTypes.func.isRequired,
  beer: PropTypes.instanceOf(Immutable.Map).isRequired,
  favouriteList: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default Beer;
