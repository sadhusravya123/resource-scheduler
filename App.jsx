import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem("resources");
    return saved ? JSON.parse(saved) : [];
  });

  const [tool, setTool] = useState("");
  const [developer, setDeveloper] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const scheduleResource = () => {
    if (!tool || !developer || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const newResource = {
      id: Date.now(),
      tool,
      developer,
      date,
      time,
      completed: false
    };

    setResources([...resources, newResource]);

    setTool("");
    setDeveloper("");
    setDate("");
    setTime("");
  };

  const completeResource = (id) => {
    setResources(
      resources.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteResource = (id) => {
    setResources(resources.filter((item) => item.id !== id));
  };

  return (
    <div className="app">

      <h1>Software Development Tools & Resource Scheduling</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Development tool / resource"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
        />

        <input
          type="text"
          placeholder="Developer name"
          value={developer}
          onChange={(e) => setDeveloper(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={scheduleResource}>
          Schedule Resource
        </button>

      </div>

      <h2>Scheduled Resources</h2>

      {resources.length === 0 ? (
        <p className="empty">No resources scheduled yet.</p>
      ) : (
        resources.map((item) => (

          <div
            className={item.completed ? "resource completed" : "resource"}
            key={item.id}
          >

            <div>
              <h3>{item.tool}</h3>

              <p>
                <b>Developer:</b> {item.developer}
              </p>

              <p>
                <b>Date:</b> {item.date}
              </p>

              <p>
                <b>Time:</b> {item.time}
              </p>

              <p>
                <b>Status:</b>{" "}
                {item.completed ? "Completed" : "Scheduled"}
              </p>
            </div>

            <div>

              <button onClick={() => completeResource(item.id)}>
                {item.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="delete"
                onClick={() => deleteResource(item.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default App;