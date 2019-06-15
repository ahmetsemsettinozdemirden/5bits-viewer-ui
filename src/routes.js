import LoginPage from "./views/login/LoginPage";
import ForgotPasswordPage from "./views/login/ForgotPasswordPage";
import WeeklySchedulePage from "./views/home/WeeklySchedulePage";
import ManageCoursesPage from "./views/home/ManageCoursesPage";
import EmailListPage from "./views/home/EmailListPage";
import SendNotificationPage from "./views/home/SendNotificationPage";
import UserManagementPage from "./views/home/UserManagementPage";
import SettingsPage from "./views/home/SettingsPage";

var routes = [
  // login
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
  // home
  {
    path: "/weekly-schedule",
    name: "Weekly Schedule",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: WeeklySchedulePage,
    layout: "/admin"
  },
  {
    path: "/manage-courses",
    name: "Manage Courses",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: ManageCoursesPage,
    layout: "/admin"
  },
  {
    path: "/email-list",
    name: "Email List",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: EmailListPage,
    layout: "/admin"
  },
  {
    path: "/send-notification",
    name: "Send Notification",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: SendNotificationPage,
    layout: "/admin"
  },
  {
    path: "/user-management",
    name: "User Management",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: UserManagementPage,
    layout: "/admin"
  },
  {
    invisible: true,
    path: "/settings",
    name: "Settings",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: SettingsPage,
    layout: "/admin"
  }
];
export default routes;
