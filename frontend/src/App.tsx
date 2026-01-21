import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
};

export default function App() {
  const [mode, setMode] = useState<"login" | "register" | "dashboard">("login");
  const [msg, setMsg] = useState<string>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setMode("dashboard");
  }, [token]);

  async function register() {
    setMsg("");
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setMsg(res.data.message);
      setMode("login");
    } catch (e: any) {
      setMsg(e?.response?.data?.error?.message ?? "Error");
    }
  }

  async function login() {
    setMsg("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.data.token);
      setMode("dashboard");
      await loadTasks();
    } catch (e: any) {
      setMsg(e?.response?.data?.error?.message ?? "Error");
    }
  }

  async function loadTasks() {
    const res = await api.get("/tasks");
    setTasks(res.data.data);
  }

  async function createTask() {
    setMsg("");
    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      setMsg("Task created successfully!");
      await loadTasks();
    } catch (e: any) {
      setMsg(e?.response?.data?.error?.message ?? "Error");
    }
  }

  async function deleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
    await loadTasks();
  }

  function logout() {
    localStorage.removeItem("token");
    setMode("login");
  }

  function getStatusClass(status: string) {
    return status.toLowerCase().replace("_", "-");
  }

  if (mode === "register") {
    return (
      <div className="app-container">
        <div className="card auth-card fade-in">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join us to manage your tasks efficiently</p>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={register}>
            Create Account
          </button>

          <div className="divider">
            <span>Already have an account?</span>
          </div>

          <button className="btn-secondary" onClick={() => setMode("login")}>
            Sign In
          </button>

          {msg && <div className={`message ${msg.includes("Error") ? "error" : "success"}`}>{msg}</div>}
        </div>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className="app-container">
        <div className="card auth-card fade-in">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue to your dashboard</p>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={login}>
            Sign In
          </button>

          <div className="divider">
            <span>Don't have an account?</span>
          </div>

          <button className="btn-secondary" onClick={() => setMode("register")}>
            Create Account
          </button>

          {msg && <div className={`message ${msg.includes("Error") ? "error" : "success"}`}>{msg}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <h2 className="dashboard-title">My Tasks</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={loadTasks}>
            🔄 Refresh
          </button>
          <button className="btn-danger" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="create-task-section">
        <h3>✨ Create New Task</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button className="btn-primary" onClick={createTask}>
          ➕ Create Task
        </button>

        {msg && <div className={`message ${msg.includes("Error") ? "error" : "success"}`}>{msg}</div>}
      </div>

      <div className="tasks-section">
        <h3>📋 Your Tasks ({tasks.length})</h3>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>No tasks yet. Create your first task above!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((t) => (
              <div key={t.id} className="task-card">
                <div className="task-header">
                  <h4 className="task-title">{t.title}</h4>
                  <span className={`task-status ${getStatusClass(t.status)}`}>
                    {t.status.replace("_", " ")}
                  </span>
                </div>

                {t.description && <p className="task-description">{t.description}</p>}

                <div className="task-actions">
                  <button className="btn-danger" onClick={() => deleteTask(t.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
