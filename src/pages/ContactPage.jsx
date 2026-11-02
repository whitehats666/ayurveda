import { Link } from 'react-router-dom'

function ContactPage() {
  return (
    <div className="page-shell contact-page-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Anti Studio home">
          <span className="brand-mark">A</span>
          Anti / Studio
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <a href="mailto:krishnaanilkumar.work@gmail.com">Email</a>
        </nav>

        <Link className="pill-button" to="/">
          Back home
        </Link>
      </header>

      <main className="contact-shell">
        <section className="contact-intro reveal">
          <p className="eyebrow">Contact</p>
          <h1>Tell us what is moving next.</h1>
          <p className="hero-description">
            We partner with founders, culture-led brands, and product teams ready to sharpen their story and design a launch that feels unmistakably premium.
          </p>
        </section>

        <section className="contact-panel">
          <form
            className="contact-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="field-row">
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@brand.com" />
              </label>
            </div>

            <div className="field-row">
              <label>
                Project type
                <select name="type">
                  <option value="">Select</option>
                  <option>Brand strategy</option>
                  <option>Launch campaign</option>
                  <option>Product design</option>
                  <option>Identity refresh</option>
                </select>
              </label>
              <label>
                Budget
                <select name="budget">
                  <option value="">Select</option>
                  <option>$5k–$15k</option>
                  <option>$15k–$40k</option>
                  <option>$40k–$100k</option>
                  <option>$100k+</option>
                </select>
              </label>
            </div>

            <label>
              Project brief
              <textarea name="message" rows="5" placeholder="Tell us about your goals, moments, and timeline." />
            </label>

            <button type="submit" className="primary-button submit-button">
              Send inquiry
            </button>
          </form>

          <aside className="contact-meta">
            <div>
              <span className="meta-label">Phone</span>
              <a href="tel:+916282430019">+91 6282430019</a>
            </div>
            <div>
              <span className="meta-label">Email</span>
              <a href="mailto:krishnaanilkumar.work@gmail.com">krishnaanilkumar.work@gmail.com</a>
            </div>
            <div>
              <span className="meta-label">Based in</span>
              <p>Remote-first • London • New York</p>
            </div>
            <div>
              <span className="meta-label">Response time</span>
              <p>Usually within 48 hours</p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default ContactPage
