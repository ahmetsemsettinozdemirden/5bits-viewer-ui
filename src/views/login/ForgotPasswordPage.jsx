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

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onSendCode = (event) => {
    
  }

  render() {
    return (
      <>
        <div className="content" style={{paddingTop: "80px"}}>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Card>
                <CardHeader>
                  <h1 style={{font: "Poppins", fontSize:"48px", textAlign: "center", paddingTop: "32px"}}>5Bits Viewer</h1>
                  <h2 style={{font: "Poppins", fontSize:"32px", textAlign: "center", paddingTop: "0px"}}>Forgot Password</h2>
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
                        value={this.state.email}
                        onChange={this.onEmailChange}
                      />
                    </FormGroup>
                    <Button style={{width: "100%"}} color="primary" onClick={this.onSendCode}>
                      Send Code
                    </Button>
                    <Link to={{pathname:"/login/login"}} className="btn-fill btn btn-secondary" style={{width: "100%", marginLeft: "1px"}}> 
                      Go to Login
                    </Link>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ForgotPasswordPage;