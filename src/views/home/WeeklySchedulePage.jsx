import React from "react";

// reactstrap components
import { Link, Redirect } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardHeader,
  CardBody,
  Table
} from "reactstrap";
import { view } from "react-easy-state";
import globalStore from "../../store/globalStore";
import classnames from "classnames";
import { API_URL } from "../../config";

class WeeklySchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      weeklyScheduleNodes: []
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/weekly-schedule-node`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          weeklyScheduleNodes: jsonData
        });
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  boom() {
    return (
      <tr>
        <td>
          <strong>09:45 &ndash; 10:30</strong>
        </td>
        <td>CENG 504</td>
        <td>CENG 505</td>
        <td>
          CENG 533
          <br />
          CENG 525
        </td>
        <td>
          CENG 611
          <br />
          CENG 541
        </td>
        <td>CENG 506</td>
      </tr>
    );
  }

  interesting(course) {
    return course + "\br";
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
                        return <div key={index}>{course}</div>;
                      })}
                    </td>
                  );
                } else {
                  return <td key={index} />;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    );

    /*hours.forEach(hour => {
      
        return (
          <tr><td>{hour}</td>
            {this.state.weeklyScheduleNodes[nodeCounter].courses.map((course) => {
              return (
                <td>{course}</td>
              );
            })}
          </tr>
        );

    })*/
  }

  render() {
    //if(globalStore.token === '') return <Redirect to="/login/login" />
    return (
      <div className="content">
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
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Table>
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
                      <tbody>
                        <tr>
                          <td>
                            <strong>08:45 &ndash; 09:30</strong>
                          </td>
                          <td>ENG 102</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>09:45 &ndash; 10:30</strong>
                          </td>
                          <td>ENG 102</td>
                          <td>CENG 112</td>
                          <td>ECON 106</td>
                          <td>MATH 144</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>10:45 &ndash; 11:30</strong>
                          </td>
                          <td>ENG 102</td>
                          <td>CENG 112</td>
                          <td>ECON 106</td>
                          <td>MATH 144</td>
                          <td>MATH 142</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>11:45 &ndash; 12:30</strong>
                          </td>
                          <td>&nbsp;</td>
                          <td>CENG 112</td>
                          <td>ECON 106</td>
                          <td>MATH 144</td>
                          <td>MATH 142</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>13:30 &ndash; 14:15</strong>
                          </td>
                          <td>MATH 142</td>
                          <td>&nbsp;</td>
                          <td>PHYS 122</td>
                          <td>&nbsp;</td>
                          <td>CENG 114</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>14:30 &ndash; 15:15</strong>
                          </td>
                          <td>MATH 142</td>
                          <td>&nbsp;</td>
                          <td>PHYS 122</td>
                          <td>&nbsp;</td>
                          <td>CENG 114</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>15:30 &ndash; 16:15</strong>
                          </td>
                          <td>MATH 142</td>
                          <td>PHYS 122</td>
                          <td>PHYS 122</td>
                          <td>PHYS 122</td>
                          <td>CENG 114</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>16:30 &ndash; 17:15</strong>
                          </td>
                          <td>&nbsp;</td>
                          <td>PHYS 122</td>
                          <td>&nbsp;</td>
                          <td>PHYS 122</td>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="2">
                    <Table>
                      <tbody>{this.boom()}</tbody>
                    </Table>
                    <p>a</p>
                  </TabPane>
                  <TabPane tabId="3">
                    <Table>{this.createTable(0)}</Table>
                    <p>a</p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default view(WeeklySchedulePage);
