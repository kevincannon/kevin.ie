import { useState } from "react";
import Section from "./components/Section";
import Job from "./components/Job";
import Lightbox from "./components/Lightbox";
import GrammarlyCorrection from "./components/GrammarlyCorrection";

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const socialLinks = [
    {
      icon: "fa-linkedin",
      url: "https://www.linkedin.com/in/kevincannon/",
      title: "LinkedIn",
    },
    {
      icon: "fa-github",
      url: "https://github.com/kevincannon",
      title: "GitHub",
    },
    {
      icon: "fa-bluesky",
      url: "https://bsky.app/profile/multikev.bsky.social/",
      title: "Bluesky",
    },
  ];

  const companies = [
    {
      name: "Frog Design",
      logo: "frog.svg",
      height: 24,
      url: "https://www.frog.co",
    },
    {
      name: "Grammarly",
      logo: "grammarly.svg",
      height: 24,
      url: "https://www.grammarly.com",
    },
    {
      name: "Pitch",
      logo: "pitch.svg",
      height: 19,
      url: "https://www.pitch.com",
    },
    { name: "Ikea", logo: "ikea.svg", height: 15, url: "https://www.ikea.com" },
    {
      name: "ustwo",
      logo: "ustwo.svg",
      height: 24,
      url: "https://www.ustwo.com",
    },
    { name: "CIID", logo: "ciid.png", height: 19, url: "https://www.ciid.dk" },
  ];

  return (
    <div className="min-h-screen py-12 px-7 text-cv-text">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="group relative w-28 h-28 rounded-full overflow-hidden shadow-lg">
              <img
                src="media/profilePhoto.jpg"
                alt="Kevin Cannon"
                className="w-28 h-28 rounded-full object-cover draggable-none group-hover:invisible"
              />
              <img
                src="media/profilePhoto-shades.jpg"
                alt="Kevin Cannon"
                className="absolute inset-0 w-28 h-28 rounded-full object-cover draggable-none invisible group-hover:visible"
              />
            </div>
            <h1 className="font-normal text-cv-white ">Kevin Cannon</h1>
            <p className="font-light">
              Design Director @<GrammarlyCorrection />
            </p>
            <div className="flex flex-row !gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  className={`fa-brands ${link.icon} !text-cv-muted/40   hover:!text-cv-white hover:bg-white/[0.07] hover:scale-110 transition-all !no-underline p-1.5 rounded`}
                  href={link.url}
                  title={link.title}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              ))}
            </div>
          </div>
        </header>

        {/* Bio */}
        <Section title="About">
          <p>
            Design leader specialising in AI tools and emerging
            technologies. I enjoy leading focused teams that build, iterate and
            ship high impact work.
          </p>
          <p>
            Originally from Dublin, now based in Berlin, with over 20 years'
            experience working with agencies, startups and pioneering companies.
          </p>

          {/* Company Logos */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 mt-12 place-items-center">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-100 p-0.5 hover:scale-105"
              >
                <img
                  src={`/media/logos/${company.logo}`}
                  alt={company.name}
                  className="object-contain grayscale brightness-0 transition-all duration-200 invert !opacity-40 group-hover:!opacity-100"
                  style={{ height: `${company.height}px` }}
                />
              </a>
            ))}
          </div>
        </Section>

        {/* Notable Projects */}
        <Section title="Notable Projects">
          <Job
            title="AI Presentation Generator"
            period="2024"
            description="Led design for Pitch's first major AI feature. Built a new AI template system from scratch, coordinating teams to deliver high-quality output on a tight deadline."
            link="https://pitch.com/use-cases/ai-presentation-maker"
            media={[
              {
                type: "video",
                url: "/media/AI-Presentation-Generator-at-Pitch.mp4",
                thumbnailUrl:
                  "/media/AI-Presentation-Generator-at-Pitch_thumbnail.mp4",
              },
            ]}
          />
          <Job
            title="Presentation Power Tools"
            period="2023"
            description="Established an experimental team which went on to create some of Pitch's most unique and loved features."
            extrainfo="Key features: Smart Tidy, Smart swapping, Slide status, CMD+K menu."
            link="https://help.pitch.com/en/articles/3998376-use-smart-formatting"
            media={[
              {
                type: "video",
                url: "/media/Presentation-Power-Tools-at-Pitch-1.mp4",
              },
              {
                type: "video",
                url: "/media/Presentation-Power-Tools-at-Pitch-2.mp4",
              },
              {
                type: "video",
                url: "/media/Presentation-Power-Tools-at-Pitch-3.mp4",
              },
            ]}
          />

          <Job
            title="Ikea Smart Lighting"
            period="2018"
            description="Spent three years designing, implementing, and launching Ikea's first smart home product, working closely with them as they integrated technology into their design-focused culture."
            link="https://www.youtube.com/watch?v=QjuSCNPRwbE"
            media={[
              {
                type: "image",
                url: "/media/Ikea-Home-Smart-at-Frog-Design-1.jpg",
              },
              {
                type: "image",
                url: "/media/Ikea-Home-Smart-at-Frog-Design-2.jpg",
              },
              {
                type: "image",
                url: "/media/Ikea-Home-Smart-at-Frog-Design-3.jpg",
              },
            ]}
          />
        </Section>

        {/* Side Projects */}
        <Section title="Side Projects">
          <Job
            title="FluidMotion"
            period="2024"
            description="Web app for creating customisable animated backgrounds. Inspired by my interest in shaders, Three.js, and SVG animation and the challenge of working with them."
            link="http://fluidmotion.app"
            media={[
              {
                type: "video",
                url: "/media/FluidMotion.mp4",
                thumbnailUrl: "/media/FluidMotion_thumbnail.mp4",
              },
            ]}
          />
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <Job
            title="Design Director at Grammarly/Superhuman"
            company="Berlin"
            period="2025 — Now"
            bullets={[
              "Building out an AI-first design team in our Berlin hub.",
              "Leading design for our AI Agents initiative, a core company bet.",
              "Establishing Grammarly/Superhuman as a destination employer for designers in Berlin.",
            ]}
            link="https://www.grammarly.com/back-to-school"
          />
          <Job
            title="Design Leader/Advisor at Aftershoot"
            company="Delhi, Remote"
            period="2024 — 2025"
            description="Aftershoot is an AI-first tool for professional photographers."
            bullets={[
              "Levelled up design team, hired a Principal Designer, and set a new bar for design craft.",
              "Partnered with founders on a fundamental UX rearchitecture of the app, setting the product up to compete with Adobe Lightroom.",
              "Collaborated with Head of Engineering to build a frontend team to raise product quality.",
              "Ongoing advisory role.",
            ]}
            link="https://www.aftershoot.com"
          />
          <Job
            title="Designer & Advisor at Elicit"
            company="Oakland, Remote"
            period="2024"
            description="Short-term engagement: product design, UX, and design team hiring for an AI research tool."
            link="https://www.elicit.com"
          />
          <Job
            title="Sr Design Manager at Pitch"
            company="Berlin"
            period="2019 — 2024"
            description="Joined pre-launch. Led product design for core editor and AI features."
            bullets={[
              "Designed and shipped some of Pitch's most innovative and well-loved features: Smart Tidy, Smart Swapping, Slide Status, CMD+K menu.",
              "Led design for an AI presentation generator that outperformed competitors.",
              "Managed a craft-focused design team of 8, including a Design Manager and Design Engineer.",
            ]}
            link="https://www.pitch.com"
            media={[
              {
                type: "video",
                url: "/media/AI-Presentation-Generator-at-Pitch.mp4",
                thumbnailUrl:
                  "/media/AI-Presentation-Generator-at-Pitch_thumbnail.mp4",
              },
              {
                type: "video",
                url: "/media/Sr-Design-Manager-at-Pitch-2.mp4",
              },
              {
                type: "video",
                url: "/media/Sr-Design-Manager-at-Pitch-3.mp4",
              },
              {
                type: "video",
                url: "/media/Presentation-Power-Tools-at-Pitch-1.mp4",
              },
            ]}
          />
          <Job
            title="Principal Interaction Designer at Frog Design"
            company="Munich"
            period="2010 — 2018"
            description="Spent many wonderful years working with this lovely bunch of passionate creators and makers."
            bullets={[
              "Led design for major clients in healthcare, smart home, and automotive.",
              "Partnered with Ikea to help them launch their first ever Smart Home product.",
              "Represented Frog at many conferences worldwide (e.g. India, South Africa, France, Croatia).",
              "Ran the intern program, a key pipeline for full-time hires.",
              "Fostered studio culture by initiating the annual Munich-Milan ski trip and hosting community meetups.",
            ]}
            link="https://www.frog.co"
            media={[
              {
                type: "image",
                url: "/media/Principal-Interaction-Designer-at-Frog-Design-1.jpg",
              },
              {
                type: "image",
                url: "/media/Principal-Interaction-Designer-at-Frog-Design-2.gif",
              },
              {
                type: "image",
                url: "/media/Principal-Interaction-Designer-at-Frog-Design-3.jpg",
              },
              {
                type: "image",
                url: "/media/Principal-Interaction-Designer-at-Frog-Design-4.jpg",
              },
              {
                type: "image",
                url: "/media/Principal-Interaction-Designer-at-Frog-Design-5.jpg",
              },
            ]}
          />
          <Job
            title="Visiting Lecturer at Copenhagen Institute of Interaction Design"
            company="Copenhagen"
            period="2015 — 2018"
            description="Taught several courses, notably 'Artefacts from the Future' a week-long crash-course in futurecasting and speculative design."
            link="https://www.ciid.dk"
            media={[
              {
                type: "image",
                url: "/media/Visiting-Lecturer-at-Copenhagen-Institute-of-Interaction-Design-1.jpg",
              },
              {
                type: "image",
                url: "/media/Visiting-Lecturer-at-Copenhagen-Institute-of-Interaction-Design-2.jpg",
              },
              {
                type: "image",
                url: "/media/Visiting-Lecturer-at-Copenhagen-Institute-of-Interaction-Design-3.jpg",
              },
            ]}
          />
          <Job
            title="Designer"
            company="Dublin"
            period="2000 — 2010"
            description="I've worked in many different jobs previously. Here is just a small summary"
            bullets={[
              "🇸🇪 Spent a few months doing mobile UI design at Ustwo in Malmö.",
              "🖥 Worked in a few small web design agencies in Dublin.",
              "🤩 Built interactive installations for events.",
              "⚡️ Built educational games as a Flash Programmer.",
              "🍔 Cleaned tables at Burger King.",
            ]}
          />
        </Section>

        {/* Talks */}
        <Section title="Selected Talks">
          <p className="md:ml-34 text-md text-cv-muted">
            I've been fortunate to speak at conferences and events around the
            world, including India, South Africa, Poland, France, Germany,
            Croatia and Ireland. Here are some of my favourite talks:
          </p>
          <Job
            title="Designing Communities"
            company="Defuse, Dublin, Ireland"
            period=""
            link="https://www.youtube.com/watch?v=_0VkG2iRHR8"
          />

          <Job
            title="Smart Home For Äveryone"
            company="Product Hunt, Berlin, Germany"
            period=""
            link="https://www.youtube.com/watch?v=QjuSCNPRwbE&list=PLypfhjq9QJPwmGFhIA7l-fgxyK-uT08XC&index=4"
          />
          <Job
            title="The Inner Game of Design"
            company="CIID Summer School, Copenhagen, Denmark"
            period=""
            link="https://www.youtube.com/watch?v=FEcclWVSb-w"
          />
        </Section>

        {/* Education */}
        <Section title="Education">
          <Job
            title="Masters Interaction Design"
            company="Copenhagen Institute of Interaction Design"
            period="2008 — 2009"
            link="https://www.ciid.dk"
          />
          <Job
            title="Bsc Multimedia"
            company="Dublin City University"
            period="2000 — 2004"
            link="http://www.dcu.ie"
          />
        </Section>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        media={[{ type: "image", url: "media/profilePhoto.jpg" }]}
        currentIndex={0}
        onNext={() => {}}
        onPrev={() => {}}
        title="Kevin Cannon"
      />
    </div>
  );
}

export default App;
