/* ============================================================================
   Shiva Consultancy Group — shared site chrome + interactions
   Header, mobile drawer, mobile tab bar and footer are injected from here so
   the whole site's navigation is edited in ONE place. Pure vanilla JS; works
   when the file is opened directly (file://) with no server or build step.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Single source of truth: edit nav + contact details here ---- */
  var SCG = {
    name: "Shiva Consultancy Group",
    tagline: "One Door Technology &amp; Management Consultancy",
    phoneDisplay: "+91 99786 21275",
    phoneRaw: "919978621275",
    email: "rakesh@shivagroup.org.in",
    address: "SF 34, 4D Square Mall, Motera, Ahmedabad, Gujarat 380005",
    // Social URLs — replace "#" with the real profile links when available
    social: {
      linkedin: "#", facebook: "#", youtube: "#", google: "#"
    },
    nav: [
      { label: "Home",     href: "index.html",    icon: "home" },
      { label: "About",    href: "about.html",    icon: "apartment" },
      { label: "Services", href: "services.html", icon: "grid_view" },
      { label: "Our Team", href: "team.html",     icon: "groups" },
      { label: "Clients",  href: "clients.html",  icon: "handshake" },
      { label: "Insights", href: "insights.html", icon: "menu_book" },
      { label: "Contact",  href: "contact.html",  icon: "call" }
    ]
  };
  window.SCG = SCG;

  var page = (document.body.getAttribute("data-page") || "index").toLowerCase();
  var headerMode = document.body.getAttribute("data-header") || "light"; // "dark" over hero

  function isActive(href) { return href.replace(".html", "") === page; }

  /* ---------------------------- Header ---------------------------- */
  function buildHeader() {
    var links = SCG.nav.map(function (n) {
      return '<a class="nav-link' + (isActive(n.href) ? " active" : "") + '" href="' + n.href + '">' + n.label + "</a>";
    }).join("");

    var html =
      '<header class="site-header ' + (headerMode === "dark" ? "on-dark" : "") + '" id="siteHeader">' +
        '<div class="wrap header-inner">' +
          '<a class="brand" href="index.html">' +
            "<b>SHIVA CONSULTANCY GROUP</b><span>" + SCG.tagline + "</span>" +
          "</a>" +
          '<nav class="nav-links">' + links + "</nav>" +
          '<div style="display:flex;align-items:center;gap:1rem;">' +
            '<a class="btn btn-navy" style="display:none" id="hdrCta" href="contact.html">Book a Consultation</a>' +
            '<button class="menu-btn" id="menuBtn" aria-label="Open menu"><span class="material-symbols-outlined" style="font-size:30px">menu</span></button>' +
          "</div>" +
        "</div>" +
      "</header>";

    // mobile drawer
    var drawerLinks = SCG.nav.map(function (n) {
      return '<a class="' + (isActive(n.href) ? "active" : "") + '" href="' + n.href + '">' + n.label + "</a>";
    }).join("");
    var drawer =
      '<div class="drawer" id="drawer">' +
        '<div class="drawer-bg" id="drawerBg"></div>' +
        '<div class="drawer-panel">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">' +
            '<b class="font-display text-navy" style="font-size:1.1rem">SCG</b>' +
            '<button class="menu-btn" id="drawerClose" style="display:inline-flex" aria-label="Close menu"><span class="material-symbols-outlined">close</span></button>' +
          "</div>" + drawerLinks +
          '<a class="btn btn-navy" style="margin-top:1rem" href="contact.html">Book a Consultation</a>' +
          '<a class="btn btn-gold" style="margin-top:.5rem" href="https://wa.me/' + SCG.phoneRaw + '" target="_blank" rel="noopener">WhatsApp Us</a>' +
        "</div>" +
      "</div>";

    document.getElementById("scg-header").innerHTML = html + drawer;
  }

  /* ---------------------------- Footer ---------------------------- */
  function buildFooter() {
    var solutions = ['Agri Innovation Support', 'Strategy &amp; Management Advisory', 'Investment Banking', 'PPP Advisory']
      .map(function (s) { return '<a href="services.html">' + s + "</a>"; }).join("");
    var company = [['About Us', 'about.html'], ['Our Team', 'team.html'], ['Our Clients', 'clients.html'], ['Impact', 'impact.html'], ['Life & Career', 'career.html'], ['Insights', 'insights.html'], ['Contact', 'contact.html']]
      .map(function (c) { return '<a href="' + c[1] + '">' + c[0] + "</a>"; }).join("");

    var html =
      '<footer class="site-footer">' +
        '<div class="wrap" style="padding-top:4rem;padding-bottom:2.5rem;display:grid;gap:2.5rem;grid-template-columns:1fr">' +
          '<div class="footer-grid">' +
            '<div>' +
              '<div class="font-display text-gold" style="font-size:1.25rem;font-weight:700;margin-bottom:1rem">SHIVA CONSULTANCY GROUP</div>' +
              '<p style="font-size:14px;max-width:22rem;line-height:1.7">One Door Technology &amp; Management Consultancy. Among India’s top-30 advisory firms — turning complexity into sustainable growth since 2008.</p>' +
              '<div style="display:flex;gap:.6rem;margin-top:1.25rem">' +
                '<a class="social-ic" href="' + SCG.social.linkedin + '" aria-label="LinkedIn"><span class="material-symbols-outlined" style="font-size:18px">group</span></a>' +
                '<a class="social-ic" href="https://wa.me/' + SCG.phoneRaw + '" target="_blank" rel="noopener" aria-label="WhatsApp"><span class="material-symbols-outlined" style="font-size:18px">chat</span></a>' +
                '<a class="social-ic" href="mailto:' + SCG.email + '" aria-label="Email"><span class="material-symbols-outlined" style="font-size:18px">mail</span></a>' +
                '<a class="social-ic" href="' + SCG.social.youtube + '" aria-label="YouTube"><span class="material-symbols-outlined" style="font-size:18px">smart_display</span></a>' +
              "</div>" +
            "</div>" +
            '<div><h5 class="footer-h" style="margin-bottom:1rem">Solutions</h5><nav style="display:flex;flex-direction:column;gap:.6rem;font-size:14px">' + solutions + "</nav></div>" +
            '<div><h5 class="footer-h" style="margin-bottom:1rem">Company</h5><nav style="display:flex;flex-direction:column;gap:.6rem;font-size:14px">' + company + "</nav></div>" +
            '<div><h5 class="footer-h" style="margin-bottom:1rem">Head Office</h5>' +
              '<p style="font-size:14px;line-height:1.7">' + SCG.address + '</p>' +
              '<p style="font-size:14px;margin-top:.75rem"><a href="tel:+' + SCG.phoneRaw + '">' + SCG.phoneDisplay + '</a><br><a href="mailto:' + SCG.email + '">' + SCG.email + "</a></p>" +
            "</div>" +
          "</div>" +
          '<div class="divider" style="padding-top:1.5rem;display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:center;border-color:rgba(255,255,255,.12)">' +
            '<span style="font-size:12px;letter-spacing:.04em">© 2026 Shiva Consultancy Group. Excellence · Integrity · Innovation.</span>' +
            '<span style="font-size:12px;display:flex;gap:1.25rem"><a href="#">Privacy</a><a href="#">Terms</a></span>' +
          "</div>" +
        "</div>" +
      "</footer>";
    document.getElementById("scg-footer").innerHTML = html;

    // footer responsive grid via inline style helper
    var grids = document.querySelectorAll(".footer-grid");
    grids.forEach(function (g) {
      g.style.display = "grid"; g.style.gap = "2.5rem";
      g.style.gridTemplateColumns = window.matchMedia("(min-width:768px)").matches ? "1.4fr 1fr 1fr 1.2fr" : "1fr";
    });
  }

  /* ------------------------ Mobile tab bar ------------------------ */
  function buildTabs() {
    var tabs = SCG.nav.filter(function (n) {
      return ["Home", "About", "Services", "Contact"].indexOf(n.label) > -1;
    }).map(function (n) {
      return '<a class="' + (isActive(n.href) ? "active" : "") + '" href="' + n.href + '">' +
        '<span class="material-symbols-outlined">' + n.icon + "</span>" + n.label + "</a>";
    }).join("");
    var el = document.getElementById("scg-tabs");
    if (el) { el.innerHTML = '<nav class="mobile-tabs">' + tabs + "</nav>"; document.body.classList.add("has-tabs"); }
  }

  /* ------------------------- Interactions ------------------------- */
  function wire() {
    var header = document.getElementById("siteHeader");
    var cta = document.getElementById("hdrCta");
    function onScroll() {
      if (window.scrollY > 40) { header.classList.add("scrolled"); if (cta) cta.style.display = "inline-flex"; }
      else { header.classList.remove("scrolled"); if (cta && headerMode === "dark") cta.style.display = "none"; }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var drawer = document.getElementById("drawer");
    function openD() { drawer.classList.add("open"); }
    function closeD() { drawer.classList.remove("open"); }
    document.getElementById("menuBtn").addEventListener("click", openD);
    document.getElementById("drawerClose").addEventListener("click", closeD);
    document.getElementById("drawerBg").addEventListener("click", closeD);

    // reveal on scroll
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal-up").forEach(function (el) { io.observe(el); });
  }

  /* ----------------- Contact form (no backend) ------------------- */
  window.scgHandleContact = function (form) {
    var d = {
      name: (form.name && form.name.value || "").trim(),
      org: (form.org && form.org.value || "").trim(),
      email: (form.email && form.email.value || "").trim(),
      service: (form.service && form.service.value || "").trim(),
      message: (form.message && form.message.value || "").trim()
    };
    if (!d.name || !d.message) { alert("Please add your name and a short message."); return false; }
    var lines = [
      "New enquiry — Shiva Consultancy Group", "",
      "Name: " + d.name,
      d.org ? "Organisation: " + d.org : "",
      d.email ? "Email: " + d.email : "",
      d.service ? "Interested in: " + d.service : "",
      "", "Message:", d.message
    ].filter(Boolean);
    var body = lines.join("\n");
    var wa = "https://wa.me/" + SCG.phoneRaw + "?text=" + encodeURIComponent(body);
    var mailto = "mailto:" + SCG.email + "?subject=" + encodeURIComponent("Website enquiry from " + d.name) + "&body=" + encodeURIComponent(body);
    var status = document.getElementById("formStatus");
    if (status) {
      status.style.display = "block";
      status.innerHTML = 'Thank you, ' + d.name.split(" ")[0] +
        '. Choose how to send your enquiry:<div style="margin-top:.75rem;display:flex;gap:.6rem;flex-wrap:wrap">' +
        '<a class="btn btn-gold" target="_blank" rel="noopener" href="' + wa + '">Send on WhatsApp</a>' +
        '<a class="btn btn-outline" href="' + mailto + '">Send by Email</a></div>';
      status.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.location.href = wa;
    }
    return false;
  };

  /* ----------------------------- Boot ---------------------------- */
  function boot() { buildHeader(); buildFooter(); buildTabs(); wire(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
