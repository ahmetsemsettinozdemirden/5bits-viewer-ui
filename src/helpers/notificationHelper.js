import React from "react";

export const createNotification = (text, type, ref) => {
  var options = {
    place: "bc",
    message: (
      <div>
        <div>{text}</div>
      </div>
    ),
    type: type,
    icon: "tim-icons icon-bell-55",
    autoDismiss: 7
  };
  ref.notificationAlert(options);
}