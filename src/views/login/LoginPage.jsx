import React from "react";

// reactstrap components
import { Link } from "react-router-dom";
import { 
  Row, 
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

class LoginPage extends React.Component {
  render() {
    return (
      <>
        <div className="content" style={{paddingTop: "80px"}}>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Card>
                <CardHeader>
                  <h1 style={{font: "Poppins", fontSize:"64px", textAlign: "center", paddingTop: "32px"}}>5Bits Viewer</h1>
                </CardHeader>
                <CardBody>
                  <form>
                    <FormGroup>
                      <Label for="exampleEmail">Email address</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Enter email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Password"
                        autoComplete="off"
                      />
                    </FormGroup>
                    <Button style={{width: "100%"}} color="primary">
                      Login
                    </Button>
                    <Button style={{width: "100%", marginLeft: "1px"}} color="secondary">
                      Forgot Password
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Link to={{ 
                pathname:"/admin/test", 
                data: "asd"
                }} className="btn-fill btn btn-primary">Go to test page...</Link>
          </Row> */}
        </div>
      </>
    );
  }
}

export default LoginPage;