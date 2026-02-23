import { GRADE_COLORS } from "./gradeUtils";

export default function StatusStrip({ score, totals, result }) {
  const gradeColor = result ? GRADE_COLORS[result.gradeClass] : "var(--ink)";

  return (
    <div className="status-strip anim-slide-up-1">

      <div className="stat-box">
        <div className="stat-label">SCORE %</div>
        <div className="stat-value fredoka">
          {score != null ? `${score}%` : "—"}
        </div>
      </div>

      <div className="stat-box grade-box">
        <div className="stat-label">GRADE</div>
        <div className="stat-value fredoka" style={{ color: gradeColor, transition: "color .3s ease" }}>
          {result?.grade ?? "?"}
        </div>
      </div>

      <div className="stat-box msg-box">
        {totals && (
          <div className="stat-totals">{totals} marks</div>
        )}
        <p className="stat-msg">
          {result?.message ?? "Enter marks below!"}
        </p>
      </div>

    </div>
  );
}