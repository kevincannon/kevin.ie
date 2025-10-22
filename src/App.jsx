import { useState } from "react";
import Section from "./components/Section";
import Job from "./components/Job";
import Lightbox from "./components/Lightbox";

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

  return (
    <div className="min-h-screen py-12 px-7 text-cv-text">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4">
            <img
              src="media/profilePhoto.jpg"
              alt="Kevin Cannon"
              className="w-24 h-24 rounded-full object-cover flex-none shadow-2xl cursor-pointer hover:brightness-110 transition-all"
              onClick={() => setLightboxOpen(true)}
            />
            <div className="flex flex-col">
              <h1 className="font-normal text-cv-white">Kevin Cannon</h1>
              <p className="mb-1.5 font-light">
                Design Director @Grammarly{" "}
                <span className="max-sm:hidden inline-block">
                  <span className="text-cv-muted ">· </span>
                  Dubliner&nbsp;in&nbsp;Berlin
                </span>
              </p>
              <div className="flex flex-row !gap-2 relative -top-1 -left-1">
                {socialLinks.map((link) => (
                  <a
                    key={link.icon}
                    className={`fa-brands ${link.icon} !text-cv-muted hover:!text-cv-white hover:bg-white/[0.07] hover:scale-110 transition-all !no-underline p-1.5 rounded`}
                    href={link.url}
                    title={link.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Bio */}
        <Section title="About">
          <p>
            Design leader specialising in AI-powered tools and emerging
            technologies. I enjoy leading focused teams that build, iterate and
            ship high impact work.
          </p>
          <p>
            Over 20 years' experience, working with agencies, startups and
            pioneering companies.
          </p>
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
            media={[{ type: "video", url: "/media/FluidMotion.mp4" }]}
          />
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <Job
            title="Design Director at Grammarly"
            company="Berlin"
            period="2025 — Now"
            bullets={[
              "Building out an AI-first design team in Berlin office.",
              "Growing employer brand within the Berlin design scene.",
              "Leading design for AI Agents initiative.",
            ]}
            link="https://www.grammarly.com/back-to-school"
          />
          <Job
            title="Designer & Advisor at Aftershoot"
            company="Delhi, Remote"
            period="2024 — 2025"
            bullets={[
              "Aftershoot is an AI-first tool for professional photographers.",
              "Led product design and UX improvements, expanded the design team.",
              "Advised founders on using design strategically to achieve business goals.",
              "Repositioned product to attract prosumer audience.",
              "Ongoing advisory role.",
            ]}
            link="https://www.aftershoot.com"
          />
          <Job
            title="Designer & Advisor at Elicit"
            company="Oakland, Remote"
            period="2024"
            bullets={[
              "Helping design the future of large-scale research with AI.",
              "Design hiring & advising.",
              "Product strategy.",
              "Product Design & UX.",
            ]}
            link="https://www.elicit.com"
          />
          <Job
            title="Sr Design Manager at Pitch"
            company="Berlin"
            period="2019 — 2024"
            description="Led product design for core editor and AI features, balancing feature parity with meaningful differentiation."
            bullets={[
              "Delivered many of the product's most differentiating features.",
              "Led design for an AI presentation generator that was significantly better than the competitors.",
              "Led a world-class craft-focused product design team of 8, including a Design Manager and Design Engineer.",
              "Maintained high retention amongst my team.",
            ]}
            link="https://www.pitch.com"
            media={[
              {
                type: "video",
                url: "/media/Sr-Design-Manager-at-Pitch-1.mp4",
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
                url: "/media/Sr-Design-Manager-at-Pitch-4.mp4",
              },
            ]}
          />
          <Job
            title="Principal Interaction Designer at Frog Design"
            company="Munich"
            period="2010 — 2018"
            description="Spent many wonderful years working with this lovely bunch of passionate creators and makers."
            bullets={[
              "Creative lead for many large client projects.",
              "Partnered with Ikea to help them launch their first ever Smart Home product.",
              "Represented Frog at many conferences worldwide (India, South Africa, France, Germany, Poland, Croatia, Ireland).",
              "Managed our intern program for many years, which was a key funnel for successful full-time hires.",
              "Hosted various in-office meetups as well as initiating the company ski trip.",
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
            company="Copenhagen, Denmark"
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
            company="Dublin, Ireland"
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
        <Section title="Talks">
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
