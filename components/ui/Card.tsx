import React from "react";

type CardProps = {
  icon: React.ComponentType;
  title: string;
  description: string;
  delay: string;
};

export default function Card({ icon: Icon, title, description, delay }: CardProps) {
  return (
    <div className="group">
      <div
        className="e-card relative w-full h-full rounded-2xl overflow-hidden bg-transparent"
        style={{
          boxShadow: "0px 8px 28px -9px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* Animated wave background */}
        <div className="playing absolute inset-0">
          <div
            className="wave absolute w-[1200px] h-[1600px] opacity-60 rounded-[40%] animate-[wave_55s_infinite_linear]"
            style={{
              left: "-50%",
              top: "-70%",
              marginLeft: "0",
              marginTop: "0",
              background:
                "linear-gradient(744deg, var(--color-accent), var(--color-background-secondary) 60%, #00ddeb)",
              animationDelay: delay,
            }}
          />
          <div
            className="wave absolute w-[1200px] h-[1600px] opacity-60 rounded-[40%] animate-[wave_50s_infinite_linear]"
            style={{
              left: "-50%",
              top: "210px",
              marginLeft: "0",
              marginTop: "0",
              background:
                "linear-gradient(744deg, var(--color-accent), var(--color-background-secondary) 60%, #00ddeb)",
              animationDelay: delay,
            }}
          />
          <div
            className="wave absolute w-[1200px] h-[1600px] opacity-60 rounded-[40%] animate-[wave_45s_infinite_linear]"
            style={{
              left: "-50%",
              top: "210px",
              marginLeft: "0",
              marginTop: "0",
              background:
                "linear-gradient(744deg, var(--color-accent), var(--color-background-secondary) 60%, #00ddeb)",
              animationDelay: delay,
            }}
          />
        </div>

        {/* Card info content */}
        <div className="infotop absolute top-[5.6em] left-0 right-0 text-center text-xl font-semibold text-white z-10">
          <div className="cardIcon [&_svg]:w-14 [&_svg]:h-14 [&_svg]:mx-auto [&_svg]:mb-4 [&_svg]:text-white group-hover:animate-[float_3s_ease-in-out_infinite]">
            <Icon />
          </div>
          <h2 className="text-[clamp(2rem,3vw,1.75rem)] font-bold text-white">
            {title}
          </h2>
          <br />
          <p className="text-white px-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
