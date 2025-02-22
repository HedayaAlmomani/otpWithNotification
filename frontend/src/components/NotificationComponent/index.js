// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// const NotificationComponent = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch initial notifications from the backend
//   const fetchNotifications = async () => {
//     const token = '2|7hYBB2CbLW9xNVfnAzYLpXwCf12fnFhlyG9vXwcf'; // Replace with your token or a dynamic value
//     try {
//       const response = await Axios.get("http://localhost:8000/api/notifications", {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//       });
//       setNotifications(response.data.notifications);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       setIsLoading(false);
//     }
//   };

//   // Listen to real-time notifications using Laravel Echo
//   useEffect(() => {
//     const echo = new Echo({
//       broadcaster: "pusher",
//       key: "647617d4aeb36c0a33f7",
//       cluster: "ap2",
//       forceTLS: true,
//     });

//     // Listen for the NotificationSent event on the user's channel
//     echo.private(`user.1`).listen("NotificationSent", (event) => {
//       // Handle the notification event (update state or show a toast)
//       setNotifications((prevNotifications) => [
//         ...prevNotifications,
//         event.notification,
//       ]);
//     });

//     return () => {
//       echo.disconnect();
//     };
//   }, [userId]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const markAsRead = async (id) => {
//     try {
//       await Axios.post(`/api/notifications/${id}/read`);
//       setNotifications((prevNotifications) =>
//         prevNotifications.filter((notif) => notif.id !== id)
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading notifications...</div>;
//   }

//   return (
//     <div>
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p>No notifications</p>
//       ) : (
//         <ul>
//           {notifications.map((notif) => (
//             <li key={notif.id}>
//               <div>{notif.content}</div>
//               <button onClick={() => markAsRead(notif.id)}>Mark as read</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationComponent;

import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize Pusher with your credentials
    const pusher = new Pusher("647617d4aeb36c0a33f7", {
      // PUSHER_APP_KEY
      cluster: "ap2", // PUSHER_APP_CLUSTER
      forceTLS: true,
    });

    // Subscribe to the 'notifications' channel
    const channel = pusher.subscribe("notifications");

    // Listen for the 'new-notification' event
    channel.bind("new-notification", (data) => {
      // Add the new notification to the state
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.message,
      ]);
    });

    // Cleanup on component unmount
    return () => {
      pusher.unsubscribe("notifications");
      pusher.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeNotifications;
