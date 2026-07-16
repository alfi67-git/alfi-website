import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './index.module.css';

// ---------------------------------------------------------------------------
// Contenu — remplace les valeurs ci-dessous par les tiennes.
// Les entrées marquées TODO sont des placeholders.
// ---------------------------------------------------------------------------

const NAME = 'FIDALGO Alexandre';
const ROLE = 'Administrateur Système';

const ROLES_LOOP = [
  'self-hoster',
  'homelab tinkerer',
  'sysadmin',
  'privacy-first',
];

const ABOUT = [
  "Administrateur système passionné par l'auto-hébergement et la souveraineté numérique.",
  "Je conçois des infrastructures pensées pour être sécurisées par design : réseau, DNS, stockage, VPN — sans dépendance à des services tiers propriétaires.",
  // TODO: complète avec ton parcours réel (2-4 lignes max, garde le ton direct)
];

const SKILLS: Record<string, string[]> = {
  'systeme_windows/': ['Active Directory', 'AD/DS', 'DFS-R', 'GPO', 'RDS'], 
  'systeme_linux/': ['Debian', 'Fedora', 'Proxmox / LXC', 'Docker',],
  'virtualisation/': ['Clustering Proxmox', 'VMware'],
  'automatisation/': ['bash', 'powershell', 'Ansible'],
  'reseau/': ['Pi-hole (DNS local)', 'OpenVPN', 'NFS / SMB', 'Apache2 / reverse proxy'],
  'securite/': ['hardening', 'audit', 'gestion des accès (UID/GID)'],
  'outils/': ['Portainer', 'Git', 'GLPI'],
};

type ExperienceEntry = {
  date: string;
  hash: string;
  title: string;
  detail: string;
};

const EXPERIENCE: ExperienceEntry[] = [
  // TODO: remplace par ton vrai parcours pro (le plus récent en premier)
  {
    date: 'juin 2024 — present',
    hash: 'a1b2c3d',
    title: 'reseau APA — CDI',
    detail: 'Description courte de la mission et des responsabilités.',
  },
  {
    date: 'nov. 2024 — oct. 2025',
    hash: 'e4f5g6h',
    title: 'SDEA — Alternance',
    detail: 'Description courte de la mission et des responsabilités.',
  },
  {
    date: 'août 2023 — août 2024',
    hash: 'i70j8k9l',
    title: 'DGFiP — Alternance',
    detail: 'Description courte de la mission et des responsabilités.',
  },
  {
    date: 'sept. 2022 — mai 2023',
    hash: 'm1n0o1p',
    title: 'SOGEFI — Alternance',
    detail: 'Description courte de la mission et des responsabilités.',
  },
];

type FormationStatus = 'OK' | 'RUNNING' | 'STOPPED' | 'FAILED';

const STATUS_STYLES: Record<FormationStatus, {label: string; className: string}> = {
  OK: {label: '[  OK  ]', className: styles.statusOk},
  RUNNING: {label: '[RUNNING]', className: styles.statusRunning},
  STOPPED: {label: '[STOPPED]', className: styles.statusStopped},
  FAILED: {label: '[FAILED]', className: styles.statusFailed},
};

type FormationEntry = {
  date: string;
  title: string;
  detail: string;
  status: FormationStatus;
};

const FORMATION: FormationEntry[] = [
  // TODO: remplace par ton vrai parcours de formation (le plus récent en premier)
  // status disponibles : 'OK' (validée), 'RUNNING' (en cours), 'STOPPED' (interrompue), 'FAILED' (non obtenue)
  {
    date: 'sept. 2025 — jan. 2026',
    title: 'Mastère — IRIS Strasbourg',
    detail: 'Mastère Expert IT cybersécurité réseau et système. Stoppé pour non alternance trouvée.',
    status: 'STOPPED',
  },
  {
    date: 'sept. 2024 — août 2025',
    title: 'Bachelor ASR — CESI Strasbourg',
    detail: 'Administrateur Système et Réseau.',
    status: 'OK',
  },
  {
    date: 'sept. 2022 — août 2024',
    title: 'BTS GMSI — CESI Strasbourg',
    detail: 'Gestionnaire en Maintenance et Support Informatique.',
    status: 'OK',
  },
  {
    date: 'sept. 2020 — juil. 2022',
    title: 'DUT MMI — IUT Haguenau',
    detail: 'Métier du Multimédia et de l\'Internet.',
    status: 'FAILED',
  },
  {
    date: 'sept. 2018 — juil. 2020',
    title: 'BAC STI2D — Lycée Général & Technologique du Haut-Barr',
    detail: 'Science Technique de l\'Ingénieur & du Développement Durable.',
    status: 'OK',
  },
];

type Project = {
  name: string;
  description: string;
  stack: string[];
  href?: string;
};

const PROJECTS: Project[] = [
  {
    name: 'homelab/pihole',
    description: 'Résolution DNS locale et blocage publicitaire réseau, domaine .bunker.lan sur Raspberry Pi.',
    stack: ['pihole-FTL', 'Apache2', 'DNS'],
  },
  {
    name: 'homelab/nextcloud-aio',
    description: "Sync fichiers et stockage personnel auto-hébergé, isolé sur son propre réseau Docker.",
    stack: ['Docker', 'Nextcloud AIO'],
  },
  {
    name: 'homelab/jellyfin',
    description: 'Serveur média self-hosted sur Synology NAS, sans DRM ni dépendance cloud.',
    stack: ['Docker', 'Synology', 'NFS'],
  },
  {
    name: 'homelab/openvpn',
    description: "Accès distant chiffré à l'infrastructure personnelle.",
    stack: ['OpenVPN'],
  },
];

const CONTACT = [
  {label: './github.sh', href: 'https://github.com/alfi67-git'}, // TODO: ton lien
  {label: './linkedin.sh', href: 'https://www.linkedin.com/in/alexandre-fidalgo/'}, // TODO: ton lien
  {label: './mail.sh', href: 'mailto:alexandre.fidalgo@protonmail.com'}, // TODO: ton mail
];

// ---------------------------------------------------------------------------
// Machine à écrire pour le hero
// ---------------------------------------------------------------------------

function useTypewriter(words: string[]) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 45 : 90;
    const pause = 1400;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => i + 1);
      return;
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return text;
}

// ---------------------------------------------------------------------------
// Reveal au scroll (discret, respecte prefers-reduced-motion via CSS)
// ---------------------------------------------------------------------------

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.revealed);
          observer.disconnect();
        }
      },
      {threshold: 0.15},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function TerminalWindow({children}: {children: ReactNode}) {
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.terminalPath}>visitor@bunker:~</span>
      </div>
      <div className={styles.terminalBody}>{children}</div>
    </div>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES_LOOP);
  return (
    <section className={styles.hero}>
      <TerminalWindow>
        <p className={styles.line}>
          <span className={styles.prompt}>visitor@bunker:~$</span> whoami
        </p>
        <h1 className={styles.name}>{NAME}</h1>
        <p className={styles.role}>{ROLE}</p>
        <p className={styles.line}>
          <span className={styles.prompt}>&gt;</span> {typed}
          <span className={styles.cursor} aria-hidden="true" />
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="#projects">
            ./voir_projets.sh
          </Link>
          <Link className={styles.btnGhost} to="#contact">
            ./contact.sh
          </Link>
        </div>
      </TerminalWindow>
    </section>
  );
}

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.section} ref={ref}>
      <p className={styles.sectionLabel}>
        <span className={styles.prompt}>$</span> cat about.txt
      </p>
      <div className={styles.aboutBlock}>
        {ABOUT.map((line, i) => (
          <p key={i} className={styles.aboutLine}>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.section} ref={ref}>
      <p className={styles.sectionLabel}>
        <span className={styles.prompt}>$</span> tree ./competences
      </p>
      <div className={styles.skillsGrid}>
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category} className={styles.skillCategory}>
            <p className={styles.skillFolder}>{category}</p>
            <ul className={styles.skillList}>
              {items.map((item) => (
                <li key={item}>
                  <span className={styles.treeBranch}>├──</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.section} ref={ref}>
      <p className={styles.sectionLabel}>
        <span className={styles.prompt}>$</span> git log --oneline --graph
      </p>
      <div className={styles.timeline}>
        {EXPERIENCE.map((entry) => (
          <div key={entry.hash} className={styles.commit}>
            <span className={styles.commitHash}>{entry.hash}</span>
            <div className={styles.commitBody}>
              <p className={styles.commitTitle}>{entry.title}</p>
              <p className={styles.commitDate}>{entry.date}</p>
              <p className={styles.commitDetail}>{entry.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Formation() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.section} ref={ref}>
      <p className={styles.sectionLabel}>
        <span className={styles.prompt}>$</span> systemctl status formation.service
      </p>
      <div className={styles.timeline}>
        {FORMATION.map((entry) => (
          <div className={styles.commit}>
            <span className={clsx(styles.bootStatus, STATUS_STYLES[entry.status].className)}>
              {STATUS_STYLES[entry.status].label}
            </span>
            <div className={styles.commitBody}>
              <p className={styles.commitTitle}>{entry.title}</p>
              <p className={styles.commitDate}>{entry.date}</p>
              <p className={styles.commitDetail}>{entry.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.section} id="projects" ref={ref}>
      <p className={styles.sectionLabel}>
        <span className={styles.prompt}>$</span> ls -la ~/homelab/
      </p>
      <div className={styles.projectsGrid}>
        {PROJECTS.map((project) => {
          const Card = project.href ? Link : 'div';
          return (
            <Card
              key={project.name}
              {...(project.href ? {to: project.href} : {})}
              className={styles.projectCard}
            >
              <p className={styles.projectName}>drwxr-xr-x {project.name}</p>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.projectStack}>
                {project.stack.map((tech) => (
                  <span key={tech} className={styles.tag}>
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={styles.section} id="contact" ref={ref}>
      <p className={styles.sectionLabel}>
        <span className={styles.prompt}>$</span> ./contact.sh --help
      </p>
      <div className={styles.contactGrid}>
        {CONTACT.map((c) => (
          <Link key={c.label} to={c.href} className={styles.contactLink}>
            <span className={styles.prompt}>&gt;</span> {c.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${NAME} — ${ROLE}`}
      description={`Page d'accueil de ${siteConfig.title} : profil, compétences et projets homelab.`}>
      <main className={styles.page}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Formation />
        <Projects />
        <Contact />
      </main>
    </Layout>
  );
}
