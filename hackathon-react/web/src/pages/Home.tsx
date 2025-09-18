import { MobileMenu, NavLink, Reveal, Timeline, FaqAccordion, RegistrationForm, Modal } from '../components/ui'
import { useState } from 'react'

function CTAButtons({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-blue-600 transition"
        onClick={onRegisterClick}
      >
        Register Now
      </button>
      <a
        className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 font-semibold hover:bg-white/10"
        href="#schedule"
      >
        View Schedule
      </a>
    </div>
  )
}

export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false)
  const [activeTrack, setActiveTrack] = useState<null | {
    id: string
    title: string
    theme: string
    img: string
    details: JSX.Element
  }>(null)
  // Shared list as mentors and jury are the same
  const mentors = [
    { name: 'Mentor One', role: 'AI Engineer', img: 'https://i.pravatar.cc/200?img=12' },
    { name: 'Mentor Two', role: 'Product Mentor', img: 'https://i.pravatar.cc/200?img=32' },
    { name: 'Mentor Three', role: 'Startup Mentor', img: 'https://i.pravatar.cc/200?img=22' }
  ]
  const tracks = [
    {
      id: 'byte-builders',
      title: '💻 BYTE-BUILDERS (CSE & Allied Branches)',
      theme: 'Power of Technology to Create Smarter Solutions for the Future',
      img: 'https://storage.googleapis.com/reskilll/AI-in-AgricultureBOFdqZ5.jpg',
      preview: 'Theme: Power of Technology to Create Smarter Solutions for the Future. The Byte-Builders track is for CS/IT and allied branches to solve real-world problems using software and computational intelligence.',
      details: (
        <div className="space-y-3 text-white/80">
          <p>
            The Byte-Builders track is designed for participants from Computer Science, IT, and allied branches who are passionate about solving real-world problems using software and computational intelligence.
          </p>
          <p className="font-semibold text-white">Participants will get the opportunity to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Build innovative applications using cutting-edge technologies like AI, Machine Learning, Blockchain, IoT, and Cloud Computing.</li>
            <li>Work on challenges ranging from smart automation to digital transformation.</li>
            <li>Showcase their problem-solving skills, coding expertise, and teamwork.</li>
          </ul>
          <p className="pt-2">👉 If you’re a tech enthusiast who loves building solutions that make life smarter and simpler, this is the right track for you!</p>
        </div>
      ),
    },
    {
      id: 'watt-works',
      title: '⚡ WATT-WORKS (ECE & EEE Branches)',
      theme: 'Future Through Intelligent Energy and Advanced Chip Technologies',
      img: 'https://storage.googleapis.com/reskilll/protective-glass-counters_52683-38361J8s6nBb.jpg',
      preview: 'Theme: Future Through Intelligent Energy and Advanced Chip Technologies. Tailored for ECE/EEE and allied branches, focusing on energy systems and advanced hardware technologies.',
      details: (
        <div className="space-y-3 text-white/80">
          <p>
            The Watt-Works track is tailored for participants from Electronics, Electrical, and allied branches, focusing on futuristic solutions in energy systems and advanced hardware technologies.
          </p>
          <p className="font-semibold text-white">Participants will get the opportunity to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Innovate in the field of renewable energy, efficient power systems, and smart grids.</li>
            <li>Explore VLSI, Embedded Systems, Robotics, and Chip Design.</li>
            <li>Tackle challenges that combine hardware-software integration for the next generation of intelligent systems.</li>
          </ul>
          <p className="pt-2">👉 If you’re passionate about shaping the future of energy and electronics, this is your platform to shine!</p>
        </div>
      ),
    },
  ] as const
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(11,16,32,0.6)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,16,32,0.4)]">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-md transition duration-300 group-hover:scale-105">
              <img
                src="https://storage.googleapis.com/reskilll/Flux_Dev_Design_a_modern_and_futuristic_logo_for_a_nationallev_1C1hN09e.jpg"
                alt="Agentic India"
                className="rounded-md object-cover h-full w-full"
              />
            </div>
            <span className="font-bold transition duration-300 group-hover:text-primary">INNOVA HACK 2025</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#challenges">Tracks</NavLink>
            <NavLink href="#mentors">Mentors</NavLink>
            <NavLink href="#jury">Judges</NavLink>
            <NavLink href="#schedule">Schedule</NavLink>
            <NavLink href="#prizes">Prizes</NavLink>
            <NavLink href="#partners">Partners</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <button
              className="inline-flex items-center rounded-lg bg-primary px-3 py-2 font-semibold text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300"
              onClick={() => setRegisterOpen(true)}
            >
              Register
            </button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu onRegisterClick={() => setRegisterOpen(true)} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12">
        <div className="container flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="md:w-3/5">
            {/* Host logos */}
            <div className="mb-3 flex items-center gap-3 text-white/70">
              <span className="text-xs md:text-sm">Organized by</span>
              <div className="flex items-center gap-2">
                <img
                  src="/vvisc.svg"
                  alt="VVIT IUCEE Student Chapter (VVISC)"
                  className="h-8 w-8 md:h-9 md:w-9 rounded bg-white/5 p-1 border border-white/10 object-contain"
                  loading="eager"
                />
                <img
                  src="/vvitu.svg"
                  alt="VVIT University"
                  className="h-8 w-8 md:h-9 md:w-9 rounded bg-white/5 p-1 border border-white/10 object-contain"
                  loading="eager"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              INNOVA HACK 2025
            </h1>
            <p className="mt-4 text-lg text-white/80">
              &ldquo;Innovate. Collaborate. Hack the Future.&rdquo;
            </p>
            <div className="mt-4 text-white/70">
              <div>September 25–26, 2025</div>
              <div>Vasireddy Venkatadri Institute of Technology (VVIT), Guntur • 24-Hour Hackathon • Teams of 2–4</div>
            </div>
            <CTAButtons onRegisterClick={() => setRegisterOpen(true)} />
          </div>
          <div className="md:w-2/5">
            <Reveal>
              <div className="relative aspect-square w-full">
                <img
                  src="https://storage.googleapis.com/reskilll/Flux_Dev_Design_a_modern_and_futuristic_logo_for_a_nationallev_1C1hN09e.jpg"
                  alt="INNOVA HACK 2025"
                  className="object-cover rounded-xl border border-white/10 w-full h-full"
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)} title="Register for INNOVA HACK 2025">
        <RegistrationForm />
      </Modal>

      {/* About */}
      <section id="about" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="card">
              <p>
                INNOVA HACK 2025 is a 24-hour innovation-driven hackathon organized by the VVIT IUCEE Student Chapter (VVISC). It brings together the brightest minds from engineering colleges to solve real-world problems with creativity and technology.
              </p>
              <p className="mt-4">
                This hackathon is divided into two domains: CSE & Allied Branches (Software, AI/ML, Cybersecurity, Web & Mobile Apps) and ECE & EEE Branches (Hardware, IoT, Robotics, Embedded Systems, Power Systems).
              </p>
            </div>
            <ul className="card space-y-2">
              <li>• Teams of 2–4 members</li>
              <li>• 24-hour hackathon (Sept 25–26, 2025)</li>
              <li>• Hosted at VVIT, Guntur</li>
              <li>• Open to all engineering students</li>
              <li>• Mentors and judges from industry</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="challenges" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Problem Statements / Tracks</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {tracks.map((t) => (
              <Reveal key={t.id}>
                <div className="card hover:shadow-glow">
                  <div className="relative w-full aspect-video mb-3">
                    <img src={t.img} alt={t.title} className="object-cover rounded-lg w-full h-full" loading="lazy" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.title}</h3>
                  <div className="text-sm text-white/70">Theme: {t.theme}</div>
                  <p className="mt-2 text-white/80">{t.preview}</p>
                  <div className="mt-3">
                    <button
                      className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
                      onClick={() => setActiveTrack(t)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Modal
            open={!!activeTrack}
            onClose={() => setActiveTrack(null)}
            title={activeTrack?.title || ''}
            >
            {activeTrack && (
              <div className="space-y-4">
                <div className="text-white/70">Theme: <span className="text-white">{activeTrack.theme}</span></div>
                <div className="relative w-full aspect-video">
                  <img src={activeTrack.img} alt={activeTrack.title} className="object-cover rounded-lg w-full h-full border border-white/10" loading="lazy" />
                </div>
                {activeTrack.details}
              </div>
            )}
          </Modal>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Event Schedule</h2>
          <div className="space-y-8">
            {/* Day 1 */}
            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold mb-4 text-xl">Day 1 - September 25, 2025</h4>
              <Timeline
                items={[
                  { date: '09:30 AM', title: 'Registrations & Welcome Kits' },
                  { date: '11:00 AM', title: 'Orientation & Ice-breaking' },
                  { date: '01:30 PM', title: 'Hackathon Kick-off (Coding Begins)' },
                  { date: '05:00 PM', title: 'Fun Activity / Team Bonding' },
                  { date: '07:30 PM', title: 'Dinner' },
                  { date: '11:00 PM onwards', title: 'Overnight Hackathon (Optional mentor support till 1 AM)' }
                ]}
              />
            </div>
            
            {/* Day 2 */}
            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold mb-4 text-xl">Day 2 - September 26, 2025</h4>
              <Timeline
                items={[
                  { date: '07:00 AM', title: 'Breakfast & Fresh-up' },
                  { date: '08:00 AM – 11:30 AM', title: 'Final Sprint (Coding + Documentation)' },
                  { date: '11:30 AM', title: 'Project Demos & Judging' },
                  { date: '01:30 PM', title: 'Winners Announcement & Award Ceremony' },
                  { date: '03:30 PM', title: 'Closing, Feedback & Networking' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section id="mentors" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Mentors & Jury</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {mentors.map((m) => (
              <div key={m.name} className="card flex items-center gap-4">
                <img src={m.img} alt={m.name} className="rounded-full object-cover h-16 w-16" />
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-white/70">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section id="prizes" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Prizes & Perks</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Exciting Cash Prizes', desc: 'For top winners across all tracks' },
              { title: 'Goodies & Swags', desc: 'Certificates and special merchandise for all participants' },
              { title: 'Industry Networking', desc: 'Connect with industry experts, mentors, and potential employers' },
              { title: 'Career Opportunities', desc: 'Internship and project opportunities for standout teams' }
            ].map((p) => (
              <Reveal key={p.title}>
                <div className="card">
                  <div className="flex items-center gap-3">
                    <img src="https://reskilll.com/hackpage/dist/img/fourth.svg" alt="prize" className="h-14 w-14" />
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-white/70 text-sm">{p.desc}</div>
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
                  <img src={src} alt={`partner-${i}`} className="object-contain h-20" loading="lazy" />
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
                a: 'Students from all engineering streams are welcome to join INNOVA HACK 2025.'
              },
              {
                q: 'What is the team size?',
                a: 'Teams of 2–4 members are allowed. You can form teams or join as individuals.'
              },
              {
                q: 'Is prior hackathon experience required?',
                a: 'Not at all! Beginners are welcome. We provide guidance and mentorship throughout the event.'
              },
              {
                q: 'Will food & accommodation be provided?',
                a: 'Yes, food and basic facilities will be arranged for all participants during the 24-hour hackathon.'
              },
              {
                q: 'Do I need to bring hardware?',
                a: 'Participants in hardware tracks (ECE/EEE) must bring their own kits/laptops. Software track participants can use lab computers.'
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
          <div>© 2025 INNOVA HACK 2025 - VVIT IUCEE Student Chapter</div>
          <div className="flex gap-4">
            <a href="mailto:vvishackathon@vvitguntur.org" target="_blank" rel="noreferrer">Email</a>
            <a href="#contact">Contact: +91-XXXXXXXXXX</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
