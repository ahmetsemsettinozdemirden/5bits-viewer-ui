import Dashboard from "views/Dashboard.jsx";
import Icons from "views/Icons.jsx";
import Map from "views/Map.jsx";
import Notifications from "views/Notifications.jsx";
import Rtl from "views/Rtl.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";
import TestPage from "./views/home/TestPage";
import InvTestPage from "./views/home/InvTestPage";
import LoginPage from "./views/login/LoginPage";
import CourseTable from "./views/CourseTable";

var routes = [
  {
    invisible: true,
    path: "/login",
    name: "Login Page",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: LoginPage,
    layout: "/login"
  },
  {
    invisible: true,
    path: "/forgot-password",
    name: "Forgot Password Page",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: ForgotPasswordPage,
    layout: "/login"
  },
  {
    path: "/test",
    name: "Test Page",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: TestPage,
    layout: "/admin"
  },
  {
    invisible: true,
    path: "/inv-test",
    name: "Invisible Test Page",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: InvTestPage,
    layout: "/admin"
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/course-table",
    name: "course table",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: CourseTable,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl"
  }
];
export default routes;
