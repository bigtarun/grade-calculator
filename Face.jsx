export default function Face({ state, animate }) {
  const isHappy   = state === "happy";
  const isSad     = state === "sad";
  const isNeutral = state === "neutral";

  const browStyle = (side) => {
    const base = {
      position: "absolute",
      height: 7,
      width: 32,
      background: "var(--ink)",
      borderRadius: 4,
      transition: "transform .4s cubic-bezier(.34,1.56,.64,1), top .4s ease",
    };
    const pos = side === "left"
      ? { left: 28, transformOrigin: "right center" }
      : { right: 28, transformOrigin: "left center" };

    if (isHappy)   return { ...base, ...pos, top: 26, transform: side === "left" ? "rotate(-8deg) translateY(-3px)" : "rotate(8deg) translateY(-3px)" };
    if (isSad)     return { ...base, ...pos, top: 30, transform: side === "left" ? "rotate(12deg) translateY(2px)"  : "rotate(-12deg) translateY(2px)" };
    if (isNeutral) return { ...base, ...pos, top: 28, transform: "rotate(0deg)" };
    return               { ...base, ...pos, top: 26, transform: side === "left" ? "rotate(-3deg)" : "rotate(3deg)" };
  };

  const mouthShape = () => {
    if (isHappy)   return { height: 30, borderRadius: "0 0 36px 36px" };
    if (isNeutral) return { height: 5,  borderRadius: "4px" };
    if (isSad)     return { height: 22, borderRadius: "40px 40px 0 0" };
    return               { height: 6,  borderRadius: "0 0 10px 10px" };
  };

  return (
    <div className={`face ${animate ? "anim-pop" : ""}`}>

      <div style={browStyle("left")}  />
      <div style={browStyle("right")} />

      <div className="eyes-row">
        {[0, 1].map((i) => (
          <div key={i} className="eye-socket anim-blink">
            <div className="iris-el iris">
              <div className="pupil" />
              <div className="eye-shine" />
            </div>
          </div>
        ))}
      </div>

      
      <div className="nose" />

      
      <div className="cheek cheek-l" style={{ opacity: isHappy || isSad ? 0.35 : 0 }} />
      <div className="cheek cheek-r" style={{ opacity: isHappy || isSad ? 0.35 : 0 }} />

      {/* Mouth */}
      <div className="mouth-area">
        <div
          className="mouth-shape"
          style={{
            ...mouthShape(),
            transition: "height .4s cubic-bezier(.34,1.56,.64,1), border-radius .4s ease",
          }}
        >
          <div className="teeth-row" style={{ opacity: isHappy ? 1 : 0, transition: "opacity .3s .1s" }} />
          <div className="tongue"    style={{ opacity: isHappy ? 1 : 0, transition: "opacity .3s .15s" }} />
        </div>
      </div>

      
      <div
        className={`tear t-left ${isSad ? "anim-tear" : ""}`}
        style={{ opacity: isSad ? 1 : 0, transform: isSad ? "translateY(0)" : "translateY(-6px)", transition: "opacity .3s ease, transform .4s ease" }}
      />
      <div
        className={`tear t-right ${isSad ? "anim-tear" : ""}`}
        style={{ opacity: isSad ? 1 : 0, transform: isSad ? "translateY(0)" : "translateY(-6px)", transition: "opacity .3s ease, transform .4s ease" }}
      />

      
      {[
        { emoji: "⭐", cls: "f1", delay: "0s"  },
        { emoji: "✦",  cls: "f2", delay: ".4s" },
        { emoji: "⭐", cls: "f3", delay: ".8s" },
      ].map((s) => (
        <div
          key={s.cls}
          className={`floaty ${s.cls} ${isHappy ? "anim-star" : ""}`}
          style={{ opacity: isHappy ? 1 : 0, animationDelay: s.delay, transition: "opacity .3s ease" }}
        >
          {s.emoji}
        </div>
      ))}

    </div>
  );
}