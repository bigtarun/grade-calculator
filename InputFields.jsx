import { getIconForIndex } from "./gradeUtils";
export default function InputFields({ subjects, onUpdate, onRemove }) {
  return (
    <div className="fields anim-slide-up-2">
      <div className="field-headers">
        <span className="fh-subject">Subject</span>
        <span className="fh-marks">Obtained</span>
        <span className="fh-outof">Out of</span>
        <span className="fh-del"></span>
      </div>

      {subjects.map((subject, index) => (
        <div key={subject.id} className="field-row">

          <div className="field-icon">{getIconForIndex(index)}</div>

          <div className="field-name-wrap">
            <label>SUBJECT</label>
            <input
              type="text"
              className="field-text-input"
              placeholder="e.g. Math"
              value={subject.name}
              onChange={(e) => onUpdate(subject.id, "name", e.target.value)}
            />
          </div>

          <div className="field-num-wrap">
            <label>MARKS</label>
            <input
              type="number"
              className="field-num-input"
              placeholder="0"
              min="0"
              value={subject.obtained}
              onChange={(e) => onUpdate(subject.id, "obtained", e.target.value)}
            />
          </div>

          <div className="field-slash">/</div>

          <div className="field-num-wrap">
            <label>OUT OF</label>
            <input
              type="number"
              className="field-num-input"
              placeholder="100"
              min="1"
              value={subject.outOf}
              onChange={(e) => onUpdate(subject.id, "outOf", e.target.value)}
            />
          </div>

          <button
            className="remove-btn"
            onClick={() => onRemove(subject.id)}
            title="Remove subject"
          >
            ✕
          </button>

        </div>
      ))}
    </div>
  );
}