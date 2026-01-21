import { useEffect, useState } from "react";
import { api } from "./api";

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
      setMsg("Task created");
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

  if (mode === "register") {
    return (
      <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "sans-serif" }}>
        <h2>Register</h2>
        <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <br />
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br /><br />
        <button onClick={register}>Register</button>
        <button onClick={() => setMode("login")} style={{ marginLeft: 10 }}>Go to Login</button>
        <p>{msg}</p>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "sans-serif" }}>
        <h2>Login</h2>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br /><br />
        <button onClick={login}>Login</button>
        <button onClick={() => setMode("register")} style={{ marginLeft: 10 }}>Go to Register</button>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={loadTasks} style={{ marginLeft: 10 }}>Refresh</button>

      <h3 style={{ marginTop: 30 }}>Create Task</h3>
      <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
      <br />
      <input placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
      <br /><br />
      <button onClick={createTask}>Create</button>

      <p>{msg}</p>

      <h3 style={{ marginTop: 30 }}>Tasks</h3>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <b>{t.title}</b> - {t.status} <br />
            {t.description}
            <br />
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
