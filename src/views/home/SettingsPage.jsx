import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  FormGroup,
  FormText,
  Button
} from "reactstrap";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import { API_URL } from "../../config";
import Notify from "react-notification-alert";

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }
  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  changePassword = event => {
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
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        var options = {
          place: "tc",
          message: (
            <div>
              <div>Password is changed</div>
            </div>
          ),
          type: "success",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 7
        };
        this.refs.notify.notificationAlert(options);
      })
      .catch(err => {
        err.text().then(text => {
          var options = {
            place: "bc",
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
    if (globalStore.token === "") return <Redirect to="/login/login" />;
    return (
      <>
        <Notify ref="notify" />;
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <form>
                    <FormGroup>
                      <Label for="exampleEmail">New Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={this.changePassword}>
                      Change
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
