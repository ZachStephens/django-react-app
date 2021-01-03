

import React from "react";
import MenuBar from '../../components/menubar'


class BasicPage extends React.Component {
    constructor(props) {
        super(props);
        const { focused, ...rest } = props
        this.focused = focused
        this.state = {
            nameId: props.name
        };
    }


    render() {
        return (
            <div>
                <MenuBar banner={!this.focused} />
                <div style={{ padding: '20px' }}>
                    <h1 style={{ textAlign: 'center' }}>{this.state.nameId}</h1>
                </div>
            </div>
        );
    }
}

export default BasicPage;