import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Label, Input, Button, Card, CardHeader, CardTitle, CardBody, Modal, ModalBody, ModalFooter, Table, Row, Col } from "reactstrap";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import { API_URL } from "../../config";
import { createNotification } from "../../helpers/notificationHelper"
import Notify from "react-notification-alert";

class ManageCoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
      isAddCourseModalOpen: false,
      addCourseCode: "",
      addCourseName: "",
      addCourseInstructors: "",
      addCourseAssistants: "",
      addCourseCredits: "",
      addCourseIsOffered: false,
      addCourseLab: false,
      isEditCourseModalOpen: false,
      editCourseCode: "",
      editCourseName: "",
      editCourseInstructors: "",
      editCourseAssistants: "",
      editCourseCredits: "",
      editCourseIsOffered: false,
      editCourseLab: false
    };
  }

  componentDidMount() {
    this.getAllCourses()
  }

  getAllCourses = () => {
    fetch(`${API_URL}/course`)
      .then(res => res.json())
      .then(courses => this.setState({ courses }));
  }
  
  addCourseModalToggle = () => {
    this.setState({
      isAddCourseModalOpen: !this.state.isAddCourseModalOpen,
      addCourseCode: "",
      addCourseName: "",
      addCourseInstructors: "",
      addCourseAssistants: "",
      addCourseCredits: "",
      addCourseIsOffered: false,
      addCourseLab: false,
    });
  }
  
  addCourse = () => {
    fetch(`${API_URL}/course/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        code: this.state.addCourseCode,
        name: this.state.addCourseName,
        instructors: this.state.addCourseInstructors,
        assistants: this.state.addCourseAssistants,
        credit: this.state.addCourseCredits,
        status: this.state.addCourseIsOffered,
        laboratory: this.state.addCourseLab,
      })
    }).then(res => {
      this.addCourseModalToggle()
      if (!res.ok) 
        throw res;
      this.getAllCourses()
      createNotification(this.state.addCourseCode + " succesfully added!", "success", this.refs.notify);
    }).catch(err => {
      err.text().then(text => createNotification(text, "danger", this.refs.notify));
    });
  }
  
  editCourseModalToggle = () => {
    this.setState({
      isEditCourseModalOpen: !this.state.isEditCourseModalOpen,
      editCourseCode: "",
      editCourseName: "",
      editCourseInstructors: "",
      editCourseAssistants: "",
      editCourseCredits: "",
      editCourseIsOffered: false,
      editCourseLab: false
    });
  }
  editCourseModalOpen = () => {

    // editCourseCode: "",
    // editCourseName: "",
    // editCourseInstructors: "",
    // editCourseAssistants: "",
    // editCourseCredits: "",
    // editCourseIsOffered: false,
    // editCourseLab: false
  }
  
  editCourse = () => {
    fetch(`${API_URL}/course/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      },
      body: JSON.stringify({
        code: this.state.addCourseCode,
        name: this.state.addCourseName,
        instructors: this.state.addCourseInstructors,
        assistants: this.state.addCourseAssistants,
        credit: this.state.addCourseCredits,
        status: this.state.addCourseIsOffered,
        laboratory: this.state.addCourseLab,
      })
    }).then(res => {
      if (!res.ok) 
        throw res;
      this.getAllCourses()
      createNotification(this.state.addCourseCode + " succesfully added!", "success", this.refs.notify);
    }).catch(err => {
      err.text().then(text => createNotification(text, "danger", this.refs.notify));
    });
  }

  deleteCourse = (code) => {
    fetch(`${API_URL}/course/${code}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalStore.token
      }
    }).then(res => {
      if (!res.ok) 
        throw res;
      this.getAllCourses()
      createNotification(code + " succesfully deleted!", "success", this.refs.notify);
    }).catch(err => {
      err.text().then(text => createNotification(text, "danger", this.refs.notify));
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
                  <CardTitle tag="h2">Courses</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Instructors</th>
                        <th>Assistants</th>
                        <th>Credits</th>
                        <th>Is Offered</th>
                        <th>Lab</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.courses != null && this.state.courses.map(course => {
                        return (
                          <tr key={course.id}>
                            <td>{course.code}</td>
                            <td>{course.name}</td>
                            <td>{course.instructors}</td>
                            <td>{course.assistants}</td>
                            <td>{course.credit}</td>
                            <td>{course.status ? "Yes" : "No"}</td>
                            <td>{course.laboratory ? "Yes" : "No"}</td>
                            <td>
                            <Button color="primary" onClick={this.toggleEditCourseModal} style={{marginRight: "8px"}}>Edit</Button>
                            <Button color="primary" onClick={() => this.deleteCourse(course.code)}>Delete</Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              {/* add new course modal */}
              <Button color="primary" onClick={this.addCourseModalToggle}>Add New Course</Button>
              <Modal isOpen={this.state.isAddCourseModalOpen} toggle={this.addCourseModalToggle}>
                <div className="modal-header">
                  <h5 className="modal-title" id="addCourseModalLabel">
                    Add New Course
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={this.addCourseModalToggle}>
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </div>
                <ModalBody>
                  <form>


                  {/* code: this.state.addCourseCode,
                  name: this.state.addCourseName,
                  instructors: this.state.addCourseInstructors,
                  assistants: this.state.addCourseAssistants,
                  credit: this.state.addCourseCredits,
                  status: this.state.addCourseIsOffered,
                  laboratory: this.state.addCourseLab, */}

                    <FormGroup>
                      <Label for="code">Code</Label>
                      <Input type="text" name="code" id="code" placeholder="Code" style={{color: "#222"}} 
                        value={this.state.addCourseCode} onChange={(e) => this.setState({addCourseCode: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="code">Name</Label>
                      <Input type="text" name="code" id="code" placeholder="Name" style={{color: "#222"}}
                        value={this.state.addCourseName} onChange={(e) => this.setState({addCourseName: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="code">Instructors</Label>
                      <Input type="text" name="code" id="code" placeholder="Instructors" style={{color: "#222"}}
                        value={this.state.addCourseInstructors} onChange={(e) => this.setState({addCourseInstructors: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="code">Assistants</Label>
                      <Input type="text" name="code" id="code" placeholder="Assistants" style={{color: "#222"}}
                        value={this.state.addCourseAssistants} onChange={(e) => this.setState({addCourseAssistants: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="code">Credits</Label>
                      <Input type="number" name="code" id="code" placeholder="Credits" style={{color: "#222"}}
                        value={this.state.addCourseCredit} onChange={(e) => this.setState({addCourseCredit: e.target.value})}/>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" checked={this.state.addCourseIsOffered}
                          onChange={(e) => this.setState({addCourseIsOffered: !this.state.addCourseIsOffered})}/>{' '}
                        Is Offered
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" checked={this.state.addCourseLab}
                          onChange={(e) => this.setState({addCourseLab: !this.state.addCourseLab})}/>{' '}
                        Lab
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.addCourseModalToggle}>
                        Close
                    </Button>
                    <Button color="primary" onClick={this.addCourse}>
                        Add Course
                    </Button>
                </ModalFooter>
              </Modal>
              {/* edit course modal */}
              {/* <Modal isOpen={this.state.modalDemo} toggle={this.toggleModalDemo}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                      onClick={this.toggleModalDemo}>
                      <i className="tim-icons icon-simple-remove" />
                    </button>
                  </div>
                  <ModalBody>
                      <p>Woohoo, you're reading this text in a modal!</p>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="secondary" onClick={this.toggleModalDemo}>
                          Close
                      </Button>
                      <Button color="primary">
                          Save changes
                      </Button>
                  </ModalFooter>
              </Modal> */}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(ManageCoursesPage);
