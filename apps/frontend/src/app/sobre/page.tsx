import type { Metadata } from "next";
import { Container, Section } from "@repo/ui";
import { Code, Shield, Zap, Users, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a AidaEon: nossa história, filosofia VibeCode, valores e expertise em tecnologias de ponta para Marketing Digital, Automação e IA.",
};

const values = [
  {
    icon: Shield,
    title: "Ética e LGPD",
    description: "Compromisso total com a proteção de dados e conformidade legal em todas as nossas soluções.",
  },
  {
    icon: Target,
    title: "Transparência",
    description: "Comunicação clara sobre processos, resultados e metodologias utilizadas em cada projeto.",
  },
  {
    icon: Zap,
    title: "Inovação",
    description: "Sempre na vanguarda das tecnologias, aplicando as melhores práticas e ferramentas do mercado.",
  },
  {
    icon: Heart,
    title: "Visão de Longo Prazo",
    description: "Construímos soluções duradouras que crescem junto com o seu negócio.",
  },
];

const technologies = [
  {
    category: "Frontend & UI",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "ShadcnUI", "MagicUI"],
  },
  {
    category: "Backend & Database",
    items: ["Convex", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Docker"],
  },
  {
    category: "IA & Automação",
    items: ["N8n", "Flowise", "Typebot", "Evolution API", "LangChain", "OpenAI"],
  },
  {
    category: "Infraestrutura",
    items: ["Hostinger VPS", "EasyPanel", "Nginx", "SSL/TLS", "CDN"],
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Sobre a <span className="text-primary">AidaEon</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              A fusão entre conhecimento ancestral (Aida) e visão de futuro (Eon). 
              Especializados em Marketing Digital, Automação e IA com filosofia VibeCode.
            </p>
          </div>
        </Container>
      </Section>

      {/* Nossa História */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Nossa História e Filosofia
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-foreground-secondary leading-relaxed mb-6">
                O nome AidaEon reflete nossa essência: a combinação do legado de ajuda e conhecimento (Aida) 
                com uma visão de futuro e eras de inovação tecnológica (Eon). Nascemos da necessidade de 
                democratizar o acesso a tecnologias avançadas de IA e automação.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Nossa filosofia <strong className="text-primary">VibeCode</strong> representa nosso compromisso 
                com código limpo, eficiente e organizado. Acreditamos que a tecnologia deve ser elegante, 
                funcional e acessível, sempre priorizando a experiência do usuário e a performance.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Somos especialistas em criar soluções que unem Marketing Digital, Automação e Inteligência 
                Artificial, sempre com foco em resultados mensuráveis e conformidade com a LGPD.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Nossos Valores */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Nossos Valores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-foreground-muted">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Stack Tecnológico */}
      <Section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Nosso Stack Tecnológico
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologies.map((tech, index) => (
                <div key={index} className="bg-card rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {tech.category}
                  </h3>
                  <ul className="space-y-2">
                    {tech.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-foreground-muted flex items-center">
                        <Code className="w-4 h-4 text-primary mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Diferenciais */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Nossos Diferenciais
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  IA-First & Data-Driven
                </h3>
                <p className="text-foreground-muted">
                  Todas as nossas soluções são construídas com IA desde o início, 
                  utilizando dados para otimizar continuamente os resultados.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Memória Híbrida
                </h3>
                <p className="text-foreground-muted">
                  Nossos agentes de IA possuem memória avançada que combina 
                  dados vetoriais, relacionais e contextuais.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  LGPD Compliant
                </h3>
                <p className="text-foreground-muted">
                  Conformidade total com a Lei Geral de Proteção de Dados, 
                  garantindo segurança e privacidade.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  VibeCode Philosophy
                </h3>
                <p className="text-foreground-muted">
                  Código limpo, eficiente e organizado que garante 
                  performance e manutenibilidade.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}