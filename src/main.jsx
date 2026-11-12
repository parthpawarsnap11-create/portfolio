import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Mail, MapPin, Menu, X, BrainCircuit, Rocket, GitBranch } from 'lucide-react';
import portraitUrl from '../assets/images/parth-portrait.jpeg';
import './style.css';

const resume = '/portfolio/ParthPawar-Resume.pdf.pdf';
const projects = [
  { name: 'EEG Data Analysis', type: 'Machine learning · Research', tone: 'lavender', desc: 'Agglomerative hierarchical clustering implemented from scratch on the Bangalore EEG Epilepsy Dataset, with a decision-tree surrogate for explaining cluster assignments.', note: '96–97% reported surrogate accuracy: agreement with the project’s cluster labels, not clinical diagnostic accuracy.', tags: ['Python', 'NumPy', 'Clustering'], art: 'eeg', href: 'https://github.com/parthpawarsnap11-create' },
  { name: 'CampusFix', type: 'HCI · UX research', tone: 'rose', desc: 'An HCI project around hostel complaints, focused on understanding the student problem, making sense of research, and designing the information architecture.', tags: ['HCI research', 'Information architecture', 'UX'], art: 'campus', href: 'https://github.com/parthpawarsnap11-create/CampusFix', direct: true },
  { name: 'TOTP Authenticator', type: 'Security · Python', tone: 'lime', desc: 'A command-line project exploring time-based one-time password generation with RFC 6238, inspired by familiar 2FA apps.', tags: ['Python', 'TOTP', 'RFC 6238'], art: 'auth', href: 'https://github.com/parthpawarsnap11-create' },
  { name: 'LibraIQ', type: 'Machine learning · Streamlit', tone: 'blue', desc: 'A demand classifier for university library books. Compares models and presents High, Medium, or Low predictions in an interactive dashboard.', tags: ['Scikit-learn', 'Pandas', 'Streamlit'], art: 'chart', href: 'https://github.com/parthpawarsnap11-create/library-book-demand-prediction', direct: true },
  { name: 'AdvanceMask', type: 'Engineering · Innovation', tone: 'peach', desc: 'A protective equipment concept taken through product design and engineering, with a patent filed.', tags: ['Product design', 'Engineering', 'Innovation'], art: 'mask', href: 'https://github.com/parthpawarsnap11-create' },
];
const skillGroups = [
  { name: 'Programming & data', note: 'Working with information', skills: ['Python', 'Pandas', 'NumPy', 'Data analysis'] },
  { name: 'Machine learning', note: 'Modeling and evaluation', skills: ['Scikit-learn', 'Classification', 'Clustering', 'Model evaluation', 'Predictive analytics'] },
  { name: 'Development', note: 'Building and sharing', skills: ['Streamlit', 'Git', 'GitHub', 'Jupyter Notebook'] },
  { name: 'Product & UX', note: 'Learning from people', skills: ['User research', 'Information architecture', 'Usability testing', 'Product research'] },
];
const variants = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: .62, ease: [.22, 1, .36, 1] } } };

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} transition={{ delay }}>{children}</motion.div>;
}
function Doodle({ className = '', children = '✳' }) { return <span aria-hidden="true" className={`doodle ${className}`}>{children}</span>; }

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['About', '#about'], ['Work', '#work'], ['Experience', '#experience'], ['Skills', '#skills'], ['Contact', '#contact']];
  return <header className="header"><a className="brand" href="#home">Parth Pawar<span>.</span></a><nav className={open ? 'nav nav-open' : 'nav'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-resume" href={resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14}/></a></nav><button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>;
}

const approachItems = [
  { title: 'Understand the problem', line: 'Research the real need before choosing a solution.', detail: 'Start with the people and the context. A clear problem makes the technical decisions that follow more useful.', tone: 'orange' },
  { title: 'Build and experiment', line: 'Turn ideas into prototypes and test assumptions.', detail: 'Make the idea tangible, try it in code, and learn from what happens when it meets real constraints.', tone: 'navy' },
  { title: 'Learn and iterate', line: 'Evaluate the result, then make the next version better.', detail: 'Look closely at what worked and what did not. Use those lessons to improve the product and the process.', tone: 'yellow' },
];

function ApproachSection() {
  const [active, setActive] = useState(0);
  return <section id="about" className="approach-section page-wrap"><div className="approach-heading"><p className="eyebrow">MY APPROACH</p><h2>Good work starts<br/>with <em>good questions.</em></h2><p>I like understanding the problem before reaching for a tool. Then I build, test, learn from what breaks, and keep improving.</p></div><div className="approach-list" aria-label="Engineering principles">{approachItems.map((item, index) => <motion.button key={item.title} layout type="button" className={`approach-row ${active === index ? `is-active tone-${item.tone}` : ''}`} onPointerEnter={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') setActive(index); }} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index}><span className="approach-number">0{index + 1}</span><span className="approach-title"><strong>{item.title}</strong><small>{item.line}</small></span><motion.span className="approach-detail" initial={false} animate={{ opacity: active === index ? 1 : .55, x: active === index ? 0 : 8 }}>{item.detail}</motion.span><ArrowUpRight className="approach-arrow" size={19}/></motion.button>)}</div></section>;
}

function PortfolioIntro() {
  return <motion.div className="portfolio-intro" initial={{ clipPath: 'inset(0 0 0 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .64, ease: [.76, 0, .24, 1] }} aria-label="Opening Parth Pawar portfolio"><div className="intro-mark">PP<span>.</span></div><div className="intro-lockup"><span>PARTH</span><span>PAWAR</span></div><p>ENGINEER · BUILDER · ENTREPRENEUR</p><div className="intro-progress"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.24, ease: [.7, 0, .3, 1] }}/></div><span className="intro-caption">A PORTFOLIO IN MOTION <b>01 / 01</b></span></motion.div>;
}

function ParticlesPortrait() {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const context = canvas.getContext('2d', { alpha: true });
    const sample = document.createElement('canvas');
    const sampleContext = sample.getContext('2d', { willReadFrequently: true });
    if (!context || !sampleContext) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let particles = [];
    let width = 0;
    let height = 0;
    let frameId;
    let active = false;
    let pointerMoved = false;
    const pointer = { x: -1000, y: -1000 };

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!image.complete || !image.naturalWidth) return;
      sample.width = Math.max(1, Math.round(width));
      sample.height = Math.max(1, Math.round(height));
      sampleContext.clearRect(0, 0, sample.width, sample.height);
      const scale = Math.max(sample.width / image.naturalWidth, sample.height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      sampleContext.drawImage(image, (sample.width - drawWidth) / 2, (sample.height - drawHeight) * .5, drawWidth, drawHeight);
      const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      particles = [];
      // Sample the portrait at a finer grid and retain its original colors.
      // The reference uses the same idea: the photo itself becomes the particle field.
      const gap = width < 500 ? 5 : 4;
      for (let y = Math.floor(gap / 2); y < sample.height; y += gap) {
        for (let x = Math.floor(gap / 2); x < sample.width; x += gap) {
          const index = (y * sample.width + x) * 4;
          const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
          const color = `rgb(${r}, ${g}, ${b})`;
          particles.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, color, size: gap * (.78 + Math.random() * .14) });
        }
      }
      frame.classList.add('particle-ready');
      schedule();
    };
    const draw = () => {
      frameId = undefined;
      context.clearRect(0, 0, width, height);
      const radius = 94;
      let moving = false;
      for (const particle of particles) {
        if (active && pointerMoved && !reduceMotion.matches) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius && distance > 0) {
            const force = (radius - distance) / radius * 8;
            particle.vx += dx / distance * force;
            particle.vy += dy / distance * force;
          }
        }
        particle.vx += (particle.ox - particle.x) * .075;
        particle.vy += (particle.oy - particle.y) * .075;
        particle.vx *= .79;
        particle.vy *= .79;
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (Math.abs(particle.vx) > .08 || Math.abs(particle.vy) > .08 || Math.abs(particle.x - particle.ox) > .15 || Math.abs(particle.y - particle.oy) > .15) moving = true;
        context.fillStyle = particle.color;
        context.globalAlpha = .92;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
      pointerMoved = false;
      context.globalAlpha = 1;
      if (moving) frameId = requestAnimationFrame(draw);
    };
    const schedule = () => { if (frameId === undefined) frameId = requestAnimationFrame(draw); };
    const onMove = event => {
      const rect = frame.getBoundingClientRect();
      if (event.pointerType === 'touch') return;
      active = true;
      pointerMoved = true;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      schedule();
    };
    const onLeave = () => { active = false; pointer.x = -1000; pointer.y = -1000; };
    image.addEventListener('load', resize);
    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    frame.addEventListener('pointermove', onMove);
    frame.addEventListener('pointerleave', onLeave);
    resize();
    schedule();
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      image.removeEventListener('load', resize);
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return <div className="portrait-frame" ref={frameRef}><img ref={imageRef} src={portraitUrl} alt="Portrait of Parth Pawar"/><canvas className="portrait-particles" ref={canvasRef} aria-hidden="true"/><span className="particle-hint">MOVE TO DISTURB THE FIELD ↗</span></div>;
}

function ScrollParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const zones = [[.10,.28,.23,.34],[.43,.72,.25,.24],[.77,.27,.20,.30],[.91,.78,.18,.25],[.24,.91,.19,.17]];
    let width = 0, height = 0, dpr = 1, raf;
    let particles = [];
    let lastY = window.scrollY;
    let burst = 0;
    let direction = 1;
    const schedule = () => { if (raf === undefined) raf = requestAnimationFrame(draw); };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = [];
      const gap = width < 650 ? 27 : 18;
      for (let y = 12; y < height; y += gap) for (let x = 8; x < width; x += gap) {
        let nearest = null;
        let density = 0;
        for (const [cx,cy,rx,ry] of zones) {
          const dx = x / width - cx, dy = y / height - cy;
          const distance = Math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2);
          if (distance < 1.15 && 1 - distance / 1.15 > density) { density = 1 - distance / 1.15; nearest = [cx * width, cy * height]; }
        }
        if (nearest && Math.random() < density * .92) {
          particles.push({ x, y, ox: x, oy: y, cx: nearest[0], cy: nearest[1], vx: 0, vy: 0, alpha: .18 + density * .25, size: 1.5 + Math.random() * 2, color: Math.random() < .16 ? '#10264f' : Math.random() < .52 ? '#ff7043' : '#f04b23' });
        }
      }
      schedule();
    };
    const draw = () => {
      raf = undefined;
      context.clearRect(0, 0, width, height);
      let moving = false;
      const scattering = burst > .012 && !reduced.matches;
      for (const p of particles) {
        if (scattering) {
          const dx = p.x - p.cx, dy = p.y - p.cy;
          const distance = Math.hypot(dx, dy) || 1;
          const push = burst * .72;
          p.vx += dx / distance * push;
          p.vy += dy / distance * push - direction * burst * .11;
        }
        p.vx += (p.ox - p.x) * .035;
        p.vy += (p.oy - p.y) * .035;
        p.vx *= .84; p.vy *= .84;
        p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.vx) > .07 || Math.abs(p.vy) > .07 || Math.abs(p.x - p.ox) > .2 || Math.abs(p.y - p.oy) > .2) moving = true;
        context.globalAlpha = p.alpha;
        context.fillStyle = p.color;
        context.fillRect(p.x, p.y, p.size, p.size);
      }
      context.globalAlpha = 1;
      if (scattering) burst *= .93;
      if (moving || scattering) raf = requestAnimationFrame(draw);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (Math.abs(delta) < 1 || reduced.matches) return;
      direction = Math.sign(delta);
      burst = Math.min(1, burst + Math.abs(delta) * .012);
      schedule();
    };
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return <canvas className="scroll-particle-field" ref={canvasRef} aria-hidden="true"/>;
}

function ProjectArt({ kind }) {
  if (kind === 'eeg') return <div className="mock-window"><div className="mock-top"><i/><i/><i/></div><div className="cluster-tree"><span/><span/><span/><span/><span/><span/><b/><b/><b/></div><div className="mock-lines"><i/><i/><i/></div></div>;
  if (kind === 'campus') return <div className="mock-window campus-ui"><div className="mock-top"><i/><i/><i/></div><div className="ui-title">Good morning, Parth <span>☀️</span></div><div className="ui-boxes"><i/><i/><i/></div><div className="ui-row"><b/><span/><span/></div><div className="ui-row"><b/><span/><span/></div><div className="ui-row"><b/><span/><span/></div></div>;
  if (kind === 'auth') return <div className="auth-graphic"><div className="auth-ring"><div className="auth-lock">✦</div></div><span className="auth-code">· · · · · ·</span></div>;
  if (kind === 'chart') return <div className="chart-graphic"><div className="chart-bars">{[38, 62, 48, 85, 58, 95, 72, 100].map((x, i) => <i key={i} style={{ height: `${x}%` }}/>)}</div><div className="chart-foot"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span></div></div>;
  return <div className="mask-graphic"><div className="mask-shape"><i/><i/><i/></div><span>ADVANCED FILTRATION</span></div>;
}

function ProjectCard({ project, index }) {
  return <Reveal className={`project-card ${project.tone}`} delay={index * .07}><div className={`project-art ${project.art}`}><ProjectArt kind={project.art}/><span className="project-index">0{index + 1}</span></div><div className="project-copy"><div className="project-type">{project.type}</div><h3>{project.name}</h3><p>{project.desc}</p>{project.note && <p className="project-note">{project.note}</p>}<div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.direct ? 'Open repository' : 'Browse GitHub'} <ArrowUpRight size={15}/></a></div></Reveal>;
}

function App() {
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (!intro) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setIntro(false), 1420);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [intro]);
  return <><ScrollParticleField/><Header/><main id="home">
    <section className="hero page-wrap"><div className="hero-copy"><div className="edition"><span>AI / ML</span><span>ENGINEERING · PRODUCTS · RESEARCH</span></div><p className="eyebrow">ENGINEER · BUILDER · ENTREPRENEUR</p><h1><span>PARTH</span><em>PAWAR</em></h1><p className="hero-sub">I build intelligent products and turn ideas into impact. I’m an AI/ML engineering student exploring machine learning, building practical products, and experimenting with technology that solves real problems.</p><div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href={resume} target="_blank" rel="noreferrer">Download resume <ArrowDown size={15}/></a></div><div className="hero-meta"><span><MapPin size={15}/> Pune, India</span><span className="availability"><i/> Open to good ideas</span></div></div>
      <div className="portrait-stage"><Doodle className="doodle-star">✳</Doodle><Doodle className="doodle-smile">☺</Doodle><svg className="orbit" viewBox="0 0 540 540" fill="none" aria-hidden="true"><path d="M91 108C152 25 397 40 466 156c68 113-3 276-113 319C238 521 93 433 62 311 40 224 53 158 91 108Z" stroke="#315EFB" strokeWidth="1.5" strokeDasharray="5 7"/><path d="M50 370c-46 59 19 115 76 84" stroke="#ff8275" strokeWidth="2" strokeLinecap="round"/></svg><div className="portrait-blob"/><ParticlesPortrait/><div className="identity-card"><div className="identity-top"><b>Parth Pawar</b><span>He/Him</span></div><div><MapPin size={14}/> Pune, India</div><div><Mail size={14}/> parthpawarsnap11@gmail.com</div><div><BrainCircuit size={14}/> AI/ML Engineering</div><div className="identity-social"><a aria-label="LinkedIn" href="https://www.linkedin.com/in/parth-pawar/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={15}/></a><a aria-label="GitHub" href="https://github.com/parthpawarsnap11-create" target="_blank" rel="noreferrer"><GitBranch size={15}/></a><span>Building what's next ↗</span></div></div><span className="hero-sticker">Build<br/>learn<br/>repeat.</span></div>
    </section>

    <ApproachSection/>

    <section id="work" className="work-section page-wrap"><div className="section-heading"><div><p className="eyebrow">SELECTED PROJECTS</p><h2>Systems I <em>built.</em></h2></div><p className="section-note">Five projects across data,<br/>security, product, and UX.<Doodle>〰</Doodle></p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index}/>)}</div><div className="also-built"><div><p className="eyebrow">ALSO BUILT</p><h3>Ideas that taught me something.</h3></div><p>From mapping a student complaint journey to prototyping a time-based authenticator and modeling demand, each project starts with a question worth exploring.</p><a className="text-link" href="https://github.com/parthpawarsnap11-create" target="_blank" rel="noreferrer">Browse my GitHub <ArrowUpRight size={15}/></a></div></section>

    <section className="journey-section page-wrap" id="experience"><div className="journey-intro"><p className="eyebrow">EXPERIENCE</p><h2>Where I’ve<br/><em>been.</em></h2><p>A few different roles, one common thread: understanding what needs to work, then helping make it work.</p></div><div className="experience-list"><article><span className="timeline-dot lime-dot"/><div><p className="eyebrow">FUNDNEXUS PVT. LTD.</p><h3>Co-Founder &amp; CMO</h3><p>Co-founded a startup and led brand strategy, go-to-market planning, and marketing operations.</p></div></article><article><span className="timeline-dot pink-dot"/><div><p className="eyebrow">D2C OPERATIONS</p><h3>Head of Operations</h3><p>Led supply chain coordination, process design, and day-to-day operating systems.</p></div></article><article><span className="timeline-dot blue-dot"/><div><p className="eyebrow">ADVANCEMASK</p><h3>Inventor &amp; Innovation Lead</h3><p>Developed a protective equipment concept through engineering and patent filing.</p></div></article><article className="education-entry"><span className="timeline-dot orange-dot"/><div><p className="eyebrow">VIJAYBHOOMI UNIVERSITY</p><h3>B.Tech · Artificial Intelligence &amp; Machine Learning</h3><p>Pune, India</p></div></article></div></section>

    <section className="skills-section page-wrap" id="skills"><div className="skills-copy"><p className="eyebrow">MY TECHNICAL STACK</p><h2>Tools for<br/><em>making things.</em></h2><p>Skills grow through practice. Here’s what I’ve been learning and applying across projects.</p><a className="text-link" href="https://github.com/parthpawarsnap11-create" target="_blank" rel="noreferrer">See what I’m building <ArrowRight size={15}/></a></div><div className="skills-groups">{skillGroups.map((group, i) => <article className="stack-row" key={group.name}><div className="stack-label"><span>L{i + 1}</span><h3>{group.name}</h3><p>{group.note}</p></div><div className="tag-list">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>

    <section id="contact" className="contact-section page-wrap"><div className="contact-doodle">✳</div><div className="contact-inner"><div><p className="eyebrow">HAVE A GOOD ONE IN MIND?</p><h2>Let’s build something<br/><em>meaningful.</em></h2><p>I’m always up for thoughtful projects, new ideas, and conversations about what’s next.</p></div><a className="button button-blue" href="mailto:parthpawarsnap11@gmail.com">Get in touch <ArrowUpRight size={17}/></a></div><div className="contact-bottom"><span>Pune, India · Usually online</span><div><a href="mailto:parthpawarsnap11@gmail.com" aria-label="Email"><Mail/></a><a href="https://www.linkedin.com/in/parth-pawar/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><BriefcaseBusiness/></a><a href="https://github.com/parthpawarsnap11-create" aria-label="GitHub" target="_blank" rel="noreferrer"><Code2/></a></div><span>© 2026 Parth Pawar</span></div></section>
  </main><AnimatePresence>{intro && <PortfolioIntro key="portfolio-intro"/>}</AnimatePresence></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
