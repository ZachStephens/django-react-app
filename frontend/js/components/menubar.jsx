import React, { useState } from 'react';
import { Link } from "react-router-dom";


import bisonBanner from '../../res/bisonBanner.jpg';


import '../../sass/components/menubar-styles.scss'



const MenuBar = (props) => {

    const { banner, ...rest } = props

    let bannerImage = (banner) ?
        <nav-image-container>
            <img src={bisonBanner} className="image-center" alt="Responsive image" />
        </nav-image-container> : <></>

    return (
        <>
            {bannerImage}
            <div id="navigation-bar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/CircleGame">CircleGame</Link>
                        </li>
                        <li>
                            <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
                        </li>
                        <li>
                            <Link to="/JudesFavorite">Jude's Favorite</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default MenuBar;