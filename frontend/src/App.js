import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    comment: ""
  });


  const [analytics, setAnalytics] = useState({
    total_feedback: 0,
    average_rating: 0,
    all_feedback: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const response = await fetch("http://localhost:8002/analytics");
    const data = await response.json();
    setAnalytics(data);
  };

  const submitFeedback = async () => {
    if (!formData.name || !formData.rating) {
      alert("Name and rating are required");
      return;
    }

    await fetch("http://localhost:8001/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        rating: parseInt(formData.rating),
        comment: formData.comment
      }),
    });

    setShowModal(false);
    setFormData({ name: "", rating: "", comment: "" });
    fetchAnalytics();
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>FeedbackFlow</h2>
      </nav>

      <div className="container">

        {/* ===== FEEDBACK ANALYTICS BOX ===== */}
        <div className="section-box">
          <div className="section-title">Feedback Analytics</div>

          <div className="stats">
            <div className="card">
              <h3>Total Feedback</h3>
              <p>{analytics.total_feedback}</p>
            </div>

            <div className="card">
              <h3>Average Rating</h3>
              <p>{analytics.average_rating}</p>
            </div>
          </div>
        </div>

        {/* ===== FEEDBACK TABLE BOX ===== */}
        <div className="section-box">
          <div className="table-header">
            <h3>Feedbacks</h3>
            <button onClick={() => setShowModal(true)}>Add Feedback</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {analytics.all_feedback.map((fb) => (
                <tr key={fb.id}>
                  <td>{fb.name}</td>
                  <td>{"⭐".repeat(fb.rating)}</td>
                  <td>{fb.comment ? fb.comment : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Add Feedback</h3>

                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Rating (1–5)"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                />

                <textarea
                  placeholder="Comment (optional)"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                />

                <div className="modal-actions">
                  <button
                    className="cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="submit"
                    onClick={submitFeedback}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;