import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class TestPage extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            Test Page
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default TestPage;