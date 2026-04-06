import { useState } from "react";
import { sendContactMessage } from "../api/portfolioApi";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      await sendContactMessage(form);
      setStatus({ type: "success", message: "Your message has been sent." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Unable to send message right now."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-grid two-col">
        <label className="input-group">
          <span>Your name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input-group">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label className="input-group">
        <span>Subject</span>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />
      </label>

      <label className="input-group">
        <span>Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="6"
          required
        />
      </label>

      <div className="contact-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
        <p className="form-note">Typical response time: within 24 hours.</p>
      </div>

      {status.message ? <p className={`status ${status.type}`}>{status.message}</p> : null}
    </form>
  );
};

export default ContactForm;
