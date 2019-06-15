import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { view } from 'react-easy-state'
import globalStore from '../../store/globalStore'

class TestPage extends React.Component {
  render() {
    if(globalStore.token === '') return <Redirect to="/login/login" />
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            Test Page<br />
            email: {globalStore.email}<br />
            token: {globalStore.token}
            </Col>
          </Row>
          <Row>
            <Link to={{ 
                pathname:"/admin/inv-test", 
                data: "asd"
                }} className="btn-fill btn btn-primary">Go to inv page...</Link>
          </Row>
        </div>
      </>
    );
  }
}

export default view(TestPage);