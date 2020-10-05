import React from 'react';

import './infobar.styles.scss';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

function InfoBar({ room, clearMessages }) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} alt="close" />
                </a>
            </div>
            <div className="clearMessages" onClick={clearMessages}>
                Clear Messages
            </div>
        </div>
    );
}

export default InfoBar;
