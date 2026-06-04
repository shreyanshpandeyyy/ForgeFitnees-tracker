export type Goal = "weight_loss" | "weight_gain" | "hybrid" | "athletic";
export type Diet = "veg" | "non_veg" | "eggetarian";
export type Frequency = 4 | 5 | 6;

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  healthIssues: string[];
  diet: Diet;
  frequency: Frequency;
  goal: Goal;
}

export interface DayPlan {
  day: string;
  type: "workout" | "rest";
  focus: string;
  exercises: { name: string; sets: string; reps: string }[];
}

export interface Meal {
  meal: string;
  description: string;
  calories: string;
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  note: string;
}

export interface FitnessPlan {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  protein: number;
  workout: DayPlan[];
  diet: Meal[];
  supplements: Supplement[];
  notes: string[];
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SPLITS: Record<Frequency, Record<Goal, string[]>> = {
  4: {
    weight_loss: ["Full Body Strength", "HIIT Cardio", "Upper Body + Core", "Lower Body + Cardio"],
    weight_gain: ["Push (Chest/Shoulders/Triceps)", "Pull (Back/Biceps)", "Legs", "Upper Body Volume"],
    hybrid: ["Push + Conditioning", "Pull + Core", "Legs + Plyo", "Full Body Power"],
    athletic: ["Power & Strength", "Speed & Agility", "Hypertrophy", "Endurance Circuit"],
  },
  5: {
    weight_loss: ["Full Body Strength", "HIIT", "Upper Body", "Steady Cardio", "Lower Body + Core"],
    weight_gain: ["Chest", "Back", "Legs", "Shoulders + Arms", "Weak Points"],
    hybrid: ["Push", "Pull", "Legs", "Conditioning", "Full Body"],
    athletic: ["Lower Power", "Upper Power", "Speed/Agility", "Hypertrophy", "Conditioning"],
  },
  6: {
    weight_loss: ["Upper Strength", "HIIT", "Lower Strength", "Cardio", "Full Body", "Active Recovery"],
    weight_gain: ["Chest", "Back", "Legs", "Shoulders", "Arms", "Weak Points"],
    hybrid: ["Push", "Pull", "Legs", "Upper Power", "Lower Power", "Conditioning"],
    athletic: ["Lower Power", "Upper Power", "Speed", "Hypertrophy Upper", "Hypertrophy Lower", "Conditioning"],
  },
};

const EXERCISES: Record<string, { name: string; sets: string; reps: string }[]> = {
  "Full Body Strength": [
    { name: "Goblet Squat", sets: "4", reps: "10" },
    { name: "Dumbbell Bench Press", sets: "4", reps: "10" },
    { name: "Bent-over Row", sets: "4", reps: "10" },
    { name: "Plank", sets: "3", reps: "45s" },
  ],
  "HIIT Cardio": [
    { name: "Burpees", sets: "5", reps: "30s on/30s off" },
    { name: "Mountain Climbers", sets: "5", reps: "30s on/30s off" },
    { name: "Jump Squats", sets: "5", reps: "30s on/30s off" },
  ],
  "HIIT": [
    { name: "Sprint Intervals", sets: "8", reps: "30s sprint/60s walk" },
    { name: "Kettlebell Swings", sets: "5", reps: "20" },
    { name: "Box Jumps", sets: "4", reps: "10" },
  ],
  "Upper Body + Core": [
    { name: "Push-ups", sets: "4", reps: "12-15" },
    { name: "Pull-ups / Lat Pulldown", sets: "4", reps: "8-10" },
    { name: "Dumbbell Shoulder Press", sets: "3", reps: "12" },
    { name: "Hanging Leg Raise", sets: "3", reps: "12" },
  ],
  "Lower Body + Cardio": [
    { name: "Barbell Back Squat", sets: "4", reps: "8-10" },
    { name: "Romanian Deadlift", sets: "4", reps: "10" },
    { name: "Walking Lunges", sets: "3", reps: "12/leg" },
    { name: "Incline Treadmill Walk", sets: "1", reps: "20 min" },
  ],
  "Push (Chest/Shoulders/Triceps)": [
    { name: "Barbell Bench Press", sets: "4", reps: "6-8" },
    { name: "Overhead Press", sets: "4", reps: "8" },
    { name: "Incline DB Press", sets: "3", reps: "10" },
    { name: "Tricep Dips", sets: "3", reps: "12" },
  ],
  "Pull (Back/Biceps)": [
    { name: "Deadlift", sets: "4", reps: "5" },
    { name: "Pull-ups", sets: "4", reps: "AMRAP" },
    { name: "Barbell Row", sets: "4", reps: "8" },
    { name: "Barbell Curl", sets: "3", reps: "10" },
  ],
  "Legs": [
    { name: "Back Squat", sets: "5", reps: "5" },
    { name: "Romanian Deadlift", sets: "4", reps: "8" },
    { name: "Bulgarian Split Squat", sets: "3", reps: "10/leg" },
    { name: "Standing Calf Raise", sets: "4", reps: "15" },
  ],
  "Upper Body Volume": [
    { name: "DB Bench Press", sets: "4", reps: "12" },
    { name: "Cable Row", sets: "4", reps: "12" },
    { name: "Lateral Raise", sets: "4", reps: "15" },
    { name: "Face Pulls", sets: "3", reps: "15" },
  ],
  "Push": [
    { name: "Bench Press", sets: "4", reps: "8" },
    { name: "Overhead Press", sets: "4", reps: "8" },
    { name: "Incline DB Press", sets: "3", reps: "10" },
    { name: "Cable Tricep Pushdown", sets: "3", reps: "12" },
  ],
  "Pull": [
    { name: "Deadlift", sets: "4", reps: "5" },
    { name: "Pull-ups", sets: "4", reps: "AMRAP" },
    { name: "Seated Cable Row", sets: "3", reps: "10" },
    { name: "Hammer Curl", sets: "3", reps: "12" },
  ],
  "Chest": [
    { name: "Barbell Bench", sets: "5", reps: "6-8" },
    { name: "Incline DB Press", sets: "4", reps: "10" },
    { name: "Cable Fly", sets: "3", reps: "12" },
    { name: "Push-ups", sets: "3", reps: "AMRAP" },
  ],
  "Back": [
    { name: "Deadlift", sets: "4", reps: "5" },
    { name: "Pull-ups", sets: "4", reps: "AMRAP" },
    { name: "Barbell Row", sets: "4", reps: "8" },
    { name: "Lat Pulldown", sets: "3", reps: "12" },
  ],
  "Shoulders": [
    { name: "Overhead Press", sets: "4", reps: "8" },
    { name: "Lateral Raise", sets: "4", reps: "15" },
    { name: "Rear Delt Fly", sets: "4", reps: "15" },
    { name: "Shrugs", sets: "3", reps: "12" },
  ],
  "Shoulders + Arms": [
    { name: "Overhead Press", sets: "4", reps: "8" },
    { name: "Lateral Raise", sets: "4", reps: "12" },
    { name: "Barbell Curl", sets: "3", reps: "10" },
    { name: "Tricep Pushdown", sets: "3", reps: "12" },
  ],
  "Arms": [
    { name: "Barbell Curl", sets: "4", reps: "10" },
    { name: "Close-grip Bench", sets: "4", reps: "8" },
    { name: "Hammer Curl", sets: "3", reps: "12" },
    { name: "Skull Crusher", sets: "3", reps: "10" },
  ],
  "Weak Points": [
    { name: "Choose your lagging muscle", sets: "5", reps: "12" },
    { name: "Isolation work", sets: "4", reps: "12-15" },
    { name: "Drop sets", sets: "3", reps: "to failure" },
  ],
  "Push + Conditioning": [
    { name: "Bench Press", sets: "4", reps: "8" },
    { name: "Push Press", sets: "3", reps: "8" },
    { name: "Battle Ropes", sets: "5", reps: "30s" },
  ],
  "Pull + Core": [
    { name: "Pull-ups", sets: "4", reps: "AMRAP" },
    { name: "Row", sets: "4", reps: "10" },
    { name: "Hanging Leg Raise", sets: "3", reps: "12" },
    { name: "Plank", sets: "3", reps: "60s" },
  ],
  "Legs + Plyo": [
    { name: "Front Squat", sets: "4", reps: "6" },
    { name: "RDL", sets: "4", reps: "8" },
    { name: "Box Jumps", sets: "4", reps: "8" },
  ],
  "Full Body Power": [
    { name: "Power Clean", sets: "5", reps: "3" },
    { name: "Push Press", sets: "4", reps: "5" },
    { name: "Front Squat", sets: "4", reps: "5" },
  ],
  "Full Body": [
    { name: "Squat", sets: "3", reps: "8" },
    { name: "Bench", sets: "3", reps: "8" },
    { name: "Row", sets: "3", reps: "8" },
    { name: "Core Circuit", sets: "3", reps: "1 min" },
  ],
  "Power & Strength": [
    { name: "Trap Bar Deadlift", sets: "5", reps: "3" },
    { name: "Bench Press", sets: "5", reps: "5" },
    { name: "Weighted Pull-ups", sets: "4", reps: "5" },
  ],
  "Speed & Agility": [
    { name: "Sprints 40m", sets: "8", reps: "1" },
    { name: "Lateral Bounds", sets: "4", reps: "10" },
    { name: "Ladder Drills", sets: "5", reps: "30s" },
  ],
  "Hypertrophy": [
    { name: "DB Bench", sets: "4", reps: "10" },
    { name: "Cable Row", sets: "4", reps: "10" },
    { name: "Leg Press", sets: "4", reps: "12" },
    { name: "Lateral Raise", sets: "3", reps: "15" },
  ],
  "Endurance Circuit": [
    { name: "Row 500m", sets: "5", reps: "1" },
    { name: "Wall Balls", sets: "5", reps: "15" },
    { name: "Burpees", sets: "5", reps: "10" },
  ],
  "Lower Power": [
    { name: "Back Squat", sets: "5", reps: "3-5" },
    { name: "Trap Bar DL", sets: "4", reps: "5" },
    { name: "Box Jumps", sets: "4", reps: "5" },
  ],
  "Upper Power": [
    { name: "Bench Press", sets: "5", reps: "3-5" },
    { name: "Weighted Pull-ups", sets: "4", reps: "5" },
    { name: "Push Press", sets: "4", reps: "5" },
  ],
  "Speed": [
    { name: "Sprints 60m", sets: "6", reps: "1" },
    { name: "Sled Push", sets: "5", reps: "20m" },
    { name: "Hurdle Hops", sets: "4", reps: "8" },
  ],
  "Speed/Agility": [
    { name: "Sprint Intervals", sets: "8", reps: "30s" },
    { name: "Cone Drills", sets: "5", reps: "30s" },
    { name: "Broad Jumps", sets: "4", reps: "6" },
  ],
  "Hypertrophy Upper": [
    { name: "Incline DB Press", sets: "4", reps: "10" },
    { name: "Cable Row", sets: "4", reps: "12" },
    { name: "Lateral Raise", sets: "4", reps: "15" },
    { name: "Curl + Pushdown Superset", sets: "3", reps: "12" },
  ],
  "Hypertrophy Lower": [
    { name: "Hack Squat", sets: "4", reps: "10" },
    { name: "RDL", sets: "4", reps: "10" },
    { name: "Walking Lunge", sets: "3", reps: "12/leg" },
    { name: "Calf Raise", sets: "4", reps: "15" },
  ],
  "Conditioning": [
    { name: "Assault Bike Intervals", sets: "10", reps: "30s on/30s off" },
    { name: "KB Swings", sets: "5", reps: "20" },
    { name: "Farmer Carry", sets: "4", reps: "40m" },
  ],
  "Steady Cardio": [
    { name: "Incline Walk / Cycle", sets: "1", reps: "45 min" },
  ],
  "Cardio": [
    { name: "Run / Cycle / Row", sets: "1", reps: "40 min Zone 2" },
  ],
  "Upper Strength": [
    { name: "Bench Press", sets: "5", reps: "5" },
    { name: "Weighted Pull-ups", sets: "4", reps: "6" },
    { name: "Overhead Press", sets: "4", reps: "6" },
  ],
  "Lower Strength": [
    { name: "Back Squat", sets: "5", reps: "5" },
    { name: "RDL", sets: "4", reps: "6" },
    { name: "Hip Thrust", sets: "4", reps: "8" },
  ],
  "Active Recovery": [
    { name: "Easy Walk", sets: "1", reps: "30 min" },
    { name: "Mobility Flow", sets: "1", reps: "15 min" },
    { name: "Foam Rolling", sets: "1", reps: "10 min" },
  ],
};

function calcBMI(w: number, h: number) {
  const m = h / 100;
  return +(w / (m * m)).toFixed(1);
}

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function calcCalories(p: UserProfile): number {
  // Mifflin-St Jeor (assuming male baseline; tweak with activity)
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + 5;
  const activity = 1.4 + (p.frequency - 4) * 0.075;
  const tdee = bmr * activity;
  if (p.goal === "weight_loss") return Math.round(tdee - 400);
  if (p.goal === "weight_gain") return Math.round(tdee + 400);
  return Math.round(tdee);
}

function buildDiet(p: UserProfile, cals: number, protein: number): Meal[] {
  const isVeg = p.diet === "veg";
  const isEgg = p.diet === "eggetarian";
  const lactose = p.healthIssues.includes("Lactose Intolerant");
  const diabetic = p.healthIssues.includes("Diabetes");

  const proteinSrc = isVeg
    ? "Tofu / Paneer / Lentils"
    : isEgg
      ? "Eggs / Paneer / Lentils"
      : "Chicken / Fish / Eggs";
  const milk = lactose ? "Almond milk" : "Milk";
  const carb = diabetic ? "Quinoa / Oats (low GI)" : "Brown rice / Roti / Oats";

  return [
    {
      meal: "Breakfast",
      description: `Oats with ${milk}, banana, 4 ${isVeg ? "almond clusters" : "egg whites + 2 whole eggs"}`,
      calories: `${Math.round(cals * 0.25)} kcal`,
    },
    {
      meal: "Mid-Morning Snack",
      description: lactose ? "Mixed nuts + fruit" : "Greek yogurt + berries",
      calories: `${Math.round(cals * 0.1)} kcal`,
    },
    {
      meal: "Lunch",
      description: `${proteinSrc} (150g) + ${carb} + salad`,
      calories: `${Math.round(cals * 0.3)} kcal`,
    },
    {
      meal: "Pre-Workout",
      description: "Black coffee + banana / dates",
      calories: `${Math.round(cals * 0.05)} kcal`,
    },
    {
      meal: "Post-Workout",
      description: `Whey ${lactose ? "(isolate)" : "protein"} shake + fruit`,
      calories: `${Math.round(cals * 0.1)} kcal`,
    },
    {
      meal: "Dinner",
      description: `${proteinSrc} (150g) + vegetables + small portion of ${carb}`,
      calories: `${Math.round(cals * 0.2)} kcal`,
    },
    {
      meal: "Daily Protein Target",
      description: `Aim for ${protein}g protein across all meals`,
      calories: "—",
    },
  ];
}

function buildSupplements(p: UserProfile): Supplement[] {
  const list: Supplement[] = [
    {
      name: p.healthIssues.includes("Lactose Intolerant") ? "Whey Isolate" : "Whey Protein",
      dosage: "25-30g",
      timing: "Post-workout",
      note: "Hits daily protein target",
    },
    { name: "Creatine Monohydrate", dosage: "5g", timing: "Daily, any time", note: "Strength & recovery" },
    { name: "Multivitamin", dosage: "1 tab", timing: "With breakfast", note: "Micronutrient insurance" },
    { name: "Omega-3 (Fish Oil)", dosage: "1-2g EPA/DHA", timing: "With meals", note: "Joint & heart health" },
    { name: "Vitamin D3", dosage: "2000 IU", timing: "With breakfast", note: "Bone & immune" },
  ];
  if (p.goal === "weight_loss") {
    list.push({ name: "Caffeine", dosage: "200mg", timing: "Pre-workout", note: "Energy & fat oxidation" });
  }
  if (p.goal === "weight_gain") {
    list.push({ name: "Mass Gainer (optional)", dosage: "1 serving", timing: "Between meals", note: "Extra calories if struggling to eat" });
  }
  if (p.healthIssues.includes("High BP")) {
    list.push({ name: "Magnesium", dosage: "300mg", timing: "Evening", note: "BP & sleep support" });
  }
  return list;
}

function notesFor(p: UserProfile): string[] {
  const n: string[] = [
    "Sleep 7-9 hours per night — recovery is when growth happens.",
    "Drink 3-4L water daily.",
    "Warm up 5-10 min before every workout.",
  ];
  if (p.healthIssues.includes("High BP")) n.push("Avoid heavy holds & Valsalva; keep rest periods longer.");
  if (p.healthIssues.includes("Diabetes")) n.push("Monitor blood sugar pre/post-workout; carry fast carbs.");
  if (p.goal === "weight_loss") n.push("Aim for a 10-15% calorie deficit — slow loss is sustainable loss.");
  if (p.goal === "weight_gain") n.push("Eat in a small surplus; track weekly weight, not daily.");
  return n;
}

export function generatePlan(p: UserProfile): FitnessPlan {
  const bmi = calcBMI(p.weight, p.height);
  const cals = calcCalories(p);
  const proteinPerKg = p.goal === "weight_gain" ? 2 : p.goal === "weight_loss" ? 2.2 : 1.8;
  const protein = Math.round(p.weight * proteinPerKg);

  const splitDays = SPLITS[p.frequency][p.goal];
  const workout: DayPlan[] = [];
  let workoutIdx = 0;
  for (let i = 0; i < 7; i++) {
    if (workoutIdx < splitDays.length && i < 6 && (i !== 3 || p.frequency === 6 || splitDays.length > 3)) {
      // simple distribution: workout days first, rest fills remainder
    }
  }
  // Distribute workouts across the week with rest days spread
  const restCount = 7 - p.frequency;
  const restPositions = new Set<number>();
  if (restCount === 1) restPositions.add(6); // Sunday
  if (restCount === 2) { restPositions.add(3); restPositions.add(6); }
  if (restCount === 3) { restPositions.add(2); restPositions.add(5); restPositions.add(6); }

  let si = 0;
  for (let i = 0; i < 7; i++) {
    if (restPositions.has(i)) {
      workout.push({ day: DAYS[i], type: "rest", focus: "Rest / Active Recovery", exercises: [
        { name: "Light walk or stretching", sets: "—", reps: "20-30 min" },
      ]});
    } else {
      const focus = splitDays[si % splitDays.length];
      workout.push({
        day: DAYS[i],
        type: "workout",
        focus,
        exercises: EXERCISES[focus] ?? [{ name: "See coach", sets: "—", reps: "—" }],
      });
      si++;
    }
  }

  return {
    bmi,
    bmiCategory: bmiCategory(bmi),
    dailyCalories: cals,
    protein,
    workout,
    diet: buildDiet(p, cals, protein),
    supplements: buildSupplements(p),
    notes: notesFor(p),
  };
}

export const GOAL_LABELS: Record<Goal, string> = {
  weight_loss: "Weight Loss",
  weight_gain: "Weight Gain",
  hybrid: "Hybrid Body",
  athletic: "Athletic Physique",
};

export const DIET_LABELS: Record<Diet, string> = {
  veg: "Vegetarian",
  non_veg: "Non-Vegetarian",
  eggetarian: "Eggetarian",
};

export const HEALTH_OPTIONS = [
  "High BP",
  "Diabetes",
  "Lactose Intolerant",
  "Thyroid",
  "Joint Pain",
];
