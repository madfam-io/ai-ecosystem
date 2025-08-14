(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class I{constructor(){this.metrics=new Map,this.observers=[],this.isEnabled=!0}init(){this.isEnabled&&(this.setupObservers(),this.trackPageLoad(),this.setupMemoryMonitoring())}start(e){this.isEnabled&&this.metrics.set(e,{startTime:performance.now()})}end(e){if(!this.isEnabled)return;const t=this.metrics.get(e);t&&(t.endTime=performance.now(),t.duration=t.endTime-t.startTime,console.log(`⏱️ ${e}: ${t.duration.toFixed(2)}ms`))}measureFunction(e,t){if(!this.isEnabled)return t();this.start(e);const i=t();return this.end(e),i}async measureAsyncFunction(e,t){if(!this.isEnabled)return await t();this.start(e);const i=await t();return this.end(e),i}setupObservers(){try{if("PerformanceObserver"in window){const e=new PerformanceObserver(i=>{const s=i.getEntries(),r=s[s.length-1];console.log(`📊 LCP: ${r.startTime.toFixed(2)}ms`)});e.observe({entryTypes:["largest-contentful-paint"]}),this.observers.push(e);const t=new PerformanceObserver(i=>{for(const s of i.getEntries())console.log(`📊 FID: ${s.processingStart-s.startTime}ms`)});t.observe({entryTypes:["first-input"]}),this.observers.push(t)}}catch(e){console.warn("Performance observers not available:",e)}}trackPageLoad(){window.addEventListener("load",()=>{setTimeout(()=>{const e=performance.getEntriesByType("navigation")[0];e&&console.log(`📊 Page Load Metrics:
            - DNS Lookup: ${(e.domainLookupEnd-e.domainLookupStart).toFixed(2)}ms
            - TCP Connect: ${(e.connectEnd-e.connectStart).toFixed(2)}ms
            - Request: ${(e.responseStart-e.requestStart).toFixed(2)}ms
            - Response: ${(e.responseEnd-e.responseStart).toFixed(2)}ms
            - DOM Processing: ${(e.domContentLoadedEventEnd-e.responseEnd).toFixed(2)}ms
            - Total Load Time: ${(e.loadEventEnd-e.navigationStart).toFixed(2)}ms`)},0)})}setupMemoryMonitoring(){"memory"in performance&&setInterval(()=>{const e=performance.memory;console.log(`💾 Memory Usage:
          - Used: ${(e.usedJSHeapSize/1024/1024).toFixed(2)} MB
          - Total: ${(e.totalJSHeapSize/1024/1024).toFixed(2)} MB
          - Limit: ${(e.jsHeapSizeLimit/1024/1024).toFixed(2)} MB`)},3e4)}recordError(e){console.error("🚨 Error recorded:",e)}getMetrics(){return Object.fromEntries(this.metrics)}disable(){this.isEnabled=!1,this.observers.forEach(e=>e.disconnect()),this.observers=[]}}class A{constructor(){this.announcements=[],this.focusRing=null}init(){this.setupAriaLiveRegion(),this.setupFocusManagement(),this.setupReducedMotion(),this.setupHighContrast()}setupAriaLiveRegion(){this.liveRegion=document.createElement("div"),this.liveRegion.setAttribute("aria-live","polite"),this.liveRegion.setAttribute("aria-atomic","true"),this.liveRegion.className="sr-only",this.liveRegion.id="aria-live-region",document.body.appendChild(this.liveRegion)}announce(e,t="polite"){this.liveRegion&&(this.liveRegion.setAttribute("aria-live",t),this.liveRegion.textContent=e,setTimeout(()=>{this.liveRegion.textContent=""},1e3),this.announcements.push({message:e,timestamp:Date.now(),priority:t}))}setupFocusManagement(){document.addEventListener("keydown",e=>{e.key==="Tab"&&document.body.classList.add("keyboard-navigation")}),document.addEventListener("mousedown",()=>{document.body.classList.remove("keyboard-navigation")}),this.setupFocusTrap()}setupFocusTrap(){document.addEventListener("keydown",e=>{if(e.key==="Tab"){const t=document.querySelector(".modal.active, .dialog[open]");t&&this.trapFocus(e,t)}})}trapFocus(e,t){const i=t.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),s=i[0],r=i[i.length-1];e.shiftKey&&document.activeElement===s?(r.focus(),e.preventDefault()):!e.shiftKey&&document.activeElement===r&&(s.focus(),e.preventDefault())}focusSkipLink(){const e=document.querySelector(".skip-nav");e&&e.focus()}setupReducedMotion(){const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=i=>{i.matches?(document.body.classList.add("reduced-motion"),this.announce("Animations reduced for accessibility")):document.body.classList.remove("reduced-motion")};e.addEventListener("change",t),t(e)}setupHighContrast(){const e=window.matchMedia("(prefers-contrast: high)"),t=i=>{i.matches?(document.body.classList.add("high-contrast"),this.announce("High contrast mode detected")):document.body.classList.remove("high-contrast")};e.addEventListener("change",t),t(e)}makeAccessible(e,t={}){const{role:i,label:s,description:r,expanded:o,controls:n,describedBy:c}=t;return i&&e.setAttribute("role",i),s&&e.setAttribute("aria-label",s),r&&e.setAttribute("aria-description",r),o!==void 0&&e.setAttribute("aria-expanded",o),n&&e.setAttribute("aria-controls",n),c&&e.setAttribute("aria-describedby",c),e}createAccessibleButton(e,t,i={}){const s=document.createElement("button");if(s.textContent=e,s.addEventListener("click",t),i.icon){const r=document.createElement("span");r.className=`icon ${i.icon}`,r.setAttribute("aria-hidden","true"),s.prepend(r)}return this.makeAccessible(s,i),s}createAccessibleField(e,t,i,s={}){const r=document.createElement("div");r.className="field-container";const o=document.createElement("label");o.setAttribute("for",t),o.textContent=i;const n=document.createElement(e==="textarea"?"textarea":"input");if(n.id=t,n.name=t,e!=="textarea"&&(n.type=e),s.required&&(n.setAttribute("required",""),n.setAttribute("aria-required","true")),s.description){const c=document.createElement("div");c.id=`${t}-description`,c.className="field-description",c.textContent=s.description,n.setAttribute("aria-describedby",`${t}-description`),r.appendChild(c)}return r.appendChild(o),r.appendChild(n),{container:r,input:n,label:o}}getAnnouncementHistory(){return[...this.announcements]}clearAnnouncementHistory(){this.announcements=[]}}function l(a,e=null){const t=document.querySelector(a);return!t&&e?(console.warn(`Element not found: ${a}, using fallback`),typeof e=="string"?document.querySelector(e):e):t}function m(a){return Array.from(document.querySelectorAll(a))}function g(a,e,t,i){return a.addEventListener(e,t,i),()=>{a.removeEventListener(e,t,i)}}function $(a,e,t=!1){let i;return function(...r){const o=()=>{i=null,t||a.apply(this,r)},n=t&&!i;clearTimeout(i),i=setTimeout(o,e),n&&a.apply(this,r)}}function L(a,e){let t;return function(...i){t||(a.apply(this,i),t=!0,setTimeout(()=>t=!1,e))}}class F{constructor(){this.menuToggle=null,this.sidebarNav=null,this.navLinks=[],this.sections=[],this.currentActiveLink=null,this.observer=null,this.cleanupFunctions=[],this.accessibilityHelper=new A,this.isMobileMenuOpen=!1}async init(){try{this.setupElements(),this.setupEventListeners(),this.setupScrollSpy(),this.setupKeyboardNavigation(),this.setupResponsiveHandling(),console.log("✓ Navigation module initialized")}catch(e){throw console.error("Failed to initialize navigation:",e),e}}setupElements(){if(this.menuToggle=l("#menu-toggle"),this.sidebarNav=l(".sidebar-nav"),this.navLinks=m(".nav-link, .nav-sublink"),this.sections=m(".content-section"),!this.sidebarNav)throw new Error("Sidebar navigation not found");this.menuToggle&&this.accessibilityHelper.makeAccessible(this.menuToggle,{label:"Toggle navigation menu",expanded:!1,controls:"navigation-menu"}),this.sidebarNav&&(this.sidebarNav.id="navigation-menu",this.accessibilityHelper.makeAccessible(this.sidebarNav,{role:"navigation",label:"Report sections"}))}setupEventListeners(){if(this.menuToggle){const i=g(this.menuToggle,"click",()=>this.toggleMobileMenu());this.cleanupFunctions.push(i)}this.navLinks.forEach(i=>{const s=g(i,"click",r=>this.handleNavLinkClick(r,i));this.cleanupFunctions.push(s)});const e=g(document,"click",i=>this.handleOutsideClick(i));this.cleanupFunctions.push(e);const t=g(document,"keydown",i=>this.handleEscapeKey(i));this.cleanupFunctions.push(t)}setupScrollSpy(){if(this.sections.length===0||this.navLinks.length===0){console.warn("No sections or nav links found for scroll spy");return}const e={rootMargin:"-20% 0px -70% 0px",threshold:[0,.1,.5,1]};this.observer=new IntersectionObserver(t=>this.handleIntersection(t),e),this.sections.forEach(t=>{this.observer.observe(t)})}handleIntersection(e){e.forEach(t=>{t.isIntersecting&&t.intersectionRatio>.1&&this.updateActiveNavigation(t.target.id)})}updateActiveNavigation(e){this.navLinks.forEach(i=>{i.classList.remove("active"),i.setAttribute("aria-current","false")});const t=this.navLinks.find(i=>i.getAttribute("href")===`#${e}`);if(t&&t!==this.currentActiveLink){t.classList.add("active"),t.setAttribute("aria-current","page"),this.currentActiveLink=t;const i=t.textContent.trim();this.accessibilityHelper.announce(`Now viewing: ${i}`)}}handleNavLinkClick(e,t){e.preventDefault();const i=t.getAttribute("href");if(!i||i==="#")return;const s=l(i);if(!s){console.warn(`Target element not found: ${i}`);return}this.scrollToSection(s,t),this.isMobileMenuOpen&&this.closeMobileMenu(),this.updateActiveNavigation(s.id)}scrollToSection(e,t){const i=this.getHeaderHeight(),s=e.offsetTop-i-20;window.scrollTo({top:s,behavior:"smooth"}),setTimeout(()=>{e.setAttribute("tabindex","-1"),e.focus(),setTimeout(()=>{e.removeAttribute("tabindex")},100)},500)}getHeaderHeight(){const e=l(".main-header");return e?e.offsetHeight:0}toggleMobileMenu(){this.isMobileMenuOpen=!this.isMobileMenuOpen,this.isMobileMenuOpen?this.openMobileMenu():this.closeMobileMenu()}openMobileMenu(){this.sidebarNav.classList.add("open"),this.menuToggle.setAttribute("aria-expanded","true"),this.isMobileMenuOpen=!0;const e=this.navLinks[0];e&&setTimeout(()=>e.focus(),100),this.accessibilityHelper.announce("Navigation menu opened")}closeMobileMenu(){this.sidebarNav.classList.remove("open"),this.menuToggle.setAttribute("aria-expanded","false"),this.isMobileMenuOpen=!1,this.accessibilityHelper.announce("Navigation menu closed")}handleOutsideClick(e){if(!this.isMobileMenuOpen)return;const t=this.sidebarNav.contains(e.target),i=this.menuToggle.contains(e.target);!t&&!i&&this.closeMobileMenu()}handleEscapeKey(e){e.key==="Escape"&&this.isMobileMenuOpen&&(this.closeMobileMenu(),this.menuToggle.focus())}setupKeyboardNavigation(){const e=g(document,"keydown",t=>this.handleKeyboardShortcuts(t));this.cleanupFunctions.push(e)}handleKeyboardShortcuts(e){if(!e.target.matches("input, textarea, select, [contenteditable]")&&e.key>="1"&&e.key<="9"&&!e.ctrlKey&&!e.metaKey){const t=parseInt(e.key)-1,i=this.sections[t];if(i){e.preventDefault();const s=this.navLinks.find(r=>r.getAttribute("href")===`#${i.id}`);s&&this.handleNavLinkClick(e,s)}}}setupResponsiveHandling(){const e=window.matchMedia("(max-width: 768px)"),t=i=>{!i.matches&&this.isMobileMenuOpen&&this.closeMobileMenu()};e.addEventListener("change",t),this.cleanupFunctions.push(()=>{e.removeEventListener("change",t)})}getCurrentSection(){return this.currentActiveLink?this.currentActiveLink.getAttribute("href").substring(1):null}navigateToSection(e){const t=this.navLinks.find(i=>i.getAttribute("href")===`#${e}`);if(t){const i={preventDefault:()=>{}};this.handleNavLinkClick(i,t)}}handleResponsiveChange(e){!e&&this.isMobileMenuOpen&&this.closeMobileMenu()}closeModals(){this.isMobileMenuOpen&&this.closeMobileMenu()}destroy(){this.observer&&(this.observer.disconnect(),this.observer=null),this.cleanupFunctions.forEach(e=>e()),this.cleanupFunctions=[],this.isMobileMenuOpen=!1,this.currentActiveLink=null}}class P{constructor(){this.isInitialized=!1,this.metricCards=[],this.observers=[]}async init(){try{await this.initializeMetricCards(),this.setupScrollAnimations(),this.setupEcosystemInteractions(),this.initializeMarketMetrics(),this.isInitialized=!0,console.log("✓ Dashboard module initialized with interactive metrics")}catch(e){console.error("Failed to initialize dashboard module:",e)}}async initializeMetricCards(){document.querySelectorAll(".metric-card").forEach(t=>{const i=t.querySelector(".metric-value"),s=parseInt(i.dataset.target);s&&this.animateValue(i,0,s,2e3)})}animateValue(e,t,i,s){const r=performance.now(),o=i<100&&i%1!==0,n=c=>{const d=c-r,h=Math.min(d/s,1),u=1-Math.pow(1-h,3),p=t+(i-t)*u;o?e.textContent=`$${p.toFixed(2)}B`:i>10?e.textContent=`$${Math.floor(p)}B`:e.textContent=Math.floor(p),h<1&&requestAnimationFrame(n)};requestAnimationFrame(n)}setupScrollAnimations(){const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(s.target.classList.add("animate-in"),s.target.classList.contains("dashboard-container")&&this.animateMetricCards(),t.unobserve(s.target))})},e);window.IntersectionObserver&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(document.querySelectorAll(".dashboard-container, .ecosystem-layer, .timeline-item").forEach(s=>{t.observe(s)}),this.observers.push(t))}animateMetricCards(){document.querySelectorAll(".metric-card").forEach((t,i)=>{setTimeout(()=>{t.classList.add("animate-in")},i*100)})}setupEcosystemInteractions(){document.querySelectorAll(".ecosystem-item").forEach(t=>{t.addEventListener("click",()=>{this.showItemDetails(t)}),t.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),this.showItemDetails(t))}),t.setAttribute("tabindex","0")})}showItemDetails(e){const t=e.textContent;e.classList[1];const i=document.querySelector(".ecosystem-tooltip");i&&i.remove();const s=document.createElement("div");s.className="ecosystem-tooltip",s.innerHTML=`
      <div class="tooltip-content">
        <h5>${t}</h5>
        <p>Click to learn more about this ${this.getItemCategory(e)} platform</p>
      </div>
    `,document.body.appendChild(s);const r=e.getBoundingClientRect();s.style.position="fixed",s.style.top=`${r.bottom+10}px`,s.style.left=`${r.left}px`,s.style.zIndex="1000",s.style.background="var(--surface-color)",s.style.border="2px solid var(--border-color)",s.style.borderRadius="var(--border-radius-md)",s.style.padding="var(--spacing-sm)",s.style.boxShadow="var(--shadow-lg)",s.style.maxWidth="200px",setTimeout(()=>{s.parentNode&&s.remove()},3e3)}getItemCategory(e){switch(e.closest(".ecosystem-layer").dataset.layer){case"proprietary":return"proprietary model";case"open-source":return"open-source model";case"platforms":return"cloud platform";default:return"AI platform"}}initializeMarketMetrics(){Object.entries({"market-size":{value:391,suffix:"B",prefix:"$"},"enterprise-spending":{value:26.65,suffix:"B",prefix:"$"},"frontier-players":{value:3,suffix:"",prefix:""}}).forEach(([t,i])=>{const s=document.querySelector(`[data-metric="${t}"]`);s&&(s.addEventListener("mouseenter",()=>{s.style.transform="translateY(-6px) scale(1.02)"}),s.addEventListener("mouseleave",()=>{s.style.transform="translateY(-4px) scale(1.02)"}))})}handleResponsiveChange(e){const t=document.querySelector(".ecosystem-grid");t&&(e?t.style.gridTemplateColumns="1fr":t.style.gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))")}closeModals(){const e=document.querySelector(".ecosystem-tooltip");e&&e.remove()}destroy(){this.observers.forEach(t=>t.disconnect()),this.observers=[];const e=document.querySelector(".ecosystem-tooltip");e&&e.remove(),this.isInitialized=!1}}const z={cpu:{id:"cpu",name:"Central Processing Unit (CPU)",description:"4-16 powerful cores",specs:{architecture:"Few powerful cores",optimizedFor:"Sequential processing",aiTrainingTime:"Months to years",bestFor:"General computing tasks"},visualization:{type:"cores",count:4,className:"cpu-cores"}},gpu:{id:"gpu",name:"Graphics Processing Unit (GPU)",description:"Thousands of parallel cores",specs:{architecture:"Thousands of smaller cores",optimizedFor:"Parallel processing",aiTrainingTime:"Days to weeks",bestFor:"Matrix multiplications, AI training"},visualization:{type:"grid",count:6,className:"gpu-cores"}},tpu:{id:"tpu",name:"Tensor Processing Unit (TPU)",description:"Systolic array architecture",specs:{architecture:"Specialized systolic arrays",optimizedFor:"Neural network computations",aiTrainingTime:"Hours to days",bestFor:"Large-scale AI model training"},visualization:{type:"array",count:4,className:"tpu-array"}}},N={labels:["Training Speed","Energy Efficiency","Cost Effectiveness","Parallel Processing"],datasets:[{label:"CPU",data:[20,60,80,30],backgroundColor:"rgba(0, 35, 73, 0.6)",borderColor:"rgba(0, 35, 73, 1)",borderWidth:2},{label:"GPU",data:[80,40,60,90],backgroundColor:"rgba(74, 144, 226, 0.6)",borderColor:"rgba(74, 144, 226, 1)",borderWidth:2},{label:"TPU",data:[95,80,40,95],backgroundColor:"rgba(255, 107, 107, 0.6)",borderColor:"rgba(255, 107, 107, 1)",borderWidth:2}]},S={title:"The NVIDIA CUDA Ecosystem",layers:[{id:"cuda-core",title:"CUDA Core",description:"Parallel computing platform",className:"cuda-core"},{id:"cuda-libraries",title:"Optimized Libraries",description:"High-performance computing libraries",className:"cuda-libraries",items:["cuDNN","cuBLAS","TensorRT"]},{id:"cuda-frameworks",title:"AI Frameworks",description:"Deep learning frameworks with CUDA support",className:"cuda-frameworks",items:["PyTorch","TensorFlow","JAX"]}]},R={type:"radar",options:{responsive:!0,maintainAspectRatio:!1,scales:{r:{beginAtZero:!0,max:100,ticks:{stepSize:20}}},plugins:{legend:{position:"top"},title:{display:!0,text:"Hardware Performance Comparison"}}}};class H{constructor(){this.isInitialized=!1,this.currentTab="cpu",this.hardwareData=z,this.chart=null}async init(){try{this.renderHardwareSimulator(),this.initializeHardwareTabs(),this.setupPerformanceChart(),this.isInitialized=!0,console.log("✓ Hardware module initialized with interactive simulator")}catch(e){console.error("Failed to initialize hardware module:",e)}}renderHardwareSimulator(){const e=document.getElementById("hardwareSimulator");e&&(e.innerHTML=`
      <h4>Interactive Hardware Comparison</h4>
      <div class="hardware-tabs">
        ${Object.keys(this.hardwareData).map((t,i)=>`<button class="tab-btn ${i===0?"active":""}" data-tab="${t}">${this.hardwareData[t].name.split("(")[1].replace(")","")}</button>`).join("")}
      </div>
      
      <div class="hardware-content">
        ${Object.entries(this.hardwareData).map(([t,i],s)=>`<div id="${t}-tab" class="tab-content ${s===0?"active":""}">
            <div class="hardware-specs">
              <div class="spec-visual">
                ${this.generateVisualization(i)}
                <p>${i.description}</p>
              </div>
              <div class="spec-details">
                <h5>${i.name}</h5>
                <ul>
                  <li><strong>Architecture:</strong> ${i.specs.architecture}</li>
                  <li><strong>Optimized for:</strong> ${i.specs.optimizedFor}</li>
                  <li><strong>AI Training Time:</strong> ${i.specs.aiTrainingTime}</li>
                  <li><strong>Best for:</strong> ${i.specs.bestFor}</li>
                </ul>
              </div>
            </div>
          </div>`).join("")}
      </div>
      
      <!-- Performance Chart -->
      <div class="performance-chart">
        <canvas id="hardwarePerformanceChart"></canvas>
      </div>

      <!-- CUDA Ecosystem -->
      <div class="cuda-ecosystem">
        <h4>${S.title}</h4>
        <div class="ecosystem-diagram">
          ${S.layers.map(t=>`<div class="cuda-layer ${t.className}">
              <h5>${t.title}</h5>
              <p>${t.description}</p>
              ${t.items?`
                <div class="${t.id==="cuda-libraries"?"library-items":"framework-items"}">
                  ${t.items.map(i=>`<span class="${t.id==="cuda-libraries"?"library-item":"framework-item"}">${i}</span>`).join("")}
                </div>
              `:""}
            </div>`).join("")}
        </div>
      </div>
    `)}generateVisualization(e){const t=e.visualization;switch(t.type){case"cores":return`
          <div class="${t.className}">
            ${Array(t.count).fill(0).map(()=>'<div class="core"></div>').join("")}
          </div>
        `;case"grid":return`
          <div class="${t.className}">
            <div class="core-grid">
              ${Array(t.count).fill(0).map(()=>'<div class="mini-core"></div>').join("")}
            </div>
          </div>
        `;case"array":return`
          <div class="${t.className}">
            <div class="systolic-array">
              ${Array(t.count).fill(0).map(()=>'<div class="array-cell"></div>').join("")}
            </div>
          </div>
        `;default:return'<div class="default-visual">Hardware Visualization</div>'}}initializeHardwareTabs(){const e=document.querySelectorAll(".tab-btn");document.querySelectorAll(".tab-content"),e.length!==0&&(e.forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.tab;this.switchTab(i)})}),this.switchTab("cpu"))}switchTab(e){const t=document.querySelectorAll(".tab-btn"),i=document.querySelectorAll(".tab-content");t.forEach(o=>o.classList.remove("active")),i.forEach(o=>o.classList.remove("active"));const s=document.querySelector(`[data-tab="${e}"]`),r=document.querySelector(`#${e}-tab`);s&&s.classList.add("active"),r&&r.classList.add("active"),this.currentTab=e,this.animateHardwareVisuals(e)}animateHardwareVisuals(e){const t=document.querySelector(`#${e}-tab .spec-visual`);if(!t)return;t.style.animation="none",t.offsetHeight,t.style.animation="scaleIn 0.5s ease-out",t.querySelectorAll(".core, .mini-core, .array-cell").forEach((s,r)=>{setTimeout(()=>{s.style.animation="pulse 1s ease-in-out infinite",s.style.animationDelay=`${r*.1}s`},200)})}setupPerformanceChart(){const e=document.querySelector("#hardwarePerformanceChart");if(!e||!window.Chart)return;const t=e.getContext("2d"),i={...R,data:N};this.chart=new Chart(t,i)}handleResponsiveChange(e){document.querySelectorAll(".hardware-specs").forEach(i=>{e?(i.style.gridTemplateColumns="1fr",i.style.gap="var(--spacing-md)"):(i.style.gridTemplateColumns="1fr 2fr",i.style.gap="var(--spacing-xl)")})}closeModals(){}destroy(){document.querySelectorAll(".tab-btn").forEach(t=>{t.removeEventListener("click",()=>{})}),this.chart&&(this.chart.destroy(),this.chart=null),this.isInitialized=!1}}const B={pytorch:{id:"pytorch",name:"PyTorch",badge:"Research Favorite",className:"pytorch",strengths:["Pythonic design","Eager execution","Easy debugging","Academic standard"],bestFor:"Research, prototyping, and iterative development",popularity:{percentage:85,description:"Research adoption",className:"pytorch-bar"}},tensorflow:{id:"tensorflow",name:"TensorFlow",badge:"Production Ready",className:"tensorflow",strengths:["Static computation graphs","Production optimization","Mobile deployment","Ecosystem maturity"],bestFor:"Large-scale production deployments",popularity:{percentage:70,description:"Production use",className:"tensorflow-bar"}},jax:{id:"jax",name:"JAX",badge:"High Performance",className:"jax",strengths:["NumPy-like API","JIT compilation","Functional programming","XLA optimization"],bestFor:"High-performance numerical computing",popularity:{percentage:25,description:"Growing adoption",className:"jax-bar"}}},D=()=>Object.values(B);class q{constructor(){this.isInitialized=!1,this.frameworks=D()}async init(){try{this.renderFrameworkComparison(),this.isInitialized=!0,console.log("✓ Frameworks module initialized")}catch(e){console.error("Failed to initialize frameworks module:",e)}}renderFrameworkComparison(){const e=document.getElementById("frameworkComparison");e&&(e.innerHTML=`
      <div class="framework-grid">
        ${this.frameworks.map(t=>`
          <div class="framework-card ${t.className}">
            <div class="framework-header">
              <h4>${t.name}</h4>
              <span class="framework-badge">${t.badge}</span>
            </div>
            <div class="framework-content">
              <div class="framework-strengths">
                <h5>Strengths</h5>
                <ul>
                  ${t.strengths.map(i=>`<li>${i}</li>`).join("")}
                </ul>
              </div>
              <div class="framework-use-case">
                <h5>Best for</h5>
                <p>${t.bestFor}</p>
              </div>
            </div>
            <div class="framework-popularity">
              <div class="popularity-bar ${t.popularity.className}"></div>
              <span>${t.popularity.percentage}% ${t.popularity.description}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `)}handleResponsiveChange(e){const t=document.querySelector(".framework-grid");t&&(e?t.style.gridTemplateColumns="1fr":t.style.gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))")}closeModals(){}destroy(){this.isInitialized=!1}}class O{constructor(){this.isInitialized=!1}async init(){try{this.isInitialized=!0,console.log("✓ Models module initialized (placeholder)")}catch(e){console.error("Failed to initialize models module:",e)}}handleResponsiveChange(e){}closeModals(){}destroy(){this.isInitialized=!1}}class G{constructor(){this.isInitialized=!1}async init(){try{this.isInitialized=!0,console.log("✓ Agents module initialized (placeholder)")}catch(e){console.error("Failed to initialize agents module:",e)}}handleResponsiveChange(e){}closeModals(){}destroy(){this.isInitialized=!1}}const y=[{id:"aws-bedrock",name:"AWS Bedrock",type:"major-cloud",focus:"enterprise",models:"Anthropic, Meta, Amazon, Cohere",pricing:"Pay-per-token",features:"Fully managed, integrated with AWS ecosystem, enterprise-grade security",strengths:["Enterprise security","AWS integration","Multiple model providers"],limitations:["AWS vendor lock-in","Limited customization"],costEstimate:{setup:0,monthly:500,perToken:8e-4}},{id:"google-vertex-ai",name:"Google Vertex AI",type:"major-cloud",focus:"enterprise",models:"Google (Gemini), Anthropic, 150+ open-source models",pricing:"Pay-per-token / Pay-per-hour",features:"Model Garden, integrated MLOps tools, optimized for TPUs",strengths:["TPU optimization","Model Garden","MLOps integration"],limitations:["Google Cloud dependency","Complex pricing"],costEstimate:{setup:0,monthly:400,perToken:7e-4}},{id:"azure-ai-foundry",name:"Azure AI Foundry",type:"major-cloud",focus:"enterprise",models:"OpenAI, Meta, Mistral",pricing:"Pay-per-token",features:"Deep integration with Microsoft services, access to latest OpenAI models",strengths:["OpenAI partnership","Microsoft integration","Enterprise ready"],limitations:["Microsoft ecosystem dependency","Limited model variety"],costEstimate:{setup:0,monthly:600,perToken:.001}},{id:"runpod",name:"Runpod",type:"specialized",focus:"cost-effective",models:"NVIDIA, AMD GPUs (various models)",pricing:"Pay-per-hour GPU time",features:"Flexible GPU instances, cost-effective, developer-friendly",strengths:["Cost effective","Flexible deployment","Developer focused"],limitations:["Limited enterprise features","Requires technical knowledge"],costEstimate:{setup:50,monthly:200,perToken:3e-4}},{id:"together-ai",name:"Together AI",type:"specialized",focus:"developer",models:"Open-source models (Llama, Mistral, etc.)",pricing:"Pay-per-token",features:"Open-source focus, competitive pricing, fast inference",strengths:["Open source models","Competitive pricing","Fast inference"],limitations:["Limited proprietary models","Smaller scale"],costEstimate:{setup:0,monthly:100,perToken:2e-4}},{id:"fireworks-ai",name:"Fireworks AI",type:"specialized",focus:"developer",models:"Fine-tuned and optimized open models",pricing:"Pay-per-token",features:"Optimized inference, custom fine-tuning, developer APIs",strengths:["Optimized performance","Custom fine-tuning","Developer friendly"],limitations:["Limited model selection","Newer platform"],costEstimate:{setup:0,monthly:150,perToken:4e-4}}],j={serverless:{name:"Serverless API",description:"Pay-per-use with automatic scaling",pros:["No infrastructure management","Automatic scaling","Pay only for usage"],cons:["Cold start latency","Less control","Potential cost unpredictability"],bestFor:["Variable workloads","Prototyping","Small to medium scale"]},dedicated:{name:"Dedicated Instance",description:"Reserved compute capacity for consistent performance",pros:["Predictable performance","Better for high volume","More control"],cons:["Higher fixed costs","Need to manage scaling","Less cost efficient for low usage"],bestFor:["High volume applications","Consistent workloads","Enterprise applications"]},"self-hosted":{name:"Self-Hosted",description:"Deploy on your own infrastructure",pros:["Full control","Data privacy","Potentially lower long-term costs"],cons:["Infrastructure complexity","Ongoing maintenance","Higher technical requirements"],bestFor:["Data-sensitive applications","High volume with technical expertise","Custom requirements"]}},V={small:{name:"Small (7B parameters)",description:"Fast inference, lower costs, good for simple tasks",examples:["Llama 2 7B","Mistral 7B","CodeLlama 7B"],costMultiplier:1,performanceRating:3},medium:{name:"Medium (70B parameters)",description:"Balanced performance and cost, suitable for most applications",examples:["Llama 2 70B","Claude 3 Haiku","GPT-3.5 Turbo"],costMultiplier:10,performanceRating:4},large:{name:"Large (405B+ parameters)",description:"Highest quality, best for complex reasoning tasks",examples:["GPT-4","Claude 3 Opus","Llama 3.1 405B"],costMultiplier:50,performanceRating:5}};function U(a){const{deploymentType:e,requestsPerMonth:t,avgTokensPerRequest:i,modelSize:s,platform:r="aws-bedrock"}=a,o=y.find(b=>b.id===r),n=j[e],c=V[s];if(!o||!n||!c)throw new Error("Invalid parameters for cost calculation");const d=t*i,h=o.costEstimate.perToken*c.costMultiplier;let u=0,p={};switch(e){case"serverless":u=d*h,p={tokenCost:u,fixedCost:0,total:u};break;case"dedicated":const b=.7,T=o.costEstimate.monthly,C=d*h*b;u=T+C,p={tokenCost:C,fixedCost:T,total:u};break;case"self-hosted":const E=2e3,k=1500,M=1e4;u=E+k+M/12,p={infrastructureCost:E,maintenanceCost:k,amortizedSetup:M/12,total:u};break}return{platform:o.name,deploymentType:n.name,modelSize:c.name,requestsPerMonth:t,avgTokensPerRequest:i,totalTokens:d,monthlyCost:Math.round(u),breakdown:p,costPerRequest:u/t,costPerToken:u/d}}class K{constructor(){this.platformGrid=null,this.platformFilter=null,this.providerFilter=null,this.filteredData=[...y]}async init(){try{this.setupElements(),this.setupEventListeners(),this.renderPlatformGrid(),this.setupDeploymentCalculator(),console.log("✓ Platforms module initialized")}catch(e){console.error("Failed to initialize platforms module:",e)}}setupElements(){this.platformGrid=l("#platformGrid"),this.platformFilter=l("#platformFilter"),this.providerFilter=l("#providerFilter"),l("#platformComparison")||this.createPlatformComparisonSection()}createPlatformComparisonSection(){const e=l("#serverless-apis");if(!e)return;e.insertAdjacentHTML("beforeend",`
      <div class="platform-comparison" id="platformComparison">
        <h4>Interactive Platform Comparison</h4>
        <div class="comparison-controls">
          <div class="filter-group">
            <label for="platformFilter">Filter by Focus:</label>
            <select id="platformFilter">
              <option value="all">All Platforms</option>
              <option value="enterprise">Enterprise</option>
              <option value="developer">Developer-Focused</option>
              <option value="cost-effective">Cost-Effective</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="providerFilter">Provider Type:</label>
            <select id="providerFilter">
              <option value="all">All Providers</option>
              <option value="major-cloud">Major Cloud</option>
              <option value="specialized">Specialized</option>
            </select>
          </div>
        </div>
        <div class="platform-grid" id="platformGrid">
          <!-- Platform cards will be populated by JavaScript -->
        </div>
      </div>
    `),this.setupElements()}setupEventListeners(){this.platformFilter&&this.platformFilter.addEventListener("change",()=>{this.filterPlatforms()}),this.providerFilter&&this.providerFilter.addEventListener("change",()=>{this.filterPlatforms()})}filterPlatforms(){var i,s;const e=((i=this.platformFilter)==null?void 0:i.value)||"all",t=((s=this.providerFilter)==null?void 0:s.value)||"all";this.filteredData=y.filter(r=>{const o=e==="all"||r.focus===e,n=t==="all"||r.type===t;return o&&n}),this.renderPlatformGrid()}renderPlatformGrid(){if(!this.platformGrid)return;if(this.filteredData.length===0){this.platformGrid.innerHTML=`
        <div class="no-results">
          <p>No platforms match the selected criteria.</p>
        </div>
      `;return}const e=this.filteredData.map(t=>this.createPlatformCard(t)).join("");this.platformGrid.innerHTML=e}createPlatformCard(e){var s,r;const t=((s=e.strengths)==null?void 0:s.map(o=>`<li>${o}</li>`).join(""))||"",i=((r=e.limitations)==null?void 0:r.map(o=>`<li>${o}</li>`).join(""))||"";return`
      <div class="platform-card" data-platform="${e.id}">
        <div class="platform-header">
          <h5>${e.name}</h5>
          <span class="platform-badge ${e.focus}">${e.focus}</span>
        </div>
        
        <div class="platform-details">
          <div class="platform-info">
            <div class="info-item">
              <strong>Models:</strong>
              <span>${e.models}</span>
            </div>
            <div class="info-item">
              <strong>Pricing:</strong>
              <span>${e.pricing}</span>
            </div>
            <div class="info-item">
              <strong>Features:</strong>
              <span>${e.features}</span>
            </div>
          </div>
          
          ${t?`
            <div class="platform-strengths">
              <h6>✅ Strengths:</h6>
              <ul>${t}</ul>
            </div>
          `:""}
          
          ${i?`
            <div class="platform-limitations">
              <h6>⚠️ Limitations:</h6>
              <ul>${i}</ul>
            </div>
          `:""}
          
          <div class="platform-actions">
            <button class="calculate-cost-btn" data-platform="${e.id}">
              Calculate Costs
            </button>
          </div>
        </div>
      </div>
    `}setupDeploymentCalculator(){l(".deployment-calculator")||this.createDeploymentCalculator(),this.setupCalculatorEvents()}createDeploymentCalculator(){const e=l("#serverless-apis");if(!e)return;e.insertAdjacentHTML("beforeend",`
      <div class="deployment-calculator">
        <h4>Deployment Cost Calculator</h4>
        <div class="calculator-container">
          <div class="calculator-inputs">
            <div class="input-group">
              <label for="deploymentType">Deployment Type:</label>
              <select id="deploymentType">
                <option value="serverless">Serverless API</option>
                <option value="dedicated">Dedicated Instance</option>
                <option value="self-hosted">Self-Hosted</option>
              </select>
            </div>
            <div class="input-group">
              <label for="requestsPerMonth">Requests per Month:</label>
              <input type="number" id="requestsPerMonth" value="100000" min="1000" step="1000">
            </div>
            <div class="input-group">
              <label for="avgTokensPerRequest">Avg Tokens per Request:</label>
              <input type="number" id="avgTokensPerRequest" value="1000" min="100" step="100">
            </div>
            <div class="input-group">
              <label for="modelSize">Model Complexity:</label>
              <select id="modelSize">
                <option value="small">Small (7B parameters)</option>
                <option value="medium">Medium (70B parameters)</option>
                <option value="large">Large (405B+ parameters)</option>
              </select>
            </div>
            <button id="calculateCost" class="calculate-btn">Calculate Costs</button>
          </div>
          
          <div class="cost-breakdown" id="costBreakdown">
            <p>Select parameters and click "Calculate Costs" to see pricing breakdown.</p>
          </div>
        </div>
      </div>
    `)}setupCalculatorEvents(){const e=l("#calculateCost");e&&e.addEventListener("click",()=>{this.calculateAndDisplayCosts()}),m("#deploymentType, #requestsPerMonth, #avgTokensPerRequest, #modelSize").forEach(i=>{i.addEventListener("change",()=>{this.calculateAndDisplayCosts()})})}calculateAndDisplayCosts(){var e,t,i,s;try{const r={deploymentType:(e=l("#deploymentType"))==null?void 0:e.value,requestsPerMonth:parseInt((t=l("#requestsPerMonth"))==null?void 0:t.value)||0,avgTokensPerRequest:parseInt((i=l("#avgTokensPerRequest"))==null?void 0:i.value)||0,modelSize:(s=l("#modelSize"))==null?void 0:s.value,platform:"aws-bedrock"};if(r.requestsPerMonth<=0||r.avgTokensPerRequest<=0){this.displayError("Please enter valid values for requests and tokens.");return}const o=U(r);this.displayCostResult(o)}catch(r){console.error("Cost calculation error:",r),this.displayError("Error calculating costs. Please check your inputs.")}}displayCostResult(e){const t=l("#costBreakdown");if(!t)return;const i=r=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(r),s=`
      <div class="cost-result">
        <h5>Cost Estimate</h5>
        <div class="cost-summary">
          <div class="cost-item total">
            <span>Monthly Total:</span>
            <strong>${i(e.monthlyCost)}</strong>
          </div>
          <div class="cost-item">
            <span>Cost per Request:</span>
            <span>${i(e.costPerRequest)}</span>
          </div>
          <div class="cost-item">
            <span>Cost per Token:</span>
            <span>${i(e.costPerToken)}</span>
          </div>
        </div>
        
        <div class="cost-details">
          <h6>Configuration:</h6>
          <ul>
            <li>Platform: ${e.platform}</li>
            <li>Deployment: ${e.deploymentType}</li>
            <li>Model: ${e.modelSize}</li>
            <li>Requests/month: ${e.requestsPerMonth.toLocaleString()}</li>
            <li>Total tokens/month: ${e.totalTokens.toLocaleString()}</li>
          </ul>
        </div>
      </div>
    `;t.innerHTML=s}displayError(e){const t=l("#costBreakdown");t&&(t.innerHTML=`
      <div class="cost-error">
        <p>⚠️ ${e}</p>
      </div>
    `)}handleResponsiveChange(e){e&&this.platformGrid?this.platformGrid.classList.add("mobile-layout"):this.platformGrid&&this.platformGrid.classList.remove("mobile-layout")}getPlatform(e){return y.find(t=>t.id===e)}getFilteredPlatforms(){return[...this.filteredData]}destroy(){this.filteredData=[],this.platformGrid=null,this.platformFilter=null,this.providerFilter=null}}class W{constructor(){this.isInitialized=!1}async init(){try{this.isInitialized=!0,console.log("✓ Applications module initialized (placeholder)")}catch(e){console.error("Failed to initialize applications module:",e)}}handleResponsiveChange(e){}closeModals(){}destroy(){this.isInitialized=!1}}class Q{constructor(){this.isInitialized=!1}async init(){try{this.isInitialized=!0,console.log("✓ Future module initialized (placeholder)")}catch(e){console.error("Failed to initialize future module:",e)}}handleResponsiveChange(e){}closeModals(){}destroy(){this.isInitialized=!1}}const f=[{id:"ai",term:"Artificial Intelligence",definition:"The simulation of human intelligence processes by machines, including learning, reasoning, and self-correction.",category:"core-concepts",difficulty:"beginner",examples:["Virtual assistants like Siri","Recommendation systems","Autonomous vehicles"],relatedTerms:["machine-learning","deep-learning","neural-networks"]},{id:"llm",term:"Large Language Model",definition:"A type of AI model trained on vast amounts of text data to understand and generate human language.",category:"architectures",difficulty:"intermediate",examples:["GPT-4","Claude","Gemini"],relatedTerms:["transformer","token","prompt"]},{id:"agent",term:"AI Agent",definition:"An autonomous system that can perceive its environment, make decisions, and take actions to achieve specific goals.",category:"applications",difficulty:"intermediate",examples:["Autonomous trading bots","Smart home systems","Game AI characters"],relatedTerms:["agentic-ai","tool-use","mcp"]},{id:"transformer",term:"Transformer",definition:"A neural network architecture that revolutionized natural language processing through attention mechanisms.",category:"architectures",difficulty:"advanced",examples:["BERT","GPT series","T5"],relatedTerms:["attention","encoder-decoder","self-attention"]},{id:"embedding",term:"Embedding",definition:"Numerical representations that capture the semantic meaning of words, sentences, or other data in a vector space.",category:"core-concepts",difficulty:"intermediate",examples:["Word2Vec","Sentence embeddings","Image embeddings"],relatedTerms:["vector-space","semantic-search","rag"]},{id:"machine-learning",term:"Machine Learning",definition:"A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",category:"core-concepts",difficulty:"beginner",examples:["Email spam detection","Product recommendations","Medical diagnosis"],relatedTerms:["supervised-learning","unsupervised-learning","reinforcement-learning"]},{id:"neural-networks",term:"Neural Networks",definition:"Computing systems inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information.",category:"architectures",difficulty:"intermediate",examples:["Feedforward networks","Convolutional networks","Recurrent networks"],relatedTerms:["deep-learning","backpropagation","activation-function"]},{id:"deep-learning",term:"Deep Learning",definition:"A subset of machine learning using neural networks with multiple layers to model and understand complex patterns.",category:"core-concepts",difficulty:"intermediate",examples:["Image recognition","Speech synthesis","Language translation"],relatedTerms:["neural-networks","cnn","rnn"]},{id:"token",term:"Token",definition:"The basic unit of text that language models process, which can be words, subwords, or characters.",category:"training",difficulty:"intermediate",examples:['Word tokens: "hello"','Subword tokens: "ing"','Character tokens: "a"'],relatedTerms:["tokenization","vocabulary","context-window"]},{id:"fine-tuning",term:"Fine-tuning",definition:"The process of adapting a pre-trained model for a specific task by training it on task-specific data.",category:"training",difficulty:"intermediate",examples:["ChatGPT from GPT-3.5","Domain-specific BERT","Custom image classifiers"],relatedTerms:["transfer-learning","pre-training","rlhf"]},{id:"rag",term:"Retrieval-Augmented Generation",definition:"A technique that combines information retrieval with text generation to provide more accurate and up-to-date responses.",category:"applications",difficulty:"advanced",examples:["Document Q&A systems","Knowledge bases","Research assistants"],relatedTerms:["vector-database","semantic-search","embedding"]},{id:"mcp",term:"Model Context Protocol",definition:"A standardized way for AI applications to connect with external data sources and tools.",category:"business",difficulty:"advanced",examples:["Database connections","API integrations","Tool orchestration"],relatedTerms:["agent","tool-use","integration"]}],v={"core-concepts":"Core Concepts",architectures:"Model Architectures",training:"Training & Learning",applications:"Applications",business:"Business & Ethics"},w={beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced"},J=[{id:"ai",icon:"🤖",title:"Artificial Intelligence",definition:"The simulation of human intelligence processes by machines",tags:["Machine Learning","Deep Learning","Neural Networks"]},{id:"llm",icon:"📝",title:"Large Language Model",definition:"AI trained on vast text data to understand and generate human language",tags:["Transformer","GPT","Token"]},{id:"agent",icon:"🎯",title:"AI Agent",definition:"A system that can perceive its environment and take autonomous actions",tags:["Agentic AI","Tool Use","MCP"]},{id:"training",icon:"🎓",title:"Machine Learning",definition:"The process of teaching computers to learn patterns from data",tags:["Training Data","Algorithm","Model"]},{id:"transformer",icon:"🔄",title:"Transformer",definition:"The architecture that revolutionized natural language processing",tags:["Attention","BERT","GPT"]},{id:"embedding",icon:"📊",title:"Embedding",definition:"Numerical representations that capture the meaning of words or data",tags:["Vector","Semantic Search","RAG"]}],Y=a=>{const e=a.toLowerCase();return f.filter(t=>t.term.toLowerCase().includes(e)||t.definition.toLowerCase().includes(e)||t.examples&&t.examples.some(i=>i.toLowerCase().includes(e)))};class X{constructor(){this.isInitialized=!1,this.currentView="cards",this.currentCategory="all",this.currentDifficulty="all",this.currentSearchQuery="",this.filteredTerms=f}async init(){try{this.renderGlossary(),this.setupEventListeners(),this.isInitialized=!0,console.log("✓ Glossary module initialized with interactive features")}catch(e){console.error("Failed to initialize glossary module:",e)}}renderGlossary(){const e=document.getElementById("glossaryContainer");e&&(e.innerHTML=`
      <!-- Glossary Controls -->
      <div class="glossary-controls">
        <div class="search-and-filters">
          <div class="glossary-search">
            <input type="text" id="glossarySearch" placeholder="Search terms, definitions, or examples..." class="glossary-search-input">
            <button id="glossarySearchBtn" class="glossary-search-btn">🔍</button>
          </div>
          
          <div class="glossary-filters">
            <div class="filter-group">
              <label for="categoryFilter">Category:</label>
              <select id="categoryFilter">
                <option value="all">All Categories</option>
                ${Object.entries(v).map(([t,i])=>`<option value="${t}">${i}</option>`).join("")}
              </select>
            </div>
            
            <div class="filter-group">
              <label for="difficultyFilter">Difficulty:</label>
              <select id="difficultyFilter">
                <option value="all">All Levels</option>
                ${Object.entries(w).map(([t,i])=>`<option value="${t}">${i}</option>`).join("")}
              </select>
            </div>
            
            <div class="view-toggle">
              <button id="cardView" class="view-btn active">📇 Cards</button>
              <button id="listView" class="view-btn">📄 List</button>
            </div>
          </div>
        </div>
        
        <div class="glossary-stats">
          <span id="termCount">${f.length} terms</span>
          <span id="categoryCount">${Object.keys(v).length} categories</span>
          <span class="accessibility-note">♿ Accessibility optimized</span>
        </div>
      </div>

      <!-- Glossary Content -->
      <div class="glossary-content">
        <!-- Letter Navigation -->
        <div class="letter-navigation">
          <div class="alphabet-nav">
            ${this.getAvailableLetters().map(t=>`<button class="letter-btn" data-letter="${t}">${t}</button>`).join("")}
          </div>
        </div>

        <!-- Terms Container -->
        <div class="glossary-terms" id="glossaryTerms">
          ${this.renderTerms(this.filteredTerms)}
        </div>
      </div>

      <!-- Quick Reference Cards -->
      <div class="quick-reference">
        <h3>Quick Reference: Key Concepts</h3>
        <div class="reference-grid">
          ${J.map(t=>`
            <div class="reference-card" data-concept="${t.id}">
              <h4>${t.icon} ${t.title}</h4>
              <p class="quick-definition">${t.definition}</p>
              <div class="related-terms">
                ${t.tags.map(i=>`<span class="term-tag">${i}</span>`).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `)}renderTerms(e){return this.currentView==="cards"?`
        <div class="terms-grid">
          ${e.map(t=>`
            <div class="term-card" data-term-id="${t.id}">
              <div class="term-header">
                <h4>${t.term}</h4>
                <span class="difficulty-badge ${t.difficulty}">${w[t.difficulty]}</span>
              </div>
              <div class="term-content">
                <p class="definition">${t.definition}</p>
                ${t.examples?`
                  <div class="examples">
                    <h6>Examples:</h6>
                    <ul>
                      ${t.examples.map(i=>`<li>${i}</li>`).join("")}
                    </ul>
                  </div>
                `:""}
                ${t.relatedTerms?`
                  <div class="related-terms">
                    <h6>Related:</h6>
                    ${t.relatedTerms.map(i=>`<span class="related-tag">${i}</span>`).join("")}
                  </div>
                `:""}
              </div>
              <div class="term-category">
                <span class="category-tag ${t.category}">${v[t.category]}</span>
              </div>
            </div>
          `).join("")}
        </div>
      `:`
        <div class="terms-list">
          ${e.map(t=>`
            <div class="term-list-item" data-term-id="${t.id}">
              <div class="term-list-header">
                <h4>${t.term}</h4>
                <div class="term-badges">
                  <span class="difficulty-badge ${t.difficulty}">${w[t.difficulty]}</span>
                  <span class="category-tag ${t.category}">${v[t.category]}</span>
                </div>
              </div>
              <p class="definition">${t.definition}</p>
            </div>
          `).join("")}
        </div>
      `}getAvailableLetters(){const e=new Set;return f.forEach(t=>{e.add(t.term.charAt(0).toUpperCase())}),Array.from(e).sort()}setupEventListeners(){const e=document.getElementById("glossarySearch"),t=document.getElementById("glossarySearchBtn");e&&e.addEventListener("input",n=>{this.currentSearchQuery=n.target.value,this.updateTerms()}),t&&t.addEventListener("click",()=>{this.updateTerms()});const i=document.getElementById("categoryFilter"),s=document.getElementById("difficultyFilter");i&&i.addEventListener("change",n=>{this.currentCategory=n.target.value,this.updateTerms()}),s&&s.addEventListener("change",n=>{this.currentDifficulty=n.target.value,this.updateTerms()});const r=document.getElementById("cardView"),o=document.getElementById("listView");r&&r.addEventListener("click",()=>{this.currentView="cards",this.updateViewButtons(),this.updateTerms()}),o&&o.addEventListener("click",()=>{this.currentView="list",this.updateViewButtons(),this.updateTerms()}),document.addEventListener("click",n=>{if(n.target.classList.contains("letter-btn")){const c=n.target.dataset.letter;this.filterByLetter(c)}})}updateTerms(){let e=f;this.currentSearchQuery&&(e=Y(this.currentSearchQuery)),this.currentCategory!=="all"&&(e=e.filter(t=>t.category===this.currentCategory)),this.currentDifficulty!=="all"&&(e=e.filter(t=>t.difficulty===this.currentDifficulty)),this.filteredTerms=e,this.updateTermsDisplay(),this.updateStats()}updateTermsDisplay(){const e=document.getElementById("glossaryTerms");e&&(e.innerHTML=this.renderTerms(this.filteredTerms))}updateViewButtons(){const e=document.getElementById("cardView"),t=document.getElementById("listView");e&&t&&(e.classList.toggle("active",this.currentView==="cards"),t.classList.toggle("active",this.currentView==="list"))}updateStats(){const e=document.getElementById("termCount");e&&(e.textContent=`${this.filteredTerms.length} terms`)}filterByLetter(e){this.currentSearchQuery="";const t=document.getElementById("glossarySearch");t&&(t.value=""),this.filteredTerms=f.filter(i=>i.term.charAt(0).toUpperCase()===e),this.updateTermsDisplay(),this.updateStats()}handleResponsiveChange(e){const t=document.querySelector(".glossary-controls"),i=document.querySelector(".glossary-filters");t&&i&&(e?(i.style.flexDirection="column",i.style.gap="var(--spacing-sm)"):(i.style.flexDirection="row",i.style.gap="var(--spacing-md)"))}closeModals(){}destroy(){this.isInitialized=!1}}class _{constructor(){this.scrollTopBtn=null,this.isScrolling=!1,this.scrollCallbacks=new Map}init(){this.setupScrollToTop(),this.setupScrollSpy(),this.setupSmoothScrolling()}setupScrollToTop(){if(this.scrollTopBtn=l("#scrollTopBtn"),!this.scrollTopBtn)return;const e=L(()=>{window.pageYOffset>300?this.scrollTopBtn.classList.add("visible"):this.scrollTopBtn.classList.remove("visible")},100);window.addEventListener("scroll",e),this.scrollTopBtn.addEventListener("click",()=>{this.scrollToTop()})}setupScrollSpy(){const e=document.querySelectorAll(".content-section"),t=document.querySelectorAll(".nav-link");if(e.length===0||t.length===0)return;const i=new IntersectionObserver(s=>{s.forEach(r=>{r.isIntersecting&&this.updateActiveNavigation(r.target.id,t)})},{rootMargin:"-20% 0px -70% 0px",threshold:.1});e.forEach(s=>{i.observe(s)})}updateActiveNavigation(e,t){t.forEach(i=>{i.classList.remove("active"),i.getAttribute("href")===`#${e}`&&i.classList.add("active")})}setupSmoothScrolling(){document.addEventListener("click",e=>{const t=e.target.closest('a[href^="#"]');if(!t)return;const i=t.getAttribute("href");i!=="#"&&(e.preventDefault(),this.scrollToSection(i))})}scrollToSection(e){const t=document.querySelector(e);if(!t)return;const i=this.getHeaderHeight(),s=t.offsetTop-i-20;this.animateScrollTo(s)}getHeaderHeight(){const e=l(".main-header");return e?e.offsetHeight:0}animateScrollTo(e,t=1e3){if(this.isScrolling)return;this.isScrolling=!0;const i=window.pageYOffset,s=e-i;let r=null;const o=n=>{r===null&&(r=n);const c=n-r,d=Math.min(c/t,1),h=d<.5?2*d*d:1-Math.pow(-2*d+2,2)/2;window.scrollTo(0,i+s*h),d<1?requestAnimationFrame(o):this.isScrolling=!1};requestAnimationFrame(o)}scrollToTop(){this.animateScrollTo(0,800)}onScroll(e,t,i={}){const{throttleMs:s=100}=i,r=L(t,s);return this.scrollCallbacks.set(e,r),window.addEventListener("scroll",r),()=>this.removeScrollCallback(e)}removeScrollCallback(e){const t=this.scrollCallbacks.get(e);t&&(window.removeEventListener("scroll",t),this.scrollCallbacks.delete(e))}isInViewport(e,t=0){const i=e.getBoundingClientRect(),s=window.innerHeight||document.documentElement.clientHeight;return i.top>=-t&&i.bottom<=s+t}getScrollPosition(){return{x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop}}getScrollPercentage(){const e=window.pageYOffset,t=document.documentElement.scrollHeight-window.innerHeight;return t>0?e/t*100:0}lockScroll(){document.body.style.overflow="hidden",document.body.style.paddingRight=this.getScrollbarWidth()+"px"}unlockScroll(){document.body.style.overflow="",document.body.style.paddingRight=""}getScrollbarWidth(){const e=document.createElement("div");e.style.cssText="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e);const t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}destroy(){this.scrollCallbacks.forEach(e=>{window.removeEventListener("scroll",e)}),this.scrollCallbacks.clear(),this.isScrolling=!1}}class Z{constructor(){this.searchInput=null,this.searchBtn=null,this.currentHighlights=[],this.searchIndex=new Map,this.minSearchLength=2}init(){this.setupSearchElements(),this.buildSearchIndex(),this.setupEventListeners()}setupSearchElements(){if(this.searchInput=l("#globalSearch"),this.searchBtn=l("#searchBtn"),!this.searchInput||!this.searchBtn){console.warn("Search elements not found");return}}buildSearchIndex(){m(".content-section").forEach((t,i)=>{var n;const s=t.id,r=((n=t.querySelector("h2, h3, h4"))==null?void 0:n.textContent)||"",o=this.extractTextContent(t);this.searchIndex.set(s,{id:s,title:r,content:o.toLowerCase(),element:t,index:i})}),console.log(`📚 Search index built with ${this.searchIndex.size} sections`)}extractTextContent(e){const t=e.cloneNode(!0);return m("script, style").forEach(i=>i.remove()),t.textContent.replace(/\s+/g," ").trim()}setupEventListeners(){if(!this.searchInput||!this.searchBtn)return;const e=$(t=>{this.performSearch(t)},300);this.searchBtn.addEventListener("click",()=>{this.performSearch(this.searchInput.value)}),this.searchInput.addEventListener("keypress",t=>{t.key==="Enter"&&(t.preventDefault(),this.performSearch(this.searchInput.value))}),this.searchInput.addEventListener("input",t=>{const i=t.target.value.trim();i.length>=this.minSearchLength?e(i):this.clearHighlights()}),this.searchInput.addEventListener("keydown",t=>{t.key==="Escape"&&this.clearSearch()})}performSearch(e){if(!e||e.length<this.minSearchLength){this.showSearchNotification("Please enter at least 2 characters");return}const t=e.toLowerCase().trim(),i=this.searchContent(t);if(i.length===0){this.showSearchNotification(`No results found for "${e}"`);return}this.clearHighlights();const s=i[0];this.scrollToResult(s),this.highlightResults(i,t),this.showSearchNotification(`Found ${i.length} result(s) for "${e}"`)}searchContent(e){const t=[],i=e.split(/\s+/).filter(s=>s.length>0);return this.searchIndex.forEach(s=>{let r=0,o=0;i.forEach(n=>{s.title.toLowerCase().includes(n)&&(r+=10,o++),s.content.includes(n)&&(r+=1,o++)}),o===i.length&&t.push({...s,score:r,matches:o})}),t.sort((s,r)=>r.score-s.score)}scrollToResult(e){const t=e.element;t&&(t.scrollIntoView({behavior:"smooth",block:"start"}),t.classList.add("search-highlight"),setTimeout(()=>{t.classList.remove("search-highlight")},2e3))}highlightResults(e,t){const i=t.split(/\s+/).filter(s=>s.length>0);e.forEach(s=>{this.highlightTermsInElement(s.element,i)})}highlightTermsInElement(e,t){const i=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:o=>o.parentNode.tagName==="MARK"||["SCRIPT","STYLE"].includes(o.parentNode.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),s=[];let r;for(;r=i.nextNode();)s.push(r);s.forEach(o=>{let n=o.textContent,c=n,d=!1;if(t.forEach(h=>{const u=new RegExp(`(${this.escapeRegExp(h)})`,"gi");u.test(n)&&(c=c.replace(u,'<mark class="search-match">$1</mark>'),d=!0)}),d){const h=document.createElement("span");h.innerHTML=c,o.parentNode.replaceChild(h,o),this.currentHighlights.push(h)}})}escapeRegExp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}clearHighlights(){m("mark.search-match").forEach(e=>{const t=e.parentNode;t.replaceChild(document.createTextNode(e.textContent),e),t.normalize()}),this.currentHighlights.forEach(e=>{e.parentNode&&e.parentNode.replaceChild(document.createTextNode(e.textContent),e)}),this.currentHighlights=[],m(".search-highlight").forEach(e=>{e.classList.remove("search-highlight")})}clearSearch(){this.searchInput&&(this.searchInput.value=""),this.clearHighlights(),this.hideSearchNotification()}focusSearch(){this.searchInput&&(this.searchInput.focus(),this.searchInput.select())}showSearchNotification(e){this.hideSearchNotification();const t=document.createElement("div");if(t.className="search-notification",t.textContent=e,this.searchInput){const i=this.searchInput.getBoundingClientRect();t.style.position="fixed",t.style.top=`${i.bottom+5}px`,t.style.left=`${i.left}px`,t.style.zIndex="10000"}document.body.appendChild(t),setTimeout(()=>{this.hideSearchNotification()},3e3)}hideSearchNotification(){const e=l(".search-notification");e&&e.remove()}getSearchStats(){return{indexSize:this.searchIndex.size,currentHighlights:this.currentHighlights.length}}destroy(){this.clearHighlights(),this.hideSearchNotification(),this.searchIndex.clear()}}class x{constructor(){this.performanceMonitor=new I,this.accessibilityHelper=new A,this.modules=new Map,this.isInitialized=!1}async init(){try{this.performanceMonitor.start("app-init"),console.log("🚀 AI Ecosystem Interactive Report - Initializing..."),await this.initializeCoreServices(),await this.initializeModules(),this.setupGlobalFeatures(),this.isInitialized=!0,this.hideLoadingOverlay(),this.performanceMonitor.end("app-init"),console.log("✅ All modules initialized successfully"),this.accessibilityHelper.announce("AI Ecosystem Report loaded successfully")}catch(e){console.error("❌ Failed to initialize application:",e),this.hideLoadingOverlay(),this.handleInitializationError(e)}}hideLoadingOverlay(){const e=document.getElementById("loadingOverlay");e&&(e.classList.add("hidden"),setTimeout(()=>{e.style.display="none"},300))}async initializeCoreServices(){this.performanceMonitor.init(),this.accessibilityHelper.init(),this.setupErrorHandling()}async initializeModules(){const e=[{name:"navigation",module:F,priority:1},{name:"dashboard",module:P,priority:2},{name:"hardware",module:H,priority:3},{name:"frameworks",module:q,priority:3},{name:"models",module:O,priority:3},{name:"agents",module:G,priority:3},{name:"platforms",module:K,priority:3},{name:"applications",module:W,priority:3},{name:"future",module:Q,priority:3},{name:"glossary",module:X,priority:4}];e.sort((t,i)=>t.priority-i.priority);for(const t of e)try{const i=new t.module;await i.init(),this.modules.set(t.name,i),console.log(`✓ ${t.name} module initialized`)}catch(i){console.warn(`⚠️ Failed to initialize ${t.name} module:`,i)}}setupGlobalFeatures(){this.scrollManager=new _,this.scrollManager.init(),this.searchManager=new Z,this.searchManager.init(),this.setupKeyboardNavigation(),this.setupResponsiveHandlers()}setupKeyboardNavigation(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key==="K"&&(e.preventDefault(),this.accessibilityHelper.focusSkipLink()),(e.ctrlKey||e.metaKey)&&e.key==="k"&&(e.preventDefault(),this.searchManager.focusSearch()),e.key==="Escape"&&this.closeAllModals()})}setupResponsiveHandlers(){const e=window.matchMedia("(max-width: 768px)"),t=i=>{this.modules.forEach(s=>{s.handleResponsiveChange&&s.handleResponsiveChange(i.matches)})};e.addEventListener("change",t),t(e)}setupErrorHandling(){window.addEventListener("error",e=>{console.error("Global error:",e.error),this.performanceMonitor.recordError(e.error)}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),this.performanceMonitor.recordError(e.reason)})}handleInitializationError(e){const t=document.createElement("div");t.className="init-error",t.innerHTML=`
      <div class="error-content">
        <h2>🚫 Application Failed to Initialize</h2>
        <p>We encountered an error while loading the AI Ecosystem Report.</p>
        <details>
          <summary>Error Details</summary>
          <pre>${e.message}</pre>
        </details>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    `,document.body.prepend(t)}closeAllModals(){this.modules.forEach(e=>{e.closeModals&&e.closeModals()})}getModule(e){return this.modules.get(e)}destroy(){this.modules.forEach(e=>{e.destroy&&e.destroy()}),this.modules.clear(),this.isInitialized=!1}}document.addEventListener("DOMContentLoaded",async()=>{window.aiEcosystemApp=new x,await window.aiEcosystemApp.init()});document.readyState==="loading"||(window.aiEcosystemApp=new x,window.aiEcosystemApp.init());
//# sourceMappingURL=main-CV7EoMAa.js.map
