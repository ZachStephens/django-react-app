
import React from "react";
import BasicPage from './templates/BasicPage'

import grapeImage from '../../res/Grape.jpg';


class JudesFavorite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <BasicPage name="Jude's Favorite"></BasicPage>
                <nav-image-container>
                    <img src={grapeImage} className="image-center" alt="Responsive image" />
                </nav-image-container>
            </>
        );
    }
}
export default JudesFavorite;