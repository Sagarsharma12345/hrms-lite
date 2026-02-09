import { useState, useEffect } from "react";
import "./component.css";

export default function Modal({ show, title, fields, onSubmit, onClose }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (show) setForm({});
  }, [show]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = () => {
    onSubmit(form);
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal d-block fade show" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg rounded">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {fields.map(field => (
                <div key={field.name} className="mb-3">
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    className="form-control"
                    value={form[field.name] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
