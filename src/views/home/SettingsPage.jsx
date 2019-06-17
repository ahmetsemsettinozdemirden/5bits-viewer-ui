import React from "react";

// reactstrap components
import { Redirect } from "react-router-dom";
import { Row, Col, Card, CardBody, Label, Input, FormGroup, Button } from "reactstrap";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import { API_URL } from "../../config";
import Notify from "react-notification-alert";
import { createNotification } from "../../helpers/notificationHelper"

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      rePassword: ""
    };
  }

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onRePasswordChange = event => {
    this.setState({ rePassword: event.target.value });
  };

  changePassword = event => {
    if(this.state.password != this.state.rePassword) {
      createNotification("Password mismatch.", "danger", this.refs.notify)
    } else {
      fetch(`${API_URL}/password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + globalStore.token
        },
        body: JSON.stringify({
          password: this.state.password
        })
      }).then(res => {
        if (!res.ok) {
          throw res;
        }
        createNotification("Password is successfully changed!", "success", this.refs.notify)
      })
      .catch(err => {
        err.text().then(text => createNotification(text, "danger", this.refs.notify));
      });
    }
  };

  render() {
    if (globalStore.token === "") return <Redirect to="/login/login" />;
    return (
      <>
        <div className="content">
          <Notify ref="notify" />
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <form>
                    <FormGroup>
                      <Label for="password">New Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter new password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="rePassword">Re-type New Password</Label>
                      <Input
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        placeholder="Re-type new password"
                        value={this.state.rePassword}
                        onChange={this.onRePasswordChange}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={this.changePassword}>
                      Update Password
                    </Button>
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

export default view(SettingsPage);
