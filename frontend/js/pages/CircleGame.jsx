
import React from "react";
import BasicPage from './templates/BasicPage'
import MyCanvas from '../components/myCanvas'

import CircleGameDrawer from '../components/circlegame/circlegame.js'

import '../../sass/components/myCanvas-styles.scss'



class CircleGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { game: new CircleGameDrawer() }
    }

    render() {
        return (
            <div>
                <BasicPage name='CircleGame' focused={true} />
                <MyCanvas drawer={this.state.game} ></MyCanvas>
                {/* <div style={{ height: "20px" }}></div> */}
            </div >
        );
    }
}
export default CircleGame;