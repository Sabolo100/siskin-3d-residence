import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Bot, ChevronRight, Send, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Apartment } from '../data'
import { formatPrice } from '../data'

type AssistantProps = {
  open: boolean
  apartments: Apartment[]
  onClose: () => void
  onSelect: (apartment: Apartment) => void
}

type Message = {
  id: number
  role: 'assistant' | 'user'
  text: string
  matches?: { id: string; score: number; reason: string }[]
}

const suggestions = [
  'Ketten költöznénk, sokat dolgozunk otthonról',
  'Családi lakást keresek 160 millió alatt',
  'Melyik a legnaposabb, nagy teraszos otthon?',
]

function getRecommendation(query: string, apartments: Apartment[]): Message {
  const normalized = query.toLocaleLowerCase('hu-HU')
  const family = /család|gyerek|gyermek|baba/.test(normalized)
  const office = /otthonról|home office|dolgozó|munka/.test(normalized)
  const terrace = /terasz|erkély|kint|szabad/.test(normalized)
  const sunny = /napos|napfény|világos|déli/.test(normalized)
  const panorama = /panoráma|kilátás|magas|felső/.test(normalized)
  const compact = /egyedül|első lakás|kompakt|kisebb/.test(normalized)
  const finance = /hitel|törleszt|önerő|finansz/.test(normalized)
  const budgetMatch = normalized.match(/(\d{2,3}(?:[,.]\d+)?)\s*(?:m|millió)/)
  const budget = budgetMatch ? Number(budgetMatch[1].replace(',', '.')) : null

  const ranked = apartments
    .map((apartment) => {
      let score = 67
      const reasons: string[] = []

      if (budget !== null) {
        if (apartment.price <= budget) {
          score += 18
          reasons.push('belefér a megadott keretbe')
        } else {
          score -= Math.min(30, (apartment.price - budget) * 0.8)
        }
      }
      if (family) {
        score += apartment.rooms >= 4 ? 22 : apartment.rooms === 3 ? 10 : -18
        if (apartment.rooms >= 4) reasons.push(`${apartment.rooms} jól szeparálható szoba`)
      }
      if (office) {
        score += apartment.rooms >= 3 ? 15 : -9
        if (apartment.rooms >= 3) reasons.push('külön dolgozószoba alakítható ki')
      }
      if (terrace) {
        score += Math.min(20, apartment.terrace * 0.6)
        if (apartment.terrace >= 20) reasons.push(`${apartment.terrace.toFixed(1).replace('.', ',')} m²-es terasz`)
      }
      if (sunny) {
        score += apartment.orientation.includes('D') ? 18 : 2
        if (apartment.orientation.includes('D')) reasons.push('kedvező déli tájolás')
      }
      if (panorama) {
        score += apartment.floor * 2.3
        if (apartment.floor >= 6) reasons.push('magas emeleti panoráma')
      }
      if (compact) {
        score += apartment.area < 65 ? 22 : -10
        if (apartment.area < 65) reasons.push('jól kihasznált, kompakt alaprajz')
      }
      if (!family && !office && !terrace && !sunny && !panorama && !compact && budget === null) {
        score += apartment.id === 'b405' ? 16 : 0
        reasons.push('kiegyensúlyozott ár–érték arány')
      }

      return {
        id: apartment.id,
        score: Math.max(52, Math.min(98, Math.round(score))),
        reason: reasons.slice(0, 2).join(' és ') || 'rugalmasan alakítható, élhető elrendezés',
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)

  const best = apartments.find((apartment) => apartment.id === ranked[0].id)!
  const financeText = finance
    ? ` A ${best.name} becsült havi törlesztője 30% önerő és 20 éves futamidő mellett körülbelül ${Math.round((best.price * 0.7 * 0.00746) * 10) / 10} M Ft/hó. Ez tájékoztató számítás.`
    : ''

  return {
    id: Date.now() + 1,
    role: 'assistant',
    text: `A leírtak alapján a ${best.name} illik legjobban hozzátok. ${best.short}${financeText}`,
    matches: ranked,
  }
}

export default function AiAssistant({ open, apartments, onClose, onSelect }: AssistantProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Szia! Írd le pár szóban, kikkel költöznél, mi fontos az otthonban és mekkora keretben gondolkodsz. Összevetem a lakásokat.',
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const latestMatches = useMemo(
    () => [...messages].reverse().find((message) => message.matches)?.matches,
    [messages],
  )

  const submitQuery = (query: string) => {
    const value = query.trim()
    if (!value) return
    const userMessage: Message = { id: Date.now(), role: 'user', text: value }
    const response = getRecommendation(value, apartments)
    setMessages((current) => [...current, userMessage, response])
    setInput('')
    window.setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 80)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitQuery(input)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="assistant-scrim"
            aria-label="AI asszisztens bezárása"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="assistant-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            aria-label="SISKIN AI otthonválasztó"
          >
            <header className="assistant-header">
              <div className="assistant-avatar"><Bot size={21} /></div>
              <div>
                <span className="eyebrow">SISKIN AI</span>
                <h2>Otthonválasztó</h2>
              </div>
              <button className="icon-button dark" onClick={onClose} aria-label="Bezárás"><X size={19} /></button>
            </header>

            <div className="assistant-status"><span /> 4 lakás adatait elemzem valós időben</div>

            <div className="chat-stream" ref={scrollRef}>
              {messages.map((message) => (
                <div key={message.id} className={`chat-message ${message.role}`}>
                  {message.role === 'assistant' && <Sparkles size={14} />}
                  <p>{message.text}</p>
                  {message.matches && (
                    <div className="ai-matches">
                      {message.matches.map((match) => {
                        const apartment = apartments.find((item) => item.id === match.id)!
                        return (
                          <button key={match.id} className="ai-match" onClick={() => onSelect(apartment)}>
                            <span className="match-score">{match.score}%</span>
                            <span>
                              <strong>{apartment.name}</strong>
                              <small>{apartment.rooms} szoba · {apartment.area.toFixed(1).replace('.', ',')} m² · {formatPrice(apartment.price)}</small>
                              <em>{match.reason}</em>
                            </span>
                            <ChevronRight size={17} />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}

              {!latestMatches && (
                <div className="prompt-suggestions">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} onClick={() => submitQuery(suggestion)}>{suggestion}</button>
                  ))}
                </div>
              )}
            </div>

            <form className="assistant-input" onSubmit={onSubmit}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Pl. 3 szoba, sok fény, 130 M alatt…"
                aria-label="Kérdés az AI otthonválasztónak"
              />
              <button type="submit" aria-label="Küldés" disabled={!input.trim()}><Send size={18} /></button>
            </form>
            <p className="assistant-disclaimer">Az AI-ajánlás tájékoztató jellegű, nem minősül pénzügyi tanácsadásnak.</p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
