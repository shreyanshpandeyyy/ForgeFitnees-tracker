import type { FitnessPlan, UserProfile } from "@/lib/fitness";
import { DIET_LABELS, GOAL_LABELS } from "@/lib/fitness";
import { exportCSV, exportXLSX } from "@/lib/export";

interface Props {
  profile: UserProfile;
  plan: FitnessPlan;
  onReset: () => void;
}

export function PlanView({ profile, plan, onReset }: Props) {
  return (
    <div className="space-y-0">
      {/* MASTHEAD */}
      <div className="border-2 border-ink bg-ink text-paper p-6 sm:p-10 relative">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-mono border-b border-paper/30 pb-3 mb-6">
          <span>ISSUE №01</span>
          <span className="text-flash">THE PLAN</span>
          <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()}</span>
        </div>
        <p className="text-xs uppercase tracking-widest text-flash font-bold mb-3">Subject</p>
        <h2 className="font-display uppercase text-5xl sm:text-7xl leading-[0.85] mb-4">
          {profile.name}.
        </h2>
        <p className="text-base sm:text-lg max-w-2xl text-paper/80">
          Calibrated for{" "}
          <span className="bg-blaze text-paper px-2 font-display uppercase text-sm">
            {GOAL_LABELS[profile.goal]}
          </span>
          . {profile.frequency} sessions weekly. {DIET_LABELS[profile.diet]} fuel protocol.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-8 border-t border-paper/30 pt-6">
          <Stat label="BMI" value={plan.bmi.toString()} sub={plan.bmiCategory} />
          <Stat label="kcal/day" value={plan.dailyCalories.toString()} sub="energy" border />
          <Stat label="protein" value={`${plan.protein}g`} sub="daily" border />
          <Stat label="days/wk" value={`${profile.frequency}`} sub="training" border />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="border-x-2 border-b-2 border-ink bg-flash p-3 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest font-bold px-2">⬇ Take it with you</span>
        <div className="flex gap-0">
          <button onClick={() => exportCSV(profile, plan)} className={btnGhost}>CSV</button>
          <button onClick={() => exportXLSX(profile, plan)} className={btnPrimary}>Excel ↓</button>
          <button onClick={onReset} className={btnGhost}>↺ Restart</button>
        </div>
      </div>

      {/* WORKOUT */}
      <Section num="01" title="The Split" sub="seven days, fully scripted">
        <div className="divide-y-2 divide-ink border-2 border-ink border-t-0">
          {plan.workout.map((d, idx) => (
            <div key={d.day} className={`p-5 sm:p-6 ${d.type === "rest" ? "bg-secondary" : "bg-paper"}`}>
              <div className="flex items-baseline justify-between mb-4 gap-4">
                <div className="flex items-baseline gap-4 min-w-0">
                  <span className="font-mono text-xs text-blaze font-bold">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-ink/60">{d.day}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-1 font-display uppercase tracking-widest ${
                    d.type === "rest" ? "bg-ink text-paper" : "bg-blaze text-paper"
                  }`}
                >
                  {d.type === "rest" ? "Rest" : "Train"}
                </span>
              </div>
              <h4 className="font-display uppercase text-2xl sm:text-3xl mb-4">{d.focus}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {d.exercises.map((e, i) => (
                  <div key={i} className="flex justify-between items-baseline py-2 border-b border-dashed border-ink/30">
                    <span className="font-sans text-ink">{e.name}</span>
                    <span className="font-mono text-sm tabular-nums text-ink/70 shrink-0 ml-3">
                      {e.sets}×{e.reps}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* DIET */}
      <Section num="02" title="The Fuel" sub={`approx. ${plan.dailyCalories} kcal · ${plan.protein}g protein`}>
        <div className="border-2 border-ink border-t-0">
          {plan.diet.map((m, i) => (
            <div
              key={m.meal}
              className={`grid grid-cols-12 gap-4 p-5 sm:p-6 ${
                i < plan.diet.length - 1 ? "border-b-2 border-ink" : ""
              } ${i % 2 === 0 ? "bg-paper" : "bg-secondary"}`}
            >
              <div className="col-span-12 sm:col-span-3">
                <span className="font-mono text-xs text-blaze font-bold">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="font-display uppercase text-xl mt-1">{m.meal}</h4>
              </div>
              <p className="col-span-12 sm:col-span-7 text-ink/80 leading-relaxed">{m.description}</p>
              <span className="col-span-12 sm:col-span-2 font-mono text-sm text-ink/60 sm:text-right">
                {m.calories}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* SUPPS */}
      <Section num="03" title="The Stack" sub="supplement protocol">
        <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-ink border-t-0">
          {plan.supplements.map((s, i) => (
            <div
              key={s.name}
              className={`p-5 sm:p-6 ${i % 2 === 0 ? "sm:border-r-2 border-ink" : ""} ${
                i < plan.supplements.length - (plan.supplements.length % 2 === 0 ? 2 : 1)
                  ? "border-b-2 border-ink"
                  : ""
              }`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="font-display uppercase text-lg">{s.name}</h4>
                <span className="font-mono text-xs bg-flash px-2 py-0.5 font-bold">{s.dosage}</span>
              </div>
              <p className="text-xs uppercase tracking-widest font-mono text-blaze font-bold mb-2">{s.timing}</p>
              <p className="text-sm text-ink/70">{s.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* NOTES */}
      <Section num="04" title="House Rules" sub="non-negotiable">
        <ol className="border-2 border-ink border-t-0 divide-y-2 divide-ink">
          {plan.notes.map((n, i) => (
            <li key={i} className="flex gap-5 p-5 sm:p-6 items-start">
              <span className="font-display text-3xl sm:text-4xl text-blaze leading-none shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base sm:text-lg leading-snug pt-1">{n}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="border-2 border-ink border-t-0 bg-ink text-paper p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60">END OF DOSSIER</p>
        <p className="font-display uppercase text-2xl mt-2">Now go do the work.</p>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, border }: { label: string; value: string; sub: string; border?: boolean }) {
  return (
    <div className={`px-4 ${border ? "border-l border-paper/30" : ""}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">{label}</p>
      <p className="font-display text-3xl sm:text-4xl mt-1">{value}</p>
      <p className="text-xs text-flash uppercase tracking-widest mt-0.5">{sub}</p>
    </div>
  );
}

function Section({ num, title, sub, children }: { num: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <div className="border-2 border-ink bg-paper p-5 flex items-baseline justify-between gap-4 flex-wrap">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-blaze font-bold">§ {num}</span>
          <h3 className="font-display uppercase text-2xl sm:text-3xl">{title}</h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">{sub}</span>
      </div>
      {children}
    </section>
  );
}

const btnPrimary =
  "px-4 py-2 bg-ink text-paper font-display uppercase text-xs tracking-widest hover:bg-blaze transition-colors";
const btnGhost =
  "px-4 py-2 bg-paper text-ink font-display uppercase text-xs tracking-widest border-2 border-ink hover:bg-ink hover:text-paper transition-colors ml-2 first:ml-0";
