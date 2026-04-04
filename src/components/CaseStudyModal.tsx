import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CaseStudyModal.css';

// ── Exported data types ────────────────────────────────────────────────────

export type CaseStudyStat = { num: string; desc: string };
export type CaseStudyCard = { title: string; body: string };
export type CaseStudyStep = { step: string; title: string; body: string };
export type CaseStudyResult = { title: string; body: string };

export type CaseStudySection = {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  stats?: CaseStudyStat[];
  cards?: CaseStudyCard[];
  steps?: CaseStudyStep[];
  bullets?: string[];
  tech?: string[];
  results?: CaseStudyResult[];
  table?: { headers: [string, string]; rows: Array<{ col1: string; col2: string }> };
  quote?: { text: string; cite: string };
  images?: string[];
};

export type CaseStudyData = {
  title: string;
  subtitle?: string;
  category: string;
  coverMeta?: Array<{ label: string; value: string }>;
  sections: CaseStudySection[];
};

// ── Section renderer ───────────────────────────────────────────────────────

function Section({ s }: { s: CaseStudySection }) {
  return (
    <div className="cs-section">
      {s.eyebrow && <p className="cs-eyebrow">{s.eyebrow}</p>}
      {s.title && <h3 className="cs-heading">{s.title}</h3>}
      {s.paragraphs?.map((p, i) => <p key={i} className="cs-body">{p}</p>)}

      {s.stats && (
        <div className="cs-stats">
          {s.stats.map((st, i) => (
            <div key={i} className="cs-stat">
              <div className="cs-stat-num">{st.num}</div>
              <div className="cs-stat-desc">{st.desc}</div>
            </div>
          ))}
        </div>
      )}

      {s.cards && (
        <div className="cs-cards">
          {s.cards.map((c, i) => (
            <div key={i} className="cs-card">
              <div className="cs-card-dot" aria-hidden="true" />
              <h4 className="cs-card-title">{c.title}</h4>
              <p className="cs-card-body">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {s.steps && (
        <div className="cs-steps">
          {s.steps.map((st, i) => (
            <div key={i} className="cs-step">
              <div className="cs-step-num">{st.step}</div>
              <div className="cs-step-body">
                <h4 className="cs-step-title">{st.title}</h4>
                <p className="cs-step-desc">{st.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {s.bullets && (
        <ul className="cs-bullets">
          {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}

      {s.tech && (
        <div className="cs-tech">
          {s.tech.map((t, i) => <span key={i} className="cs-tech-pill">{t}</span>)}
        </div>
      )}

      {s.results && (
        <div className="cs-results">
          {s.results.map((r, i) => (
            <div key={i} className="cs-result-item">
              <div className="cs-result-dot" aria-hidden="true" />
              <div>
                <strong className="cs-result-title">{r.title}</strong>
                <p className="cs-result-body">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {s.table && (
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead>
              <tr>
                <th>{s.table.headers[0]}</th>
                <th>{s.table.headers[1]}</th>
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.col1}</td>
                  <td>{r.col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {s.quote && (
        <div className="cs-quote">
          <blockquote className="cs-quote-text">{s.quote.text}</blockquote>
          <cite className="cs-quote-cite">{s.quote.cite}</cite>
        </div>
      )}

      {s.images && (
        <div className="cs-images">
          {s.images.map((src, i) => (
            <img key={i} src={src} alt="" className="cs-image" />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Template ───────────────────────────────────────────────────────────────

function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    <div className="cs-template">
      {data.subtitle && <p className="cs-subtitle">{data.subtitle}</p>}

      {data.coverMeta && (
        <div className="cs-cover-meta">
          {data.coverMeta.map((item, i) => (
            <div key={i} className="cs-cover-meta-item">
              <span className="cs-meta-label">{item.label}</span>
              <span className="cs-meta-value">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {data.sections.map((s, i) => <Section key={i} s={s} />)}
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    summary: string;
    metrics: string;
    outcome: string;
    caseStudy?: CaseStudyData;
    liveUrl?: string;
  };
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  const liveUrl = project.liveUrl
    ? project.liveUrl.startsWith('http')
      ? project.liveUrl
      : `https://${project.liveUrl}`
    : undefined;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.3, ease: [0.21, 0.61, 0.35, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-meta">
              <span className="modal-badge">{project.category}</span>
              <h2>{project.title}</h2>
            </div>
            <div className="modal-header-actions">
              {liveUrl && (
                <a
                  className="external-link-btn"
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Live Project ↗
                </a>
              )}
              <button className="modal-close" onClick={onClose} aria-label="Close case study">
                ✕
              </button>
            </div>
          </div>

          <div className="modal-body">
            {project.caseStudy ? (
              <CaseStudyTemplate data={project.caseStudy} />
            ) : (
              <div className="cs-section">
                <h3 className="cs-heading">Overview</h3>
                <p className="cs-body">{project.summary}</p>
                <div className="cs-stats" style={{ marginTop: '1.5rem' }}>
                  <div className="cs-stat">
                    <div className="cs-stat-num">{project.metrics}</div>
                    <div className="cs-stat-desc">Primary Impact</div>
                  </div>
                </div>
                <p className="cs-body" style={{ marginTop: '1rem' }}>{project.outcome}</p>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudyModal;
