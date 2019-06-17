import React from "react";

// reactstrap components
import { Redirect } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, Row, Col, CardHeader, CardBody, 
  Table, Modal, ModalFooter, ModalBody, Input, FormGroup, Label } from "reactstrap";
import { view } from 'react-easy-state'
import globalStore from '../../store/globalStore'
import { API_URL } from "../../config";
import { createNotification } from "../../helpers/notificationHelper"
import Notify from "react-notification-alert";

class SendNotificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmailList: null,
      emailLists: null,
      selectedEvent: null,
      events: null
    };
  }

  componentDidMount() {
    this.getEmailLists()
    this.getEvents()
  }

  getEmailLists = () => {
    fetch(`${API_URL}/email-list`)
      .then(res => res.json())
      .then(emailLists => this.setState({ emailLists, selectedEmailList: emailLists[0].id }));
  }

  getEvents = () => {
    fetch(`${API_URL}/events`)
      .then(res => {
        if (!res.ok) 
          throw res;
        return res.json()
      })
      .then(events => this.setState({ events, selectedEvent: events[0].id }))
      .catch(err => {
        err.text().then(text => createNotification(text, "danger", this.refs.notify));
      });
  }

  sendNotification = () => {
    fetch(`${API_URL}/send-notification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        eventId: this.state.selectedEvent,
        emailListIds: [this.state.selectedEmailList],
      })
    }).then(res => {
      if (!res.ok) 
        throw res;
      createNotification("Notifications succesfully sent!", "success", this.refs.notify);
    }).catch(err => {
      err.text().then(text => createNotification(text, "danger", this.refs.notify));
    });
  }

  render() {
    if(globalStore.token === '') return <Redirect to="/login/login" />
    return (
      <>
        <div className="content">
          <Notify ref="notify" />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Send Notification{this.state.selectedEmailList} - {this.state.selectedEvent}</CardTitle>
                </CardHeader>
                <CardBody>
                  {this.state.selectedEmailList != null &&
                    <form>
                      <FormGroup>
                        <Label for="emailListSelect">Email List</Label>
                        <Input type="select" name="emailListSelect" id="emailListSelect" value={this.state.selectedEmailList}
                          onChange={e => this.setState({selectedEmailList: e.target.value})}>
                          {this.state.emailLists.map(emailList => {
                            return (
                              <option key={emailList.id} value={emailList.id}>{emailList.name}</option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </form>
                  }
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th />
                        <th>Title</th>
                        <th>Body</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.selectedEvent != null && this.state.events.map(event => {
                        return (
                          <tr key={event.id}>
                            <td>
                              <FormGroup check inline className="form-check-radio">
                                <Label className="form-check-label">
                                    <Input type="radio" name="exampleRadios1" id="exampleRadios11"
                                      value={event.id} checked={event.id === this.state.selectedEvent} onChange={e => this.setState({selectedEvent: e.target.value})}/>
                                    <span className="form-check-sign"></span>
                                </Label>
                              </FormGroup>
                            </td>
                            <td>{event.title}</td>
                            <td>{event.body}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Button color="primary" onClick={this.sendNotification}>
                Send Notification
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(SendNotificationPage);