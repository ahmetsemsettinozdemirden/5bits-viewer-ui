import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class InvTestPage extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            Invisible Test Page
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default InvTestPage;