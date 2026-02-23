import { useCallback, useEffect, useRef, useState } from "react";
import Face from "./Face";
import StatusStrip from "./StatusStrip";
import InputFields from "./InputFields";
import SceneCharacter from "./SceneCharacter";
import { getResult, DEFAULT_SUBJECTS } from "./gradeUtils";
import "./style.css";

let nextId = DEFAULT_SUBJECTS.length + 1;

export default function App() {
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [score,    setScore]    = useState(null);
  const [totals,   setTotals]   = useState(null);
  const [result,   setResult]   = useState(null);
  const [popKey,   setPopKey]   = useState(0);
  const [error,    setError]    = useState("");
  const wrapRef = useRef(null);

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { id: nextId++, name: "", obtained: "", outOf: "100" },
    ]);
  };

  const removeSubject = (id) => {
    setSubjects((prev) => prev.length > 1 ? prev.filter((s) => s.id !== id) : prev);
  };

  const updateSubject = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculate = useCallback(() => {
    setError("");

    for (const s of subjects) {
      if (!s.name.trim()) { setError("Please give every subject a name."); return; }
      if (s.obtained === "" || s.outOf === "") { setError("Please fill in all marks."); return; }
      const ob = Number(s.obtained), oo = Number(s.outOf);
      if (isNaN(ob) || isNaN(oo) || oo <= 0) { setError("Marks must be valid numbers, and 'out of' must be > 0."); return; }
      if (ob > oo) { setError(`"${s.name}": obtained marks can't exceed total marks.`); return; }
      if (ob < 0)  { setError("Marks can't be negative."); return; }
    }

    const totalObtained = subjects.reduce((sum, s) => sum + Number(s.obtained), 0);
    const totalPossible = subjects.reduce((sum, s) => sum + Number(s.outOf),     0);
    const pct           = (totalObtained / totalPossible) * 100;

    setScore(pct.toFixed(1));
    setTotals(`${totalObtained} / ${totalPossible}`);
    setResult(getResult(pct));
    setPopKey((k) => k + 1);
  }, [subjects]);

  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current) return;
      wrapRef.current.querySelectorAll(".iris-el").forEach((iris) => {
        const r  = iris.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist  = Math.min(5, Math.hypot(dx, dy) / 12);
        iris.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Enter") calculate(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [calculate]);

  const btnEnter = (e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "8px 8px 0 #1a1025"; };
  const btnLeave = (e) => { e.currentTarget.style.transform = "";                     e.currentTarget.style.boxShadow = "6px 6px 0 #1a1025"; };
  const btnDown  = (e) => { e.currentTarget.style.transform = "translate(3px,3px)";   e.currentTarget.style.boxShadow = "1px 1px 0 #1a1025"; };
  const btnUp    = (e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "8px 8px 0 #1a1025"; };

  return (
    <>
      <div className="bg-dots" />
      <main ref={wrapRef} className="app">

        <div className="title-block anim-slide-down">
          <div className="title-tag">★ STUDENT REPORT CARD ★</div>
          <h1 className="fredoka">
            Grade <span className="coral-text">Calc</span>
          </h1>
        </div>

        <SceneCharacter>
          <Face key={popKey} state={result?.state ?? "idle"} animate={popKey > 0} />
        </SceneCharacter>

        <StatusStrip score={score} totals={totals} result={result} />

        <InputFields
          subjects={subjects}
          onUpdate={updateSubject}
          onRemove={removeSubject}
        />

        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        <button
          className="add-btn anim-slide-up-3"
          onClick={addSubject}
          onMouseEnter={btnEnter}
          onMouseLeave={btnLeave}
          onMouseDown={btnDown}
          onMouseUp={btnUp}
        >
          <span>+ Add Subject</span>
        </button>

        <button
          className="go-btn anim-slide-up-3"
          onClick={calculate}
          onMouseEnter={btnEnter}
          onMouseLeave={btnLeave}
          onMouseDown={btnDown}
          onMouseUp={btnUp}
        >
          <span className="go-text">Calculate!</span>
          <span className="go-icon anim-rocket">🚀</span>
        </button>

      </main>
    </>
  );
}