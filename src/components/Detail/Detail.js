import React from 'react';
import './Detail.scss';
import { withRouter } from 'react-router';
import Star from '../Star/Star';

const Detail = ({
  handleDetail,
  details,
  onClose,
  randomBeers,
  history,
  favouriteList,
  handleFavourite,
  removeFromFavourite,
}) => {
  const item = details.get(0);
  const randoms = !randomBeers ? null : randomBeers.map((beer) => (
    <div
      className="random"
      key={Math.abs(beer.get('id') * Math.random())}
    >
      <b>{beer.get('name')}</b>
      <h5>{beer.get('tagline')}</h5>
      <img
        src={beer.get('image_url')}
        alt={beer.get('name')}
        onClick={() => handleDetail(beer.get('id'), history)}
      />
    </div>
  ));

  return (
    <div className="detailContainer">
      <div className="details">
        <Star
          favouriteList={favouriteList}
          removeFromFavourite={removeFromFavourite}
          handleFavourite={handleFavourite}
          id={item.get('id')}
          random={randomBeers}
        />
        <span onClick={() => onClose(history)}>
          <i className="far fa-times-circle" />
        </span>
        <b>{item.get('name')}</b>
        <h5>{item.get('tagline')}</h5>
        <img
          src={item.get('image_url')}
          alt={item.get('name')}
        />
        <p>{item.get('description')}</p>
        <div className="random-container">
          {randoms}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Detail);
