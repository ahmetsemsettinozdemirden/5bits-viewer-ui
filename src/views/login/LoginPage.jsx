import React from "react";

// reactstrap components
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
import { Link, Redirect } from "react-router-dom";
import Notify from "react-notification-alert";
import { API_URL } from "../../config";
import globalStore from "../../store/globalStore";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // TODO: revert these
    this.state = {
      email: "test@email.com",
      password: "password"
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onLogin = event => {
    fetch(`${API_URL}/login`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then(body => {
        globalStore.email = this.state.email;
        globalStore.token = body.accessToken;
        this.forceUpdate();
      })
      .catch(err => {
        err.text().then(text => {
          var options = {
            place: "tc",
            message: (
              <div>
                <div>{text}</div>
              </div>
            ),
            type: "danger",
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
          };
          this.refs.notify.notificationAlert(options);
        });
      });
  };

  render() {
    if (globalStore.token) return <Redirect to="/admin/weekly-schedule" />;
    return (
      <>
        <div className="content" style={{ paddingTop: "80px" }}>
          <Notify ref="notify" />
          <Row className="justify-content-md-center">
            <Col md="4">
              <Card>
                <CardHeader>
                  <h1
                    style={{
                      font: "Poppins",
                      fontSize: "64px",
                      textAlign: "center",
                      paddingTop: "32px"
                    }}
                  >
                    5Bits Viewer
                  </h1>
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
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Password"
                        autoComplete="off"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                      />
                    </FormGroup>
                    <Button
                      style={{ width: "100%" }}
                      color="primary"
                      onClick={this.onLogin}
                    >
                      Login
                    </Button>
                    <Link
                      to={{ pathname: "/login/forgot-password" }}
                      className="btn-fill btn btn-secondary"
                      style={{ width: "100%", marginLeft: "1px" }}
                    >
                      Forgot Password
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

export default LoginPage;
