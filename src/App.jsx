import { useLayoutEffect, useRef } from 'react'
import { Route, Routes, Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactPage from './pages/ContactPage'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    title: 'Brand Narrative',
    copy: 'Clear strategy, market position, and story frameworks built to convert attention into trust and demand.',
  },
  {
    title: 'Digital Product',
    copy: 'Immersive product experiences that feel premium in motion and frictionless in use.',
  },
  {
    title: 'Campaign Systems',
    copy: 'Launch assets, motion direction, and channel-ready creative designed to scale without losing taste.',
  },
]

const numbers = [
  { value: 12, suffix: '+', label: 'global launches' },
  { value: 96, suffix: '%', label: 'retention after launch' },
  { value: 24, suffix: 'k', label: 'qualified leads generated' },
  { value: 8, suffix: 'w', label: 'average monthly engagement' },
]

const projectCards = [
  { name: 'Noir / Motion', category: 'Brand system — 2026', accent: 'pink' },
  { name: 'Aster Labs', category: 'Product launch — 2026', accent: 'white' },
  { name: 'North Coast', category: 'Campaign sprint — 2026', accent: 'pink' },
  { name: 'Studio Moth', category: 'Identity refresh — 2026', accent: 'white' },
]

const storySteps = [
  {
    index: '01',
    title: 'Frame the signal',
    copy: 'We define the story, tension, and visual language before a single asset ships.',
  },
  {
    index: '02',
    title: 'Shape the motion',
    copy: 'Every interaction is designed to feel like the product itself is moving with intention.',
  },
  {
    index: '03',
    title: 'Launch with velocity',
    copy: 'The final system scales across product surfaces, campaigns, and investor storytelling.',
  },
]

const portfolioItems = [
  {
    title: 'NOVA / House',
    type: 'Luxury hospitality',
    image:
      'linear-gradient(135deg, rgba(255, 95, 173, 0.22), rgba(10, 10, 10, 0.12)), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80)',
  },
  {
    title: 'Lattice One',
    type: 'B2B platform',
    image:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(16, 16, 16, 0.18)), url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80)',
  },
  {
    title: 'Aster / Studio',
    type: 'Brand campaign',
    image:
      'linear-gradient(135deg, rgba(255, 102, 170, 0.2), rgba(15, 15, 15, 0.2)), url(https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80)',
  },
]

const marketplaceArtworks = [
  {
    title: 'Digital Decade',
    artist: 'Anthony Garçez',
    price: '2.45 ETH',
    image: 'photo-1535223289827-42f1e9919769',
    tone: 'cyan',
  },
  {
    title: 'Winter Jamz',
    artist: 'Antoni Tudisco',
    price: '2.3 ETH',
    image: 'photo-1531058020387-3be344556be6',
    tone: 'pink',
  },
  {
    title: 'Pastel Wifey',
    artist: 'Blake Kathryn',
    price: '2.23 ETH',
    image: 'photo-1534528741775-53994a69daeb',
    tone: 'violet',
  },
  {
    title: 'Neon Costa',
    artist: 'Maya Vong',
    price: '1.75 ETH',
    image: 'photo-1543857778-c4a1a3e0b2eb',
    tone: 'blue',
  },
  {
    title: 'Versace',
    artist: 'Antoni Tudisco',
    price: '2.45 ETH',
    image: 'photo-1579783902614-a3fb3927b6a5',
    tone: 'pink',
  },
]

const marketplaceSellers = [
  { name: 'Leighton Kramer', volume: '276.7', image: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Haylie Arcand', volume: '345.6', image: 'photo-1534528741775-53994a69daeb' },
  { name: 'Bowen Higgins', volume: '323.7', image: 'photo-1506794778202-cad84cf45f1d' },
  { name: 'Saige Fuentes', volume: '347.7', image: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Sophie Mclain', volume: '230.6', image: 'photo-1544005313-94ddf0286df2' },
]

const marketplaceCategories = [
  { name: 'Abstract', count: 30, image: 'photo-1549490349-8643362247b5' },
  { name: '3D Art', count: 45, image: 'photo-1634017839464-5c339ebe3cb4' },
  { name: 'Modern Art', count: 59, image: 'photo-1577083552431-6e5fd01aa342' },
  { name: 'Game', count: 25, image: 'photo-1511512578047-dfb367046420' },
  { name: 'Graffiti', count: 36, image: 'photo-1531058020387-3be344556be6' },
  { name: 'Watercolor', count: 40, image: 'photo-1541961017774-22349e4a1262' },
]

function ScrollFrameSequence() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const loadingRef = useRef(null)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const stage = stageRef.current
    if (!canvas || !context || !stage) return undefined

    const cache = new Map()
    const pending = new Map()
    const loadQueue = []
    const maxCachedFrames = 14
    const maxActiveLoads = 6
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let currentFrame = reducedMotion ? 44 : 1
    let previousFrame = currentFrame
    let hasRendered = false
    let disposed = false

    const assetNumberForFrame = (frameNumber) =>
      frameNumber === 81 || frameNumber === 85 ? frameNumber - 1 : frameNumber

    const fitCanvas = () => {
      const bounds = stage.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(bounds.width * ratio)
      const height = Math.round(bounds.height * ratio)

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      return { width: bounds.width, height: bounds.height }
    }

    const drawFrame = (frameNumber) => {
      const assetNumber = assetNumberForFrame(frameNumber)
      let image = cache.get(assetNumber)

      if (!image) {
        let nearestDistance = Infinity
        for (const [cachedNumber, cachedImage] of cache) {
          const distance = Math.abs(cachedNumber - assetNumber)
          if (distance < nearestDistance) {
            nearestDistance = distance
            image = cachedImage
          }
        }
      }

      const { width, height } = fitCanvas()
      context.fillStyle = '#080809'
      context.fillRect(0, 0, width, height)

      if (!image) return

      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
      hasRendered = true
      if (loadingRef.current) loadingRef.current.hidden = true
    }

    const trimCache = () => {
      while (cache.size > maxCachedFrames) {
        const oldestFrame = cache.keys().next().value
        cache.delete(oldestFrame)
      }
    }

    const loadFrame = (frameNumber) => {
      const assetNumber = assetNumberForFrame(frameNumber)
      if (cache.has(assetNumber)) {
        const image = cache.get(assetNumber)
        cache.delete(assetNumber)
        cache.set(assetNumber, image)
        return
      }
      if (pending.has(assetNumber)) return

      if (!loadQueue.includes(assetNumber)) loadQueue.push(assetNumber)
      drainLoadQueue()
    }

    const drainLoadQueue = () => {
      while (pending.size < maxActiveLoads && loadQueue.length > 0 && !disposed) {
        const assetNumber = loadQueue.shift()
        if (cache.has(assetNumber) || pending.has(assetNumber)) continue

      const image = new Image()
      image.decoding = 'async'
      pending.set(assetNumber, image)
      image.onload = () => {
        pending.delete(assetNumber)
        if (disposed) return
        cache.set(assetNumber, image)
        trimCache()
        drawFrame(currentFrame)
        drainLoadQueue()
      }
      image.onerror = () => {
        pending.delete(assetNumber)
        if (!hasRendered && loadingRef.current) {
          loadingRef.current.textContent = 'Unable to load the frame sequence'
        }
        drainLoadQueue()
      }
      image.src = `${import.meta.env.BASE_URL}frames/frame_${String(assetNumber).padStart(3, '0')}.png`
      }
    }

    const requestNeighborhood = (frameNumber) => {
      const direction = frameNumber >= previousFrame ? 1 : -1
      previousFrame = frameNumber
      loadQueue.length = 0
      loadFrame(frameNumber)

      for (let offset = 1; offset <= 6; offset += 1) {
        const ahead = frameNumber + direction * offset
        if (ahead >= 1 && ahead <= 87) loadFrame(ahead)
      }
    }

    drawFrame(currentFrame)

    const resizeObserver = new ResizeObserver(() => drawFrame(currentFrame))
    resizeObserver.observe(stage)

    let trigger
    if (!reducedMotion) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: stage,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          currentFrame = Math.round(self.progress * 86) + 1
          drawFrame(currentFrame)
          requestNeighborhood(currentFrame)
        },
      })
    }

    requestNeighborhood(currentFrame)

    return () => {
      disposed = true
      resizeObserver.disconnect()
      trigger?.kill()
      pending.forEach((image) => {
        image.onload = null
        image.onerror = null
      })
      pending.clear()
      cache.clear()
    }
  }, [])

  return (
    <section className="hero scroll-sequence" id="top" ref={sectionRef} aria-label="Krish portfolio introduction">
      <div className="scroll-sequence-stage" ref={stageRef}>
        <canvas ref={canvasRef} role="img" aria-label="Cinematic image sequence, controlled by scrolling" />
        <div className="scroll-sequence-copy">
          <p className="scroll-sequence-kicker">Independent creative portfolio</p>
          <h1>Hi, I’m <span>Krish.</span></h1>
          <p className="scroll-sequence-description">A collection of ideas, visuals, and digital experiences.</p>
          <a className="scroll-sequence-link" href="#work">Explore my works <span aria-hidden="true">↘</span></a>
        </div>
        <p className="scroll-sequence-loading" ref={loadingRef} role="status" aria-live="polite">
          Loading my portfolio
        </p>
      </div>
    </section>
  )
}

function HomePage() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.reveal, .story-panel, .stat-value', {
          opacity: 1,
          y: 0,
        })
        return
      }

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 48, opacity: 0, filter: 'blur(12px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })

      gsap.to('.showcase-track', {
        xPercent: -26,
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-section',
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray('.story-panel').forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0.2, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 74%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray('.stat-value').forEach((element) => {
        const target = Number(element.dataset.target)
        const suffix = element.dataset.suffix || ''
        const value = { current: 0 }

        gsap.to(value, {
          current: target,
          duration: 1.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            element.textContent = `${Math.round(value.current)}${suffix}`
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-shell" ref={rootRef}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Anti Studio home">
          <span className="brand-mark">A</span>
          Anti / Studio
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <a className="pill-button" href="#contact">
          Contact
        </a>
      </header>

      <main>
        <ScrollFrameSequence />

        <section className="marketplace" id="marketplace" aria-label="NFT marketplace showcase">
          <div className="marketplace-inner">
            <nav className="marketplace-nav" aria-label="Marketplace navigation">
              <a className="marketplace-brand" href="#marketplace">PLAY <span>NFT</span></a>
              <div className="marketplace-nav-links">
                <a href="#marketplace">Home</a>
                <a href="#popular">Explore</a>
                <a href="#categories">Marketplace</a>
                <a href="#sellers">Artists</a>
                <a href="#marketplace-join">News</a>
              </div>
              <a className="marketplace-register" href="#marketplace-join">Register</a>
            </nav>

            <div className="marketplace-hero">
              <div className="marketplace-hero-copy">
                <p className="marketplace-kicker">The future of collecting</p>
                <h2>Discover, Collect<br />and Sell Dope<br />Art and NFTs</h2>
                <p className="marketplace-description">
                  The world’s largest digital marketplace for crypto collections and non-fungible tokens.
                </p>
                <div className="marketplace-actions">
                  <a className="marketplace-button" href="#popular">Discover</a>
                  <a className="marketplace-button outline" href="#marketplace-join">Create</a>
                  <a className="marketplace-watch" href="#popular"><span aria-hidden="true">▶</span> Watch a video</a>
                </div>
                <div className="marketplace-stats" aria-label="Marketplace statistics">
                  <div><strong>27k +</strong><span>Art works</span></div>
                  <div><strong>20k +</strong><span>Auctions</span></div>
                  <div><strong>7k +</strong><span>Artists</span></div>
                </div>
                <div className="marketplace-community">
                  <div className="marketplace-avatars" aria-hidden="true">
                    {marketplaceSellers.slice(0, 4).map((seller) => (
                      <img
                        key={seller.name}
                        src={`https://images.unsplash.com/${seller.image}?auto=format&fit=crop&w=96&q=80`}
                        alt=""
                      />
                    ))}
                  </div>
                  <p><strong>40k +</strong><span>Active users</span></p>
                </div>
              </div>
              <article className="featured-nft">
                <img
                  src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85"
                  alt="Colorful futuristic digital portrait"
                />
                <div className="featured-nft-details">
                  <div><span>Ending in</span><strong>1h 20m 30s</strong></div>
                  <div><span>Highest bid</span><strong>32.4 ETH</strong></div>
                  <a href="#marketplace-join">Place a bid</a>
                </div>
              </article>
            </div>
          </div>

          <div className="marketplace-partners" aria-label="Supported marketplaces and partners">
            <span>PayPal</span><span>coinbase</span><span>◇ BINANCE</span><span>Revolut</span>
            <span>╳ EXODUS</span><span>BITFINEX◢</span><span>◈ Blockchain</span>
          </div>

          <section className="marketplace-section" id="popular">
            <h3>Popular this week</h3>
            <div className="artwork-track">
              {marketplaceArtworks.map((artwork) => (
                <article className={`artwork-card ${artwork.tone}`} key={artwork.title}>
                  <img
                    src={`https://images.unsplash.com/${artwork.image}?auto=format&fit=crop&w=600&q=80`}
                    alt={`${artwork.title} digital artwork`}
                    loading="lazy"
                  />
                  <div className="artwork-details">
                    <div><h4>{artwork.title}</h4><p>by {artwork.artist}</p></div>
                    <span>{artwork.price}</span>
                    <small aria-label="50 favorites">♥ 50k</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="marketplace-section seller-section" id="sellers">
            <h3>Top Sellers</h3>
            <div className="seller-grid">
              {marketplaceSellers.map((seller, index) => (
                <article className="seller-card" key={seller.name}>
                  <span className="seller-rank">0{index + 1}</span>
                  <img
                    src={`https://images.unsplash.com/${seller.image}?auto=format&fit=crop&w=112&q=80`}
                    alt=""
                    loading="lazy"
                  />
                  <div><h4>{seller.name}</h4><p>{seller.volume} Eth</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="marketplace-section categories-section" id="categories">
            <h3>Explore Artworks</h3>
            <div className="category-grid">
              {marketplaceCategories.map((category) => (
                <a className="category-card" href="#popular" key={category.name}>
                  <img
                    src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=640&q=80`}
                    alt=""
                    loading="lazy"
                  />
                  <span>{category.name}</span><small>{category.count} items</small>
                </a>
              ))}
            </div>
          </section>

          <section className="marketplace-join" id="marketplace-join">
            <h3>Join Us to Create, Sell and<br />Collect NFTs Digital Art</h3>
            <a className="marketplace-button" href="/contact">Join Community</a>
          </section>
          <footer className="marketplace-footer">
            <div className="marketplace-footer-about">
              <a className="marketplace-brand" href="#marketplace">PLAY <span>NFT</span></a>
              <p>The world’s largest digital marketplace for crypto collections and non-fungible tokens. Buy, sell and discover exclusive digital assets.</p>
            </div>
            <div><strong>Explore</strong><a href="#categories">Art</a><a href="#categories">Photography</a><a href="#categories">Music</a></div>
            <div><strong>My Account</strong><a href="#marketplace-join">My Profile</a><a href="#marketplace-join">My Collections</a><a href="#marketplace-join">My Favorites</a></div>
            <div><strong>Resources</strong><a href="#marketplace-join">Help Center</a><a href="#marketplace-join">Partners</a><a href="#marketplace-join">Suggestions</a></div>
            <div><strong>Company</strong><a href="#about">About</a><a href="#contact">Careers</a><a href="#sellers">Activity</a></div>
          </footer>
        </section>

        <section className="intro reveal" id="about">
          <p className="eyebrow">The studio</p>
          <h2>
            We build the kind of work that turns curiosity into momentum and momentum into market share.
          </h2>
          <div className="intro-columns">
            <p>
              Anti Studio blends brand strategy, digital product design, and motion direction into one premium creative system.
            </p>
            <p>
              The result is a visual language that feels elevated in the room and unforgettable on the scroll.
            </p>
          </div>
        </section>

        <section className="capabilities reveal" aria-label="Core capabilities">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h3>Creative systems shaped for the next era of growth.</h3>
          </div>

          <div className="card-grid">
            {capabilities.map((item) => (
              <article key={item.title} className="feature-card card-float">
                <span className="feature-index">0{capabilities.indexOf(item) + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="horizontal-section" id="work">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected work</p>
            <h3>Campaigns engineered to feel cinematic at every touchpoint.</h3>
          </div>

          <div className="showcase-window">
            <div className="showcase-track">
              {[...projectCards, ...projectCards].map((project, index) => (
                <article key={`${project.name}-${index}`} className="showcase-card">
                  <div className={`showcase-visual ${project.accent}`} aria-hidden="true">
                    <span>Launch</span>
                  </div>
                  <div className="showcase-copy">
                    <p>{project.category}</p>
                    <h4>{project.name}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story-section" id="process">
          <div className="story-intro reveal">
            <p className="eyebrow">Our process</p>
            <h3>Built to feel like a launch campaign, not a template.</h3>
          </div>

          <div className="story-layout">
            <div className="story-visual">
              <div className="visual-stage">
                <div className="stage-glow" aria-hidden="true" />
                <div className="stage-card">
                  <span>Creative direction</span>
                  <strong>From signal to system</strong>
                </div>
              </div>
            </div>

            <div className="story-copy-stack">
              {storySteps.map((step) => (
                <article key={step.index} className="story-panel">
                  <span className="story-index">{step.index}</span>
                  <h4>{step.title}</h4>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="stats reveal" aria-label="Key statistics">
          {numbers.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value" data-target={stat.value} data-suffix={stat.suffix}>
                0{stat.suffix}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="portfolio reveal" id="portfolio">
          <div className="section-heading">
            <p className="eyebrow">Portfolio</p>
            <h3>Design systems, launches, and digital experiences with presence.</h3>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <article key={item.title} className="portfolio-item" style={{ backgroundImage: item.image }}>
                <div className="portfolio-overlay" aria-hidden="true" />
                <div className="portfolio-copy">
                  <p>{item.type}</p>
                  <h4>{item.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta reveal" id="contact">
          <p className="eyebrow">Let’s build your next signal</p>
          <h2>Ready to turn your next launch into a category-defining moment?</h2>
          <div className="cta-actions">
            <a className="primary-button" href="mailto:krishnaanilkumar.work@gmail.com">
              krishnaanilkumar.work@gmail.com
            </a>
            <Link className="secondary-button" to="/contact">
              Contact
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand">Anti / Studio</div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <p>© 2026 Anti Studio. Crafted for attention.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App
