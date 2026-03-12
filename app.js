/* ─── Advay Kumar · Portfolio · app.js ─── */

let slides = [];
let current = 0;

/* ════════════════════════════════════════
   SLIDE RENDERERS
════════════════════════════════════════ */

function renderTitle(slide) {
  return `
    <div class="slide-inner">
      <div class="title-layout">
        <div class="title-left">
          <div class="eyebrow" data-animate data-delay="1">Portfolio · 2026</div>
          <h1 class="headline" data-animate data-delay="2">${slide.headline}</h1>
          <p class="subheadline" data-animate data-delay="3">${slide.subheadline || ''}</p>
          <div class="title-tags" data-animate data-delay="4">
            <span class="ttag">AI / ML</span>
            <span class="ttag">Robotics</span>
            <span class="ttag">Full-Stack</span>
            <span class="ttag">Enterprise Architecture</span>
            <span class="ttag">Research</span>
            <span class="ttag">Deep Learning</span>
          </div>
        </div>
        <div class="title-right" data-animate data-delay="3">
          <div class="profile-photo-wrap">
            <img src="profile.jpg" alt="Advay Kumar" class="profile-photo" />
          </div>
          <div class="title-panel">
            <div class="panel-row">
              <span class="panel-key">University</span>
              <span class="panel-val">Monash University</span>
            </div>
            <div class="panel-row">
              <span class="panel-key">GPA</span>
              <span class="panel-val highlight" data-count="3.909" data-decimals="3">3.906</span>
            </div>
            <div class="panel-row">
              <span class="panel-key">WAM</span>
              <span class="panel-val highlight">86.236</span>
            </div>
            <div class="panel-row">
              <span class="panel-key">Dean's Honours</span>
              <span class="panel-val">2022 · 2023 · 2024</span>
            </div>
            <div class="panel-row">
              <span class="panel-key">Graduation</span>
              <span class="panel-val">2026</span>
            </div>
            <div class="panel-row">
              <span class="panel-key">Published</span>
              <span class="panel-val highlight">HRI 2025 · IEEE · ACM</span>
            </div>
            <div class="panel-row">
              <span class="panel-key">Citizenship</span>
              <span class="panel-val">Australian</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-cue" data-animate data-delay="6">
      <span>Scroll</span>
      <div class="scroll-arrow"></div>
    </div>
  `;
}

function renderEducation(slide) {
  return `
    <div class="slide-inner">
      <div class="edu-layout">
        <div class="edu-sidebar" data-animate data-delay="1">
          <div class="edu-uni">Monash University</div>
          <div class="edu-degree">
            B.E. Electrical & Computer Systems Engineering<br>
            + Bachelor of Commerce<br>
            <em>Graduating 2026</em>
          </div>
          <div class="gpa-block" data-animate data-delay="2">
            <div class="gpa-num" data-count="3.909" data-decimals="3">3.909</div>
            <div class="gpa-sub">GPA / 4.00</div>
          </div>
          <div class="honours-list" data-animate data-delay="3">
            <div class="honour-chip">🏅 Dean's Honours 2022</div>
            <div class="honour-chip">🏅 Dean's Honours 2023</div>
            <div class="honour-chip">🏅 Dean's Honours 2024</div>
          </div>
        </div>

        <div class="edu-right" data-animate data-delay="2">
          <div class="eyebrow">Course Modules</div>
          <div class="edu-modules">
            <div class="edu-module">
              <div class="module-header">
                <span class="module-name">Engineering Core</span>
                <span class="module-count">4 disciplines</span>
              </div>
              <div class="module-items">
                <span class="module-item">Computer Organisation & Programming</span>
                <span class="module-item">Machine Learning</span>
                <span class="module-item">Artificial Intelligence</span>
                <span class="module-item">Data Structures & Algorithms</span>
              </div>
            </div>
            <div class="edu-module">
              <div class="module-header">
                <span class="module-name">Systems & Hardware</span>
                <span class="module-count">4 disciplines</span>
              </div>
              <div class="module-items">
                <span class="module-item">Circuits, Power & Energy</span>
                <span class="module-item">Networks</span>
                <span class="module-item">RISC-V Architecture</span>
                <span class="module-item">VHDL & Verilog</span>
              </div>
            </div>
            <div class="edu-module">
              <div class="module-header">
                <span class="module-name">Commerce</span>
                <span class="module-count">4 disciplines</span>
              </div>
              <div class="module-items">
                <span class="module-item">Strategic Management</span>
                <span class="module-item">Organisational Behaviour</span>
                <span class="module-item">Social Issues in Organising</span>
                <span class="module-item">Supply Chain Fundamentals</span>
              </div>
            </div>
          </div>

          <div class="gpa-track-wrap" data-animate data-delay="4">
            <div class="gpa-track-label">
              <span>GPA relative to maximum</span>
              <span>97.73%</span>
            </div>
            <div class="gpa-track"><div class="gpa-fill" data-width="97.73"></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderANZ(slide) {
  return `
    <div class="slide-inner">
      <div class="eyebrow" data-animate data-delay="1">Experience</div>
      <div class="exp-layout">
        <div class="exp-left" data-animate data-delay="2">
          <h2 class="headline">ANZ Bank</h2>
          <div class="exp-meta" style="margin-bottom:24px">
            <div class="exp-dot"></div>
            Enterprise Architecture · AI Automation Intern · Nov 2025 – Feb 2026
          </div>

          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                Built AI-assisted reporting with Copilot & prompt engineering —
                <span class="tl-result">consistent analytics from governance data</span>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                Automated BAU processes using AI
                <span class="tl-pill">~4 hrs/week saved</span>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                Delivered executive-facing Confluence &amp; SharePoint artifacts using HTML / CSS / JS macros
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                Led governance template enhancements incorporating risk &amp; total cost of ownership analysis
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                Presented changes at Architecture Working Group forums; collaborated across architects, grads &amp; leadership
              </div>
            </div>
          </div>
        </div>

        <div class="exp-right" data-animate data-delay="3">
          <div class="impact-card">
            <div>
              <div class="impact-title">Efficiency Impact</div>
              <div class="impact-metric">
                <div class="impact-num" data-count="4" data-decimals="0">4</div>
                <div class="impact-label">hours saved per week via AI automation</div>
              </div>
            </div>
            <div>
              <div class="impact-title">Stakeholder Reach</div>
              <div class="impact-metric">
                <div class="impact-label" style="font-size:0.9rem; color:rgba(255,255,255,0.7); line-height:1.5">
                  Executive-visible documentation deployed across enterprise governance platforms
                </div>
              </div>
            </div>
            <div>
              <div class="impact-title">Tools & Stack</div>
              <div class="used-strip">
                <span class="used-chip">Copilot</span>
                <span class="used-chip">Prompt Engineering</span>
                <span class="used-chip">HTML / CSS / JS</span>
                <span class="used-chip">Confluence</span>
                <span class="used-chip">SharePoint</span>
                <span class="used-chip">Jira</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderResearch(slide) {
  return `
    <div class="slide-inner">
      <div class="eyebrow" data-animate data-delay="1">Research · Monash Robotics</div>
      <h2 class="headline" data-animate data-delay="2">${slide.headline}</h2>
      <p class="subheadline" data-animate data-delay="3">${slide.subheadline || ''}</p>

      <div class="research-layout" data-animate data-delay="4">
        <div class="pub-card">
          <div class="pub-venue">
            <div class="pub-venue-dot"></div>
            Published · HRI 2025 · ACM Digital Library
          </div>
          <div class="pub-title">
            VR &amp; Mixed Reality for Remote Warehouse Error Correction — Amazon-Funded Study
          </div>
          <div class="pub-sponsor">📦 Amazon-funded &nbsp;·&nbsp; Monash Robotics Lab &nbsp;·&nbsp; Feb 2024 – Oct 2025</div>
          <a class="pub-link" href="https://dl.acm.org/doi/10.5555/3721488.3721553" target="_blank" rel="noopener">
            View on ACM Digital Library ↗
          </a>
        </div>

        <div class="tech-card">
          <div>
            <div class="tech-section-title">Technology Stack</div>
            <div class="tech-tags">
              <span class="tech-tag">ROS</span>
              <span class="tech-tag">Unity / C#</span>
              <span class="tech-tag">Meta Quest 3</span>
              <span class="tech-tag">MoveIt</span>
              <span class="tech-tag">ROS TCP Endpoint</span>
              <span class="tech-tag">Franka Panda Arm</span>
              <span class="tech-tag">Python</span>
            </div>
          </div>
          <div>
            <div class="tech-section-title">Key Deliverables</div>
            <div class="deliverable-list">
              <div class="deliverable">
                <div class="del-check" style="background:#dbeafe; color:#1d4ed8">✓</div>
                Full paper published at HRI 2025 — top-tier Human-Robot Interaction venue
              </div>
              <div class="deliverable">
                <div class="del-check" style="background:#d1fae5; color:#059669">✓</div>
                Remote VR + Mixed Reality robot arm error correction system
              </div>
              <div class="deliverable">
                <div class="del-check" style="background:#fef3c7; color:#d97706">✓</div>
                Formal user study design, execution, and analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDeepNeuron(slide) {
  return `
    <div class="slide-inner">
      <div class="eyebrow" data-animate data-delay="1">Leadership · Monash DeepNeuron</div>
      <h2 class="headline" data-animate data-delay="2">${slide.headline}</h2>
      <p class="subheadline" data-animate data-delay="3">AI/DL Lead · June 2023 – July 2024</p>

      <div class="dn-layout" data-animate data-delay="4">
        <div class="role-cards">
          <div class="role-card">
            <div class="role-icon-wrap">⬡</div>
            <div>
              <div class="role-title">Technical Leadership</div>
              <div class="role-sub">Led AI, Machine Learning & Deep Learning projects across the team pipeline</div>
            </div>
          </div>
          <div class="role-card">
            <div class="role-icon-wrap">◎</div>
            <div>
              <div class="role-title">Team Building</div>
              <div class="role-sub">Recruited, onboarded, and mentored AI/DL engineers and researchers</div>
            </div>
          </div>
          <div class="role-card">
            <div class="role-icon-wrap">⊕</div>
            <div>
              <div class="role-title">External Relations</div>
              <div class="role-sub">Collaborated with university professors, industry partners & corporate sponsors</div>
            </div>
          </div>
          <div class="role-card">
            <div class="role-icon-wrap">◈</div>
            <div>
              <div class="role-title">Project Sourcing</div>
              <div class="role-sub">Evaluated and scoped future projects; maintained the team's technical roadmap</div>
            </div>
          </div>
        </div>

        <div>
          <div class="tech-section-title" style="color:var(--slate-400); font-family:'JetBrains Mono',monospace; font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:16px;">Team History</div>
          <div class="dn-timeline">
            <div class="dn-tl-item">
              <div class="dn-tl-dot">01</div>
              <div class="dn-tl-content">
                <div class="dn-tl-label">Research Intern — Monash Robotics</div>
                <div class="dn-tl-date">Nov 2023 – Feb 2024</div>
              </div>
            </div>
            <div class="dn-tl-item">
              <div class="dn-tl-dot">02</div>
              <div class="dn-tl-content">
                <div class="dn-tl-label">Bio-Acoustics Monitoring Model</div>
                <div class="dn-tl-date">Jun – Nov 2022 &nbsp;·&nbsp; LSTM · 80% accuracy · 24× faster</div>
              </div>
            </div>
            <div class="dn-tl-item">
              <div class="dn-tl-dot">03</div>
              <div class="dn-tl-content">
                <div class="dn-tl-label">Microfluidics Analysis — Monash IVF</div>
                <div class="dn-tl-date">Jan – Jun 2023 &nbsp;·&nbsp; ResNet-34 · 90% accuracy</div>
              </div>
            </div>
            <div class="dn-tl-item">
              <div class="dn-tl-dot">04</div>
              <div class="dn-tl-content">
                <div class="dn-tl-label">AI/DL Lead — DeepNeuron</div>
                <div class="dn-tl-date">Jun 2023 – Jul 2024</div>
              </div>
            </div>
            <div class="dn-tl-item">
              <div class="dn-tl-dot">05</div>
              <div class="dn-tl-content">
                <div class="dn-tl-label">Research Assistant — Monash Robotics</div>
                <div class="dn-tl-date">Feb 2024 – Oct 2025 &nbsp;·&nbsp; HRI 2025 Paper</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProjects(slide) {
  return `
    <div class="slide-inner">
      <div class="eyebrow" data-animate data-delay="1">Research Projects</div>
      <h2 class="headline" data-animate data-delay="2">${slide.headline}</h2>

      <div class="projects-grid" data-animate data-delay="3">
        <div class="project-card">
          <div class="project-stripe" style="background: linear-gradient(90deg, var(--blue), var(--blue-light))"></div>
          <div class="proj-cat" style="background:#dbeafe; color:var(--blue);">Medical AI</div>
          <div class="proj-title">Microfluidics Analysis — Sperm Cell Selection</div>
          <div class="proj-metrics">
            <div class="proj-metric">
              <div class="proj-metric-val" style="color:var(--blue)">90%</div>
              <div class="proj-metric-label">Classification Accuracy</div>
            </div>
            <div class="proj-metric">
              <div class="proj-metric-val" style="color:var(--blue)">2026</div>
              <div class="proj-metric-label">Planned Clinical Adoption</div>
            </div>
          </div>
          <div class="proj-desc">
            Optimised ResNet-34 model for sperm cell analysis and selection. Research may be adopted by Monash IVF from 2026 to improve IVF treatment outcomes.
          </div>
        </div>

        <div class="project-card">
          <div class="project-stripe" style="background: linear-gradient(90deg, var(--green), #34d399)"></div>
          <div class="proj-cat" style="background:#d1fae5; color:var(--green);">Ecology AI</div>
          <div class="proj-title">Bio-Acoustics Monitoring — Endangered Species Classification</div>
          <div class="proj-metrics">
            <div class="proj-metric">
              <div class="proj-metric-val" style="color:var(--green)">80%</div>
              <div class="proj-metric-label">Classification Accuracy</div>
            </div>
            <div class="proj-metric">
              <div class="proj-metric-val" style="color:var(--green)">24×</div>
              <div class="proj-metric-label">Analysis Speed-Up</div>
            </div>
          </div>
          <div class="proj-desc">
            Multi-head 2-way LSTM for audio classification of endangered bird species. Reduced researcher analysis time from 12 hours to 30 minutes.
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAwards(slide) {
  // Solid-filled SVG icons — professional silhouettes using currentColor
  const iconParl = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5L2 8.5V10h1v11h2V11h2v10h2V11h2v10h2V11h2v10h2V11h2v10h2V10h1V8.5L12 2.5zM11 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
    <rect x="2" y="20" width="20" height="2" rx="0.5"/>
  </svg>`;
  const iconTrophy = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H7v8a5 5 0 0 0 10 0V3zM5 5H3a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4V9A2 2 0 0 1 5 7V5zm14 0h2a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4V9a2 2 0 0 0 2-2V5zM11 18v-2h2v2l1 2H10l1-2z"/>
    <rect x="8" y="20" width="8" height="2" rx="1"/>
  </svg>`;
  const iconShield = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.35C17.25 21.15 21 16.25 21 11V5l-9-4zm-1.5 13.5l-3-3 1.41-1.41L10.5 11.67l4.59-4.58L16.5 8.5l-6 6z"/>
  </svg>`;
  const iconCap = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z"/>
  </svg>`;
  const iconScroll = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>`;

  return `
    <div class="slide-inner">
      <div class="eyebrow" data-animate data-delay="1">Awards &amp; Recognition</div>
      <div class="awards-layout">
        <div class="awards-left" data-animate data-delay="2">
          <div class="parl-callout">
            <div class="parl-icon award-icon-svg">${iconParl}</div>
            <div class="parl-title">Parliamentary AI Presenter</div>
            <div class="parl-body">
              Hosted and presented during a site visit by the House Standing Committee on Education, Employment and Training for the Parliamentary Inquiry into Generative AI in Education. November 2023.
            </div>
          </div>
        </div>

        <div class="awards-list" data-animate data-delay="3">
          <div class="award-card">
            <div class="award-icon-svg award-icon-sm">${iconTrophy}</div>
            <div>
              <div class="award-title">State Finalist — AIIA Innovation Awards</div>
              <div class="award-sub">2022 · Computer Vision / Mask Detection System</div>
            </div>
          </div>
          <div class="award-card">
            <div class="award-icon-svg award-icon-sm">${iconShield}</div>
            <div>
              <div class="award-title">ADF Future Innovators Award</div>
              <div class="award-sub">Australian Defence Force 2021 · Face Mask Detection System</div>
            </div>
          </div>
          <div class="award-card">
            <div class="award-icon-svg award-icon-sm">${iconCap}</div>
            <div>
              <div class="award-title">Motorola Solutions Leader Scholarship</div>
              <div class="award-sub">2023 · Awarded for academic leadership and achievement</div>
            </div>
          </div>
          <div class="award-card">
            <div class="award-icon-svg award-icon-sm">${iconScroll}</div>
            <div>
              <div class="award-title">Achieving &amp; Achieving Potential Access Scholarship</div>
              <div class="award-sub">2022 · Monash University</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSkills(slide) {
  const cats = [
    {
      name: 'Languages',
      items: ['Python', 'C++', 'C', 'C#', 'HTML / CSS', 'SQL', 'MATLAB', 'Verilog', 'VHDL', 'R', 'Flutter / Dart', 'Assembly RISC-V'],
    },
    {
      name: 'Frameworks & Systems',
      items: ['ROS', 'Unity', 'MoveIt', 'Git', 'MongoDB', 'Android Studio', 'PyCharm', 'Jupyter', 'VSCode', 'LTspice', 'PowerWorld', 'Meta Quest Dev Hub'],
    },
    {
      name: 'AI & Engineering',
      items: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Robotics', 'VR / MR', 'Prompt Engineering', 'Enterprise Architecture', 'Research'],
    },
    {
      name: 'Project Management',
      items: ['Jira', 'Confluence', 'SharePoint', 'Kanban', 'Gantt Charts', 'Working Groups', 'Workflow Optimisation'],
    },
  ];
  return `
    <div class="slide-inner">
      <div class="eyebrow" data-animate data-delay="1">Technical Skills</div>
      <h2 class="headline" data-animate data-delay="2">${slide.headline}</h2>

      <div class="skills-layout" data-animate data-delay="3">
        ${cats.map(cat => `
          <div class="skill-cat">
            <div class="skill-cat-header">
              <span class="skill-cat-name">${cat.name}</span>
              <span class="skill-cat-count">${cat.items.length} skills</span>
            </div>
            <div class="skill-chips">
              ${cat.items.map(item => `<span class="skill-chip">${item}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderClosing(slide) {
  return `
    <div class="slide-inner">
      <div class="closing-layout">
        <div class="closing-left">
          <div class="eyebrow" data-animate data-delay="1">Get in Touch</div>
          <h2 class="headline" data-animate data-delay="2">${slide.headline}</h2>
          <p class="subheadline" data-animate data-delay="3">${slide.subheadline || ''}</p>

          <div class="contact-grid" data-animate data-delay="4">
            <a class="contact-card" href="mailto:advaykumar2004@gmail.com">
              <div class="contact-icon-wrap">✉</div>
              <div>
                <div class="contact-type">Email</div>
                <div class="contact-val">advaykumar2004@gmail.com</div>
              </div>
            </a>
            <a class="contact-card" href="tel:+61410377289">
              <div class="contact-icon-wrap">✆</div>
              <div>
                <div class="contact-type">Phone</div>
                <div class="contact-val">(+61) 410 377 289</div>
              </div>
            </a>
            <a class="contact-card" href="https://www.linkedin.com/in/advay-kumar-2a9ab6247/" target="_blank" rel="noopener">
              <div class="contact-icon-wrap">in</div>
              <div>
                <div class="contact-type">LinkedIn</div>
                <div class="contact-val">Advay Kumar</div>
              </div>
            </a>
            <a class="contact-card" href="https://github.com/AKoder123" target="_blank" rel="noopener">
              <div class="contact-icon-wrap">⌥</div>
              <div>
                <div class="contact-type">GitHub</div>
                <div class="contact-val">AKoder123</div>
              </div>
            </a>
          </div>

          <div class="website-block" data-animate data-delay="5">
            <div class="ws-dot"></div>
            <div class="ws-url">
              <a href="https://akoder123.github.io/Advay-Personal-Website/" target="_blank" rel="noopener">
                akoder123.github.io/Advay-Personal-Website/
              </a>
            </div>
          </div>
        </div>

        <div class="closing-right" data-animate data-delay="4">
          <div class="avail-card">
            <div class="avail-badge">
              <div class="avail-dot"></div>
              Available 2026
            </div>
            <div class="avail-heading">Open to graduate roles, research collaborations &amp; meaningful projects.</div>
            <div class="avail-body">
              Graduating Monash University in 2026 with a dual degree in Electrical &amp; Computer Systems Engineering and Commerce. Strong background in AI/ML, robotics, and enterprise technology with published research and industry experience at ANZ Bank.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ════════════════════════════════════════
   ROUTE SLIDES
════════════════════════════════════════ */
function renderSlide(slide, i) {
  if (slide.type === 'title')       return renderTitle(slide);
  if (slide.type === 'closing')     return renderClosing(slide);
  if (slide.type === 'beforeAfter') return renderProjects(slide);
  if (slide.type === 'section')     return renderEducation(slide);
  if (slide.headline.includes('ANZ'))        return renderANZ(slide);
  if (slide.headline.includes('Robotics'))   return renderResearch(slide);
  if (slide.headline.includes('DeepNeuron')) return renderDeepNeuron(slide);
  if (slide.headline.includes('Awards'))     return renderAwards(slide);
  if (slide.headline.includes('Skills'))     return renderSkills(slide);
  return renderEducation(slide);
}

/* ════════════════════════════════════════
   BUILD
════════════════════════════════════════ */
function buildDeck(data) {
  slides = data.slides;
  const deck = document.getElementById('deck');

  deck.innerHTML = slides.map((slide, i) => `
    <section class="slide slide-${slide.type}" id="slide-${i}" data-index="${i}">
      ${renderSlide(slide, i)}
    </section>
  `).join('');

  document.getElementById('slideCounter').textContent =
    `01 / ${String(slides.length).padStart(2, '0')}`;

  initObserver();
  initKeyboard();
  initNavbarOffset();
  setupPdfExport();

  // Trigger first slide
  setTimeout(() => {
    const first = document.getElementById('slide-0');
    if (first) { first.classList.add('is-active'); triggerEffects(first); }
  }, 120);
}

/* ════════════════════════════════════════
   PER-SLIDE JS EFFECTS
════════════════════════════════════════ */
function triggerEffects(el) {
  // Stat counters
  el.querySelectorAll('[data-count]').forEach(num => {
    const target = parseFloat(num.dataset.count);
    const dec = parseInt(num.dataset.decimals || '0', 10);
    const dur = 1200;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      num.textContent = (target * ease).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), 450);
  });

  // GPA bar
  el.querySelectorAll('.gpa-fill[data-width]').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 650);
  });

  // Stagger skill chips
  el.querySelectorAll('.skill-chip').forEach((chip, i) => {
    chip.style.cssText = 'opacity:0;transform:scale(0.85)';
    setTimeout(() => {
      chip.style.transition = 'opacity 0.3s, transform 0.3s';
      chip.style.opacity = '1'; chip.style.transform = 'scale(1)';
    }, 300 + i * 35);
  });

  // Stagger award cards (horizontal slide)
  el.querySelectorAll('.award-card').forEach((card, i) => {
    card.style.cssText = 'opacity:0;transform:translateX(-12px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1'; card.style.transform = 'none';
    }, 250 + i * 80);
  });

  // Stagger timeline items
  el.querySelectorAll('.tl-item').forEach((item, i) => {
    item.style.cssText = 'opacity:0;transform:translateY(8px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      item.style.opacity = '1'; item.style.transform = 'none';
    }, 350 + i * 75);
  });

  // Role cards
  el.querySelectorAll('.role-card').forEach((card, i) => {
    card.style.cssText = 'opacity:0;transform:translateY(10px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity = '1'; card.style.transform = 'none';
    }, 320 + i * 65);
  });

  // Contact cards
  el.querySelectorAll('.contact-card').forEach((card, i) => {
    card.style.cssText = 'opacity:0;transform:translateY(8px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1'; card.style.transform = 'none';
    }, 380 + i * 70);
  });

  // Edu modules
  el.querySelectorAll('.edu-module').forEach((mod, i) => {
    mod.style.cssText = 'opacity:0;transform:translateY(10px)';
    setTimeout(() => {
      mod.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      mod.style.opacity = '1'; mod.style.transform = 'none';
    }, 300 + i * 90);
  });

  // DeepNeuron timeline
  el.querySelectorAll('.dn-tl-item').forEach((item, i) => {
    item.style.cssText = 'opacity:0;transform:translateX(-8px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      item.style.opacity = '1'; item.style.transform = 'none';
    }, 350 + i * 80);
  });

  // Project cards
  el.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.cssText = 'opacity:0;transform:translateY(14px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      card.style.opacity = '1'; card.style.transform = 'none';
    }, 280 + i * 90);
  });
}

/* ════════════════════════════════════════
   INTERSECTION OBSERVER
════════════════════════════════════════ */
function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!e.target.classList.contains('is-active')) {
          e.target.classList.add('is-active');
          triggerEffects(e.target);
        }
        const idx = parseInt(e.target.dataset.index, 10);
        current = idx;
        document.getElementById('slideCounter').textContent =
          `${String(idx + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
        const pct = (idx / Math.max(slides.length - 1, 1)) * 100;
        document.getElementById('progressBar').style.width = pct + '%';
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.slide').forEach(s => obs.observe(s));
}

/* ════════════════════════════════════════
   KEYBOARD
════════════════════════════════════════ */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    const fwd = ['ArrowDown','ArrowRight','Space','PageDown'].includes(e.code);
    const bwd = ['ArrowUp','ArrowLeft','PageUp'].includes(e.code);
    if (fwd || bwd) {
      e.preventDefault();
      const next = fwd ? current + 1 : current - 1;
      if (next >= 0 && next < slides.length)
        document.getElementById(`slide-${next}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ════════════════════════════════════════
   NAVBAR OFFSET
════════════════════════════════════════ */
function initNavbarOffset() {
  const nav = document.getElementById('navbar');
  const set = () => document.documentElement.style.setProperty('--topOffset', nav.offsetHeight + 'px');
  set();
  new ResizeObserver(set).observe(nav);
}

/* ════════════════════════════════════════
   PDF EXPORT
════════════════════════════════════════ */
function setupPdfExport() {
  const btn = document.getElementById('exportPdfBtn');
  btn.addEventListener('click', async () => {
    btn.disabled = true; btn.textContent = 'Exporting…';
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    } catch {
      alert('PDF export libraries could not load. Ensure cdnjs.cloudflare.com is reachable.');
      btn.disabled = false; btn.textContent = 'Export PDF'; return;
    }

    document.body.classList.add('exportingPdf');
    document.querySelectorAll('.slide').forEach(s => s.classList.add('is-active'));
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });

    for (let i = 0; i < slides.length; i++) {
      const stage = document.createElement('div'); stage.id = 'pdfStage';
      const clone = document.getElementById(`slide-${i}`).cloneNode(true);
      clone.classList.add('is-active');
      clone.querySelectorAll('[data-animate],[style]').forEach(el => {
        el.style.opacity = '1'; el.style.transform = 'none'; el.style.transition = 'none';
      });
      stage.appendChild(clone);
      document.body.appendChild(stage);

      const canvas = await html2canvas(stage, {
        scale: 2, useCORS: true,
        width: 1920, height: 1080, windowWidth: 1920, windowHeight: 1080,
      });
      if (i > 0) pdf.addPage([1920, 1080], 'landscape');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 1920, 1080);
      document.body.removeChild(stage);
    }

    pdf.save('advay-kumar-portfolio.pdf');
    document.body.classList.remove('exportingPdf');
    btn.disabled = false; btn.textContent = 'Export PDF';
  });
}

function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

/* ════════════════════════════════════════
   BOOT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetch('./content.json').then(r => r.json());
    buildDeck(data);
  } catch (e) {
    document.body.innerHTML = `<div style="padding:40px;font-family:monospace;color:red">Error loading content.json: ${e.message}</div>`;
  }
});
