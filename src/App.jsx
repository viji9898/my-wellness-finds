import { useEffect, useMemo, useState } from "react";
import NotifyStickyForm from "./components/NotifyStickyForm";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", role: "Seeker" });
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 720px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 720px)");
    const onChange = (e) => setIsMobile(e.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
    } else {
      mq.addListener(onChange);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", onChange);
      } else {
        mq.removeListener(onChange);
      }
    };
  }, []);

  const styles = useMemo(
    () => ({
      page: {
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        color: "#0f172a",
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(115, 160, 135, 0.18), transparent 55%), radial-gradient(900px 500px at 90% 0%, rgba(234, 223, 205, 0.35), transparent 55%), #fbfbf8",
        minHeight: "100vh",
      },
      container: {
        maxWidth: 1040,
        margin: "0 auto",
        padding: "32px 20px 56px",
        paddingBottom: isMobile
          ? "calc(56px + env(safe-area-inset-bottom))"
          : "calc(260px + env(safe-area-inset-bottom))",
      },
      nav: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0 24px",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? 10 : 0,
      },
      logo: { display: "flex", gap: 10, alignItems: "center", fontWeight: 700 },
      badge: {
        width: 34,
        height: 34,
        borderRadius: 10,
        background: "rgba(115, 160, 135, 0.18)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        display: "grid",
        placeItems: "center",
      },
      link: { color: "#0f172a", textDecoration: "none", opacity: 0.8 },
      hero: {
        padding: isMobile ? "22px 0 18px" : "34px 0 24px",
        display: "grid",
        gap: isMobile ? 14 : 18,
      },
      h1: {
        fontSize: isMobile ? 32 : 44,
        lineHeight: 1.08,
        margin: 0,
        letterSpacing: -0.6,
      },
      p: {
        fontSize: 16,
        lineHeight: 1.6,
        margin: 0,
        maxWidth: 740,
        opacity: 0.9,
      },
      ctas: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 6,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
      },
      btn: {
        padding: "12px 16px",
        borderRadius: 14,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        background: "white",
        cursor: "pointer",
        fontWeight: 600,
        width: isMobile ? "100%" : "auto",
      },
      btnPrimary: {
        padding: "12px 16px",
        borderRadius: 14,
        border: "1px solid rgba(15, 23, 42, 0.12)",
        background: "#2f6f4e",
        color: "white",
        cursor: "pointer",
        fontWeight: 700,
        width: isMobile ? "100%" : "auto",
      },
      subtle: { fontSize: 12, opacity: 0.7 },
      grid: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
        gap: isMobile ? 12 : 14,
        marginTop: 18,
      },
      card: {
        gridColumn: isMobile ? "auto" : "span 4",
        background: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 18,
        padding: 16,
        backdropFilter: "blur(6px)",
      },
      cardTitle: { fontWeight: 700, marginBottom: 6 },
      cardText: { margin: 0, opacity: 0.85, lineHeight: 1.55, fontSize: 14 },
      split: {
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 14,
      },
      panel: {
        background: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 18,
        padding: isMobile ? 16 : 18,
      },
      panelTitle: { fontSize: 18, fontWeight: 800, margin: "0 0 10px" },
      ul: { margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.7 },
      formWrap: {
        marginTop: 18,
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 18,
        padding: 18,
      },
      stickyBar: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "10px 0 calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(251, 251, 248, 0.72)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(15, 23, 42, 0.10)",
        zIndex: 50,
      },
      stickyInner: {
        maxWidth: 1040,
        margin: "0 auto",
        padding: isMobile ? "0 12px" : "0 20px",
      },
      stickyCard: {
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(15, 23, 42, 0.10)",
        borderRadius: 18,
        padding: isMobile ? 12 : 14,
      },
      formGrid: {
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto",
        gap: 10,
      },
      input: {
        padding: "12px 12px",
        borderRadius: 14,
        border: "1px solid rgba(15, 23, 42, 0.14)",
        background: "white",
        outline: "none",
        boxSizing: "border-box",
        width: "100%",
        minWidth: 0,
      },
      footer: {
        marginTop: 26,
        display: "flex",
        justifyContent: "space-between",
        opacity: 0.7,
        fontSize: 12,
        flexWrap: "wrap",
        gap: 10,
      },
      hr: {
        marginTop: 22,
        border: "none",
        borderTop: "1px solid rgba(15, 23, 42, 0.08)",
      },
    }),
    [isMobile],
  );

  function scrollToForm(role) {
    setForm((f) => ({ ...f, role: role || f.role }));
    const el = document.getElementById("notify");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.nav}>
          <div style={styles.logo}>
            <div style={styles.badge}>🌿</div>
            <div>
              My Wellness Finds
              <div style={styles.subtle}>Athens • launching soon</div>
            </div>
          </div>
          <a
            style={styles.link}
            href="https://instagram.com/my.wellness.finds"
            target="_blank"
            rel="noreferrer"
          >
            Instagram →
          </a>
        </div>

        <section style={styles.hero}>
          <h1 style={styles.h1}>
            Discover wellness in Athens — curated, trusted, local.
          </h1>
          <p style={styles.p}>
            My Wellness Finds is building a premium directory of wellness
            practitioners across Athens. Launching soon. Join early to get
            featured (practitioners) or get first access (seekers).
          </p>

          <div style={styles.ctas}>
            <button
              style={styles.btnPrimary}
              onClick={() => scrollToForm("Seeker")}
            >
              Get early access
            </button>
            <button
              style={styles.btn}
              onClick={() => scrollToForm("Practitioner")}
            >
              Join as a practitioner
            </button>
          </div>

          <div style={styles.subtle}>
            Curated • Community-led • Athens-first
          </div>
        </section>

        <section style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>1. Curated discovery</div>
            <p style={styles.cardText}>
              We highlight standout practitioners across modalities and
              specialties.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>2. Direct connection</div>
            <p style={styles.cardText}>
              Find the right fit and connect fast — no noise, no endless
              scrolling.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>3. More opportunities</div>
            <p style={styles.cardText}>
              We help practitioners get visibility, collaborations, and work.
            </p>
          </div>
        </section>

        <section style={styles.split}>
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>For practitioners</h3>
            <ul style={styles.ul}>
              <li>Be discovered by locals + visitors searching for quality</li>
              <li>Get featured in curated collections and IG spotlights</li>
              <li>Access collaboration and promotion opportunities</li>
              <li>Simple profile, clean presentation, premium positioning</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              <button
                style={styles.btn}
                onClick={() => scrollToForm("Practitioner")}
              >
                Apply to be featured
              </button>
            </div>
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>For seekers</h3>
            <ul style={styles.ul}>
              <li>Find trusted wellness professionals across Athens</li>
              <li>
                Explore specialties (yoga, therapy, breathwork, massage,
                nutrition, etc.)
              </li>
              <li>Save favorites and get curated recommendations</li>
              <li>Discover new studios, experiences, and events</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              <button style={styles.btn} onClick={() => scrollToForm("Seeker")}>
                Join early access
              </button>
            </div>
          </div>
        </section>

        <hr style={styles.hr} />

        <div style={styles.footer}>
          <div>© {new Date().getFullYear()} My Wellness Finds</div>
          <div>Athens • Instagram: @my.wellness.finds</div>
        </div>
      </div>

      <NotifyStickyForm
        styles={styles}
        isMobile={isMobile}
        form={form}
        setForm={setForm}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}
