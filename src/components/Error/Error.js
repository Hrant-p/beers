import React, { useState, useEffect } from 'react';
import './Error.scss';

function Error({ message, stack }) {
    const [showSection, setShowSection] = useState({ display: 'block' });
    useEffect(() => {
        if (message || stack) {
            setTimeout(() => {
                setShowSection({ display: 'none' });
            }, 4000);
        }
    }, [message, stack]);

    return (
      <section id="error" style={showSection}>
        <h2>
          {message}
        </h2>
        <span>
          {stack}
        </span>
      </section>
    );
}

export default Error;
