import 'react'
import React, { useState } from 'react';

const About = (props) => {

    return (
        <div style={{ padding: '20px' }}>
            <h2>About</h2>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" style={{ padding: 0 }} >Action</a>
                    <a class="dropdown-item" style={{ padding: 0 }} >Another action</a>
                    <a class="dropdown-item" style={{ padding: 0 }} >Something else here</a>
                </div>
            </div>
        </div>
    );
}

export default About;