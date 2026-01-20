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
  
// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const scrollPosition = window.scrollY;
  
  // Account for header height (sticky header is ~60px)
  const headerOffset = 80;
  
  // Find which section we're currently in
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerOffset;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Special case: if at very top of page, highlight "hero"
  if (scrollPosition < 100) {
    currentSection = 'hero';
  }
  
  // Update nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
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
// SMOOTH SCROLL & PREVENT NEW TAB FOR HASH LINKS
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Handle all internal hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty hashes
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }
      
      // Get target element
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Prevent default behavior
        e.preventDefault();
        
        // Smooth scroll to target
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
      } else {
        // Target doesn't exist yet - just prevent default to avoid new tab
        e.preventDefault();
        console.log(`Section ${href} doesn't exist yet - will be added in future phases`);
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
            contactName: '',
            email: '',
            phone: '',
            address: '',
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
        // Video: only 15 or 30
        if (![15, 30].includes(Number(this.adLength))) this.adLength = 15;
    } else {
        // Static: default to 10s when switching back
        this.adLength = 10;
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

        handleFileUpload(e) {
            this.files = Array.from(e.target.files);
        },

        // Pricing Logic
        get monthlySubtotal() {
            const base = this.selectedLocations.reduce((sum, loc) => sum + (loc.rate || 0), 0);

            const sec = Number(this.adLength);

            // On-Screen Duration multiplier
            // Standard Static: 10s = 1x, 15s = 1.5x, 20s = 2x, 30s = 3x
            // Standard Video: 15s = 1.5x, 30s = 2x
            // Premium (60s): 2x (same as Standard 20s)
            let lengthMult = 1;

            if (this.placementType === 'premium') {
                // Premium placement: 60s uses 2x multiplier
                lengthMult = 2;
            } else if (this.adType === 'video') {
                // Standard video pricing
                if (sec === 15) lengthMult = 1.5;
                else if (sec === 30) lengthMult = 2;
                else lengthMult = 1.5; // defensive default for video
            } else {
                // Standard static pricing
                if (sec === 10) lengthMult = 1;
                else if (sec === 15) lengthMult = 1.5;
                else if (sec === 20) lengthMult = 2;
                else if (sec === 30) lengthMult = 3;
            }

            return base * lengthMult;
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

            // 1: 0%
            // 2–49: 10%
            // 50–99: 20%
            // 100+: 25%
            if (count >= 100) return 0.25;
            if (count >= 50) return 0.20;
            if (count >= 2) return 0.10;
            return 0;
        },

        get locationDiscountAmount() {
            const sub = this.monthlySubtotal * this.duration;
            const afterLoc = sub * (1 - this.locationDiscountPercent);
            return sub - afterLoc;
        },

        get durationDiscountAmount() {
            const sub = this.monthlySubtotal * this.duration;
            const afterLoc = sub * (1 - this.locationDiscountPercent);
            const afterDur = afterLoc * (1 - this.durationDiscountPercent);
            return afterLoc - afterDur;
        },

        get totalDiscountAmount() {
            return this.locationDiscountAmount + this.durationDiscountAmount;
        },

        // Backwards-compatible aggregate discount used by existing UI logic
        get discountAmount() {
            return this.totalDiscountAmount;
        },

        get grandTotal() {
            const sub = this.monthlySubtotal * this.duration;
            const creative = this.creativeService ? 200 : 0;
            return (sub - this.discountAmount) + creative;
        },

        get hasContactPricing() {
            return this.selectedLocations.some(l => l.rate === null);
        },

        proceedToContract() {
            if (this.selectedLocations.length === 0) return;
            this.step = 2;
            window.scrollTo(0, 0);
        },

        submitContract() {
            // Placeholder for API call to generate contract/invoice
            console.log("Generating Contract for:", this.form);
            console.log("Package:", this.selectedLocations, this.grandTotal);

            // Simulate loading
            setTimeout(() => {
                this.step = 3;
                window.scrollTo(0, 0);
            }, 1000);
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
        }
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
