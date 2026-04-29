import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function SocialNavBar() {
  const links = [
    {
      href: "https://www.linkedin.com/in/gabrielnascimento-dev/",
      label: "Link para Linkedin",
      tooltip: "linkedin",
      icon: FaLinkedinIn,
      hoverColor: "#0a66c2",
    },
    {
      href: "https://www.github.com/GabrielNBS",
      label: "Link para Github",
      tooltip: "github",
      icon: FaGithub,
      hoverColor: "#181717",
    },
    {
      href: "https://wa.me/+5532984286600?text=Olá!%20Gostaria%20de%20entrar%20em%20contato.",
      label: "Link para Whatsapp",
      tooltip: "whatsapp",
      icon: FaWhatsapp,
      hoverColor: "#25d366",
    },
  ];

  return (
    <div>
      <ul className="inline-flex list-none h-[120px] justify-center mt-[50px] [&_svg]:text-[2rem]">
        {links.map((link) => (
          <li
            key={link.tooltip}
            className="group relative bg-transparent rounded-full mx-2.5 w-[50px] h-[50px] text-lg flex justify-center items-center flex-col cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
            style={{
              boxShadow: `0 10px 10px rgba(var(--color-shadow-secondary))`,
            }}
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex justify-center items-center"
            >
              <span
                className="absolute top-0 text-sm text-white py-[5px] px-2 rounded-[5px]
                opacity-0 pointer-events-none
                transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                group-hover:-top-[45px] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                before:absolute before:content-[''] before:h-2 before:w-2 before:-bottom-[3px]
                before:left-1/2 before:-translate-x-1/2 before:rotate-45
                before:transition-all before:duration-300 before:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
                style={
                  {
                    backgroundColor: "#fff",
                    "--hover-color": link.hoverColor,
                  } as React.CSSProperties
                }
              >
                <style>{`
                  .group:hover .tooltip-${link.tooltip} {
                    background-color: ${link.hoverColor} !important;
                  }
                  .group:hover .tooltip-${link.tooltip}::before {
                    background-color: ${link.hoverColor} !important;
                  }
                `}</style>
                <span className={`tooltip-${link.tooltip}`}>{link.tooltip}</span>
              </span>
              <link.icon className="text-foreground text-[1.2em]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
