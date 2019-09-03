import React, {useEffect, useState} from 'react';
import blue from "./img/blue-star.svg";
import yellow from "./img/yellow-star.svg";

function Star(props) {
    const {
        id,
        favouriteList,
        handleFavourite,
        removeFromFavourite,
        details,
    } = props;

    const [className, setClassName] = useState('star');

        useEffect(() => {
            favouriteList.filter(item => item.get('id') === id).size > 0 ?
            setClassName('highlight') :
            setClassName('star');
    }, [favouriteList, id, details]);

    let starIcon = className === 'star' ?
        <img
            className={className}
            src={blue}
            alt='Add to favourites'
            onClick={() => handleFavourite(id)}
        /> : <img
            className={className}
            src={yellow}
            alt="Remove from favourites"
            onClick={() => removeFromFavourite(id)}
        />;

    return <span className="">
        {starIcon}
    </span>
}

export default Star
