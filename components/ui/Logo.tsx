export default function Logo() {
  return (
    <div
      className="flex items-center justify-center h-auto rounded-2xl cursor-pointer"
      aria-label="Logo SVG animada"
    >
      <svg
        className="w-20 h-10 [&_path]:fill-none [&_path]:stroke-foreground [&_path]:stroke-2 [&_path]:stroke-linecap-round [&_path]:stroke-linejoin-round [&_path]:[stroke-dasharray:1000] [&_path]:[stroke-dashoffset:1000] [&_path]:animate-[svgDraw_6s_ease-in-out_infinite] [&_text]:fill-none [&_text]:stroke-foreground [&_text]:stroke-2 [&_text]:stroke-linecap-round [&_text]:stroke-linejoin-round [&_text]:[stroke-dasharray:1000] [&_text]:[stroke-dashoffset:1000] [&_text]:animate-[svgDraw_6s_ease-in-out_infinite]"
        viewBox="0 0 90 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0V70.338H89.521V0H0ZM19.184 53.481L12.79 47.085L19.184 40.691L25.578 34.2971C25.578 34.2971 21.681 30.4 19.184 27.903C16.687 25.406 12.79 21.509 12.79 21.509L15.987 18.3115L19.184 15.114L28.7755 24.7055L38.367 34.2971L28.7755 43.889L19.184 53.481Z" />
        <text
          x="45"
          y="35"
          fontSize="24"
          dominantBaseline="middle"
          fill="aliceblue"
        >
          G
        </text>
      </svg>
    </div>
  );
}
