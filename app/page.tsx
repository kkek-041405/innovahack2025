import Image from 'next/image'
import NavLink from '@/components/ui/NavLink'
import MobileMenu from '@/components/ui/MobileMenu'
import Timeline from '@/components/ui/Timeline'
import FaqAccordion from '@/components/ui/FaqAccordion'
import Reveal from '@/components/ui/Reveal'
import AuthCta from '@/components/ui/AuthCta'


function CTAButtons() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-blue-600 transition"
        href="https://reskilll.com/hack/agenticindia/register"
        target="_blank"
        rel="noreferrer"
      >
        Register Now
      </a>
      <a
        className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 font-semibold hover:bg-white/10"
        href="#schedule"
      >
        View Schedule
      </a>
    </div>
  )
}

export default function Page() {
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(11,16,32,0.6)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,16,32,0.4)]">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-md transition duration-300 group-hover:scale-105">
              <Image
                src="https://storage.googleapis.com/reskilll/Flux_Dev_Design_a_modern_and_futuristic_logo_for_a_nationallev_1C1hN09e.jpg"
                alt="Agentic India"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <span className="font-bold transition duration-300 group-hover:text-primary">Agentic India 30</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#challenges">Challenges</NavLink>
            <NavLink href="#mentors">Mentors</NavLink>
            <NavLink href="#jury">Jury</NavLink>
            <NavLink href="#schedule">Schedule</NavLink>
            <NavLink href="#prizes">Prizes</NavLink>
            <NavLink href="#partners">Partners</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <a
              className="inline-flex items-center rounded-lg bg-primary px-3 py-2 font-semibold text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300"
              href="https://reskilll.com/hack/agenticindia/register"
              target="_blank"
              rel="noreferrer"
            >
              Register
            </a>
            <AuthCta />
          </nav>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>
      {/* Hero */}
      <section className="pt-16 pb-12">
        <div className="container flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="md:w-3/5">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Agentic India 30
            </h1>
            <p className="mt-4 text-lg text-white/80">
              A one-day, mentor-led sprint to learn in the morning and build AI agents through the day. Use any framework and ship a high-impact solution.
            </p>
            <div className="mt-4 text-white/70">
              <div>Last date to register: Wed Oct 15, 2025</div>
              <div>Anurag University, Hyderabad • Offline • Teams of 2–4 • One Day</div>
            </div>
            <CTAButtons />
          </div>
          <div className="md:w-2/5">
            <Reveal>
              <div className="relative aspect-square w-full">
                <Image
                  src="https://storage.googleapis.com/reskilll/Flux_Dev_Design_a_modern_and_futuristic_logo_for_a_nationallev_1C1hN09e.jpg"
                  alt="Agentic India 30"
                  fill
                  className="object-cover rounded-xl border border-white/10"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About */}
  <section id="about" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="card">
              <p>
                Learn-by-building. A single, focused day with short workshops in the morning, then deep build time to design and ship autonomous or tool-using agents with memory, tool-calling, and collaboration patterns. Use frameworks like Semantic Kernel, AutoGen, Azure AI Agents, LangChain, LlamaIndex, CrewAI, MCP—and connect to real tools/APIs.
              </p>
            </div>
            <ul className="card space-y-2">
              <li>• Teams of 2–4 members</li>
              <li>• Mentors on-site</li>
              <li>• Offline at Anurag University, Hyderabad</li>
              <li>• Demos and pitches on the final day</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Challenges */}
  <section id="challenges" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Challenges</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: 'Agri-Advisory Field Agent',
                desc:
                  'Combines weather, market prices, and disease libraries; plans interventions and outputs a vernacular voice-note summary.',
                img: 'https://storage.googleapis.com/reskilll/AI-in-AgricultureBOFdqZ5.jpg'
              },
              {
                title: 'Civic Services Navigator',
                desc:
                  'Guides citizens through online processes (PAN, DigiLocker, FASTag/Vahan) with tool-calling and step tracking.',
                img: 'https://storage.googleapis.com/reskilll/protective-glass-counters_52683-38361J8s6nBb.jpg'
              },
              {
                title: 'Health Desk Agent for Clinics',
                desc:
                  'Triages symptoms, checks nearby availability, creates referral notes; adds safety rails and human handoff.',
                img: 'https://storage.googleapis.com/reskilll/Multi-Agentovni6Y5.jpg'
              },
              {
                title: 'MSME Ops Co‑Pilot (Multi-Agent)',
                desc:
                  'Automates GST reconciliation, basic bookkeeping, and vendor follow-ups using safe tool-use (email, Sheets, web, SMS/WhatsApp).',
                img: 'https://storage.googleapis.com/reskilll/civic-engagement-concept-icon-participation-public-service-delivery-change-abstract-idea-thin-line-illustration-isolated-outline-drawing-editable-stroke-vectorcwb2tKy.jpg'
              }
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="card hover:shadow-glow">
                  <div className="relative w-full aspect-video mb-3">
                    <Image src={c.img} alt={c.title} fill className="object-cover rounded-lg" />
                  </div>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-1 text-white/80">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
  <section id="schedule" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Schedule</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold mb-4 text-xl">Event Day Schedule</h4>
              <Timeline
                items={[
                  { date: '08:30', title: 'Check-in & breakfast' },
                  { date: '09:30', title: 'Opening & briefing' },
                  { date: '10:00', title: 'Workshops & team formation' },
                  { date: '12:30', title: 'Hacking session begins' },
                  { date: '15:30', title: 'Mentor rounds' },
                  { date: '17:00', title: 'Final pitches' },
                  { date: '18:30', title: 'Results & closing' },
                ]}
              />
            </div>
            <div className="card hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold mb-4 text-xl">Format</h4>
              <div className="space-y-4 text-white/90">
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <h5 className="font-medium">Learn → Build → Pitch</h5>
                  <p className="mt-1 text-sm text-white/70">Short workshops, deep build time, and concise demos.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <h5 className="font-medium">Team size</h5>
                  <p className="mt-1 text-sm text-white/70">Teams of 2–4. Mentors available through the day.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <h5 className="font-medium">Judging</h5>
                  <p className="mt-1 text-sm text-white/70">Innovation, Technical, Impact, UX, Completeness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors */}
  <section id="mentors" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Mentors</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: 'Mentor One', role: 'AI Engineer', img: 'https://i.pravatar.cc/200?img=12' },
              { name: 'Mentor Two', role: 'Product Mentor', img: 'https://i.pravatar.cc/200?img=32' },
              { name: 'Mentor Three', role: 'Startup Mentor', img: 'https://i.pravatar.cc/200?img=22' }
            ].map((m) => (
              <div key={m.name} className="card flex items-center gap-4">
                <Image src={m.img} alt={m.name} width={64} height={64} className="rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-white/70">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jury */}
  <section id="jury" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Jury</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: 'Jury One', role: 'Industry Expert', img: 'https://i.pravatar.cc/200?img=5' },
              { name: 'Jury Two', role: 'Academic Leader', img: 'https://i.pravatar.cc/200?img=15' },
              { name: 'Jury Three', role: 'VC/Operator', img: 'https://i.pravatar.cc/200?img=25' }
            ].map((j) => (
              <div key={j.name} className="card flex items-center gap-4">
                <Image src={j.img} alt={j.name} width={64} height={64} className="rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{j.name}</div>
                  <div className="text-sm text-white/70">{j.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
  <section id="prizes" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Rewards and benefits</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Microsoft Azure branded Bag', tier: 'Winners' },
              { title: 'Microsoft Azure Branded Hoodie', tier: '1st Runner-up' },
              { title: 'Microsoft Azure Branded T‑shirt', tier: '2nd Runner-up' }
            ].map((p) => (
              <Reveal key={p.title}>
                <div className="card">
                  <div className="flex items-center gap-3">
                    <Image src="https://reskilll.com/hackpage/dist/img/fourth.svg" alt="prize" width={56} height={56} />
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-white/70 text-sm">{p.tier}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
  <section id="partners" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
            {[
              'https://storage.googleapis.com/reskilll/anurag-logo-2L5ZZFsO.png',
              'https://storage.googleapis.com/reskilll/Group%2013923LC6ub0avxMePYU.png'
            ].map((src, i) => (
              <Reveal key={i}>
                <div className="card flex items-center justify-center p-6">
                  <Image src={src} alt={`partner-${i}`} width={200} height={80} className="object-contain" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
  <section id="faq" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">FAQ</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Who can participate?',
                a: 'Students and professionals in teams of 2–4. Basic familiarity with AI tooling helps, but workshops on Day 1 will get you started.'
              },
              {
                q: 'What tech stack can we use?',
                a: 'Any agent framework is welcome—Semantic Kernel, AutoGen, Azure AI Agents, LangChain, LlamaIndex, CrewAI, MCP—and real tools/APIs.'
              },
              {
                q: 'Is this an offline event?',
                a: 'Yes, it is hosted at Anurag University, Hyderabad.'
              }
            ].map((f) => (
              <FaqAccordion key={f.q} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-white/70">
          <div>© 2025 Agentic India Hackathon</div>
          <div className="flex gap-4">
            <a href="https://twitter.com/reskilll" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://www.linkedin.com/company/reskilll/mycompany/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.youtube.com/c/ReskilllTechnologies" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
