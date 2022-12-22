import React from 'react';
import './Overlay.style.scss'

const Overlay = (props) => {
    return (
        <>
            <div className='overlay' style={{visibility:`${props.overlay?'visible':'hidden'}`, opacity:`${props.overlay?'1':'0'}`}} onClick={e => props.handleOverlay(e)}>
                {props.children}
            </div>
        </>
    );
};

export default Overlay;