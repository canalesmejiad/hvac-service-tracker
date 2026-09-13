"use client";

import { useMemo, useState } from "react";

const jobs = [
  { id: "JOB-1042", customer: "Riverbend Dental", service: "Rooftop unit inspection", technician: "David Canales", date: "Sep 14", status: "Scheduled" },
  { id: "JOB-1041", customer: "Northwest Market", service: "Walk-in cooler diagnosis", technician: "David Canales", date: "Sep 13", status: "In Progress" },
  { id: "JOB-1040", customer: "Cedar Ridge Apartments", service: "Seasonal maintenance", technician: "David Canales", date: "Sep 12", status: "Completed" },
];

const stats = [
  { label: "Open jobs", value: "12", note: "3 due today" },
  { label: "Customers", value: "48", note: "2 added this week" },
  { label: "Equipment", value: "73", note: "6 need maintenance" },
  { label: "Completed", value: "31", note: "This month" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery = !normalizedQuery || `${job.id} ${job.customer} ${job.service}`.toLowerCase().includes(normalizedQuery);
      return matchesQuery && (status === "All" || job.status === status);
    });
  }, [query, status]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="HVAC Service Tracker home">
          <span className="brand-mark" aria-hidden="true">H</span>
          <span><strong>HVAC</strong><small>Service Tracker</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#jobs">Jobs</a>
          <a href="#customers">Customers</a>
          <a href="#equipment">Equipment</a>
        </nav>
        <div className="user-chip" aria-label="Signed in as David Canales">
          <span>DC</span><div><strong>David Canales</strong><small>Service Manager</small></div>
        </div>
      </header>

      <main id="top">
        <section className="intro" id="dashboard">
          <div>
            <p className="eyebrow">Saturday, September 12</p>
            <h1>Good morning, David</h1>
            <p>Here is what is happening with your service team today.</p>
          </div>
          <button type="button" onClick={() => alert("New job workflow coming soon.")}><span aria-hidden="true">+</span> New service job</button>
        </section>

        <section className="stats" aria-label="Service overview">
          {stats.map((item) => (
            <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.note}</small></article>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel jobs-panel" id="jobs">
            <div className="panel-heading">
              <div><p className="eyebrow">Work order queue</p><h2>Recent service jobs</h2></div>
              <span>{filteredJobs.length} results</span>
            </div>
            <div className="toolbar">
              <label className="search-field">
                <span aria-hidden="true">⌕</span>
                <input type="search" placeholder="Search jobs or customers" value={query} onChange={(event) => setQuery(event.target.value)} />
              </label>
              <label>
                <span className="sr-only">Filter by status</span>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option>All</option><option>Scheduled</option><option>In Progress</option><option>Completed</option>
                </select>
              </label>
            </div>
            <div className="job-list">
              {filteredJobs.map((job) => (
                <article className="job" key={job.id}>
                  <div className="job-icon" aria-hidden="true">{job.customer.charAt(0)}</div>
                  <div className="job-main"><div><strong>{job.customer}</strong><span>{job.id}</span></div><p>{job.service}</p></div>
                  <div className="job-meta"><span>{job.date}</span><small>{job.technician}</small></div>
                  <span className={`status status-${job.status.toLowerCase().replace(" ", "-")}`}>{job.status}</span>
                </article>
              ))}
              {filteredJobs.length === 0 && <p className="empty">No service jobs match your filters.</p>}
            </div>
          </div>

          <aside className="panel side-panel">
            <p className="eyebrow">Service area</p><h2>Today&apos;s conditions</h2>
            <div className="weather"><span aria-hidden="true">☀</span><strong>72°</strong><div><b>Clear skies</b><small>Vancouver, WA</small></div></div>
            <dl><div><dt>Humidity</dt><dd>44%</dd></div><div><dt>High / Low</dt><dd>76° / 54°</dd></div><div><dt>Wind</dt><dd>NW 7 mph</dd></div></dl>
            <div className="notice"><span aria-hidden="true">✓</span><div><strong>Good service conditions</strong><p>No weather delays are expected today.</p></div></div>
          </aside>
        </section>
      </main>

      <footer>HVAC Service Tracker · WDD 430 Project · David Canales</footer>
    </div>
  );
}
