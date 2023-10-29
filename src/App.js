import { useEffect, useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const title = "Random Doo";
  const [activities, setActivity] = useState([]);

  const lastRef = useRef(null);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.boredapi.com/api/activity");
    xhr.onload = function () {
      if (xhr.status === 200) {
        setActivity([...activities, JSON.parse(xhr.responseText)]);
        lastRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    xhr.send();
  };

  return (
    <div className="main">
      <h1>Welcome to {title}!</h1>
      <div className="activities">
        {activities.map((activity, index) => {
          return (
            <div className="content">
              <h2>{activity.activity}</h2>
              <div className="activity-detail">
                <p>No of people needed: {activity.participants}</p>
                <p>&nbsp;|&nbsp;</p>
                <p>Expenso meter reading: {activity.price}</p>
              </div>
              <a
                className="link"
                href={activity.link}
                target="_blank"
                rel="noreferrer"
              >
                {activity.link}
              </a>
            </div>
          );
        })}
        <div className="end-empty-box" ref={lastRef}></div>
      </div>
      <button onClick={() => getActivity()} className="another-button">
        <span className="button_top">Another Activity</span>
      </button>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/rishi-singh26/Random-Do-Angular"
          target="_blank"
          rel="noreferrer"
        >
          Rishi Singh
        </a>
      </p>
    </div>
  );
}
