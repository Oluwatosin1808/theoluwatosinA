import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CaseStudyModal.css';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    summary: string;
    metrics: string;
    outcome: string;
    caseStudyHtml?: string;
    liveUrl?: string;
    fullDescription?: string;
    challenges?: string[];
    solutions?: string[];
    results?: string[];
    technologies?: string[];
    duration?: string;
    teamSize?: string;
    role?: string;
  };
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  const liveUrl = project.liveUrl
    ? project.liveUrl.startsWith('http')
      ? project.liveUrl
      : `https://${project.liveUrl}`
    : undefined;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-meta">
              <span className="modal-badge">{project.category}</span>
              <h2>{project.title}</h2>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close case study">
              Close
            </button>
          </div>

          <div className="modal-body">
            {project.caseStudyHtml ? (
              <motion.div
                className="modal-section"
                variants={contentVariants}
                transition={{ delay: 0.1 }}
              >
                <iframe
                  title={`${project.title} case study`}
                  srcDoc={project.caseStudyHtml}
                  style={{
                    width: '100%',
                    height: '70vh',
                    border: '0',
                    borderRadius: '16px',
                    background: '#fff'
                  }}
                  sandbox="allow-same-origin"
                />
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="modal-section"
                  variants={contentVariants}
                  transition={{ delay: 0.1 }}
                >
                  <h3>Overview</h3>
                  <p>{project.summary}</p>
                </motion.div>

                <motion.div
                  className="modal-section"
                  variants={contentVariants}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Key Results</h3>
                  <div className="results-grid">
                    <div className="result-card">
                      <span className="result-icon" aria-hidden="true" />
                      <div>
                        <strong>{project.metrics}</strong>
                        <p>Primary Impact</p>
                      </div>
                    </div>
                    <div className="result-card">
                      <span className="result-icon" aria-hidden="true" />
                      <div>
                        <strong>Success</strong>
                        <p>{project.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {project.challenges && (
                  <motion.div
                    className="modal-section"
                    variants={contentVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <h3>Challenges</h3>
                    <ul>
                      {project.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {project.solutions && (
                  <motion.div
                    className="modal-section"
                    variants={contentVariants}
                    transition={{ delay: 0.4 }}
                  >
                    <h3>Solutions</h3>
                    <ul>
                      {project.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {project.technologies && (
                  <motion.div
                    className="modal-section"
                    variants={contentVariants}
                    transition={{ delay: 0.5 }}
                  >
                    <h3>Technologies Used</h3>
                    <div className="tech-grid">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}

            <motion.div
              className="modal-footer"
              variants={contentVariants}
              transition={{ delay: 0.2 }}
            >
              <div className="project-meta">
                {project.duration && (
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span>{project.duration}</span>
                  </div>
                )}
                {project.teamSize && (
                  <div className="meta-item">
                    <span className="meta-label">Team:</span>
                    <span>{project.teamSize}</span>
                  </div>
                )}
                {project.role && (
                  <div className="meta-item">
                    <span className="meta-label">Role:</span>
                    <span>{project.role}</span>
                  </div>
                )}
              </div>
              {liveUrl ? (
                <a
                  className="external-link-btn"
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Live Project
                </a>
              ) : (
                <button className="external-link-btn">
                  View Live Project
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudyModal;
