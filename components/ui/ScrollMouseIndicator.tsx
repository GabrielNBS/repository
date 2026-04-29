export default function ScrollMouseIndicator() {
  return (
    <div
      className="flex justify-center absolute bottom-16 left-1/2 -translate-x-1/2
      w-7 h-12 border-2 border-accent rounded-2xl items-start pt-2
      opacity-0 animate-[drawMouse_0.6s_ease-out_forwards] [animation-delay:0.2s]"
    >
      <div className="w-[5px] h-[5px] rounded-full bg-accent animate-[dropDot_1.6s_ease-in-out_infinite] [animation-delay:0.8s]" />
    </div>
  );
}
