import Link from "next/link";
import { Button, Container, Section } from "@repo/ui";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  TrendingUp, 
  Bot, 
  Globe, 
  BarChart3,
  Users,
  CheckCircle,
  Star,
  MessageSquare,
  Smartphone,
  Target,
  Award,
  Clock,
  Code
} from "lucide-react";

const heroStats = [
  { label: "Clientes Atendidos", value: "50+" },
  { label: "ROI Médio", value: "320%" },
  { label: "Projetos Entregues", value: "100+" },
  { label: "Satisfação", value: "98%" }
];

const services = [
  {
    icon: Bot,
    title: "Chatbots e Assistentes IA",
    description: "Agentes inteligentes com memória híbrida para atendimento 24/7 e automação de vendas.",
    features: ["WhatsApp", "Telegram", "Instagram", "Memória Avançada"]
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Workflows inteligentes que conectam sistemas e automatizam tarefas repetitivas.",
    features: ["N8n", "Zapier", "Integração APIs", "Monitoramento"]
  },
  {
    icon: Globe,
    title: "Sites e Landing Pages",
    description: "Websites modernos, responsivos e otimizados para conversão com tecnologias de ponta.",
    features: ["Next.js", "SEO Otimizado", "Performance", "Responsivo"]
  },
  {
    icon: BarChart3,
    title: "Análise de Dados e BI",
    description: "Dashboards inteligentes e insights acionáveis para tomada de decisão estratégica.",
    features: ["Power BI", "Dashboards", "IA Preditiva", "Relatórios"]
  },
  {
    icon: Target,
    title: "Marketing Digital",
    description: "Estratégias data-driven para maximizar ROI em campanhas digitais.",
    features: ["Google Ads", "Meta Ads", "SEO", "Analytics"]
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos com foco em experiência do usuário e performance.",
    features: ["React Native", "Flutter", "UI/UX", "Performance"]
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "ROI Comprovado",
    description: "Aumento médio de 300% na eficiência operacional dos nossos clientes.",
    stat: "300%"
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Conformidade LGPD e melhores práticas de segurança em todas as soluções.",
    stat: "100%"
  },
  {
    icon: Clock,
    title: "Entrega Rápida",
    description: "Projetos entregues em média 50% mais rápido que a concorrência.",
    stat: "14 dias"
  },
  {
    icon: Users,
    title: "Suporte 24/7",
    description: "Equipe técnica dedicada com suporte contínuo e treinamento incluído.",
    stat: "24/7"
  }
];

const testimonials = [
  {
    name: "Maria Silva",
    role: "CEO, Fashion Store",
    company: "E-commerce",
    content: "A AidaEon transformou completamente nossa operação. O chatbot não só aumentou nossas vendas em 340%, mas também melhorou drasticamente a experiência dos nossos clientes.",
    rating: 5,
    results: "+340% vendas"
  },
  {
    name: "Dr. João Santos",
    role: "Diretor Médico",
    company: "Clínica Especializada",
    content: "Nossos pacientes adoram a praticidade do agendamento pelo WhatsApp. Reduzimos drasticamente as faltas em 70% e melhoramos nossa organização.",
    rating: 5,
    results: "-70% no-show"
  },
  {
    name: "Carlos Mendes",
    role: "Diretor Comercial",
    company: "Imobiliária Premium",
    content: "A qualidade dos leads melhorou significativamente. O sistema de IA consegue identificar clientes realmente interessados, otimizando nosso tempo de vendas.",
    rating: 5,
    results: "+400% leads"
  }
];

const technologies = [
  "Next.js", "React", "Convex", "OpenAI", "N8n", "Typebot", 
  "Flowise", "Evolution API", "Tailwind CSS", "FastAPI", 
  "PostgreSQL", "Power BI", "Docker", "Vercel"
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary pt-24 pb-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Transforme seu negócio com{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  IA e Automação
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted mb-8 max-w-4xl mx-auto leading-relaxed">
                A <strong className="text-primary">AidaEon</strong> é especializada em Marketing Digital, Automação e Inteligência Artificial. 
                Soluções que geram resultados reais com nossa filosofia <strong className="text-primary">VibeCode</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/contato">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
                    Começar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Nossos Serviços
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section className="py-20 bg-secondary">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Nossas <span className="text-primary">Soluções</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Oferecemos um ecossistema completo de soluções tecnológicas para acelerar 
                o crescimento do seu negócio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-background rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 text-sm text-muted">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/servicos">
                <Button size="lg" variant="outline">
                  Ver Todos os Serviços
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Por que escolher a <span className="text-primary">AidaEon</span>?
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Nossos diferenciais garantem resultados excepcionais para o seu negócio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center p-6 bg-secondary rounded-xl">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {benefit.stat}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section className="py-20 bg-secondary">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Cases de <span className="text-primary">Sucesso</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Veja como transformamos negócios com nossas soluções.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-background rounded-xl p-8 border border-border">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted">
                        {testimonial.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {testimonial.results}
                      </div>
                      <div className="text-xs text-muted">
                        Resultado
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/portfolio">
                <Button size="lg" variant="outline">
                  Ver Mais Cases
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Technologies Section */}
      <Section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Nossa <span className="text-primary">Stack Tecnológica</span>
            </h2>
            <p className="text-xl text-muted mb-12">
              Utilizamos as ferramentas mais modernas e poderosas para construir soluções de alta performance.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {technologies.map((tech, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-6 bg-secondary rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <tech.icon className="w-12 h-12 text-primary mb-4" />
                  <p className="font-semibold text-foreground text-center">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-secondary">
        <Container>
          <div className="max-w-4xl mx-auto text-center bg-background rounded-2xl p-12 border border-border shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para <span className="text-primary">Elevar</span> seu Negócio?
            </h2>
            <p className="text-lg text-muted mb-8">
              Vamos conversar sobre como nossas soluções podem ajudar sua empresa a crescer.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  Conhecer Serviços
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
