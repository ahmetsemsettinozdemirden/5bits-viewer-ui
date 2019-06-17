import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Button, Modal, ModalFooter, ModalBody, Card, CardHeader, CardTitle, CardBody, 
  Table, Input, FormGroup, Label } from "reactstrap";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import { API_URL } from "../../config";
import Notify from "react-notification-alert";

class UserManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      contentManagers: [],
      usrModal: false
    };
    this.toggleusrModal = this.toggleusrModal.bind(this);
  }

  componentDidMount() {
    console.log("mounted");
    this.getContentManagers();
  }

  getContentManagers() {
    fetch(`${API_URL}/content-managers`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      }
    }).then(res => {
      if (!res.ok) throw res;
      return res.json();
    }).then(body => {
      this.setState({ contentManagers: body });
    }).catch(err => {
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
  }

  addContentManager = event => {
    fetch(`${API_URL}/add-content-manager`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        this.getContentManagers();
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

  deleteContentManager = item => event => {
    fetch(`${API_URL}/remove-content-manager`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        email: item.email
      })
    })
      .then(res => {
        if (!res.ok) throw res;
        this.getContentManagers();
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
            autoDismiss: 4
          };
          this.refs.notify.notificationAlert(options);
        });
      });
  };

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  toggleusrModal() {
    this.setState({
      usrModal: !this.state.usrModal
    });
  }

  render() {
    if (globalStore.token === "") return <Redirect to="/login/login" />;
    return (
      <>
        <div className="content">
          <Notify ref="notify" />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Content Managers</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="text-center" />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.contentManagers.map(
                        (contentManager, index) => {
                          return (
                            <tr key={index}>
                              <td>{contentManager.name}</td>
                              <td>{contentManager.email}</td>
                              <td className="text-center">
                                <Button
                                  className="btn-icon btn-simple"
                                  color="danger"
                                  size="sm"
                                  value={contentManager.name}
                                  onClick={this.deleteContentManager(
                                    contentManager
                                  )}
                                >
                                  <i className="fa fa-times" />
                                </Button>
                                {` `}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Button color="primary" onClick={this.toggleusrModal}>
                Add New Content Manager
              </Button>
              <Modal isOpen={this.state.usrModal} toggle={this.toggleusrModal}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Content Manager Form
                  </h5>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={this.toggleusrModal}
                  />
                </div>
                <ModalBody>
                  <Card>
                    <CardBody>
                      <form>
                        <FormGroup>
                          <Label for="Name">Name</Label>
                          <Input
                            type="name"
                            name="name"
                            id="Name"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.onNameChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="Email">Email Address</Label>
                          <Input
                            type="email"
                            name="email"
                            id="Email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="Password">Default Password</Label>
                          <Input
                            type="password"
                            name="password"
                            id="Password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                          />
                        </FormGroup>
                      </form>
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleusrModal}>
                    Close
                  </Button>
                  <Button color="primary" onClick={this.addContentManager}>
                    Add
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(UserManagementPage);
