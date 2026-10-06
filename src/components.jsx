import { useEffect, useState } from 'react'
import { stays, pkgs, PHONES, WA } from './data'

const links = [
  ['Stay', '#stay'], ['Experiences', '#experiences'], ['Packages', '#packages'],
  ['Food', '#food'], ['Gallery', '#gallery'], ['Testimonials', '#reviews'], ['Location', '#location'],
]
const tones = [['#2f5a44', '#14281f'], ['#6b7f4f', '#1f3d2e'], ['#8a7a4a', '#2a3d2f'], ['#3f6a6a', '#14281f'], ['#5a4a35', '#1f3d2e'], ['#4d6b3a', '#14281f']]

// Photo placeholder. Pass `src` and it becomes a real image.
export function Ph({ src, label = '', n = 0, className = '' }) {
  if (src) return <img src={src} alt={label} loading="lazy" className={`object-cover ${className}`} />
  const [a, b] = tones[n % tones.length]
  return (
    <div className={`grid place-items-center text-sm text-cream/80 ${className}`} style={{ background: `linear-gradient(135deg,${a},${b})` }}>
      {label}
    </div>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const cls = 'py-2 transition hover:text-gold'
  return (
    <header className="sticky top-0 z-40 bg-forest/95 pt-[env(safe-area-inset-top)] text-cream backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="font-display text-xl font-semibold tracking-wide">Candlewood</a>
        <nav className="hidden gap-6 text-sm xl:flex">
          {links.map(([t, h]) => <a key={h} href={h} className={cls}>{t}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#book" className="btn !px-4 !py-2 text-sm sm:!px-5">Book your stay</a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-cream/40 xl:hidden"
            aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <nav className="grid grid-cols-2 gap-x-4 border-t border-cream/15 px-5 pb-4 sm:grid-cols-3 xl:hidden">
          {links.map(([t, h]) => <a key={h} href={h} className={cls} onClick={() => setOpen(false)}>{t}</a>)}
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-forest px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-14 text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h3 className="text-xl text-gold">Candlewood Resort</h3>
          <p className="mt-2 max-w-sm opacity-80">Where the mist meets the mountains. Kodaikanal Main Road, Oothu, Kodaikanal, Tamil Nadu 624210</p>
        </div>
        <div>
          <h3 className="text-gold">Explore</h3>
          {links.map(([t, h]) => <a key={h} href={h} className="block py-0.5 opacity-80 hover:opacity-100">{t}</a>)}
        </div>
        <div>
          <h3 className="text-gold">Contact</h3>
          {PHONES.map(p => <a key={p} href={`tel:+91${p.replace(' ', '')}`} className="block py-0.5 opacity-80">{p}</a>)}
          <a href={`https://wa.me/${WA}`} className="block py-0.5 opacity-80">WhatsApp</a>
          <a href="#" className="block py-0.5 opacity-80">Instagram</a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-sm opacity-60">© 2026 Candlewood Resort. Privacy Policy | Terms | Cancellation Policy</p>
    </footer>
  )
}

export const Section = ({ id, className = '', children }) => (
  <section id={id} className={`px-5 py-16 sm:py-24 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
)

export const SectionHead = ({ title, sub }) => (
  <div className="mb-10">
    <h2 className="text-4xl sm:text-5xl">{title}</h2>
    {sub && <p className="mt-3 max-w-xl text-lg opacity-80">{sub}</p>}
  </div>
)

export function StayGrid({ onPick }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stays.map((s, i) => (
        <article key={s.id} className="flex flex-col overflow-hidden rounded-2xl bg-white">
          <Ph src={s.img} label={s.id} n={i} className="h-48 w-full sm:h-56" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-2xl">{s.id}</h3>
            <p className="opacity-80">{s.desc}</p>
            <a href="#book" onClick={() => onPick({ room: s.id })} className="btn mt-auto self-start !py-2 text-sm">Check availability</a>
          </div>
        </article>
      ))}
    </div>
  )
}

export function PkgGrid({ onPick }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {pkgs.map(p => (
        <div key={p.id} className={`flex flex-col gap-3 rounded-2xl p-6 ${p.hl ? 'bg-forest text-cream' : 'bg-mist'}`}>
          <h3 className="text-2xl">{p.title}</h3>
          {p.price && <div className="font-display text-2xl text-gold">{p.price}</div>}
          <p className="opacity-85">{p.note}</p>
          {p.items && <ul className="list-disc pl-5">{p.items.map(x => <li key={x}>{x}</li>)}</ul>}
          <a href="#book" onClick={() => onPick({ pkg: p.id })} className="btn mt-auto self-start !py-2 text-sm">{p.cta}</a>
        </div>
      ))}
    </div>
  )
}

// Replace `src` values with real photos; placeholders move the same way.
const heroSlides = [
  { label: 'Resort view', src: null }, { label: 'Wooden house', src: null }, { label: 'Swimming pool', src: null },
  { label: 'Campfire night', src: null }, { label: 'Misty hills', src: null }, { label: 'Jeep safari', src: null },
]

export function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchX, setTouchX] = useState(null)
  const total = heroSlides.length
  const go = n => setI((n + total) % total)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI(x => (x + 1) % total), 5000)
    return () => clearInterval(t)
  }, [paused, total])

  const onTouchEnd = e => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1)
    setTouchX(null)
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-forest text-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => setTouchX(e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      {/* Sliding background carousel */}
      <div
        className="absolute inset-0 flex transition-transform duration-[900ms] ease-in-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {heroSlides.map((s, n) => (
          <div key={s.label} aria-hidden={n !== i} className="h-full w-full shrink-0 overflow-hidden">
            <Ph src={s.src} label="" n={n} className={`h-full w-full ${n === i ? 'kb' : ''}`} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/30" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-16 sm:pb-28 sm:pt-24">
        <h1 className="max-w-[14ch] text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Where the mist meets the mountains
        </h1>
        <p className="mt-4 max-w-md text-base opacity-90 sm:text-lg">
          A peaceful nature escape in Oothu, Kodaikanal. Stay in the hills, swim, gather round the campfire and make memories.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#book" className="btn">Book your stay</a>
          <a href="#stay" className="btn btn-ghost">Explore stays</a>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {heroSlides.map((s, n) => (
              <button
                key={s.label}
                aria-label={`Show ${s.label}`}
                onClick={() => go(n)}
                className={`h-1.5 rounded-full transition-all ${n === i ? 'w-8 bg-gold' : 'w-3 bg-cream/50'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous photo" onClick={() => go(i - 1)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-cream/50 transition hover:bg-white/10">←</button>
            <button aria-label="Next photo" onClick={() => go(i + 1)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-cream/50 transition hover:bg-white/10">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}