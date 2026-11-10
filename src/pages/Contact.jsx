import { useState } from "react";
import { Link } from "react-router-dom";
import { readJson } from "../utils/session";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Order",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    const messages = readJson(localStorage, "supportMessages", []);
    messages.unshift({
      ...form,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
    });
    localStorage.setItem("supportMessages", JSON.stringify(messages.slice(0, 20)));
    setSent(true);
  };

  return (
    <div className="contact-page">
      <p>
        <Link to="/account">Your Account</Link> › Contact Us
      </p>
      <h1>Contact Us</h1>

      {sent ? (
        <div className="contact-card">
          <h2>Message saved</h2>
          <p>
            This demo keeps your note in this browser. It is not sent to a
            support team.
          </p>
          <button type="button" onClick={() => setSent(false)}>
            Send another note
          </button>
        </div>
      ) : (
        <form className="contact-card" onSubmit={submit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Topic
            <select name="topic" value={form.topic} onChange={onChange}>
              <option>Order</option>
              <option>Return</option>
              <option>Account</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            How can we help?
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={5}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
