import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import Pusher from "pusher-js";
import "./style.scss";
import httpServices from "../../common/httpServices";

const API_URL = "https://your-api.com/notifications"; // استبدل بعنوان API الخاص بك

const NotificationBox = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);


  const fetchNotifications = async () => {
    try {
      const response = await httpServices.get(
        `http://localhost:8000/api/notifications`
      );
      setNotifications(response?.data?.notifications)
    } catch {
    }
  };
  const markAsRead = async (id) => {
    // try {
    //   await fetch(`${API_URL}/${id}/read`, { method: "PUT" });
    //   setNotifications((prev) =>
    //     prev.map((notif) =>
    //       notif.id === id ? { ...notif, is_read: true } : notif
    //     )
    //   );
    // } catch (error) {
    //   console.error("Error marking notification as read:", error);
    // }
  };

  useEffect(() => {
    fetchNotifications();

    // إعداد Pusher
    const pusher = new Pusher("647617d4aeb36c0a33f7", {
      cluster: "ap2",
      forceTLS: true,
    });

    const channel = pusher.subscribe("notifications");

    channel.bind("new-notification", (data) => {
      setNotifications((prev) => [data.message, ...prev]);
    });

    return () => {
      pusher.unsubscribe("notifications");
      pusher.disconnect();
    };
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="notification-container" ref={boxRef}>
      <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaBell className="icon" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>

      {isOpen && (
        <div className="notification-box">
          <div className="notification-header">Notifications</div>
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${
                    notif.is_read ? "read" : "unread"
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  {notif.message}
                </div>
              ))
            ) : (
              <div className="notification-empty">No notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
