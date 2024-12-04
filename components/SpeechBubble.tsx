export default function SpeechBubble() {
    return (
      <div className="absolute top-0">
        {/* Main bubble */}
        <div className="bg-white rounded-3xl w-32 h-5 shadow-lg">
        </div>
        {/* Tail/pointer */}
        <div 
          className="absolute -bottom-4 left-6 w-8 h-8 bg-white"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
          }}
        >
        </div>
      </div>
    )
  }