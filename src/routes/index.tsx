import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { PlanView } from "@/components/PlanView";
import { generatePlan, type FitnessPlan, type UserProfile } from "@/lib/fitness";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORGE — Workout & Diet Dossier" },
      { name: "description", content: "A no-nonsense, printable training and nutrition dossier built around your body, goals, and schedule." },
      { property: "og:title", content: "FORGE — Workout & Diet Dossier" },
      { property: "og:description", content: "Personal training and nutrition dossier. Export to CSV or Excel." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Hind:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<FitnessPlan | null>(null);

  const handleSubmit = (p: UserProfile) => {
    setProfile(p);
    setPlan(generatePlan(p));
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const reset = () => {
    setProfile(null);
    setPlan(null);
  };

  return (
    <div className="min-h-screen">
      {/* MARQUEE TICKER */}
      <div className="border-b-2 border-ink bg-ink text-paper overflow-hidden">
        <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap py-1.5 font-mono text-[11px] uppercase tracking-[0.3em]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-6">
              ★ Forge Issue 01 · Train Hard · Eat Real · Sleep Long · Repeat ·
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b-2 border-ink">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display uppercase text-2xl tracking-tight">FORGE</span>
            <span className="font-mono text-[10px] text-ink/60 hidden sm:inline">/ a fitness dossier</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
            Est. {new Date().getFullYear()}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8 sm:py-12">
        {!plan || !profile ? (
          <>
            {/* HERO */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-blaze text-paper font-mono text-[10px] uppercase tracking-[0.3em] px-2 py-1 font-bold">
                  Vol. 01
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
                  Build your protocol
                </span>
              </div>
              <h1 className="font-display uppercase text-[15vw] sm:text-[7rem] leading-[0.85] mb-6">
                Train.
                <br />
                <span className="text-blaze">Eat.</span>
                <br />
                Repeat.
              </h1>
              <div className="border-t-2 border-ink pt-5 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5 items-start">
                <p className="text-lg leading-snug max-w-xl">
                  No fluff. No coach selfies. Answer five questions and walk away with a
                  workout split, meal plan, supplement stack, and rest schedule — printable,
                  exportable, yours.
                </p>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60 sm:text-right space-y-1">
                  <p>↓ Scroll & Fill</p>
                  <p>≈ 90 seconds</p>
                  <p>Free forever</p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="border-2 border-ink p-5 sm:p-8 bg-paper">
              <ProfileForm onSubmit={handleSubmit} />
            </div>

            {/* WHY */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-ink">
              {[
                { n: "01", t: "Built On You", d: "Your weight, age, conditions, and diet shape every line." },
                { n: "02", t: "Coach-Grade", d: "Splits & macros derived from standard programming logic." },
                { n: "03", t: "Take It Anywhere", d: "Export the whole dossier as CSV or Excel in one click." },
              ].map((x, i) => (
                <div key={x.n} className={`p-5 ${i < 2 ? "sm:border-r-2 border-b-2 sm:border-b-0 border-ink" : ""}`}>
                  <span className="font-mono text-xs text-blaze font-bold">{x.n}</span>
                  <h4 className="font-display uppercase text-lg mt-1">{x.t}</h4>
                  <p className="text-sm text-ink/70 mt-2">{x.d}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <PlanView profile={profile} plan={plan} onReset={reset} />
        )}
      </main>

      <footer className="border-t-2 border-ink mt-16">
        <div className="max-w-3xl mx-auto px-5 py-5 flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-ink/60">
          <span>FORGE / Issue №01</span>
          <span>Not medical advice — consult a pro</span>
          <span>★★★</span>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
