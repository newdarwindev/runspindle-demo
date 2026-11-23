(() => {
  "use strict";
  const { location, navigator, crypto } = window;
  if (!location.pathname.endsWith("/") || location.search || location.hash ||
      navigator.globalPrivacyControl === true ||
      ["1", "yes"].includes(String(navigator.doNotTrack ?? window.doNotTrack).toLowerCase())) return;
  try {
    const key = "runspindle-demo-edition-v1";
    let edition = window.localStorage.getItem(key);
    if (edition !== "technical" && edition !== "business") {
      edition = crypto.getRandomValues(new Uint8Array(1))[0] < 128 ? "technical" : "business";
      window.localStorage.setItem(key, edition);
      if (window.localStorage.getItem(key) !== edition) return;
    }
    if (edition === "business") location.replace("business.html");
  } catch {} // Privacy or unavailable storage: stay on the technical edition.
})();
