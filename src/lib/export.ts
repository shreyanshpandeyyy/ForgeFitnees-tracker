import * as XLSX from "xlsx";
import type { FitnessPlan, UserProfile } from "./fitness";
import { DIET_LABELS, GOAL_LABELS } from "./fitness";

function buildRows(p: UserProfile, plan: FitnessPlan) {
  const profile = [
    ["FITNESS PLAN"],
    ["Name", p.name],
    ["Age", p.age],
    ["Weight (kg)", p.weight],
    ["Height (cm)", p.height],
    ["BMI", `${plan.bmi} (${plan.bmiCategory})`],
    ["Diet", DIET_LABELS[p.diet]],
    ["Goal", GOAL_LABELS[p.goal]],
    ["Frequency", `${p.frequency} days/week`],
    ["Health Issues", p.healthIssues.join(", ") || "None"],
    ["Daily Calories", plan.dailyCalories],
    ["Daily Protein (g)", plan.protein],
    [],
  ];
  const workout: (string | number)[][] = [["WORKOUT PLAN"], ["Day", "Type", "Focus", "Exercise", "Sets", "Reps"]];
  plan.workout.forEach((d) => {
    d.exercises.forEach((e, i) => {
      workout.push([
        i === 0 ? d.day : "",
        i === 0 ? d.type : "",
        i === 0 ? d.focus : "",
        e.name,
        e.sets,
        e.reps,
      ]);
    });
  });
  workout.push([]);

  const diet: (string | number)[][] = [["DIET PLAN"], ["Meal", "Description", "Calories"]];
  plan.diet.forEach((m) => diet.push([m.meal, m.description, m.calories]));
  diet.push([]);

  const supps: (string | number)[][] = [["SUPPLEMENTS"], ["Name", "Dosage", "Timing", "Note"]];
  plan.supplements.forEach((s) => supps.push([s.name, s.dosage, s.timing, s.note]));
  supps.push([]);

  const notes: (string | number)[][] = [["NOTES"]];
  plan.notes.forEach((n) => notes.push([n]));

  return [...profile, ...workout, ...diet, ...supps, ...notes];
}

export function exportCSV(p: UserProfile, plan: FitnessPlan) {
  const rows = buildRows(p, plan);
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  download(`${p.name.replace(/\s+/g, "_")}_fitness_plan.csv`, csv, "text/csv");
}

export function exportXLSX(p: UserProfile, plan: FitnessPlan) {
  const wb = XLSX.utils.book_new();
  const profileSheet = XLSX.utils.aoa_to_sheet([
    ["Fitness Plan"],
    ["Name", p.name],
    ["Age", p.age],
    ["Weight (kg)", p.weight],
    ["Height (cm)", p.height],
    ["BMI", plan.bmi],
    ["BMI Category", plan.bmiCategory],
    ["Diet", DIET_LABELS[p.diet]],
    ["Goal", GOAL_LABELS[p.goal]],
    ["Frequency", `${p.frequency} days/week`],
    ["Health Issues", p.healthIssues.join(", ") || "None"],
    ["Daily Calories", plan.dailyCalories],
    ["Daily Protein (g)", plan.protein],
  ]);
  XLSX.utils.book_append_sheet(wb, profileSheet, "Profile");

  const wRows: (string | number)[][] = [["Day", "Type", "Focus", "Exercise", "Sets", "Reps"]];
  plan.workout.forEach((d) =>
    d.exercises.forEach((e, i) =>
      wRows.push([i === 0 ? d.day : "", i === 0 ? d.type : "", i === 0 ? d.focus : "", e.name, e.sets, e.reps]),
    ),
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wRows), "Workout");

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet([["Meal", "Description", "Calories"], ...plan.diet.map((m) => [m.meal, m.description, m.calories])]),
    "Diet",
  );
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet([["Name", "Dosage", "Timing", "Note"], ...plan.supplements.map((s) => [s.name, s.dosage, s.timing, s.note])]),
    "Supplements",
  );
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["Notes"], ...plan.notes.map((n) => [n])]), "Notes");

  XLSX.writeFile(wb, `${p.name.replace(/\s+/g, "_")}_fitness_plan.xlsx`);
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
