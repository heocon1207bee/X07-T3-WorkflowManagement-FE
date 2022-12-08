import React from 'react';
import './Overlay.style.scss'

const Overlay = (props) => {
    return (
        <div className='overlay' onClick={props.handleRoleButton}>
            {props.children}
        </div>
    );
};

export default Overlay;