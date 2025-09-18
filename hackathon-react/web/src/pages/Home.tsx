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
    { name: 'Dr B. Sai Jyothi', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'Dr Kiran Kumar', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'Dr. K.V.L Somasekhar', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'Mr N. Tagore', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'Mr Ravikumar', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'M. Ramya Harika', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'Dr M. Sirisha', role: 'Mentor & Jury', img: '/avatar.svg' },
    { name: 'Mr Mallik (Mechanical)', role: 'Mentor & Jury', img: '/avatar.svg' }
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
    {
      id: 'infranova',
      title: '🏗️ INFRANOVA (Mechanical & Civil Branches)',
      theme: 'Building Sustainable and Resilient Solutions for Future Infrastructure',
      img: '/infranova.png',
      preview: 'Theme: Building Sustainable and Resilient Solutions for Future Infrastructure. Tailored for Mechanical, Civil, and allied branches focusing on sustainability and resilient design.',
      details: (
        <div className="space-y-3 text-white/80">
          <p>
            The Infranova track is built for Mechanical, Civil, and allied engineering branches, focusing on futuristic infrastructure and sustainability.
          </p>
          <p className="font-semibold text-white">Participants will get the opportunity to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Develop sustainable infrastructure solutions for smart cities.</li>
            <li>Innovate in areas like green construction, renewable energy integration, and resilient designs.</li>
            <li>Apply mechanical design, structural engineering, and material sciences for real-world impact.</li>
          </ul>
          <p className="pt-2">👉 Tailored for engineers who shape the physical world with resilient and eco-friendly designs.</p>
        </div>
      ),
    },
  ] as const
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(11,16,32,0.6)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,16,32,0.4)]">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-bold text-xl transition duration-300 hover:text-primary">
            <div className="bg-white rounded p-1">
              <img src="/vvisc.png" alt="VVISC" className="h-6 w-6" />
            </div>
            INNOVA HACK 2025
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#challenges">Tracks</NavLink>
            <NavLink href="#schedule">Schedule</NavLink>
            <NavLink href="#mentors">Mentors</NavLink>
            <NavLink href="#jury">Judges</NavLink>
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
            <div className="mb-6 flex items-center justify-center md:justify-start gap-3 text-white/70">
              <span className="text-sm font-medium">Organized by</span>
              <div className="flex items-center gap-3">
                <img
                  src="/vvisc.png"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/vvisc.svg' }}
                  alt="VVIT IUCEE Student Chapter (VVISC)"
                  className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white p-2 border border-white/20 object-contain transition-transform hover:scale-105"
                  loading="eager"
                />
                <img
                  src="/vvitu.png"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/vvitu.svg' }}
                  alt="VVIT University"
                  className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white p-2 border border-white/20 object-contain transition-transform hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-center md:text-left">
              INNOVA HACK 2025
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 text-center md:text-left">
              &ldquo;Innovate. Collaborate. Hack the Future.&rdquo;
            </p>
            <div className="mt-6 text-white/70 text-center md:text-left space-y-1">
              <div className="font-semibold text-white">September 25–26, 2025</div>
              <div>Vasireddy Venkatadri Institute of Technology (VVIT), Guntur</div>
              <div>24-Hour Hackathon • Teams of 4–5</div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => setRegisterOpen(true)}
              >
                Register Now
              </button>
              <a
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur"
                href="#schedule"
              >
                View Schedule
              </a>
            </div>
          </div>
<div className="md:w-2/5">
            <Reveal>
              <div className="relative aspect-square w-full">
                <img
                  src="/innova-hack-2025-hero.png"
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
                This hackathon spans three domains: CSE & Allied Branches (Software, AI/ML, Cybersecurity, Web & Mobile Apps), ECE & EEE Branches (Hardware, IoT, Robotics, Embedded Systems, Power Systems), and INFRANOVA for Mechanical, Civil & Allied Branches (Sustainable infrastructure, mechanical design, structural systems).
              </p>
            </div>
            <ul className="card space-y-2">
              <li>• Teams of 4–5 members</li>
              <li>• 24-hour hackathon (Sept 25–26, 2025)</li>
              <li>• Hosted at VVIT University, Guntur</li>
              <li>• Open to all engineering students</li>
              <li>• Mentors and judges from industry</li>
              <li>• Students must bring their own laptops, power extension boxes/boards, and any required hardware</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="challenges" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Problem Statements / Tracks</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {tracks.map((t) => (
              <Reveal key={t.id}>
                <div className="card hover:shadow-glow">
                  <div className="relative w-full aspect-video mb-3">
                    <img src={t.img} alt={t.title} className="object-cover rounded-lg w-full h-full" loading="lazy" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.title}</h3>
                   
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
                  { date: '09:30 AM – 10:30 AM', title: 'Registrations & Welcome Kit Distribution' },
                  { date: '11:00 AM – 12:30 PM', title: 'Orientation & Ice-breaking Session' },
                  { date: '01:30 PM', title: 'Hackathon Officially Begins 🚀' },
                  { date: '07:30 PM', title: 'Dinner' },
                  { date: '08:30 PM – Overnight', title: 'Hackathon Continues (Optional Mentor Support till 1 AM)'
                  }
                ]}
              />
            </div>
            
            {/* Day 2 */}
            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold mb-4 text-xl">Day 2 - September 26, 2025</h4>
              <Timeline
                items={[
                  { date: '07:00 AM – 08:00 AM', title: 'Breakfast' },
                  { date: '08:00 AM – 11:30 AM', title: 'Final Sprint (Polishing & Documentation)' },
                  { date: '11:30 AM – 12:30 PM', title: 'Project Evaluation (Team Demos)' },
                  { date: '01:30 PM – 03:00 PM', title: 'Winners Announcement & Award Ceremony 🏆' },
                  { date: '03:30 PM – 04:00 PM', title: 'Group Photo & Closing' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hidden anchor for Judges link */}
      <div id="jury" className="h-0" aria-hidden />

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

      {/* Organizers */}
      <section id="organizers" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Organizers</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="card">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded p-1">
                    <img src="/vvisc.png" alt="VVISC" className="h-14 w-14 object-contain" />
                  </div>
                  <div>
                    <div className="font-semibold">VVIT IUCEE Student Chapter</div>
                    <div className="text-white/70 text-sm">Organizing Team</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded p-1">
                    <img src="/vvitu.png" alt="VVIT" className="h-14 w-14 object-contain" />
                  </div>
                  <div>
                    <div className="font-semibold">VVIT University</div>
                    <div className="text-white/70 text-sm">Host Institution</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section id="prizes" className="py-12 scroll-mt-24">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Prizes & Perks</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Certificates', desc: 'For top winners across all tracks' },
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
                a: 'Teams of 4–5 members are allowed. You can form teams. '
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
                a: 'All participants must bring their own laptops and power extension boxes/boards. Teams in hardware tracks (ECE/EEE) must also bring any required hardware kits and components.'
              },
              {
                q: 'I am new to hackathons. How do I approach the mentors? Is it during the hackathon or before/after?',
                a: '👉 Mentors will be available throughout the hackathon to guide you. You can approach them during the event whenever you face challenges—whether technical, domain-related, or idea validation. Before the hackathon, you can clarify general doubts with the organizing team. After the hackathon, mentors may not be officially available, but you are encouraged to connect with them for further guidance.'
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
            <a href="mailto:ewbvvit@gmail.com" target="_blank" rel="noreferrer">Email</a>
            <a href="tel:+917569251576">+91-7569251576</a>
            <a href="tel:+916300522709">+91-6300522709</a>
            <a href="tel:+918074246024">+91-8074246024</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
