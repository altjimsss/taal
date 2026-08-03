import HeroMount from "./components/HeroMount";
import ValueCarousel from "./components/ValueCarousel";
import ScrollReveal from "./components/ScrollReveal";
import { Footer2 } from "@/components/ui/footer-2";

export default function Home() {
  return (
    <>
      <ScrollReveal />

      {/* ===== HERO — full-bleed, fills the screen ===== */}
      <section className="hero">
        <HeroMount />
        <div className="hero-content">
          <h1>TAAL</h1>
          <p>
            Preserved through time. Walk the ancestral streets and the grand Basilica.
            Some places are worth slowing down for.
          </p>
        </div>
        {/* ===== HERO BOTTOM BAR (Framed by 72px grid) ===== */}
        <div className="hero-bottom-bar">
          <div className="corner-square-bottom-left" />
          <div className="hero-search-inner">
            <div className="field">
              <div className="label">Activity/Goal</div>
              <div className="value">Heritage / Coffee / Craft</div>
            </div>
            <div className="field">
              <div className="label">Location</div>
              <div className="value">Taal, Batangas</div>
            </div>
            <div className="field">
              <div className="label">Date/Duration</div>
              <div className="value">Dec–May · 1 day</div>
            </div>
            <div className="field">
              <div className="label">Budget</div>
              <div className="value">₱0 – ₱5,000</div>
            </div>
          </div>
          <div className="explore-square">
            <button type="button" className="explore-btn" aria-label="Explore">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="trust-strip">
        <div className="squares">
          <span />
          <span />
          <span />
        </div>
      </section>

      <div className="page">
      {/* ===== HEADLINE ===== */}
      <section className="headline">
        <h2>
          Walk through history, feel at <span className="highlight">home</span>
        </h2>
        <div className="trust-badges">
          <span className="trust-pill">Heritage Town of the Philippines</span>
          <span className="trust-divider">•</span>
          <span className="trust-pill">100+ ancestral houses</span>
        </div>
      </section>

      {/* ===== VALUE SECTION ===== */}
      <section className="value-section">
        <div className="value-left">
          <span className="tag">01 Our Value</span>
          <h3>A Heritage Town Worth Slowing For</h3>
          <p>We plan slow, curated trips with good stories and better people.</p>
          <button type="button" className="btn-flat">Book a Heritage Walk</button>
        </div>
        <ValueCarousel />
      </section>

      {/* ===== PICK THE PLACE ===== */}
      <section className="pick-section">
        <div className="pick-header">
          <div>
            <span className="tag">Popular Destination · 2025</span>
            <h2>Pick the Place</h2>
          </div>
          <div className="sub">
            Heritage spots for everyone, with quiet corners for your own pace.
          </div>
        </div>

        <div className="filter-bar">
          <div className="field">
            <div className="label">Destination</div>
            <div className="value">Find a spot ...</div>
          </div>
          <div className="field">
            <div className="label">Category</div>
            <div className="value">Heritage / Museum</div>
          </div>
          <div className="field">
            <div className="label">Price</div>
            <div className="value">Select range</div>
          </div>
          <div className="field">
            <div className="label">Date</div>
            <div className="value">Select date</div>
          </div>
          <div className="discover">Discover</div>
        </div>

        <div className="destinations">
          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Basilica Tour</div>
                <div className="sub">Taal Town Proper</div>
              </div>
              <div className="slots">★ Heritage walk</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=700&auto=format&fit=crop"
                alt="Basilica interior"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">Free</span>
              <span className="m">Timed entry</span>
              <span className="m">Sat–Sun</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Casa Villavicencio</div>
                <div className="sub">Ancestral house</div>
              </div>
              <div className="slots">★ 5 Days open</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=700&auto=format&fit=crop"
                alt="Ancestral house facade"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-cols">
              <div>Housekeeping<b>Beside the Basilica</b></div>
              <div>Entry<b>Donation</b></div>
              <div>Tour<b>Guided</b></div>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Agoncillo Museum</div>
                <div className="sub">Heritage tours</div>
              </div>
              <div className="slots">★ 2 Days open</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=700&auto=format&fit=crop"
                alt="Taal valley in soft light"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">₱50.00</span>
              <span className="m">Open Trip</span>
              <span className="m">Dry season</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">San Martin Chapel</div>
                <div className="sub">Barangay Dueño</div>
              </div>
              <div className="slots">★ Golden hour</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=700&auto=format&fit=crop"
                alt="Heritage street at dusk"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">Free</span>
              <span className="m">Sunrise</span>
              <span className="m">All year</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Taal Lake Lookout</div>
                <div className="sub">Caldera viewpoint</div>
              </div>
              <div className="slots">★ Panorama</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=700&auto=format&fit=crop"
                alt="Lake and shoreline"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-cols">
              <div>View<b>Full lake</b></div>
              <div>Entry<b>Free</b></div>
              <div>Best<b>Dawn</b></div>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Ancestral Street</div>
                <div className="sub">Cobblestone walk</div>
              </div>
              <div className="slots">★ Guided stroll</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=700&auto=format&fit=crop"
                alt="Cobblestone street"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">₱20.00</span>
              <span className="m">1 hr</span>
              <span className="m">Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PICK ===== */}
      <section className="feature-section">
        <div className="pick-header">
          <div>
            <span className="tag">Heart of the Town · 2026</span>
            <h2>This Season&apos;s Featured</h2>
          </div>
          <div className="sub">
            One hand-picked walk, our favorites in full detail.
          </div>
        </div>

        <div className="feature-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="feature-bg"
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1600&auto=format&fit=crop"
            alt="Basilica of Taal at golden hour"
          />
          <div className="feature-info">
            <span className="tag">★ Featured Walk · 3 hours</span>
            <h3>Basilica &amp; the Ancients</h3>
            <p>
              A slow walk from the grand Basilica through cobblestone lanes and
              ancestral homes, with local stories at every turn.
            </p>
            <div className="feature-meta">
              <span>₱300 / person</span>
              <span>2x daily</span>
              <span>Guide included</span>
            </div>
            <button type="button" className="btn-flat">Book this walk</button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="steps-section">
        <div className="pick-header">
          <div>
            <span className="tag">Simple · Slow · Local</span>
            <h2>How it Works</h2>
          </div>
          <div className="sub">
            Three easy steps to a memorable day in Taal.
          </div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Choose your walk</h4>
            <p>Pick from curated heritage, food, or people tours.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Pick a date</h4>
            <p>Reserve your slot in just a few taps.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Slow down & arrive</h4>
            <p>A local guide leads you through the story of the town.</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testi-section">
        <div className="pick-header">
          <div>
            <span className="tag">What Guests Say · 2026</span>
            <h2>Kept at the Top of Our Minds</h2>
          </div>
          <div className="sub">
            A few words from people who took it slow.
          </div>
        </div>

        <div className="testimonial">
          <p className="quote">
            &ldquo;The best part of Taal was the pace. No rushing, just stories and
            coffee on a cobblestone lane.&rdquo;
          </p>
          <div className="byline">— Miguel R., guided heritage walk</div>
        </div>
      </section>

      {/* ===== NEWSLETTER / CTA ===== */}
      <section className="cta-section">
        <h2>Plan a slow day in Taal</h2>
        <p className="sub">
          Get new walks and heritage picks straight to your inbox.
        </p>
        <form className="cta-form">
          <input type="email" placeholder="Your email" aria-label="Email address" />
          <button type="submit" className="btn-flat">Get the newsletter</button>
        </form>
      </section>

      </div>

      {/* ===== FOOTER — full-width band outside the .page grid ===== */}
      <Footer2 />
    </>
  );
}
