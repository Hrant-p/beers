import React from 'react';

function Error({error}) {
    return (
        <p>
            Sorry, but something went wrong...
            {error && <span>{error}</span>}
        </p>
    );
}

export default Error
