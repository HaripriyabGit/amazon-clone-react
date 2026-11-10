import { useState } from "react";
import { Link } from "react-router-dom";
import { readJson } from "../utils/session";
import "./Addresses.css";

function loadAddresses() {
  return readJson(localStorage, "savedAddresses", []);
}

function Addresses() {
  const [addresses, setAddresses] = useState(loadAddresses);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    pincode: "",
    house: "",
    area: "",
    city: "",
    state: "",
  });
  const [message, setMessage] = useState("");

  const persist = (next) => {
    setAddresses(next);
    localStorage.setItem("savedAddresses", JSON.stringify(next));
  };

  const onChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const addAddress = (event) => {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setMessage("Enter a valid 6-digit PIN code.");
      return;
    }

    const next = [
      ...addresses.map((item) => ({ ...item, default: false })),
      { ...form, id: `addr-${Date.now()}`, default: true },
    ];

    persist(next);
    setForm({
      name: "",
      mobile: "",
      pincode: "",
      house: "",
      area: "",
      city: "",
      state: "",
    });
    setMessage("Address saved in this browser.");
  };

  const makeDefault = (id) => {
    persist(
      addresses.map((item) => ({
        ...item,
        default: item.id === id,
      }))
    );
  };

  const removeAddress = (id) => {
    const next = addresses.filter((item) => item.id !== id);
    if (next.length && !next.some((item) => item.default)) {
      next[0] = { ...next[0], default: true };
    }
    persist(next);
  };

  return (
    <div className="addresses-page">
      <p className="addresses-crumb">
        <Link to="/account">Your Account</Link> › Your Addresses
      </p>
      <h1>Your Addresses</h1>
      <p className="addresses-note">
        Addresses stay in this browser and are used at checkout.
      </p>

      {message && <p className="addresses-message">{message}</p>}

      <div className="addresses-layout">
        <section>
          {addresses.length === 0 && <p>No saved addresses yet.</p>}
          {addresses.map((item) => (
            <article className="address-card" key={item.id}>
              {item.default && <span className="address-default">Default</span>}
              <strong>{item.name}</strong>
              <p>{item.mobile}</p>
              <p>
                {item.house}, {item.area}
              </p>
              <p>
                {item.city}, {item.state} {item.pincode}
              </p>
              <div className="address-actions">
                {!item.default && (
                  <button type="button" onClick={() => makeDefault(item.id)}>
                    Set as default
                  </button>
                )}
                <button type="button" onClick={() => removeAddress(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <form className="address-form-card" onSubmit={addAddress}>
          <h2>Add a new address</h2>
          {[
            ["name", "Full name"],
            ["mobile", "Mobile number"],
            ["pincode", "PIN code"],
            ["house", "Flat, house, building"],
            ["area", "Area, street"],
            ["city", "Town / City"],
            ["state", "State"],
          ].map(([name, label]) => (
            <label key={name}>
              {label}
              <input
                name={name}
                value={form[name]}
                onChange={onChange}
                required
              />
            </label>
          ))}
          <button type="submit">Save address</button>
        </form>
      </div>
    </div>
  );
}

export default Addresses;
