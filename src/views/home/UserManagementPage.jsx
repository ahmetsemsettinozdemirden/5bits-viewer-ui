import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { view } from 'react-easy-state'
import globalStore from '../../store/globalStore'

class UserManagementPage extends React.Component {
  render() {
    if(globalStore.token === '') return <Redirect to="/login/login" />
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            UserManagementPage
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(UserManagementPage);