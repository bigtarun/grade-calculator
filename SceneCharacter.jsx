export default function SceneCharacter({ children }) {
  return (
    <div className="scene">
      <div className="shadow-ground anim-shadow" />

      <div className="character-wrap anim-float">
        <div className="ear ear-left">
          <div className="ear-inner" />
        </div>
        <div className="ear ear-right">
          <div className="ear-inner" />
        </div>

        <div className="hair">
          <div className="hair-tuft t1" />
          <div className="hair-tuft t2" />
          <div className="hair-tuft t3" />
          <div className="hair-tuft t4" />
          <div className="hair-tuft t5" />
        </div>

        {children}

        <div className="body-stub">
          <div className="collar" />
        </div>
      </div>
    </div>
  );
}