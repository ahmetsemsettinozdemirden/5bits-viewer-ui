import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Row,
  Col
} from "reactstrap";
import { view } from 'react-easy-state'
import globalStore from '../../store/globalStore'

class ManageCoursesPage extends React.Component {
  constructor(props) {
    super(props);
    // TO DO: get json file from backend
    this.state = {
      courses: [
        {
          "courseCode":"CENG113",
          "courseName":"Programming Basics",
          "lecturerName":"Nesli Erdogmus",
          "isOffered":"Yes"
        },
        {
          "courseCode":"CENG312",
          "courseName":"Computer Networks",
          "lecturerName":"Tolga Ayav",
          "isOffered":"No"
        }
      ]
    };
  }

  render() {
    if(globalStore.token === '') return <Redirect to="/login/login" />
    return (
      <>
        <div className="content">
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
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Lecturer Name</th>
                        <th>Is Offered</th>
                        <th className="text-center" />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.courses.map((course, index) => {
                        return (
                          <tr key={index}>
                            <td>{course.courseCode}</td>
                            <td>{course.courseName}</td>
                            <td>{course.lecturerName}</td>
                            <td>{course.isOffered}</td>
                            <td className="text-center">
                              <Link
                                to={{
                                  // TO DO: edit user profile page
                                  pathname: "admin/user-profile",
                                  course: course
                                }}
                                className="btn-fill btn btn-primary"
                              >
                                Edit
                              </Link>
                              &nbsp;&nbsp;&nbsp;
                              <button
                                className="btn-fill btn btn-primary"
                                onClick={() => window.location.reload()}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Link
                to={{
                  // TO DO: edit user profile page
                  pathname: "admin/user-profile",
                  data: "ree"
                }}
                className="btn-fill btn btn-primary"
              >
                Add New Course
              </Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default view(ManageCoursesPage);