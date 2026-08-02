import type { Metadata } from "next";
import { HeroSlideshow } from "./components/HeroSlideshow";

export const metadata: Metadata = {
  title: "Taal — Heritage Town of the Philippines",
  description:
    "Preserved through time. Walk the ancestral streets and the grand Basilica. Some places are worth slowing down for.",
};

export default function Home() {
  return (
    <>
      {/* ===== HERO — full-bleed, fills the screen ===== */}
      <section className="hero">
        <HeroSlideshow />
        <div className="navbar">
          <div className="logo">
            <span className="dot" />
            Taal·Batangas
          </div>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Heritage</a></li>
              <li><a href="#">Attractions</a></li>
              <li><a href="#">Food</a></li>
              <li><a href="#">Visit</a></li>
            </ul>
          </nav>
        </div>
        <div className="hero-content">
          <h1>TAAL</h1>
          <p>
            Preserved through time. Walk the ancestral streets and the grand Basilica.
            Some places are worth slowing down for.
          </p>
        </div>
        <div className="hero-search">
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
          <div className="explore">Explore</div>
        </div>
      </section>

      <div className="page">
      {/* ===== TRUST STRIP ===== */}
      <section className="trust-strip">
        <div className="badge blue">
          <span className="icon" />
          Heritage Town of the Philippines
        </div>
        <div className="badge gold">
          <span className="icon" />
          100+ ancestral houses
        </div>
        <div className="squares">
          <span />
          <span />
          <span />
        </div>
      </section>

      {/* ===== HEADLINE ===== */}
      <section className="headline">
        <h2>
          Taal means the past,
          <br />
          Going <span className="highlight">home</span>
        </h2>
        <div className="dotted-divider">
          <span className="dot-l" />
          <span className="line" />
          <span className="pin" />
        </div>
      </section>

      {/* ===== VALUE SECTION ===== */}
      <section className="value-section">
        <div className="value-left">
          <span className="tag">01 Our Value</span>
          <h3>Not Your Boring Heritage Town</h3>
          <p>We plan slow, curated trips with good stories and better people.</p>
          <button type="button" className="btn-flat">Book a Heritage Walk</button>
        </div>
        <div className="value-right">
          <div className="card tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
              alt="The Basilica of St. Martin"
            />
            <span className="tag-chip">Basilica</span>
          </div>
          <div className="card short">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
              alt="Ancestral street"
            />
            <span className="tag-chip">Plaza</span>
          </div>
          <div className="card short">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1470770841076-0e2f4a6c8a6e?q=80&w=600&auto=format&fit=crop"
              alt="Craft during golden hour"
            />
            <span className="tag-chip">Walk</span>
          </div>
          <div className="caption">
            <div className="place">Taal, Batangas</div>
            <div className="desc">Heritage walk with local guides</div>
          </div>
          <div className="nav-controls">
            <span>← Prev</span>
            <span>Next →</span>
          </div>
        </div>
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
        </div>
      </section>
      </div>
    </>
  );
}
