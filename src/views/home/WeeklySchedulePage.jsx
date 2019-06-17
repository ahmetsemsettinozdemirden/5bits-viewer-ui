import React from "react";

// reactstrap components
import { Redirect } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, Row, Col, CardHeader, CardBody, 
  Table, Modal, ModalFooter, ModalBody, Input, FormGroup, Label } from "reactstrap";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import classnames from "classnames";
import { API_URL } from "../../config";
import Notify from "react-notification-alert";

class WeeklySchedulePage extends React.Component {
  constructor(props) {
    super(props);
    //this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      weeklyScheduleNodes: [],
      offeredCourses: [],
      courseModal: false,
      course: "",
      node: ""
    };
    this.toggleCourseModal = this.toggleCourseModal.bind(this);
  }

  getWeeklySchedule() {
    fetch(`${API_URL}/weekly-schedule-node`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          weeklyScheduleNodes: jsonData
        });
      });
  }

  getOfferedCourses() {
    fetch(`${API_URL}/course/offered`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          offeredCourses: jsonData
        });
      });
  }

  componentDidMount() {
    this.getWeeklySchedule();
    this.getOfferedCourses();
  }

  openModal = node => event => {
    this.setState({ node: node });
    this.toggleCourseModal();
  };

  addCourse = event => {
    var node = this.state.node;
    var course = this.state.course;
    console.log(node, course);
    node.courses.push(course);
    this.updateWeeklyScheduleNode(node, course, "added to");
    this.toggleCourseModal();
  };

  removeCourse = (node, course) => event => {
    console.log(node, course);
    var index = node.courses.indexOf(course);
    console.log(index);
    if (index !== -1) {
      node.courses.splice(index, 1);
      console.log(node, course, "removed from");
    }
    this.updateWeeklyScheduleNode(node, course, "removed from");
  };

  updateWeeklyScheduleNode(node, course, modeText) {
    fetch(`${API_URL}/weekly-schedule-node`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        section: node.section,
        day: node.day,
        hour: node.hour,
        courses: node.courses
      })
    })
      .then(res => {
        if (!res.ok) throw res;
        this.getWeeklySchedule();
        var options = {
          place: "bc",
          message: (
            <div>
              {course} succesfully {modeText} {node.section}, {node.day},{" "}
              {node.hour}
            </div>
          ),
          type: "success",
          icon: "tim-icons icon-bell-55",
          autoDismiss: 4
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
  }

  onCourseChange = event => {
    this.setState({ course: event.target.value });
  };

  toggleCourseModal() {
    this.setState({
      courseModal: !this.state.courseModal
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  createHead() {
    return (
      <thead>
        <tr>
          <th />
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </thead>
    );
  }

  createTable(section) {
    console.log("Section", section);
    var hours = [
      "08:45 - 09:30",
      "09:45 - 10:30",
      "10:45 - 11:30",
      "11:45 - 12:30",
      "13:30 - 14:15",
      "14:30 - 15:15",
      "15:30 - 16:15",
      "16:30 - 17:15"
    ];
    var sectionNodes = this.state.weeklyScheduleNodes.slice(
      section * 40,
      section * 40 + 40
    );
    console.log(sectionNodes);
    return (
      <tbody>
        {hours.map((hour, i) => {
          var hourNodes = sectionNodes.slice(i * 5, i * 5 + 5);
          //console.log(hourNodes);
          return (
            <tr key={i}>
              <td>{hour}</td>
              {hourNodes.map((node, index) => {
                if (node.courses != null) {
                  return (
                    <td key={index}>
                      {node.courses.map((course, index) => {
                        return (
                          <div key={index}>
                            {course}
                            {"                    "}
                            <Button
                              className="btn-round btn-icon"
                              size="sm"
                              color="danger"
                              onClick={this.removeCourse(node, course)}
                            >
                              <i className="tim-icons icon-simple-remove" />
                            </Button>
                          </div>
                        );
                      })}
                      <Button
                        className="btn-round btn-icon"
                        size="sm"
                        color="success"
                        onClick={this.openModal(node)}
                      >
                        <i className="tim-icons icon-simple-add" />
                      </Button>
                    </td>
                  );
                } else {
                  return (
                    <td key={index}>
                      <Button
                        className="btn-round btn-icon"
                        size="sm"
                        color="info"
                      >
                        <i className="tim-icons icon-simple-add" />
                      </Button>
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    if (globalStore.token === "") return <Redirect to="/login/login" />;
    return (
      <div className="content">
        <Notify ref="notify" />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      <CardTitle tag="h2">First Year</CardTitle>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      <CardTitle tag="h2">Second Year</CardTitle>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3"
                      })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      <CardTitle tag="h2">Third Year</CardTitle>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4"
                      })}
                      onClick={() => {
                        this.toggle("4");
                      }}
                    >
                      <CardTitle tag="h2">Fourth Year</CardTitle>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "5"
                      })}
                      onClick={() => {
                        this.toggle("5");
                      }}
                    >
                      <CardTitle tag="h2">Graduate</CardTitle>
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Table>
                      {this.createHead()}
                      {this.createTable(0)}
                    </Table>
                  </TabPane>
                  <TabPane tabId="2">
                    <Table>
                      {this.createHead()}
                      {this.createTable(1)}
                    </Table>
                  </TabPane>
                  <TabPane tabId="3">
                    <Table>
                      {this.createHead()}
                      {this.createTable(2)}
                    </Table>
                  </TabPane>
                  <TabPane tabId="4">
                    <Table>
                      {this.createHead()}
                      {this.createTable(3)}
                    </Table>
                  </TabPane>
                  <TabPane tabId="5">
                    <Table>
                      {this.createHead()}
                      {this.createTable(4)}
                    </Table>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
            <Modal
              isOpen={this.state.courseModal}
              toggle={this.toggleCourseModal}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Course Form
                </h5>
                <Button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={this.toggleCourserModal}
                />
              </div>
              <ModalBody>
                <Card>
                  <CardBody>
                    <form>
                      {this.state.offeredCourses.map((course, index) => {
                        return (
                          <FormGroup
                            key={index}
                            check
                            inline
                            className="form-check-radio"
                          >
                            <Label className="form-check-label">
                              <Input
                                type="radio"
                                name="exampleRadios1"
                                id="exampleRadios11"
                                value={course.code}
                                onChange={this.onCourseChange}
                              />
                              {course.code}
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </form>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleCourseModal}>
                  Close
                </Button>
                <Button color="primary" onClick={this.addCourse}>
                  Add
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default view(WeeklySchedulePage);
