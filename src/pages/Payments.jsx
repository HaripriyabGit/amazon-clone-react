import { useState } from "react";
import { Link } from "react-router-dom";
import { readJson } from "../utils/session";
import "./Payments.css";

const METHODS = ["Cash on Delivery", "UPI", "Credit or Debit Card"];

function Payments() {
  const [methods, setMethods] = useState(() =>
    readJson(localStorage, "paymentMethods", [
      { id: "cod", label: "Cash on Delivery", type: "Cash on Delivery", default: true },
    ])
  );
  const [type, setType] = useState("UPI");
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");

  const persist = (next) => {
    setMethods(next);
    localStorage.setItem("paymentMethods", JSON.stringify(next));
  };

  const addMethod = (event) => {
    event.preventDefault();
    const nickname = label.trim();
    if (nickname.length < 2) {
      setMessage("Add a short nickname, such as Personal UPI.");
      return;
    }

    persist([
      ...methods.map((item) => ({ ...item, default: false })),
      {
        id: `pay-${Date.now()}`,
        label: nickname,
        type,
        default: true,
      },
    ]);
    setLabel("");
    setMessage("Payment preference saved in this browser. No real payment is processed.");
  };

  return (
    <div className="payments-page">
      <p className="payments-crumb">
        <Link to="/account">Your Account</Link> › Payment options
      </p>
      <h1>Payment options</h1>
      <p className="payments-note">
        This demo stores a nickname only. Do not enter a real card number.
      </p>
      {message && <p className="payments-message">{message}</p>}

      <div className="payments-list">
        {methods.map((item) => (
          <article key={item.id}>
            <strong>{item.label}</strong>
            <p>{item.type}</p>
            {item.default && <span>Default</span>}
            <div>
              {!item.default && (
                <button
                  type="button"
                  onClick={() =>
                    persist(
                      methods.map((method) => ({
                        ...method,
                        default: method.id === item.id,
                      }))
                    )
                  }
                >
                  Make default
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const next = methods.filter((method) => method.id !== item.id);
                  if (next.length && !next.some((method) => method.default)) {
                    next[0] = { ...next[0], default: true };
                  }
                  persist(next);
                }}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <form className="payments-form" onSubmit={addMethod}>
        <label>
          Method
          <select value={type} onChange={(event) => setType(event.target.value)}>
            {METHODS.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </select>
        </label>
        <label>
          Nickname
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="Personal UPI"
            maxLength={40}
          />
        </label>
        <button type="submit">Save preference</button>
      </form>
    </div>
  );
}

export default Payments;
