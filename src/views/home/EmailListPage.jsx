import React from "react";

// reactstrap components
import { Redirect } from "react-router-dom";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import { createNotification } from "../../helpers/notificationHelper";
import CSVReader from "react-csv-reader";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  Row,
  Col,
  CardHeader,
  CardBody,
  Table,
  Modal,
  ModalFooter,
  ModalBody,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { API_URL } from "../../config";
import Notify from "react-notification-alert";

class EmailListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLists: [],
      emailModal: false,
      emailList: "",
      name: "",
      description: "",
      emails: [],
      modalMode: ""
    };
    this.toggleEmailModal = this.toggleEmailModal.bind(this);
  }

  componentDidMount() {
    console.log("mounted");
    this.getEmailLists();
  }

  getEmailLists() {
    fetch(`${API_URL}/email-list`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          emailLists: jsonData
        });
      });
  }

  addEmailList = event => {
    var isArray = Array.isArray(this.state.emails);
    var newEmails = isArray ? this.state.emails : this.state.emails.split(",");

    fetch(`${API_URL}/email-list`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        emails: newEmails
      })
    })
      .then(res => {
        if (!res.ok) throw res;
        this.getEmailLists();
        this.toggleEmailModal();
        var text = this.state.name + " successfully added";
        createNotification(text, "success", this.refs.notify);
      })
      .catch(err => {
        err.text().then(text => {
          createNotification(text, "danger", this.refs.notify);
        });
      });
  };

  editEmailList = event => {
    var isArray = Array.isArray(this.state.emails);
    var newEmails = isArray ? this.state.emails : this.state.emails.split(",");

    fetch(`${API_URL}/email-list/${this.state.emailList.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        emails: newEmails
      })
    })
      .then(res => {
        if (!res.ok) throw res;
        this.getEmailLists();
        this.toggleEmailModal();
        var text = this.state.name + " successfully edited";
        createNotification(text, "success", this.refs.notify);
      })
      .catch(err => {
        err.text().then(text => {
          createNotification(text, "danger", this.refs.notify);
        });
      });
  };

  removeEmailList = emailList => event => {
    fetch(`${API_URL}/email-list/${emailList.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      }
    })
      .then(res => {
        console.log(res, res.status, res.statusText);
        if (!res.ok) throw res;
        this.getEmailLists();
        var text = emailList.name + " successfully deleted";
        createNotification(text, "success", this.refs.notify);
      })
      .catch(err => {
        err.text().then(text => {
          createNotification({ text }, "danger", this.refs.notify);
        });
      });
  };

  openModal = (emailList, type) => event => {
    if (type === "add") {
      this.setState({
        emailList: "",
        name: "",
        description: "",
        emails: "",
        modalMode: "add"
      });
    } else {
      this.setState({
        emailList: emailList,
        name: emailList.name,
        description: emailList.description,
        emails: emailList.emails,
        modalMode: "edit"
      });
    }
    this.toggleEmailModal();
  };

  toggleEmailModal() {
    this.setState({
      emailModal: !this.state.emailModal
    });
  }

  handleFile(data) {
    console.log(this.state.emails, data);
    this.state.emails = "";
    data.forEach(element => {
      this.state.emails += element[0] + ",";
    });
    console.log(this.state.emails, data);
    this.forceUpdate();
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  onEmailsChange = event => {
    this.setState({ emails: event.target.value });
  };

  buttonType(mode) {
    if (this.state.modalMode === "add") {
      return (
        <Button color="primary" onClick={this.addEmailList}>
          Add
        </Button>
      );
    } else {
      return (
        <Button color="primary" onClick={this.editEmailList}>
          Edit
        </Button>
      );
    }
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
                  <CardTitle tag="h2">Email Lists</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">#</th>
                        <th>Email List Name</th>
                        <th>Description</th>
                        <th>Size</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.emailLists.map((emailList, index) => {
                        return (
                          <tr key={index + 1}>
                            <td className="text-center">{index + 1}</td>
                            <td>{emailList.name}</td>
                            <td>{emailList.description}</td>
                            <td>{emailList.emails.length}</td>
                            <td>
                              <Button
                                className="btn-icon btn-simple"
                                color="success"
                                size="sm"
                                value={emailList.name}
                                onClick={this.openModal(emailList, "edit")}
                              >
                                <i className="fa fa-edit" />
                              </Button>
                              {` `}
                              <Button
                                className="btn-icon btn-simple"
                                color="danger"
                                size="sm"
                                value={emailList.name}
                                onClick={this.removeEmailList(emailList)}
                              >
                                <i className="fa fa-times" />
                              </Button>
                              {` `}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Button color="primary" onClick={this.openModal(null, "add")}>
                Add New Email List
              </Button>
              <Modal
                isOpen={this.state.emailModal}
                toggle={this.toggleEmailModal}
              >
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Email List Form
                  </h5>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={this.toggleEmailModal}
                  />
                </div>
                <ModalBody>
                  <Card>
                    <CardBody>
                      <form>
                        <FormGroup>
                          <Label for="Name">Name</Label>
                          <Input
                            type="text"
                            name="name"
                            id="Name"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.onNameChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="Description">Description</Label>
                          <Input
                            type="text"
                            name="description"
                            id="Description"
                            placeholder="Enter email"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                          />
                        </FormGroup>
                        <FormGroup check>
                          <Label for="emails">Emails</Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="emailsText"
                            value={this.state.emails}
                            onChange={this.onEmailsChange}
                          />
                        </FormGroup>
                        <div>
                          Import CSV File
                          <CSVReader
                            cssClass="react-csv-input"
                            label=""
                            onFileLoaded={data => this.handleFile(data)}
                          />
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleEmailModal}>
                    Close
                  </Button>
                  {this.buttonType()}
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(EmailListPage);
