function encodeFormPayload(formElement) {
  const formData = new FormData(formElement);
  return new URLSearchParams(formData).toString();
}

export default function NotifyStickyForm({ styles, form, setForm, status, setStatus }) {
  async function handleSubmit(e) {
    e.preventDefault();

    setStatus({ type: "loading", msg: "" });

    try {
      const body = encodeFormPayload(e.currentTarget);

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      setStatus({ type: "success", msg: "You’re on the list. We’ll email you at launch." });
      setForm((f) => ({ ...f, name: "", email: "" }));
    } catch {
      setStatus({ type: "error", msg: "Something went wrong. Please try again." });
    }
  }

  return (
    <div style={styles.stickyBar}>
      <div style={styles.stickyInner}>
        <section id="notify" style={styles.stickyCard}>
          <h3 style={{ ...styles.panelTitle, margin: "0 0 4px" }}>Get notified at launch</h3>
          <div style={styles.subtle}>No spam. Just launch updates + early access.</div>

          <form
            name="notify"
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            style={{ marginTop: 10 }}
            autoComplete="on"
          >
            <input type="hidden" name="form-name" value="notify" />
            <p style={{ display: "none" }}>
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>

            <div style={styles.formGrid}>
              <input
                style={styles.input}
                placeholder="Name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                style={styles.input}
                placeholder="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
              <select
                style={styles.input}
                name="role"
                autoComplete="organization-title"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              >
                <option>Seeker</option>
                <option>Practitioner</option>
                <option>Brand</option>
                <option>Other</option>
              </select>
              <button style={styles.btnPrimary} disabled={status.type === "loading"}>
                {status.type === "loading" ? "Saving..." : "Notify me"}
              </button>
            </div>

            {status.type === "success" && (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#2f6f4e",
                  fontWeight: 600,
                }}
              >
                {status.msg}
              </div>
            )}

            {status.type === "error" && (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#b91c1c",
                  fontWeight: 600,
                }}
              >
                {status.msg}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
