
import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";

const accountSections = [
  {
    title: "Your Orders",
    icon: "bi-box-seam",
    description: "Track, return, or buy things again.",
    link: "/orders",
  },
  {
    title: "Login & Security",
    icon: "bi-shield-lock",
    description: "Edit login, name, and mobile number.",
    link: "/login",
  },
  {
    title: "Prime",
    icon: "bi-box-fill",
    description: "View benefits and payment settings.",
    link: "#",
  },
  {
    title: "Your Addresses",
    icon: "bi-geo-alt-fill",
    description: "Edit addresses for orders and gifts.",
    link: "#",
  },
  {
    title: "Your Business Account",
    icon: "bi-briefcase-fill",
    description: "Explore business shopping features.",
    link: "#",
  },
  {
    title: "Payment Options",
    icon: "bi-credit-card-fill",
    description: "Edit or add payment methods.",
    link: "#",
  },
  {
    title: "Amazon Pay Balance",
    icon: "bi-wallet-fill",
    description: "Add money to your balance.",
    link: "#",
  },
  {
    title: "Contact Us",
    icon: "bi-headset",
    description: "Contact our customer service via phone or chat.",
    link: "#",
  },
];

const accountGroups = [
  {
    title: "Digital content and devices",
    links: [
      "Apps and more",
      "Content Library",
      "Devices",
      "Digital gifts you've received",
      "Digital and device forum",
    ],
  },
  {
    title: "Email alerts, messages, and ads",
    links: [
      "Advertising preferences",
      "Communication preferences",
      "SMS alert preferences",
      "Message Centre",
      "Alexa shopping notifications",
    ],
  },
  {
    title: "More ways to pay",
    links: [
      "Default Purchase Settings",
      "Amazon Pay",
      "Coupons",
    ],
  },
  {
    title: "Ordering and shopping preferences",
    links: [
      "Leave packaging feedback",
      "Lists",
      "Manage saved IDs",
      "Your Shopping preferences",
      "Your Content",
      "Language settings",
      "Recalls and Product Safety Alerts",
    ],
  },
  {
    title: "Other accounts",
    links: [
      "Account Linking",
      "Seller Account",
      "Amazon Web Services",
    ],
  },
  {
    title: "Shopping programs and rentals",
    links: [
      "Manage Your Amazon Family",
      "Subscribe & Save",
      "Shop the Kids Store by age",
    ],
  },
  {
    title: "Subscriptions",
    links: [
      "Email",
      "Memberships & Subscriptions",
    ],
  },
  {
    title: "Manage your data",
    links: [
      "Request your data",
      "Data Access and Requests",
      "Manage your apps and services with access",
      "Close Your Amazon Account",
      "Privacy Notice",
    ],
  },
];

function Account() {
  return (
    <div className="account-page">
      <main className="account-main">
        <h1>Your Account</h1>

        <section className="account-card-grid">
          {accountSections.map((item) => (
            <Link
              to={item.link}
              className="account-card"
              key={item.title}
            >
              <div className="account-icon">
                <i className={`bi ${item.icon}`}></i>
              </div>

              <div className="account-card-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </section>

        <hr className="account-divider" />

        <section className="account-groups">
          {accountGroups.map((group) => (
            <div className="account-group" key={group.title}>
              <h2>{group.title}</h2>

              {group.links.map((link) => (
                <a
                  href="#"
                  key={link}
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </section>
      </main>

      <section className="account-history">
        <h2>Your browsing history</h2>
        <p>View or edit your browsing history.</p>
      </section>
    </div>
  );
}

export default Account;
