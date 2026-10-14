import Section from "./ui/Section";
import Button from "./ui/Button";
import { CLIENT_CITIES, CLIENT_LOGOS } from "@/data/clients";

export default function HomeHero() {
  return (
    <Section className="relative text-center overflow-hidden min-h-[85vh] flex flex-col justify-center rounded-b-[2.5rem] bg-bg border-b border-border/50">
      {/* Dynamic CSS Animated Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-foreground/10 rounded-full filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-foreground/8 rounded-full filter blur-[100px] animate-blob animation-delay-4000" />
        {/* Dot grid texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_2px,transparent_2px)] bg-[length:32px_32px] opacity-[0.03]" />
      </div>

      <div className="max-w-[850px] mx-auto relative z-10 px-md">
        <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-card/60 backdrop-blur-md border border-border/50 text-sm font-semibold tracking-wider uppercase mb-xl animate-slideUp opacity-0 [animation-fill-mode:forwards]">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Vetted Engineering Talent
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[150ms] mb-lg text-foreground drop-shadow-sm">
          Mastering Digital <br className="hidden md:block" />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 animate-text">
            Craftsmanship
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/80 mb-md max-w-[700px] mx-auto animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[300ms] font-light leading-relaxed">
          An elite collective of specialized engineers providing Full-stack
          Engineering, Technical Debt Resolution, and CI/CD Optimization to
          scale your products flawlessly.
        </p>

        <p className="text-base md:text-lg text-foreground/70 mb-2xl max-w-[760px] mx-auto animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[375ms] font-mono">
          Senior-only squads across {CLIENT_CITIES.join(" · ")} — at least four
          hours of overlap with your working day, every working day.
        </p>

        <div className="mb-2xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[450ms] flex flex-col sm:flex-row justify-center gap-md">
          <Button
            href="/contact"
            variant="primary"
            className="px-2xl py-lg text-lg rounded-full shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 font-bold">Start Collaboration</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-primary/20" />
          </Button>
          <Button
            href="/work"
            variant="secondary"
            className="px-2xl py-lg text-lg rounded-full bg-card/50 backdrop-blur-md hover:bg-card border-border/50 hover:border-border transition-all duration-300"
          >
            View Live Projects
          </Button>
        </div>

        <div className="mt-xl md:mt-3xl animate-slideUp opacity-0 [animation-fill-mode:forwards] delay-[600ms]">
          <p className="text-xs opacity-50 mb-md uppercase tracking-[0.2em] font-bold">
            Trusted execution partners globally
          </p>
          <ul className="flex justify-center gap-xl md:gap-3xl opacity-60 font-bold font-mono flex-wrap items-center transition-opacity duration-500 hover:opacity-100">
            {CLIENT_LOGOS.map((client) => (
              <li key={client.name}>
                <a
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-sm no-underline text-foreground transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* The client ships a mark rather than a wordmark, so the name
                      carries the recognition and the image carries the identity. */}
                  <img
                    src={client.logo}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    className="h-11 w-11 object-contain grayscale transition-all duration-500 hover:grayscale-0"
                  />
                  <span className="text-xs md:text-sm tracking-tight whitespace-nowrap">
                    {client.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
