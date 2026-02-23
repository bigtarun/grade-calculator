export function getResult(percentage) {
  if (percentage >= 90) return { state: "happy",   grade: "A+", gradeClass: "A", message: "Outstanding! You're brilliant! 🎉" };
  if (percentage >= 80) return { state: "happy",   grade: "A",  gradeClass: "A", message: "Excellent work! Keep it up! ⭐" };
  if (percentage >= 70) return { state: "neutral", grade: "B",  gradeClass: "B", message: "Good job, almost at the top! 👍" };
  if (percentage >= 60) return { state: "neutral", grade: "C",  gradeClass: "C", message: "Decent! A little more push! 💡" };
  if (percentage >= 40) return { state: "sad",     grade: "D",  gradeClass: "D", message: "Keep trying, you'll get there! 💪" };
  return                       { state: "sad",     grade: "F",  gradeClass: "D", message: "Don't give up — try again! 🌱" };
}

export const GRADE_COLORS = {
  A: "#059669",
  B: "#0284c7",
  C: "#d97706",
  D: "#dc2626",
};

export const DEFAULT_SUBJECTS = [
  { id: 1, name: "Math",    obtained: "", outOf: "100" },
  { id: 2, name: "Science", obtained: "", outOf: "100" },
  { id: 3, name: "English", obtained: "", outOf: "100" },
];

export const SUBJECT_ICONS = ["📐","🔬","📖","🌍","🎨","💻","🎵","📊","🏛️","🧪","📝","🔭"];

export function getIconForIndex(i) {
  return SUBJECT_ICONS[i % SUBJECT_ICONS.length];
}