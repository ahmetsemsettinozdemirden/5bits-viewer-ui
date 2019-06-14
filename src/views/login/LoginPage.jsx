import React from "react";

// reactstrap components
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

class LoginPage extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            Login Page
            </Col>
          </Row>
          <Row>
            <Link to={{ 
                pathname:"/admin/test", 
                data: "asd"
                }} className="btn-fill btn btn-primary">Go to test page...</Link>
          </Row>
        </div>
      </>
    );
  }
}

export default LoginPage;