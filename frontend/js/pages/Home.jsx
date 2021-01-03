
import React from "react";
import BasicPage from './templates/BasicPage'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BasicPage name='Home'></BasicPage>
    );
  }
}
export default Home;
