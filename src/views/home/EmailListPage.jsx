import React from "react";

// reactstrap components
import { Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { view } from 'react-easy-state'
import globalStore from '../../store/globalStore'

class EmailListPage extends React.Component {
  render() {
    if(globalStore.token === '') return <Redirect to="/login/login" />
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            EmailListPage
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(EmailListPage);