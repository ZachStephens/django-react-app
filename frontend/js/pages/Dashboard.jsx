
import React from "react";
import BasicPage from './templates/BasicPage'




class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <BasicPage name='Dashboard'></BasicPage>
    }
}
export default Dashboard;