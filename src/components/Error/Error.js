import React from 'react';

function Error({ message, stack }) {
    return (
        <section style={{textAlign: 'center'}}>
            <h2>
                {message}
            </h2>
            <span>
                {stack}
            </span>
        </section>
    );
}

export default Error
