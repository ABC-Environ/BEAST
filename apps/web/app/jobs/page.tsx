const states = ['Assignment', 'Scheduling', 'Field Execution', 'QA Review', 'Billing Readiness'];

export default function JobsPage() {
  return (
    <main>
      <h2>Job Board</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, minmax(180px,1fr))`, gap: 12 }}>
        {states.map((s) => (
          <section key={s} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8 }}>
            <strong>{s}</strong>
            <article style={{ marginTop: 8, padding: 8, border: '1px solid #efefef' }}>
              Job #DEMO-001
              <div style={{ marginTop: 6 }}><button>Open detail</button></div>
            </article>
          </section>
        ))}
      </div>

      <aside style={{ marginTop: 20, borderTop: '1px solid #ccc', paddingTop: 12 }}>
        <h3>Job Detail Drawer (Stub)</h3>
        <nav style={{ display: 'flex', gap: 8 }}>
          <span>Timeline/Notes</span>
          <span>Photos</span>
          <span>Equipment</span>
          <span>Moisture Logs</span>
          <span>Estimate</span>
          <span>QA</span>
          <span>Billing Readiness</span>
        </nav>
      </aside>
    </main>
  );
}
