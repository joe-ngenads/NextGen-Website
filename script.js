// =========================================================
// PHASE 2: HEADER SCROLL EFFECT & SMOOTH SCROLL
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Add shadow to header on scroll
  function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
function updateActiveNavLink() {
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.getBoundingClientRect().height + 50 : 120;
  const scrollPosition = window.scrollY + headerHeight + 30;

  let currentSection = '';
  document.querySelectorAll('section[id], #builder, #faq').forEach(section => {
    const top = section.offsetTop;
    if (scrollPosition >= top && scrollPosition <= top + section.offsetHeight) {
      currentSection = section.getAttribute('id') || 'builder';
    }
  });

  if (window.scrollY < 200) currentSection = 'hero';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}  
  // Run on scroll
  window.addEventListener('scroll', () => {
    updateHeaderOnScroll();
    updateActiveNavLink();
  }, { passive: true });
  
  // Run once on load
  updateHeaderOnScroll();
  updateActiveNavLink();
});

// =========================================================
// SMOOTH SCROLL WITH DYNAMIC HEADER OFFSET (Fixed for taller header)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  
  // Handle ALL internal hash links (desktop nav + mobile menu)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Dynamic offset using the ACTUAL header height + 24px breathing room
        const headerHeight = header.getBoundingClientRect().height + 24;
        
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        history.pushState(null, null, href);
      }
    });
  });
});

// =========================================================
// EXISTING CODE BELOW (Shared Navigation Logic, etc.)
// =========================================================

// Shared Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
        
        // Close mobile menu when clicking any nav link
        // Wait for menu to close before scrolling
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Close the menu first
                mobileMenu.classList.remove('open');
                
                // Don't let the hash link default behavior happen yet
                e.preventDefault();
                
                // Wait for menu close animation (300ms), then scroll
                setTimeout(() => {
                    const href = link.getAttribute('href');
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        history.pushState(null, null, href);
                    }
                }, 350); // Wait 350ms for menu to fully close (300ms transition + 50ms buffer)
            });
        });
    }
});

// Package Builder Logic (Alpine.js)
function packageBuilder() {
    return {
        locations: [],
        selectedLocations: [],
        searchQuery: '',
        discountsOpen: true,
        estimatorExpanded: true,
        sortBy: 'county',
        duration: 0,
        placementType: 'standard', // 'standard' or 'premium'
        adType: 'static',
        adLength: 10, // will be normalized by ensureValidAdLength()
        creativeService: false,
        files: [],
        step: 1,
        showFormModal: false,
        showSuccessModal: false,
        // Mobile sticky bar (existing)
        showMobileActionBar: false,
        suppressMobileActionBar: false,

        // Desktop sticky bar (new)
        showDesktopActionBar: false,
        suppressDesktopActionBar: false,

        map: null,
        markers: {},
form: {
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'OH',
    zip: '',
},

        resetBuilder() {
            this.selectedLocations = [];

            // Reset ALL pins back to blue
            if (this.markers && this.blueIcon) {
                Object.values(this.markers).forEach(marker => {
                    if (marker && typeof marker.setIcon === 'function') {
                        marker.setIcon(this.blueIcon);
                    }
                });
            }

            this.searchQuery = '';
            this.sortBy = 'impressions';

            this.duration = 0;
            this.placementType = 'standard';
            this.adType = 'static';
            this.adLength = 10;
            this.creativeService = false;
            this.files = [];

            this.step = 1;
            this.discountsOpen = true;

            // refresh UI if you have one of these methods
            if (typeof this.updateMapMarkers === 'function') this.updateMapMarkers();
            if (typeof this.refreshMarkers === 'function') this.refreshMarkers();
            if (typeof this.updateMarkers === 'function') this.updateMarkers();
        },

        initApp() {
            // Load data from global variable defined in data.js
            if (typeof rawCsvData !== 'undefined') {
                this.locations = parseCSV(rawCsvData);
            }

            // Ensure default adLength matches default adType
            this.ensureValidAdLength();

	    // Initialize EmailJS with your account
            emailjs.init("Wdg9jyuQz5dToVWKv");

            // Initialize Map
            this.$nextTick(() => {
                this.initMap();
            });

            // Sticky action bars (mobile + desktop)
            this.$nextTick(() => {
                const step1 = document.getElementById('step-1');
                if (!step1) return;

                const updateBars = () => {
                  const top = step1.getBoundingClientRect().top;
const isMobile = window.innerWidth <= 768;

// Show earlier and hide later on desktop by using a bigger buffer
const mobileTriggerPx = 110;
const desktopTriggerPx = 320;

if (isMobile) {
  this.showMobileActionBar = (top <= mobileTriggerPx) && !this.suppressMobileActionBar;
  this.showDesktopActionBar = false;
  return;
}

this.showMobileActionBar = false;
this.showDesktopActionBar = (top <= desktopTriggerPx) && !this.suppressDesktopActionBar;

                };

                updateBars();
                window.addEventListener('scroll', updateBars, { passive: true });
                window.addEventListener('resize', updateBars, { passive: true });

                // Hide the fixed bar when the on-page estimator footer is visible (prevents duplicates)
                const footerEl = document.querySelector('.estimator-footer');
                if (footerEl && 'IntersectionObserver' in window) {
                    const obs = new IntersectionObserver((entries) => {
                        const entry = entries[0];

                        const isMobile = window.innerWidth <= 768;
                        if (isMobile) {
                            this.suppressMobileActionBar = entry.isIntersecting;
                        } else {
                            this.suppressDesktopActionBar = entry.isIntersecting;
                        }

                        // Re-run immediately so it updates without waiting for scroll
                        updateBars();
                    }, { threshold: 0.15 });

                    obs.observe(footerEl);
                }
            });
        },

        ensureValidAdLength() {
            if (this.adType === 'video') {
                if (![15, 30].includes(Number(this.adLength))) this.adLength = 15;
                this.creativeService = false;
            } else {
                if (this.adLength === 60) this.adLength = 10;
            }
        },

        selectPlacement(type) {
            this.placementType = type;
            
            if (type === 'premium') {
                // Premium: force static image and 60s duration
                this.adType = 'static';
                this.adLength = 60;
            } else {
                // Standard: reset to default static 10s (or maintain current if valid)
                if (this.adLength === 60) {
                    this.adLength = 10;
                }
                // Ensure valid ad length for current ad type
                this.ensureValidAdLength();
            }
        },

        initMap() {
            // --- Pin Icons ---
            this.blueIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            this.redIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            // Centered on Ohio
            const isMobile = window.innerWidth < 768;
            const initialZoom = isMobile ? 6 : 7;

            this.map = L.map('map').setView([40.4173, -82.9071], initialZoom);

            // Ohio-ish bounds + ~100mi buffer (roughly)
            const ohioBounds = L.latLngBounds(
                [38.0, -85.8],  // SW corner (lat, lng)
                [42.6, -79.3]   // NE corner
            );

            // Prevent panning outside the region
            this.map.setMaxBounds(ohioBounds);
            this.map.on('drag', () => this.map.panInsideBounds(ohioBounds, { animate: false }));

            // Prevent zooming out to the whole world
            this.map.setMinZoom(6);
            this.map.setMaxZoom(13);

            setTimeout(() => { if (this.map) this.map.invalidateSize(); }, 200);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            // Close popup when clicking outside the map
            document.addEventListener('click', (e) => {
                const mapContainer = document.getElementById('map');
                if (mapContainer && !mapContainer.contains(e.target)) {
                    this.map.closePopup();
                }
            });

            // Add Pins
            this.locations.forEach(loc => {
                if (loc.lat && loc.lon) {
                    const marker = L.marker([loc.lat, loc.lon], { icon: this.blueIcon }).addTo(this.map);

                    const getButtonText = () => this.isSelected(loc.id) ? 'Remove' : 'Add to Package';
                    const getButtonClass = () => this.isSelected(loc.id) ? 'btn-danger' : 'btn-primary';

                    marker.bindPopup(() => `
                        <div style="min-width:220px;">
                            <b>${loc.city}</b><br>
                            ${loc.impressions ? parseInt(loc.impressions).toLocaleString() : 'Coming Soon'} Impressions<br>
                            ${loc.rate ? ('$' + loc.rate.toFixed(2) + ' /mo') : 'Contact for Pricing'}
                            <button
                                type="button"
                                class="btn-add ${getButtonClass()}"
                                data-loc-id="${loc.id}"
                                style="margin-top:10px;width:100%;"
                            >
                                ${getButtonText()}
                            </button>
                        </div>
                    `);

                    // When the popup opens, wire the button click
                  // Update popup button function
                    const updatePopupButton = () => {
                        const popupEl = marker.getPopup()?.getElement();
                        const btn = popupEl?.querySelector(`button[data-loc-id="${loc.id}"]`);
                        if (btn) {
                            btn.textContent = getButtonText();
                            btn.classList.toggle('btn-primary', !this.isSelected(loc.id));
                            btn.classList.toggle('btn-danger', this.isSelected(loc.id));
                        }
                    };

                    marker.on('popupopen', (e) => {
                        const popupEl = e.popup.getElement();
                        const btn = popupEl?.querySelector(`button[data-loc-id="${loc.id}"]`);
                        if (!btn) return;

                        // Ensure we don't stack multiple handlers
                        btn.onclick = null;

                        btn.onclick = () => {
                            this.toggleLocation(loc);
                            updatePopupButton();
                        };

                        // Update button state when popup opens
                        updatePopupButton();
                    });

                    // Store the update function so we can call it from toggleLocation
                    this.popupUpdaters = this.popupUpdaters || {};
                    this.popupUpdaters[loc.id] = updatePopupButton;

                    this.markers[loc.id] = marker;
                }
            });
        },


        get filteredLocations() {
            let filtered = this.locations.filter(loc => {
                const search = this.searchQuery.toLowerCase();
                return (loc.city && loc.city.toLowerCase().includes(search)) ||
                    (loc.county && loc.county.toLowerCase().includes(search)) ||
                    (loc.region && loc.region.toString().includes(search));
            });

            // Sorting
            filtered.sort((a, b) => {
                const regionNum = (v) => {
                    const n = parseInt(v, 10);
                    return Number.isFinite(n) ? n : 999;
                };

                if (this.sortBy === 'impressions') {
                    return (b.impressions || 0) - (a.impressions || 0);
                }

                if (this.sortBy === 'rate') {
                    return (a.rate || 0) - (b.rate || 0);
                }

                if (this.sortBy === 'city') {
                    return (a.city || '').localeCompare(b.city || '');
                }
if (this.sortBy === 'county') {
    return (a.county || '').localeCompare(b.county || '');
}


                // Region-specific sorts (pins that region to the top)
                // 1 = Northeast, 2 = Central, 3 = South, 4 = Northwest
                const aR = regionNum(a.region);
                const bR = regionNum(b.region);

                const pinFirst = (target) => {
                    const aIs = aR === target ? 0 : 1;
                    const bIs = bR === target ? 0 : 1;
                    if (aIs !== bIs) return aIs - bIs;

                    const cityCmp = (a.city || '').localeCompare(b.city || '');
                    if (cityCmp !== 0) return cityCmp;

                    return (a.id || '').toString().localeCompare((b.id || '').toString());
                };

                if (this.sortBy === 'region_ne') return pinFirst(1);
                if (this.sortBy === 'region_central') return pinFirst(2);
                if (this.sortBy === 'region_south') return pinFirst(3);
                if (this.sortBy === 'region_nw') return pinFirst(4);

                return 0;
            });

            // Move selected locations to the top (preserve sort order within each group)
            const selectedIds = new Set(this.selectedLocations.map(l => String(l.id)));

            const selected = [];
            const unselected = [];

            for (const loc of filtered) {
                if (selectedIds.has(String(loc.id))) selected.push(loc);
                else unselected.push(loc);
            }

            return [...selected, ...unselected];
        },

toggleLocation(loc) {
            const index = this.selectedLocations.findIndex(l => l.id === loc.id);

            if (index !== -1) {
                this.selectedLocations.splice(index, 1);
            } else {
                this.selectedLocations.push(loc);
            }

            // Update marker color
            const marker = this.markers[loc.id];
            if (marker) {
                marker.setIcon(
                    this.isSelected(loc.id) ? this.redIcon : this.blueIcon
                );
            }

            // Update popup button if popup is open
            if (this.popupUpdaters && this.popupUpdaters[loc.id]) {
                this.popupUpdaters[loc.id]();
            }
        },

isSelected(id) {
            return this.selectedLocations.some(l => l.id === id);
        },

        // Check if all locations are selected
        get allLocationsSelected() {
            return this.locations.length > 0 && this.selectedLocations.length === this.locations.length;
        },

        // Toggle all locations at once
        toggleAllLocations() {
            if (this.allLocationsSelected) {
                // Remove all locations
                this.selectedLocations = [];
                // Reset all pins to blue
                if (this.markers && this.blueIcon) {
                    Object.values(this.markers).forEach(marker => {
                        if (marker && typeof marker.setIcon === 'function') {
                            marker.setIcon(this.blueIcon);
                        }
                    });
                }
            } else {
                // Add all locations
                this.selectedLocations = [...this.locations];
                // Set all pins to red
                if (this.markers && this.redIcon) {
                    Object.values(this.markers).forEach(marker => {
                        if (marker && typeof marker.setIcon === 'function') {
                            marker.setIcon(this.redIcon);
                        }
                    });
                }
            }
        },

        handleFileUpload(e) {
            this.files = Array.from(e.target.files);
        },

        // === NEW PROMO PRICING ENGINE (First 3 Months @ $50 cap) ===
        get lengthMultiplier() {
            const sec = Number(this.adLength);
            let lengthMult = 1;

            if (this.placementType === 'premium') {
                lengthMult = 2;
            } 
            else if (this.adType === 'video') {
                // FIXED: Video 30s now correctly gets 3x (same as Static 30s)
                if (sec === 15) lengthMult = 1.5;
                else if (sec === 30) lengthMult = 3;
                else lengthMult = 1.5;
            } 
            else {
                // Static image pricing (unchanged)
                if (sec === 10) lengthMult = 1;
                else if (sec === 15) lengthMult = 1.5;
                else if (sec === 20) lengthMult = 2;
                else if (sec === 30) lengthMult = 3;
            }
            return lengthMult;
        },

        get monthlySubtotal() {  // FULL original rate (used for promo calculation)
            const base = this.selectedLocations.reduce((sum, loc) => sum + (loc.rate || 0), 0);
            return base * this.lengthMultiplier;
        },

        get promoMonthlySubtotal() {
            const promoBase = this.selectedLocations.reduce((sum, loc) => sum + Math.min(loc.rate || 0, 50), 0);
            return promoBase * this.lengthMultiplier;
        },

        get promoSavings() {
            if (!this.duration) return 0;
            const monthsPromo = Math.min(this.duration, 3);
            return (this.monthlySubtotal - this.promoMonthlySubtotal) * monthsPromo;
        },

        get totalBeforeDiscounts() {
            if (!this.duration) return 0;
            const monthsPromo = Math.min(this.duration, 3);
            return this.promoMonthlySubtotal * monthsPromo + this.monthlySubtotal * (this.duration - monthsPromo);
        },

        get durationDiscountPercent() {
            // 1–2: 0%
            // 3–5: 10%
            // 6–11: 20%
            // 12: 25%
            if (this.duration >= 12) return 0.25;
            if (this.duration >= 6) return 0.20;
            if (this.duration >= 3) return 0.10;
            return 0;
        },

        get locationDiscountPercent() {
            const count = this.selectedLocations.length;

            // NEW BRACKETS:
            // 1–9:    0%
            // 10–24:  10%
            // 25–49:  15%
            // 50–99:  20%
            // 100+:   25%
            if (count >= 100) return 0.25;
            if (count >= 50)  return 0.20;
            if (count >= 25)  return 0.15;
            if (count >= 10)  return 0.10;
            return 0;
        },

        get locationDiscountAmount() {
            return this.totalBeforeDiscounts * this.locationDiscountPercent;
        },

        get durationDiscountAmount() {
            const afterLoc = this.totalBeforeDiscounts * (1 - this.locationDiscountPercent);
            return afterLoc * this.durationDiscountPercent;
        },

        get totalDiscountAmount() {
            return this.locationDiscountAmount + this.durationDiscountAmount;
        },

        get grandTotal() {
            return this.totalBeforeDiscounts - this.totalDiscountAmount + (this.creativeService ? 200 : 0);
        },

        get hasContactPricing() {
            return this.selectedLocations.some(l => l.rate === null);
        },

        proceedToContract() {
            if (this.selectedLocations.length === 0) {
                alert("Please select at least one location first.");
                return;
            }
            this.showFormModal = true;   // opens the form on top of the builder
        },

submitFormModal() {
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    let locationsHTML = '';
    this.selectedLocations.forEach(loc => {
        locationsHTML += `<tr><td>${loc.city} (${loc.county})</td><td>${this.formatImpressions(loc.impressions)}</td><td>${this.formatRate(loc.rate)}</td></tr>`;
    });

    const fullName = `${this.form.firstName} ${this.form.lastName}`.trim();

    const params = {
        businessName: this.form.businessName,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        fullName: fullName,
        email: this.form.email,
        phone: this.form.phone,
        street: this.form.street,
        city: this.form.city,
        state: this.form.state,
        zip: this.form.zip,
        duration: this.duration,
        placementType: this.placementType === 'premium' ? 'Premium Sidebar (60s)' : 'Standard 16:9',
        adType: this.adType === 'video' ? 'Soundless Video' : 'Static Image',
        adLength: this.adLength,
        creativeService: this.creativeService ? 'Yes ($200 added)' : 'No',
        locationCount: this.selectedLocations.length,
        locationsTable: locationsHTML,
        monthlySubtotal: this.formatCurrency(this.monthlySubtotal),
        totalBeforeDiscount: this.formatCurrency(this.monthlySubtotal * this.duration),
        totalDiscount: this.formatCurrency(this.totalDiscountAmount),
        grandTotal: this.formatCurrency(this.grandTotal),
        date: new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
    };

    Promise.all([
        emailjs.send('service_pvgt3ya', 'template_uzwhgvi', { ...params, to_email: 'info@ngenads.com' }),
        emailjs.send('service_pvgt3ya', 'template_p8oszan', { ...params, to_email: this.form.email })
    ])
    .then(() => {
        this.resetBuilder();
        this.form = { businessName: '', firstName: '', lastName: '', email: '', phone: '', street: '', city: '', state: 'OH', zip: '' };
        this.showFormModal = false;
        this.showSuccessModal = true;
    })
    .catch((error) => {
        console.error("EmailJS error:", error);
        alert("There was an issue sending the confirmation. Please try again or email us at info@ngenads.com");
        btn.textContent = originalText;
        btn.disabled = false;
    });
},
        // New helper to close the success modal
        closeSuccessModal() {
            this.showSuccessModal = false;
        },

               // Formatters
        formatCurrency(val) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
        },
        formatImpressions(val) {
            return val ? parseInt(val).toLocaleString() : 'Coming Soon';
        },
        formatRate(val) {
            return val ? '$' + val.toFixed(2) : 'Contact for Pricing';
        },
        formatPhone(e) {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 10) val = val.substring(0, 10);
           
            if (val.length >= 7) {
                e.target.value = `(${val.substring(0,3)}) ${val.substring(3,6)}-${val.substring(6)}`;
            } else if (val.length >= 4) {
                e.target.value = `(${val.substring(0,3)}) ${val.substring(3)}`;
            } else if (val.length > 0) {
                e.target.value = `(${val}`;
            }
        },
    }
}

// CSV Parser Helper
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');

    // Regex to handle commas inside quotes
    const regex = /(?:^|,)("(?:[^"]+|"")*"|[^,]*)/g;

    return lines.slice(1).map(line => {
        let matches = [];
        let match;
        while (match = regex.exec(line)) {
            let val = match[1];
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            }
            matches.push(val.trim());
        }

        // Identifier,Region,County,City,Annual Impressions,Monthly Rate,Address,Lat,Lon
        let rateStr = matches[5] ? matches[5].replace('$', '').trim() : null;
        let rate = rateStr ? parseFloat(rateStr) : null;

        return {
            id: matches[0],
            region: matches[1],
            county: matches[2],
            city: matches[3],
            impressions: matches[4] ? parseInt(matches[4]) : null,
            rate: Number.isFinite(rate) ? rate : null,
            address: matches[6],
            lat: matches[7] ? parseFloat(matches[7]) : null,
            lon: matches[8] ? parseFloat(matches[8]) : null
        };
    });
}

// =========================================================
// TESTIMONIALS CAROUSEL
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  
  if (!track || !dotsContainer) return; // Exit if elements don't exist
  
  const slides = track.querySelectorAll('.testimonial-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let autoPlayInterval = null; // Store interval ID
  
  console.log('Testimonial carousel initialized:', totalSlides, 'slides found'); // Debug
  
  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoPlay(); // Reset timer on manual click
    });
    dotsContainer.appendChild(dot);
  }
  
  const dots = dotsContainer.querySelectorAll('.testimonial-dot');
  
function updateCarousel() {
    // Use percentage-based transform (most reliable across all screen sizes)
    const offset = currentSlide * 100;
    
    track.style.transform = `translateX(-${offset}%)`;
    
    console.log('Slide to:', currentSlide, 'Offset:', offset + '%'); // Debug
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }
  
  function startAutoPlay() {
    // Clear any existing interval first
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    // Start new interval
    autoPlayInterval = setInterval(nextSlide, 7000);
  }
  
  function resetAutoPlay() {
    console.log('Auto-play timer reset'); // Debug
    startAutoPlay(); // Restart the timer
  }
  
  // Initial render
  updateCarousel();
  
  // Start auto-play
  startAutoPlay();
  
  // Recalculate on window resize
  window.addEventListener('resize', updateCarousel);
});