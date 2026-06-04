import { useState } from "react";
import {
  type Diet,
  type Frequency,
  type Goal,
  type UserProfile,
  DIET_LABELS,
  GOAL_LABELS,
  HEALTH_OPTIONS,
} from "@/lib/fitness";

interface Props {
  onSubmit: (p: UserProfile) => void;
}

export function ProfileForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [health, setHealth] = useState<string[]>([]);
  const [diet, setDiet] = useState<Diet>("non_veg");
  const [frequency, setFrequency] = useState<Frequency>(5);
  const [goal, setGoal] = useState<Goal>("hybrid");

  const toggleHealth = (h: string) =>
    setHealth((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));

  const valid = name && +age > 10 && +weight > 20 && +height > 100;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit({
          name: name.trim(),
          age: +age,
          weight: +weight,
          height: +height,
          healthIssues: health,
          diet,
          frequency,
          goal,
        });
      }}
      className="space-y-10"
    >
      <Section num="01" title="Identity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-2 border-ink">
          <Field label="Name" border="right-bottom">
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="JANE DOE" />
          </Field>
          <Field label="Age" border="bottom">
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} placeholder="28" />
          </Field>
          <Field label="Weight / kg" border="right">
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} placeholder="72" />
          </Field>
          <Field label="Height / cm">
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className={inputCls} placeholder="178" />
          </Field>
        </div>
      </Section>

      <Section num="02" title="Conditions">
        <div className="flex flex-wrap gap-0 border-2 border-ink p-3">
          {HEALTH_OPTIONS.map((h) => (
            <Chip key={h} active={health.includes(h)} onClick={() => toggleHealth(h)}>
              {h}
            </Chip>
          ))}
        </div>
      </Section>

      <Section num="03" title="Fuel">
        <div className="grid grid-cols-3 border-2 border-ink">
          {(Object.keys(DIET_LABELS) as Diet[]).map((d, i) => (
            <Pick key={d} active={diet === d} onClick={() => setDiet(d)} divider={i < 2}>
              {DIET_LABELS[d]}
            </Pick>
          ))}
        </div>
      </Section>

      <Section num="04" title="Frequency">
        <div className="grid grid-cols-3 border-2 border-ink">
          {([4, 5, 6] as Frequency[]).map((f, i) => (
            <Pick key={f} active={frequency === f} onClick={() => setFrequency(f)} divider={i < 2}>
              <span className="font-display text-3xl block">{f}</span>
              <span className="text-xs tracking-widest uppercase">days/wk</span>
            </Pick>
          ))}
        </div>
      </Section>

      <Section num="05" title="Mission">
        <div className="grid grid-cols-2 border-2 border-ink">
          {(Object.keys(GOAL_LABELS) as Goal[]).map((g, i) => (
            <Pick key={g} active={goal === g} onClick={() => setGoal(g)} divider={i % 2 === 0} bottomDivider={i < 2}>
              {GOAL_LABELS[g]}
            </Pick>
          ))}
        </div>
      </Section>

      <button
        type="submit"
        disabled={!valid}
        className="group w-full border-2 border-ink bg-ink text-paper font-display uppercase text-2xl sm:text-3xl py-6 transition-all hover:bg-blaze hover:border-blaze disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-between px-6"
      >
        <span>Forge The Plan</span>
        <span className="text-flash group-hover:text-paper transition-colors">→</span>
      </button>
    </form>
  );
}

const inputCls =
  "w-full bg-transparent px-4 py-4 text-ink placeholder:text-ink/30 placeholder:font-display placeholder:uppercase focus:outline-none focus:bg-flash font-sans text-lg";

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3 border-b-2 border-ink pb-2">
        <span className="font-mono text-xs text-blaze font-bold">{num}</span>
        <h3 className="font-display uppercase text-sm tracking-widest">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  border,
}: {
  label: string;
  children: React.ReactNode;
  border?: "right" | "bottom" | "right-bottom";
}) {
  const borderCls = {
    right: "sm:border-r-2 border-ink",
    bottom: "border-b-2 sm:border-b-2 border-ink",
    "right-bottom": "sm:border-r-2 border-b-2 border-ink",
  }[border ?? "right"];
  return (
    <label className={`block ${border ? borderCls : ""}`}>
      <span className="block text-[10px] uppercase tracking-[0.2em] font-mono font-bold px-4 pt-3 text-ink/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m-1 px-4 py-2 font-display uppercase text-xs tracking-wider border-2 border-ink transition-all ${
        active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-flash"
      }`}
    >
      {active && "✕ "}
      {children}
    </button>
  );
}

function Pick({
  active,
  onClick,
  children,
  divider,
  bottomDivider,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  divider?: boolean;
  bottomDivider?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-5 font-display uppercase text-sm transition-all ${
        divider ? "border-r-2 border-ink" : ""
      } ${bottomDivider ? "border-b-2 border-ink" : ""} ${
        active ? "bg-blaze text-paper" : "bg-paper text-ink hover:bg-flash"
      }`}
    >
      {children}
    </button>
  );
}
