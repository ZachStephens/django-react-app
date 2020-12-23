import 'bootstrap';

import React, { useState } from 'react';
import { Link } from "react-router-dom";


import '../../sass/components/menubar-styles.scss'

const MenuBar = (props) => {
    return (

        <div id="navigation-bar">
            <nav>
                <ul>
                    <li>
                        <a><Link to="/home">Home</Link></a>
                    </li>
                    <li>
                        <a><Link to="/about">About</Link></a>
                    </li>
                    <li>
                        <a><Link to="/dashboard">Dashboard</Link></a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MenuBar;