import styles from './SkillsSection.module.css';
import CardSwap, { Card } from '../CardSwap';
import SkillScene, { type SkillSceneVariant } from '../SkillScene';

interface Skill {
  title: string;
  description: string;
  scene: SkillSceneVariant;
}

const skills: Skill[] = [
  {
    title: 'React & Next.js',
    scene: 'react-next',
    description:
      'Construo interfaces componentizadas, rotas claras e experiências que sustentam produto, não só páginas.'
  },
  {
    title: 'TypeScript em escala',
    scene: 'typescript',
    description:
      'Transformo contratos, props e dados em segurança para evoluir o código com menos surpresa.'
  },
  {
    title: 'Performance Web',
    scene: 'performance',
    description:
      'Otimizo carregamento, renderização e imagens para a interface responder antes de pedir atenção.'
  },
  {
    title: 'Design Systems',
    scene: 'design-system',
    description:
      'Crio padrões reutilizáveis que dão consistência ao produto sem apagar o contexto de cada tela.'
  },
  {
    title: 'Acessibilidade',
    scene: 'accessibility',
    description:
      'Faço semântica, foco, teclado e contraste participarem da experiência desde o primeiro componente.'
  },
  {
    title: 'Frontend com IA',
    scene: 'ai-frontend',
    description:
      'Uso IA para explorar, testar e acelerar decisões, mantendo critério humano sobre código e produto.'
  }
];

export default function SkillsSection() {
  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-title">
      <div className={styles.sectionShell} data-blur-reveal>
        <div className={styles.aside}>
          <p className={styles.eyebrow}>04 / Como construo</p>
          <h2 className={styles.asideTitle} id="skills-title" data-split="lines">
            Muito mais que trocar a cor de um botão.
          </h2>
          <p className={styles.asideCopy}>
            A tela é só a parte mais visível. Um bom front-end combina decisão visual, estrutura e
            cuidado com o que acontece entre um clique e outro.
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.cardSwapViewport}>
            <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
              {skills.map((skill, index) => (
                <Card
                  key={skill.title}
                  customClass={styles.swapCard}
                  tabIndex={0}
                  aria-label={`${skill.title}: ${skill.description}`}
                >
                  <SkillScene variant={skill.scene} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardMark} aria-hidden="true">
                        0{index + 1}
                      </span>
                      <h3 className={styles.cardTitle}>{skill.title}</h3>
                    </div>
                    <p className={styles.cardDescription}>{skill.description}</p>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
