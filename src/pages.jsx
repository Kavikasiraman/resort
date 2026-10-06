import { useEffect, useState } from 'react'
import { Hero, Section, SectionHead, StayGrid, PkgGrid, Ph } from './components'
import { exps, tags, attractions, faqs, stays, pkgs, WA, PHONES } from './data'

function Experiences() {
  return (
    <div className="border-t border-cream/25">
      {exps.map(([t, d]) => (
        <div key={t} className="grid gap-1 border-b border-cream/25 py-6 md:grid-cols-[1fr_2fr] md:gap-6">
          <h3 className="text-2xl text-gold">{t}</h3>
          <p className="opacity-85">{d}</p>
        </div>
      ))}
    </div>
  )
}

// Add your real photos here, one line each. Leave src as null to show a placeholder.
const galleryPhotos = [
  { src: null, label: 'Resort view' },
  { src: null, label: 'Wooden house' },
  { src: null, label: 'Swimming pool' },
  { src: null, label: 'Campfire night' },
  { src: null, label: 'Misty hills' },
  { src: null, label: 'Jeep safari' },
  { src: null, label: 'Family dormitory' },
  { src: null, label: 'Breakfast' },
  { src: null, label: 'Waterfall trip' },
  { src: null, label: 'Evening view' },
  { src: null, label: 'Game room' },
  { src: null, label: 'Guests' },
  { src: null, label: 'Garden' },
  { src: null, label: 'Bonfire music' },
  { src: null, label: 'Sunrise' },
  { src: null, label: 'Dinner' },
  { src: null, label: 'Valley view' },
  { src: null, label: 'Group photo' },
]

function Gallery() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? galleryPhotos : galleryPhotos.slice(0, 6)
  const heights = ['h-44', 'h-64', 'h-52', 'h-72']

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3">
        {visible.map((p, i) => (
          <Ph
            key={p.label}
            src={p.src}
            label={p.label}
            n={i}
            className={`mb-4 w-full rounded-2xl ${p.src ? '' : heights[i % heights.length]}`}
          />
        ))}
      </div>

      {galleryPhotos.length > 6 && (
        <div className="mt-6 text-center">
          <button onClick={() => setShowAll(!showAll)} className="btn btn-ghost !text-forest">
            {showAll ? 'Show less' : `See all ${galleryPhotos.length} photos`}
          </button>
        </div>
      )}
    </>
  )
}
function Book({ pref }) {
  const today = new Date().toISOString().slice(0, 10)
  const [f, setF] = useState({ cin: '', cout: '', adults: 2, kids: 0, room: stays[0].id, pkg: 'No package', exp: [], name: '', phone: '', notes: '' })
  const [err, setErr] = useState('')

  // Pre-select the stay/package when a card button is clicked
  useEffect(() => {
    setF(p => ({ ...p, ...(pref.room && { room: pref.room }), ...(pref.pkg && { pkg: pref.pkg }) }))
  }, [pref])

  const set = k => e => setF({ ...f, [k]: e.target.value })
  const toggle = v => setF({ ...f, exp: f.exp.includes(v) ? f.exp.filter(x => x !== v) : [...f.exp, v] })
  const submit = e => {
    e.preventDefault()
    if (f.cout <= f.cin) return setErr('Check-out must be after check-in.')
    setErr('')
    const t = `Hi Candlewood Resort!\n\nI'd like to check availability.\n\nName: ${f.name}\nPhone: ${f.phone}\nCheck-in: ${f.cin}\nCheck-out: ${f.cout}\nGuests: ${f.adults} adults, ${f.kids} children\nPreferred stay: ${f.room}\nPackage: ${f.pkg}\nExperiences: ${f.exp.join(', ') || 'None'}\nNotes: ${f.notes || 'None'}\n\nPlease share availability and pricing.`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`, '_blank', 'noopener')
  }
  const inp = 'w-full rounded-lg bg-cream p-3 text-forest'
  const L = ({ t, c = '', children }) => <label className={`grid gap-1.5 text-sm ${c}`}>{t}{children}</label>

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-moss p-5 text-cream sm:grid-cols-2 sm:p-8">
      <L t="Check-in"><input required type="date" min={today} value={f.cin} onChange={set('cin')} className={inp} /></L>
      <L t="Check-out"><input required type="date" min={f.cin || today} value={f.cout} onChange={set('cout')} className={inp} /></L>
      <L t="Adults"><input required type="number" min="1" value={f.adults} onChange={set('adults')} className={inp} /></L>
      <L t="Children"><input type="number" min="0" value={f.kids} onChange={set('kids')} className={inp} /></L>
      <L t="Stay">
        <select value={f.room} onChange={set('room')} className={inp}>
          {stays.map(s => <option key={s.id}>{s.id}</option>)}<option>Not sure, need a recommendation</option>
        </select>
      </L>
      <L t="Package">
        <select value={f.pkg} onChange={set('pkg')} className={inp}>
          <option>No package</option>{pkgs.map(p => <option key={p.id}>{p.id}</option>)}
        </select>
      </L>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm">Experiences</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {['Swimming pool', 'Campfire', 'Food', 'Jeep safari'].map(v => (
            <label key={v} className="flex items-center gap-2"><input type="checkbox" checked={f.exp.includes(v)} onChange={() => toggle(v)} />{v}</label>
          ))}
        </div>
      </fieldset>
      <L t="Your name"><input required autoComplete="name" value={f.name} onChange={set('name')} className={inp} /></L>
      <L t="Phone or WhatsApp"><input required type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} className={inp} /></L>
      <L t="Special requests" c="sm:col-span-2"><textarea rows="3" value={f.notes} onChange={set('notes')} className={inp} /></L>
      <div className="sm:col-span-2">
        <button className="btn w-full sm:w-auto">Send enquiry on WhatsApp</button>
        <p role="status" className="mt-2 text-gold">{err}</p>
      </div>
    </form>
  )
}

// Replace these placeholders with real guest reviews (stars: 1 to 5).
const reviews = [
  { name: 'Guest name', stars: 5, text: 'Paste a real guest review here.' },
  { name: 'Guest name', stars: 5, text: 'Paste a real guest review here.' },
  { name: 'Guest name', stars: 5, text: 'Paste a real guest review here.' },
  { name: 'Guest name', stars: 5, text: 'Paste a real guest review here.' },
  { name: 'Guest name', stars: 4, text: 'Paste a real guest review here.' },
  { name: 'Guest name', stars: 5, text: 'Paste a real guest review here.' },
]

function ReviewStrip() {
  return (
    <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden">
      <div className="marquee flex w-max" style={{ animationDuration: '60s' }}>
        {[0, 1].map(h => (
          <div key={h} aria-hidden={h === 1} className="flex shrink-0 gap-4 pr-4">
            {reviews.map((r, n) => (
              <figure key={n} className="w-72 shrink-0 rounded-2xl bg-white p-6 sm:w-80">
                <div className="text-xl tracking-wider text-gold" aria-label={`${r.stars} out of 5 stars`}>
                  {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                </div>
                <blockquote className="mt-3 opacity-90">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-medium">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(null)
  return (
    <div>
      {faqs.map(([q, a], n) => {
        const isOpen = open === n
        return (
          <div key={q} className="border-b border-forest/20">
            <button
              onClick={() => setOpen(isOpen ? null : n)}
              aria-expanded={isOpen}
              aria-controls={`faq-${n}`}
              className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg sm:text-xl"
            >
              {q}
              <span className={`shrink-0 text-2xl text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div
              id={`faq-${n}`}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 opacity-85">{a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export function Home() {
  const [pref, setPref] = useState({})
  return (
    <>
      <Hero />

      <Section id="welcome">
        <h2 className="text-4xl sm:text-5xl">A little escape. A lot of memories.</h2>
        <p className="mt-4 max-w-2xl text-lg opacity-85">Candlewood brings together comfortable stays, nature, food and experiences in the hills of Oothu. Plan a family holiday, a friends' getaway or a group trip, then slow down and breathe in the mountain air.</p>
      </Section>

      <Section id="stay" className="bg-mist">
        <SectionHead title="Your stay, your way" sub="Choose the space that fits your getaway." />
        <StayGrid onPick={setPref} />
      </Section>

      <Section id="experiences" className="bg-forest text-cream">
        <SectionHead title="More than just a stay" sub="Come for the mountains. Stay for the experience." />
        <Experiences />
      </Section>

      <Section id="packages">
        <SectionHead title="Find your perfect getaway" sub="Simple stays and memorable experiences, for every kind of traveller." />
        <PkgGrid onPick={setPref} />
      </Section>

      <Section id="food" className="bg-forest text-cream">
        <SectionHead title="Good food. Good company." sub="Freshly prepared meals after a day of exploring and swimming. Contact us for the current menu and meal packages." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {['Breakfast', 'Lunch', 'Dinner', 'Special requests'].map((t, i) => <Ph key={t} label={t} n={i} className="aspect-square rounded-2xl" />)}
        </div>
      </Section>

      <Section id="gallery">
        <SectionHead title="A glimpse of Candlewood" sub="See the place. Feel the experience." />
        <Gallery />
      </Section>

      <Section id="reviews" className="overflow-hidden bg-mist">
  <h2 className="text-4xl">Our guests say it best</h2>
  <div className="mt-4 font-display text-6xl text-gold sm:text-8xl">4.8 / 5</div>
  <p className="opacity-80">Based on 218+ Google reviews</p>
  <ReviewStrip />
</Section>

      <Section id="location">
  <SectionHead title="Your Kodaikanal escape starts here" sub="Kodaikanal Main Road, Oothu, Kodaikanal, Tamil Nadu 624210" />
  <div className="flex flex-wrap gap-3">
    <a className="btn" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Candlewood+Resort+Oothu+Kodaikanal">Get directions</a>
    <a className="btn btn-ghost" href={`tel:+91${PHONES[0].replace(' ', '')}`}>Call us</a>
  </div>
  <iframe
    title="Candlewood map"
    loading="lazy"
    className="mt-8 h-64 w-full rounded-2xl border-0 sm:h-96"
    src="https://www.google.com/maps?q=Candlewood+Resort+Oothu+Kodaikanal&output=embed"
  />

  <h3 className="mb-6 mt-14 text-3xl sm:text-4xl">Explore Kodaikanal</h3>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
    {attractions.map((a, i) => (
      <figure key={a.name}>
        <Ph src={a.src} label={a.name} n={i} className="aspect-[4/3] w-full rounded-2xl" />
        <figcaption className="mt-2 font-display text-base sm:text-lg">{a.name}</figcaption>
      </figure>
    ))}
  </div>

  <h3 className="mb-4 mt-14 text-3xl sm:text-4xl">Questions</h3>
  <Faq />
</Section>

      <Section id="book" className="bg-forest text-cream">
        <SectionHead title="Plan your Candlewood getaway" sub="We'll confirm availability and send your booking details on WhatsApp." />
        <Book pref={pref} />
      </Section>
    </>
  )
}