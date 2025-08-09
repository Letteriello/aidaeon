import type { Metadata } from "next";
import { Container, Section, Button, Card } from "@repo/ui";
import { 
  Bot, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Globe, 
  Smartphone, 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Database, 
  Cpu,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Descubra nossas soluções em Marketing Digital, Automação e IA: Chatbots, Automação de Processos, Sites e Landing Pages, Análise de Dados e muito mais.",
};

const services = [
  {
    icon: Bot,
    title: "Chatbots e Assistentes IA",
    description: "Agentes inteligentes com memória híbrida para atendimento 24/7 e automação de vendas.",
    features: [
      "Integração WhatsApp, Telegram, Instagram",
      "Memória vetorial e contextual avançada",
      "Processamento de linguagem natural",
      "Analytics e relatórios detalhados",
      "LGPD compliant"
    ],
    technologies: ["Typebot", "Flowise", "Evolution API", "OpenAI", "Convex"],
    category: "IA & Automação"
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Workflows inteligentes que conectam sistemas e automatizam tarefas repetitivas.",
    features: [
      "Integração entre sistemas diversos",
      "Workflows visuais e intuitivos",
      "Triggers automáticos e condicionais",
      "Monitoramento em tempo real",
      "Escalabilidade empresarial"
    ],
    technologies: ["N8n", "Zapier", "Make", "FastAPI", "Webhooks"],
    category: "Automação"
  },
  {
    icon: Globe,
    title: "Sites e Landing Pages",
    description: "Websites modernos, responsivos e otimizados para conversão com tecnologias de ponta.",
    features: [
      "Design responsivo e moderno",
      "Performance otimizada (Core Web Vitals)",
      "SEO técnico avançado",
      "Integração com CRM e Analytics",
      "Hospedagem e manutenção incluídas"
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "Desenvolvimento Web"
  },
  {
    icon: BarChart3,
    title: "Análise de Dados e BI",
    description: "Dashboards inteligentes e insights acionáveis para tomada de decisão estratégica.",
    features: [
      "Dashboards interativos e personalizados",
      "Análise preditiva com IA",
      "Integração com múltiplas fontes",
      "Relatórios automatizados",
      "Alertas e notificações inteligentes"
    ],
    technologies: ["Power BI", "Tableau", "Python", "PostgreSQL", "Apache Airflow"],
    category: "Data & Analytics"
  },
  {
    icon: Target,
    title: "Marketing Digital",
    description: "Estratégias data-driven para maximizar ROI em campanhas digitais.",
    features: [
      "Campanhas Google Ads e Meta Ads",
      "SEO técnico e de conteúdo",
      "Email marketing automatizado",
      "Social media management",
      "Análise de performance e ROI"
    ],
    technologies: ["Google Analytics", "Meta Business", "Mailchimp", "Hotjar", "SEMrush"],
    category: "Marketing"
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos com foco em experiência do usuário e performance.",
    features: [
      "Desenvolvimento nativo e híbrido",
      "UI/UX otimizada para mobile",
      "Integração com APIs e serviços",
      "Push notifications inteligentes",
      "Analytics e crash reporting"
    ],
    technologies: ["React Native", "Flutter", "Expo", "Firebase", "App Store Connect"],
    category: "Mobile"
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "ROI Comprovado",
    description: "Aumento médio de 300% na eficiência operacional dos nossos clientes."
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Conformidade LGPD e melhores práticas de segurança em todas as soluções."
  },
  {
    icon: Users,
    title: "Suporte Especializado",
    description: "Equipe técnica dedicada com suporte contínuo e treinamento incluído."
  },
  {
    icon: Database,
    title: "Escalabilidade",
    description: "Infraestrutura cloud que cresce junto com o seu negócio."
  }
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Nossos <span className="text-primary">Serviços</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Soluções completas em Marketing Digital, Automação e IA para transformar 
              seu negócio e maximizar resultados.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contato">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/planos">
                <Button variant="outline" size="lg">
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section className="py-16">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm text-primary font-medium">
                          {service.category}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground mt-1">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-foreground-muted mb-6">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Principais Funcionalidades:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-foreground-muted">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Tecnologias Utilizadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-3 py-1 bg-background-secondary text-xs font-medium text-foreground rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link href="/contato">
                      <Button className="w-full">
                        Solicitar Orçamento
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Por que escolher a AidaEon?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-foreground-muted">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Entre em contato conosco e descubra como nossas soluções podem 
              acelerar o crescimento da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Falar com Especialista
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Ver Cases de Sucesso
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}