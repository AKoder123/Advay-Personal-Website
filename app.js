/**
 * Advay Kumar Portfolio - Slide Presentation
 * Vanilla JS with PDF Export Support
 */

// ============================================
// STATE
// ============================================
let slidesData = [];
let currentSlideIndex = 0;
let isExporting = false;

// ============================================
// DOM ELEMENTS
// ============================================
const slideContainer = document.getElementById('slideContainer');
const progressFill = document.querySelector('.progress-fill');
const currentSlideEl = document.querySelector('.slide-counter .current');
const totalSlidesEl = document.querySelector('.slide-counter .total');
const exportBtn = document.getElementById('exportPdfBtn');
const pdfStage = document.getElementById('pdfStage');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadContent();
  setupNavigation();
  setupIntersectionObserver();
  setupPdfExport();
  updateProgress();
});

// ============================================
// CONTENT LOADING
// ============================================
async function loadContent() {
  try {
    const response = await fetch('content.json');
    const data = await response.json();
    slidesData = data.slides;
    totalSlidesEl.textContent = slidesData.length;
    renderSlides();
  } catch (error) {
    console.error('Failed to load content:', error);
    slideContainer.innerHTML = '<div class="slide"><div class="slide-content"><p style="text-align:center;color:#fff;">Error loading content. Please refresh.</p></div></div>';
  }
}

function renderSlides() {
  slideContainer.innerHTML = slidesData.map((slide, index) => createSlideHTML(slide, index)).join('');
  
  // Add decorative elements to title slide
  const titleSlide = slideContainer.querySelector('.slide-title');
  if (titleSlide) {
    titleSlide.insertAdjacentHTML('beforeend', `
      <div class="title-decoration title-decoration-1"></div>
      <div class="title-decoration title-decoration-2"></div>
    `);
  }
}

function createSlideHTML(slide, index) {
  const slideClass = getSlideClass(slide.type);
  const content = getSlideContent(slide);
  
  return `
    <section class="slide ${slideClass}" data-index="${index}" id="slide-${index}">
      <div class="slide-content">
        ${content}
      </div>
    </section>
  `;
}

function getSlideClass(type) {
  const classMap = {
    'title': 'slide-title',
    'content': 'slide-content-card',
    'experience': 'slide-content-card',
    'projects': 'slide-content-card',
    'awards': 'slide-content-card',
    'beforeAfter': 'slide-content-card',
    'closing': 'slide-closing'
  };
  return classMap[type] || 'slide-content-card';
}

function getSlideContent(slide) {
  switch (slide.type) {
    case 'title':
      return `
        <div class="profile-image-container" data-animate="scale">
          <img src="profile.jpg" alt="Profile" class="profile-image" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'profile-placeholder\\'>AK</div>';">
        </div>
        <h1 class="headline" data-animate="fade-up">${slide.headline}</h1>
        <p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>
        ${slide.note ? `<span class="note" data-animate="fade-up">${slide.note}</span>` : ''}
      `;
    
    case 'content':
      // Check if it's a stats slide
      if (slide.stats) {
        return `
          <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
          ${slide.subheadline ? `<p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>` : ''}
          <div class="stats-grid" data-animate="fade-up">
            ${slide.stats.map(stat => `
              <div class="stat-card">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
              </div>
            `).join('')}
          </div>
          ${slide.skillTags ? `
            <div class="skill-cloud" data-animate="fade-up">
              ${slide.skillTags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        `;
      }
      // Check if it's a timeline slide
      if (slide.timeline) {
        return `
          <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
          ${slide.subheadline ? `<p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>` : ''}
          <div class="timeline" data-animate="fade-up">
            ${slide.timeline.map(item => `
              <div class="timeline-item">
                <div class="timeline-content">
                  <div class="timeline-title">${item.title}</div>
                  <div class="timeline-subtitle">${item.subtitle}</div>
                  <div class="timeline-desc">${item.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
      // Default content with cards
      return `
        <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
        ${slide.subheadline ? `<p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>` : ''}
        <div class="experience-card" data-animate="fade-up">
          <ul class="bullet-list">
            ${slide.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
          </ul>
        </div>
      `;
    
    case 'experience':
      return `
        <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
        ${slide.subheadline ? `<p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>` : ''}
        ${slide.experiences.map((exp, i) => `
          <div class="experience-card" data-animate="fade-up" style="transition-delay: ${0.1 * (i + 1)}s">
            <div class="card-header">
              <div>
                <div class="card-title">${exp.title}</div>
                <div class="card-subtitle">${exp.company}</div>
              </div>
              <span class="card-date">${exp.date}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${exp.description}</p>
            ${exp.tags ? `
              <div class="card-tags">
                ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      `;
    
    case 'projects':
      return `
        <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
        ${slide.subheadline ? `<p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>` : ''}
        <div class="project-grid">
          ${slide.projects.map((proj, i) => `
            <div class="project-card" data-animate="fade-up" style="transition-delay: ${0.1 * (i + 1)}s">
              <div class="project-icon">${proj.icon}</div>
              <div class="project-title">${proj.title}</div>
              <div class="project-desc">${proj.description}</div>
              <div class="project-stats">
                ${proj.stats.map(stat => `
                  <div class="project-stat">
                    <span class="stat-icon">${stat.icon}</span>
                    <span>${stat.value}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    
    case 'awards':
      return `
        <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
        ${slide.subheadline ? `<p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>` : ''}
        <div class="awards-grid">
          ${slide.awards.map((award, i) => `
            <div class="award-card" data-animate="fade-up" style="transition-delay: ${0.1 * (i + 1)}s">
              <div class="award-icon">${award.icon}</div>
              <div class="award-content">
                <div class="award-title">${award.title}</div>
                <div class="award-year">${award.year}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    
    case 'beforeAfter':
      return `
        <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
        <div class="before-after-container">
          <div class="before-after-card" data-animate="fade-left">
            <h3>${slide.left.title}</h3>
            <div class="skill-cloud">
              ${slide.left.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
          </div>
          <div class="before-after-card" data-animate="fade-right">
            <h3>${slide.right.title}</h3>
            <div class="skill-cloud">
              ${slide.right.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    
    case 'closing':
      return `
        <h2 class="headline" data-animate="fade-up">${slide.headline}</h2>
        <p class="subheadline" data-animate="fade-up">${slide.subheadline}</p>
        <div class="contact-grid" data-animate="fade-up">
          ${slide.contacts.map((contact, i) => `
            <a href="${contact.link}" class="contact-item" target="${contact.link.startsWith('http') ? '_blank' : '_self'}" rel="${contact.link.startsWith('http') ? 'noopener noreferrer' : ''}">
              <span class="contact-icon">${contact.icon}</span>
              <span>${contact.text}</span>
            </a>
          `).join('')}
        </div>
      `;
    
    default:
      return `<p>Unknown slide type: ${slide.type}</p>`;
  }
}

// ============================================
// NAVIGATION
// ============================================
function setupNavigation() {
  document.addEventListener('keydown', handleKeyDown);
  
  // Touch/swipe support
  let touchStartY = 0;
  let touchEndY = 0;
  
  slideContainer.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  slideContainer.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const threshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToSlide(currentSlideIndex + 1);
      } else {
        goToSlide(currentSlideIndex - 1);
      }
    }
  }
}

function handleKeyDown(e) {
  if (isExporting) return;
  
  switch (e.key) {
    case ' ':
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault();
      goToSlide(currentSlideIndex + 1);
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault();
      goToSlide(currentSlideIndex - 1);
      break;
    case 'Home':
      e.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      e.preventDefault();
      goToSlide(slidesData.length - 1);
      break;
  }
}

function goToSlide(index) {
  const clampedIndex = Math.max(0, Math.min(index, slidesData.length - 1));
  if (clampedIndex === currentSlideIndex) return;
  
  const targetSlide = document.getElementById(`slide-${clampedIndex}`);
  if (targetSlide) {
    targetSlide.scrollIntoView({ behavior: 'smooth' });
  }
}

// ============================================
// INTERSECTION OBSERVER (ACTIVE SLIDE DETECTION)
// ============================================
function setupIntersectionObserver() {
  const options = {
    root: slideContainer,
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index);
        setActiveSlide(index);
      }
    });
  }, options);
  
  document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
  });
}

function setActiveSlide(index) {
  // Remove active class from all slides
  document.querySelectorAll('.slide').forEach(slide => {
    slide.classList.remove('is-active');
  });
  
  // Add active class to current slide
  const currentSlide = document.getElementById(`slide-${index}`);
  if (currentSlide) {
    currentSlide.classList.add('is-active');
  }
  
  currentSlideIndex = index;
  updateProgress();
}

function updateProgress() {
  const progress = ((currentSlideIndex + 1) / slidesData.length) * 100;
  progressFill.style.width = `${progress}%`;
  currentSlideEl.textContent = currentSlideIndex + 1;
}

// ============================================
// PDF EXPORT
// ============================================
function setupPdfExport() {
  exportBtn.addEventListener('click', exportToPDF);
}

async function exportToPDF() {
  if (isExporting) return;
  isExporting = true;
  
  const originalText = exportBtn.textContent;
  exportBtn.textContent = 'Exporting...';
  exportBtn.disabled = true;
  
  try {
    // Load libraries
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
    });
    
    // Add exporting class
    document.body.classList.add('exportingPdf');
    
    // Force all slides to visible state
    document.querySelectorAll('.slide').forEach(slide => {
      slide.classList.add('is-active');
    });
    
    // Capture each slide
    for (let i = 0; i < slidesData.length; i++) {
      await captureSlideToPDF(i, pdf, i === slidesData.length - 1);
    }
    
    // Save PDF
    pdf.save('Advay_Kumar_Portfolio.pdf');
    
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('PDF export failed. Please ensure you have an internet connection to load the required libraries (cdnjs.cloudflare.com).');
  } finally {
    // Cleanup
    document.body.classList.remove('exportingPdf');
    document.querySelectorAll('.slide').forEach((slide, index) => {
      slide.classList.toggle('is-active', index === currentSlideIndex);
    });
    
    exportBtn.textContent = originalText;
    exportBtn.disabled = false;
    isExporting = false;
  }
}

async function captureSlideToPDF(index, pdf, isLast) {
  const slide = document.getElementById(`slide-${index}`);
  
  // Create PDF stage content
  pdfStage.innerHTML = '';
  
  // Clone background
  const bgClone = document.querySelector('.bg').cloneNode(true);
  pdfStage.appendChild(bgClone);
  
  // Clone slide
  const slideClone = slide.cloneNode(true);
  slideClone.classList.add('is-active');
  slideClone.style.position = 'absolute';
  slideClone.style.top = '0';
  slideClone.style.left = '0';
  pdfStage.appendChild(slideClone);
  
  // Wait for render
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Capture with html2canvas
  const canvas = await html2canvas(pdfStage, {
    backgroundColor: '#050611',
    scale: Math.max(window.devicePixelRatio, 2),
    useCORS: true,
    allowTaint: true,
    logging: false
  });
  
  // Add to PDF
  const imgData = canvas.toDataURL('image/png');
  
  if (index > 0) {
    pdf.addPage([1920, 1080], 'landscape');
  }
  
  pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
  
  // Cleanup stage
  pdfStage.innerHTML = '';
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

// ============================================
// NAVBAR HEIGHT CALCULATION
// ============================================
function updateTopOffset() {
  const nav = document.querySelector('.top-nav');
  if (nav) {
    const height = nav.offsetHeight;
    document.documentElement.style.setProperty('--topOffset', `${height}px`);
  }
}

window.addEventListener('resize', updateTopOffset);
updateTopOffset();
