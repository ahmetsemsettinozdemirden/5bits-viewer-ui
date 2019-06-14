import React from "react";

// reactstrap components
import { Link } from "react-router-dom";
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

export default TestPage;