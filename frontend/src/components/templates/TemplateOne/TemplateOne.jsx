import { useEffect, useRef, useState } from 'react'
import './TemplateOne.css'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const gsapScriptUrl = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js'
const scrollTriggerScriptUrl =
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'

const navigationItems = [
  { href: '#logistics', label: 'Travel Logistics' },
  { href: '#registry', label: 'Registry' },
  { href: '#faq', label: 'FAQ' },
]

const galleryImages = {
  hero: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz2fibmZFc8ORbaoI8wusM9o7OGX9B0tPO3_KY5YQ9rne3D37wdpfiNT2au3TSCzR0MnlAJvcpQULU7wbKmbV9RAHp1V-2f32PvfSsFeU6M6hqxZxt-cUZboV1dQnmZJwDJTYdD_5HMEXI6dyjxbbXV2vuMCeFQcYHfRsDo2g734yfLhXzGB8x6gGddrRdnQmNqhg4HZ4j5WhNZgectHey9pLLwkRcXE426nXLJLPYt6LJBY79vc8l-VdTJTunlPNHm45QBzvQvYyh',
    alt: 'Jim and Pam on a mountain proposal overlook',
  },
  beach: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALVuQSAUsB__YUdrvuuJmHUrhjKGT_Ev9N3evFmFNze6wRfDRBTt1oIi8FjDCKuo6-SxPmpoV-Zj3kG49d50EZw3ck9CF6lu7T9-rROomYpjO8Ej8HjQsL14anh-V1i-Z4S9iawreBOYlgeTcCDGnmZuO4lBcx1ub_ZkMLQ4G6qOWaS80NH4EESQcir3DYJacT1-2k7-edx31CzbQbwUMkUyCdfN3gLC9TDYlJ4VkZzHUzy9w9UewXlNLAfFFx1b200PAW3gZwsrWx',
    alt: 'Jim and Pam at the beach during sunset',
  },
  hiking: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ny6CyOZKzlvRbm1iAifbSHOFMP0zurJNVX2poMYo_lw299zkZsayKFzP31jwMmt89p4nu7MDL1F8rdupKjnKCN1t5jiKGftPs903jD2YjmQB98xn0rpJP-gFvwwPldBbxiUY5b-yuxbfiGh52eiJLq9CRJZ6n0Uyd4GnT7inhg0AQl0inH4hP6Y8GLFDZYTn_ddQLLKr6pLAhICfis6k_sJHoidxuTpLwkFTXrp4DbI2sY-_iwNLAK5r0UFVVn7sK83jhLNm8l0R',
    alt: 'Hiking boots point of view on a trail',
  },
  coast: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8CazCrcZ3qRknEBY-dhULogN-HIAzhGit1XSEq7sFFnTvhBFWo9y420DzXSSml4yLgrVqpGiAUw4e0Flfg8zxQttLyVEJTBjDAS4vpamS6HbdY7xAfV1P0yxwnCarV9uDS-jqwkMxQ4ooLTbzFvX4SPnRa1Ys-pEef8wpj5cpaypwLOKy0NQDtGInca7IjhKdZbsNT-VZrkHlb9NRcTWV0l4NMSX-FTBpRsbmx7aoqkwMVJZB2i_padntyxyEc3COheOS_aDGmLrC',
    alt: 'Rocky coastline with ocean waves',
  },
  dance: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIAdlHYRL3Ln7yoaqEnkX3E5QHhM04MfMi2xRaWDQn2cIpZ3CLhaASsOYh8Zo2aIGkM5aNBe9qFKISLyMIHC6UMfHcoVa-1vsbTfdZLNZIz_KO7tXKmUJKFfERr4RxvjaA6xihTSTuiNoCcec3O7S_T4q3dxy7GCvBWcjYljDnv4_YpULMow_hIUBVGvNFCyx0chupBgD9XpR2pflK-zW7I4NMzYUUX8eypaE0FHKYgbwAW0QzFgt23anOIf8o-WYriUgm9iMWA_Au',
    alt: 'Black and white portrait of a dancing couple',
  },
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`)

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        resolve()
      },
      { once: true },
    )
    script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), {
      once: true,
    })
    document.body.appendChild(script)
  })
}

function TemplateOne({ data, guestName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sceneRef = useRef(null)
  const weddingDate = dateFormatter.format(new Date(data.weddingDate))
  const displayCoupleName = 'Jim & Pam'
  const displayInitials = 'J&P'

  useEffect(() => {
    let isActive = true
    let mediaMatcher

    const initializeAnimation = async () => {
      try {
        await loadScript(gsapScriptUrl)
        await loadScript(scrollTriggerScriptUrl)
      } catch {
        return
      }

      if (!isActive || !sceneRef.current || !window.gsap || !window.ScrollTrigger) {
        return
      }

      const { gsap } = window
      const { ScrollTrigger } = window
      const sceneElement = sceneRef.current

      gsap.registerPlugin(ScrollTrigger)

      const setNavState = (solid) => {
        sceneElement
          .querySelector('.template-one__nav')
          ?.classList.toggle('template-one__nav--solid', solid)
      }

      mediaMatcher = gsap.matchMedia()

      mediaMatcher.add('(min-width: 768px)', () => {
        const heroFrame = sceneElement.querySelector('.template-one__hero-frame')
        const centerImage = sceneElement.querySelector('.template-one__hero-frame img')
        const heroLayer = sceneElement.querySelector('.template-one__hero-layer')
        const sceneBackground = sceneElement.querySelector('.template-one__scene-bg')
        const collage = sceneElement.querySelector('.template-one__collage-stage')
        const heroTitle = sceneElement.querySelector('.template-one__hero-title')
        const heroCopy = sceneElement.querySelector('.template-one__hero-copy')
        const scrollLabel = sceneElement.querySelector('.template-one__scroll-tag')
        const leftPhotos = sceneElement.querySelectorAll('[data-side="left"]')
        const rightPhotos = sceneElement.querySelectorAll('[data-side="right"]')
        const allSidePhotos = sceneElement.querySelectorAll('.template-one__photo-card')

        gsap.set(collage, { opacity: 0 })
        gsap.set(heroFrame, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: 'none',
          x: 0,
          y: 0,
          borderRadius: 0,
          padding: 0,
          boxShadow: 'none',
        })
        gsap.set(centerImage, {
          width: '100%',
          height: '100%',
          borderRadius: 0,
        })
        gsap.set(leftPhotos, { xPercent: -120, opacity: 0 })
        gsap.set(rightPhotos, { xPercent: 120, opacity: 0 })
        gsap.set(allSidePhotos, { y: 32 })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sceneElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.1,
          },
        })

        timeline
          .to(
            heroFrame,
            {
              top: '50%',
              left: '50%',
              width: '100%',
              maxWidth: '860px',
              height: 'auto',
              aspectRatio: '16 / 9',
              x: '-50%',
              y: '-50%',
              borderRadius: 20,
              padding: 12,
              boxShadow: '0 34px 82px rgba(0, 0, 0, 0.18)',
              ease: 'power2.inOut',
              duration: 0.3,
            },
            0.3,
          )
          .to(
            centerImage,
            {
              borderRadius: 14,
              duration: 0.3,
              ease: 'power2.inOut',
            },
            0.3,
          )
          .to(
            sceneBackground,
            {
              backgroundColor: '#f5f0eb',
              duration: 0.3,
              ease: 'power1.inOut',
            },
            0.3,
          )
          .to(
            heroLayer,
            {
              opacity: 0,
              duration: 0.3,
              ease: 'power1.inOut',
            },
            0.32,
          )
          .to(
            collage,
            {
              opacity: 1,
              duration: 0.24,
            },
            0.34,
          )
          .to(
            heroTitle,
            {
              color: 'rgba(0, 0, 0, 0.08)',
              textShadow: '0 0 0 rgba(0, 0, 0, 0)',
              scale: 0.92,
              yPercent: 6,
              duration: 0.3,
              ease: 'power2.inOut',
            },
            0.3,
          )
          .to(
            heroCopy,
            {
              yPercent: 4,
              duration: 0.3,
              ease: 'power2.inOut',
            },
            0.3,
          )
          .to(
            scrollLabel,
            {
              opacity: 0,
              duration: 0.16,
            },
            0.28,
          )
          .to(
            leftPhotos[0],
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.18,
              ease: 'power2.out',
            },
            0.42,
          )
          .to(
            rightPhotos[0],
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.18,
              ease: 'power2.out',
            },
            0.46,
          )
          .to(
            leftPhotos[1],
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.18,
              ease: 'power2.out',
            },
            0.54,
          )
          .to(
            rightPhotos[1],
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.18,
              ease: 'power2.out',
            },
            0.58,
          )
          .to(
            allSidePhotos,
            {
              y: 0,
              duration: 0.16,
              stagger: 0.03,
              ease: 'power1.out',
            },
            0.68,
          )

        const navTrigger = ScrollTrigger.create({
          trigger: sceneElement,
          start: 'top top',
          end: '+=35%',
          scrub: true,
          onUpdate: (self) => setNavState(self.progress > 0.8),
        })

        return () => {
          navTrigger.kill()
        }
      })

      mediaMatcher.add('(max-width: 767px)', () => {
        setNavState(true)
      })
    }

    initializeAnimation()

    return () => {
      isActive = false
      if (mediaMatcher) {
        mediaMatcher.revert()
      }
    }
  }, [])

  return (
    <article className="template-one">
      <header className="template-one__nav">
        <a className="template-one__brand" href="#hero">
          {displayInitials}
        </a>

        <button
          type="button"
          className="template-one__menu-button"
          aria-expanded={isMenuOpen}
          aria-label="Open navigation"
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`template-one__nav-panel ${isMenuOpen ? 'template-one__nav-panel--open' : ''}`}
        >
          <nav className="template-one__nav-links">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="template-one__nav-cta" href="#faq" onClick={() => setIsMenuOpen(false)}>
            Submit RSVP
          </a>
        </div>
      </header>

      <section className="template-one__cinema template-one__section" id="hero" ref={sceneRef}>
        <div className="template-one__sticky">
          <div className="template-one__scene-bg" />

          <div className="template-one__hero-layer">
            <img src={galleryImages.hero.src} alt={galleryImages.hero.alt} />
            <div className="template-one__hero-overlay" />
          </div>

          <div className="template-one__hero-copy">
            <span className="template-one__hero-rule" />
            <h1 className="template-one__hero-title">{displayCoupleName}</h1>
          </div>

          <span className="template-one__scroll-tag">Scroll To Explore</span>

          <div className="template-one__collage-stage">
            <div className="template-one__watermark">Jim &amp; Pam</div>

            <div className="template-one__collage-grid">
              <div className="template-one__side-column template-one__side-column--left">
                <figure className="template-one__photo-card template-one__photo-card--left-top" data-side="left">
                  <img src={galleryImages.beach.src} alt={galleryImages.beach.alt} />
                </figure>
                <figure className="template-one__photo-card template-one__photo-card--left-bottom" data-side="left">
                  <img src={galleryImages.hiking.src} alt={galleryImages.hiking.alt} />
                </figure>
              </div>

              <div className="template-one__center-column">
                <div className="template-one__hero-frame">
                  <img src={galleryImages.hero.src} alt={galleryImages.hero.alt} />
                </div>
              </div>

              <div className="template-one__side-column template-one__side-column--right">
                <figure className="template-one__photo-card template-one__photo-card--right-top" data-side="right">
                  <img src={galleryImages.coast.src} alt={galleryImages.coast.alt} />
                </figure>
                <figure className="template-one__photo-card template-one__photo-card--right-bottom" data-side="right">
                  <img src={galleryImages.dance.src} alt={galleryImages.dance.alt} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="template-one__section" id="logistics">
        <div className="template-one__content template-one__event-card reveal">
          <p className="template-one__eyebrow">Travel Logistics</p>
          <h2 className="template-one__section-title">{weddingDate}</h2>
          <p className="template-one__event-detail">{data.weddingTime}</p>
          <p className="template-one__event-location">{data.venue}</p>
        </div>
      </section>

      <section className="template-one__section">
        <div className="template-one__content reveal">
          <div className="template-one__couple-grid">
            <figure className="template-one__portrait-card">
              <img
                src={galleryImages.beach.src}
                alt={galleryImages.beach.alt}
              />
            </figure>
            <figure className="template-one__portrait-card">
              <img
                src={galleryImages.dance.src}
                alt={galleryImages.dance.alt}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="template-one__section">
        <div className="template-one__content reveal">
          <p className="template-one__eyebrow">Our Story</p>
          <h2 className="template-one__section-title">
            Perjalanan yang membawa kami ke hari ini
          </h2>
          <div className="template-one__timeline">
            {data.ourStory.map((storyItem) => (
              <article className="template-one__timeline-item" key={storyItem.year}>
                <span className="template-one__timeline-year">{storyItem.year}</span>
                <div className="template-one__timeline-card">
                  <h3>{storyItem.title}</h3>
                  <p>{storyItem.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="template-one__section" id="registry">
        <div className="template-one__content reveal">
          <p className="template-one__eyebrow">Registry</p>
          <h2 className="template-one__section-title">Doa Restu Anda</h2>
          <p className="template-one__supporting-copy">
            Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.
          </p>
          <p className="template-one__guest-note">Reserved for {guestName}</p>
        </div>
      </section>

      <section className="template-one__section" id="faq">
        <div className="template-one__content reveal">
          <p className="template-one__eyebrow">FAQ</p>
          <h2 className="template-one__section-title">Informasi Singkat</h2>
          <div className="template-one__faq-list">
            <article className="template-one__faq-item">
              <h3>Apakah perlu konfirmasi hadir?</h3>
              <p>Ya, mohon konfirmasi kehadiran agar kami dapat mempersiapkan dengan baik.</p>
            </article>
            <article className="template-one__faq-item">
              <h3>Apakah ada dress code?</h3>
              <p>Kami menyarankan busana formal atau semi-formal dengan warna lembut.</p>
            </article>
          </div>
        </div>
      </section>
    </article>
  )
}

export default TemplateOne
