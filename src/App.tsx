import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bot,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Download,
  Expand,
  Heart,
  Layers3,
  MapPin,
  Menu,
  Minus,
  Moon,
  Move3D,
  Plus,
  Rotate3D,
  Search,
  Sparkles,
  Sun,
  Trees,
  X,
} from 'lucide-react'
import BuildingScene from './components/BuildingScene'
import AiAssistant from './components/AiAssistant'
import FloorPlan from './components/FloorPlan'
import { apartments, formatArea, formatPrice, type Apartment } from './data'

type StoryMode = 'project' | 'location'

function Brand() {
  return (
    <button className="brand" aria-label="SISKIN főoldal">
      <span className="brand-mark">
        <i /><i /><i /><i /><i />
      </span>
      <span className="brand-name">SISKIN</span>
      <span className="brand-tagline">Minőséget építünk</span>
    </button>
  )
}

function ApartmentCard({
  apartment,
  selected,
  favorite,
  onSelect,
  onFavorite,
}: {
  apartment: Apartment
  selected: boolean
  favorite: boolean
  onSelect: () => void
  onFavorite: () => void
}) {
  const score = { a203: 86, b405: 94, c607: 91, p902: 89 }[apartment.id as 'a203']
  return (
    <article className={`apartment-card ${selected ? 'is-selected' : ''}`} style={{ '--accent': apartment.accent } as React.CSSProperties}>
      <button className="card-main" onClick={onSelect}>
        <div className="card-plan"><FloorPlan apartment={apartment} compact /></div>
        <div className="card-info">
          <div className="card-heading">
            <span className="availability"><i /> {apartment.status}</span>
            <span className="ai-score"><Sparkles size={11} /> AI {score}%</span>
          </div>
          <h3>{apartment.name}</h3>
          <div className="card-specs">
            <span><Building2 size={14} /> {apartment.floor}. emelet</span>
            <span><BedDouble size={14} /> {apartment.rooms} szoba</span>
            <span><Expand size={14} /> {formatArea(apartment.area)}</span>
            <span><Compass size={14} /> {apartment.orientation}</span>
          </div>
          <div className="card-price">
            <strong>{formatPrice(apartment.price)}</strong>
            <ChevronRight size={18} />
          </div>
        </div>
      </button>
      <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label="Kedvencekhez adás">
        <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}

function DetailSheet({
  apartment,
  favorite,
  onFavorite,
  onClose,
  onContact,
}: {
  apartment: Apartment
  favorite: boolean
  onFavorite: () => void
  onClose: () => void
  onContact: () => void
}) {
  return (
    <>
      <motion.button
        className="detail-scrim"
        onClick={onClose}
        aria-label="Lakás adatlap bezárása"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      />
      <motion.aside
        className="detail-sheet"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      >
        <div className="detail-topbar">
          <button className="back-button" onClick={onClose}><ArrowLeft size={18} /> Vissza a 3D nézethez</button>
          <div>
            <button className={`icon-button ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label="Kedvenc"><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button>
            <button className="icon-button" onClick={onClose} aria-label="Bezárás"><X size={19} /></button>
          </div>
        </div>
        <div className="detail-scroll">
          <section className="detail-hero">
            <div className="detail-identity">
              <span className="availability"><i /> {apartment.status}</span>
              <h2>{apartment.name}</h2>
              <p>{apartment.short}</p>
            </div>
            <div className="detail-price"><small>Vételár</small><strong>{formatPrice(apartment.price)}</strong><span>bruttó, tájékoztató ár</span></div>
          </section>

          <div className="detail-plan-wrap">
            <span className="section-index">01</span>
            <div className="detail-section-title"><span>Alaprajz</span><button onClick={() => window.print()}><Download size={15} /> Mentés</button></div>
            <FloorPlan apartment={apartment} />
          </div>

          <div className="key-specs">
            <div><Expand size={18} /><span>Nettó terület</span><strong>{formatArea(apartment.area)}</strong></div>
            <div><BedDouble size={18} /><span>Szobák</span><strong>{apartment.rooms}</strong></div>
            <div><Layers3 size={18} /><span>Emelet</span><strong>{apartment.floor}.</strong></div>
            <div><Compass size={18} /><span>Tájolás</span><strong>{apartment.orientation}</strong></div>
          </div>

          <section className="room-list">
            <div className="detail-section-title"><span>Helyiségek</span><small>Összesen {formatArea(apartment.area)}</small></div>
            {apartment.roomsList.map((room) => (
              <div key={room.label}><span>{room.label}</span><strong>{formatArea(room.size)}</strong></div>
            ))}
            <div className="terrace-row"><span>Terasz</span><strong>{formatArea(apartment.terrace)}</strong></div>
          </section>

          <section className="ai-detail-card">
            <div className="ai-detail-icon"><Sparkles size={20} /></div>
            <div>
              <span className="eyebrow">AI OTTHONPROFIL</span>
              <h3>Miért lehet jó választás?</h3>
              <p>A lakás erősségei: {apartment.features.join(', ').toLocaleLowerCase('hu-HU')}. Kérdezd az AI otthonválasztót személyre szabott összevetésért.</p>
            </div>
          </section>
        </div>
        <div className="detail-actions">
          <div><small>Érdekel ez az otthon?</small><strong>{apartment.name} · {formatPrice(apartment.price)}</strong></div>
          <button className="primary-button" onClick={onContact}>Ajánlatot kérek <ArrowUpRight size={17} /></button>
        </div>
      </motion.aside>
    </>
  )
}

function StorySheet({ mode, onMode, onClose }: { mode: StoryMode; onMode: (mode: StoryMode) => void; onClose: () => void }) {
  return (
    <>
      <motion.button className="story-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Bemutató bezárása" />
      <motion.section className="story-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
        <header className="story-header">
          <Brand />
          <div className="story-tabs">
            <button className={mode === 'project' ? 'active' : ''} onClick={() => onMode('project')}>A projektről</button>
            <button className={mode === 'location' ? 'active' : ''} onClick={() => onMode('location')}>Környék</button>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Bezárás"><X size={20} /></button>
        </header>
        <div className="story-grid">
          <div className={`story-visual ${mode}`}>
            <div className="story-caption"><span>Építészeti karakter</span><strong>Természetes vonalak.<br />Emberi lépték.</strong></div>
          </div>
          <div className="story-content">
            <span className="section-index">{mode === 'project' ? '01' : '02'}</span>
            {mode === 'project' ? (
              <>
                <span className="eyebrow">MADÁRHEGY RESIDENCE · KONCEPCIÓ</span>
                <h2>A város ritmusa.<br /><em>A természet nyugalma.</em></h2>
                <p>A Madárhegy Residence egy fiktív, prémium budai társasház koncepciója. Lágyan ívelt erkélyei követik a domboldal vonalát, a nagy üvegfelületek pedig minden otthonba közelebb hozzák a kertet és a fényt.</p>
                <div className="story-stats">
                  <div><strong>2028</strong><span>tervezett átadás</span></div>
                  <div><strong>48</strong><span>egyedi otthon</span></div>
                  <div><strong>AA++</strong><span>energiaosztály</span></div>
                </div>
                <div className="story-values">
                  <div><Trees size={20} /><span><strong>60% zöldfelület</strong>Őshonos növényekkel tervezett belső kert.</span></div>
                  <div><Sun size={20} /><span><strong>Fényre hangolva</strong>Átgondolt tájolás és mély, árnyékoló teraszok.</span></div>
                  <div><Check size={20} /><span><strong>Időtálló minőség</strong>Prémium, visszafogott anyaghasználat.</span></div>
                </div>
              </>
            ) : (
              <>
                <span className="eyebrow">BUDAPEST · XI. KERÜLET</span>
                <h2>Minden közel.<br /><em>Ami igazán számít.</em></h2>
                <p>A budai dombok lábánál, parkok és pezsgő városi terek metszéspontjában. Kerékpárral, villamossal és autóval is jól kapcsolódik a városhoz.</p>
                <div className="location-list">
                  <div><span className="location-dot lime"><Trees size={16} /></span><span><strong>Madárhegyi park</strong>2 perc séta</span><b>02'</b></div>
                  <div><span className="location-dot sage"><Clock3 size={16} /></span><span><strong>Kelenföld vasútállomás</strong>Kerékpárral</span><b>08'</b></div>
                  <div><span className="location-dot clay"><MapPin size={16} /></span><span><strong>Bikás park</strong>Tömegközlekedéssel</span><b>12'</b></div>
                  <div><span className="location-dot violet"><Building2 size={16} /></span><span><strong>Belváros</strong>Autóval</span><b>18'</b></div>
                </div>
                <div className="map-sketch" aria-label="Sematikus környéktérkép">
                  <span className="road r1" /><span className="road r2" /><span className="road r3" />
                  <span className="map-river" />
                  <span className="map-home"><i /> MADÁRHEGY<br />RESIDENCE</span>
                  <span className="map-point p1">Kelenföld</span><span className="map-point p2">Bikás park</span>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.section>
    </>
  )
}

function ContactSheet({ apartment, onClose }: { apartment: Apartment | null; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  return (
    <>
      <motion.button className="contact-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Kapcsolat bezárása" />
      <motion.aside className="contact-sheet" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
        <button className="icon-button contact-close" onClick={onClose} aria-label="Bezárás"><X size={20} /></button>
        {!sent ? (
          <>
            <span className="eyebrow">KAPCSOLAT</span>
            <h2>Beszélgessünk<br />az új otthonodról.</h2>
            <p>{apartment ? `A ${apartment.name} lakással kapcsolatban` : 'A Madárhegy Residence otthonaival kapcsolatban'} munkatársunk egy munkanapon belül felveszi veled a kapcsolatot.</p>
            <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
              <label>Név<input required placeholder="Teljes név" /></label>
              <div className="form-row">
                <label>E-mail<input required type="email" placeholder="nev@email.hu" /></label>
                <label>Telefonszám<input required type="tel" placeholder="+36 30 123 4567" /></label>
              </div>
              <label>Üzenet<textarea defaultValue={apartment ? `Érdeklődöm a ${apartment.name} lakás iránt.` : 'Szeretnék többet megtudni a projektről.'} /></label>
              <label className="privacy"><input required type="checkbox" /><span>Elfogadom az adatkezelési tájékoztatót.</span></label>
              <button className="primary-button" type="submit">Visszahívást kérek <ArrowUpRight size={17} /></button>
            </form>
          </>
        ) : (
          <div className="contact-success">
            <span><Check size={28} /></span>
            <h2>Köszönjük!</h2>
            <p>Megkaptuk az érdeklődésed. Hamarosan jelentkezünk a megadott elérhetőségek egyikén.</p>
            <button className="secondary-button" onClick={onClose}>Vissza a 3D nézethez</button>
          </div>
        )}
      </motion.aside>
    </>
  )
}

export default function App() {
  const [selected, setSelected] = useState<Apartment | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [night, setNight] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [sunHour, setSunHour] = useState(14)
  const [roomFilter, setRoomFilter] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [storyMode, setStoryMode] = useState<StoryMode | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [inventoryMobileOpen, setInventoryMobileOpen] = useState(false)

  const filteredApartments = useMemo(
    () => roomFilter ? apartments.filter((apartment) => apartment.rooms === roomFilter) : apartments,
    [roomFilter],
  )

  const chooseApartment = (apartment: Apartment, openDetail = true) => {
    setSelected(apartment)
    setAutoRotate(false)
    setInventoryMobileOpen(false)
    if (openDetail) setDetailOpen(true)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const openFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
    else await document.exitFullscreen?.()
  }

  return (
    <div className={`app-shell ${night ? 'is-night' : ''}`}>
      <header className="main-header">
        <Brand />
        <nav className="main-nav" aria-label="Fő navigáció">
          <button onClick={() => setStoryMode('project')}>A projekt</button>
          <button className="active">3D lakásválasztó <span>04</span></button>
          <button onClick={() => setStoryMode('location')}>Környék</button>
        </nav>
        <div className="header-actions">
          <button className="favorite-summary"><Heart size={17} /> <span>Kedvencek</span><b>{favorites.length}</b></button>
          <button className="contact-button" onClick={() => setContactOpen(true)}>Kapcsolat <ArrowUpRight size={16} /></button>
          <button className="mobile-menu" onClick={() => setInventoryMobileOpen(true)} aria-label="Lakáslista"><Menu size={21} /></button>
        </div>
      </header>

      <main className="experience-layout">
        <section className="scene-stage" aria-label="Interaktív 3D épületnézet">
          <BuildingScene
            apartments={apartments}
            selectedId={selected?.id ?? null}
            onApartmentClick={(apartment) => chooseApartment(apartment)}
            night={night}
            autoRotate={autoRotate}
            sunHour={sunHour}
          />

          <div className="project-intro">
            <span className="eyebrow">BUDAPEST · XI. KERÜLET</span>
            <h1>Madárhegy<br /><em>Residence</em></h1>
            <div className="intro-meta"><span>48 otthon</span><i /><span>2028</span><i /><span>AA++</span></div>
          </div>

          <div className="concept-stamp"><span>KONCEPCIÓ</span><strong>01</strong><small>/ 04</small></div>

          <div className="scene-actions">
            <button className={autoRotate ? 'active' : ''} onClick={() => setAutoRotate((value) => !value)} title="Automatikus forgatás"><Rotate3D size={18} /></button>
            <button onClick={openFullscreen} title="Teljes képernyő"><Expand size={18} /></button>
          </div>

          <div className="day-night-control">
            <button className={!night ? 'active' : ''} onClick={() => setNight(false)}><Sun size={15} /> Nappal</button>
            <button className={night ? 'active' : ''} onClick={() => setNight(true)}><Moon size={15} /> Este</button>
          </div>

          <div className="sun-study">
            <div><Sun size={15} /><span>Fénytanulmány</span><strong>{sunHour}:00</strong></div>
            <input type="range" min="7" max="20" step="1" value={sunHour} onChange={(event) => setSunHour(Number(event.target.value))} aria-label="Napszak" />
          </div>

          <div className="rotation-hint"><Move3D size={17} /><span>Húzd a forgatáshoz</span><small>Görgess a nagyításhoz</small></div>
          <div className="scene-disclaimer">A bemutató fiktív koncepció, nem minősül ajánlattételnek.</div>

          <button className="mobile-inventory-trigger" onClick={() => setInventoryMobileOpen(true)}>
            <span><Search size={17} /> Elérhető lakások</span><b>4</b>
          </button>
        </section>

        <aside className={`inventory-panel ${inventoryMobileOpen ? 'mobile-open' : ''}`}>
          <div className="inventory-mobile-head"><Brand /><button className="icon-button" onClick={() => setInventoryMobileOpen(false)}><X size={19} /></button></div>
          <header className="inventory-header">
            <div>
              <span className="eyebrow">MADÁRHEGY RESIDENCE</span>
              <h2>Elérhető otthonok <b>{filteredApartments.length}</b></h2>
            </div>
            <button className="mini-filter"><Minus size={14} /><Plus size={14} /></button>
          </header>
          <div className="room-filters">
            <span>Szobák</span>
            {[null, 2, 3, 4].map((rooms) => (
              <button key={rooms ?? 'all'} className={roomFilter === rooms ? 'active' : ''} onClick={() => setRoomFilter(rooms)}>{rooms ?? 'Mind'}</button>
            ))}
          </div>
          <div className="inventory-list">
            {filteredApartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                selected={selected?.id === apartment.id}
                favorite={favorites.includes(apartment.id)}
                onSelect={() => chooseApartment(apartment)}
                onFavorite={() => toggleFavorite(apartment.id)}
              />
            ))}
          </div>
          <footer className="inventory-footer">
            <span><i /> 4 elérhető otthon</span>
            <button onClick={() => { setRoomFilter(null); setInventoryMobileOpen(false) }}>Összes mutatása <ArrowUpRight size={15} /></button>
          </footer>
        </aside>
      </main>

      <button className="ai-trigger" onClick={() => setAssistantOpen(true)}>
        <span><Bot size={21} /></span>
        <div><small>ÚJ · AI OTTHONVÁLASZTÓ</small><strong>Segítsek választani?</strong></div>
        <Sparkles size={16} />
      </button>

      <AiAssistant open={assistantOpen} apartments={apartments} onClose={() => setAssistantOpen(false)} onSelect={(apartment) => { setAssistantOpen(false); chooseApartment(apartment) }} />

      <AnimatePresence>
        {detailOpen && selected && (
          <DetailSheet
            key={selected.id}
            apartment={selected}
            favorite={favorites.includes(selected.id)}
            onFavorite={() => toggleFavorite(selected.id)}
            onClose={() => setDetailOpen(false)}
            onContact={() => { setDetailOpen(false); setContactOpen(true) }}
          />
        )}
        {storyMode && <StorySheet mode={storyMode} onMode={setStoryMode} onClose={() => setStoryMode(null)} />}
        {contactOpen && <ContactSheet apartment={selected} onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
