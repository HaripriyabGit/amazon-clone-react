export function readJson(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function readUser() {
  return (
    readJson(sessionStorage, "user", null) ||
    readJson(localStorage, "user", null)
  );
}

export function saveUser(user, persist) {
  const raw = JSON.stringify(user);

  if (persist) {
    localStorage.setItem("user", raw);
    sessionStorage.removeItem("user");
  } else {
    sessionStorage.setItem("user", raw);
    localStorage.removeItem("user");
  }

  window.dispatchEvent(new Event("userLoggedIn"));
}

export function clearUser() {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  window.dispatchEvent(new Event("userLoggedIn"));
}

export function findAccount(emailOrPhone) {
  const accounts = readJson(localStorage, "accounts", {});
  return accounts[String(emailOrPhone).trim().toLowerCase()] || null;
}

export function saveAccount(account) {
  const accounts = readJson(localStorage, "accounts", {});
  accounts[account.emailOrPhone.trim().toLowerCase()] = account;
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

export function readLanguage() {
  return localStorage.getItem("preferredLanguage") || "en";
}

export function saveLanguage(code) {
  localStorage.setItem("preferredLanguage", code);
  window.dispatchEvent(new Event("languageChanged"));
}

export function readDeliveryLocation() {
  return (
    readJson(localStorage, "deliveryLocation", null) || {
      city: "Kottayam",
      pincode: "686019",
    }
  );
}

export function saveDeliveryLocation(location) {
  localStorage.setItem("deliveryLocation", JSON.stringify(location));
  window.dispatchEvent(new Event("locationChanged"));
}
