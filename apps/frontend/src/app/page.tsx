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
  Code,
  Megaphone,
  Settings,
  Lightbulb,
  ShoppingCart,
  Heart,
  Building,
  Briefcase,
  GraduationCap
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

const differentials = [
  {
    icon: Code,
    title: "Expertise Técnica Avançada",
    description: "Stack tecnológica de ponta com Next.js, IA Generativa, N8n e arquitetura escalável para soluções enterprise.",
    stat: "10+ anos",
    highlight: "VibeCode"
  },
  {
    icon: Shield,
    title: "Conformidade LGPD Total",
    description: "Todas as soluções seguem rigorosamente a LGPD, com criptografia end-to-end e políticas de privacidade robustas.",
    stat: "100%",
    highlight: "Seguro"
  },
  {
    icon: Bot,
    title: "Modelo IA-First",
    description: "Abordagem pioneira com IA Generativa, agentes conversacionais com memória e automações inteligentes.",
    stat: "IA-First",
    highlight: "Inovação"
  },
  {
    icon: TrendingUp,
    title: "Resultados Comprovados",
    description: "ROI médio de 320% e aumento de 340% em conversões através de soluções data-driven e otimizadas.",
    stat: "320%",
    highlight: "ROI"
  },
  {
    icon: Clock,
    title: "Entrega Ágil",
    description: "Metodologia ágil com entregas em sprints, garantindo rapidez sem comprometer a qualidade.",
    stat: "14 dias",
    highlight: "Velocidade"
  },
  {
    icon: Users,
    title: "Suporte Especializado",
    description: "Equipe técnica dedicada com suporte contínuo, treinamento e consultoria estratégica incluída.",
    stat: "24/7",
    highlight: "Suporte"
  }
];

const successCases = [
  {
    name: "Maria Silva",
    role: "CEO, Fashion Store",
    company: "E-commerce Fashion",
    sector: "Varejo",
    content: "A AidaEon transformou completamente nossa operação. O chatbot não só aumentou nossas vendas em 340%, mas também melhorou drasticamente a experiência dos nossos clientes. A automação de atendimento reduziu nosso tempo de resposta de horas para segundos.",
    rating: 5,
    metrics: [
      { label: "Vendas", value: "+340%", icon: TrendingUp },
      { label: "Tempo Resposta", value: "<30s", icon: Clock },
      { label: "Satisfação", value: "98%", icon: Star },
      { label: "ROI", value: "450%", icon: Award }
    ],
    technologies: ["WhatsApp IA", "Typebot", "N8n", "Analytics"],
    timeline: "3 meses",
    challenge: "Alto volume de atendimento manual e baixa conversão",
    solution: "Chatbot inteligente com IA conversacional e automação de vendas",
    featured: true
  },
  {
    name: "Dr. João Santos",
    role: "Diretor Médico",
    company: "Clínica Especializada",
    sector: "Saúde",
    content: "Nossos pacientes adoram a praticidade do agendamento pelo WhatsApp. Reduzimos drasticamente as faltas em 70% e melhoramos nossa organização. O sistema de lembretes inteligentes revolucionou nossa gestão.",
    rating: 5,
    metrics: [
      { label: "No-show", value: "-70%", icon: Users },
      { label: "Agendamentos", value: "+250%", icon: Calendar },
      { label: "Eficiência", value: "+300%", icon: Zap },
      { label: "Satisfação", value: "96%", icon: Heart }
    ],
    technologies: ["Typebot", "Google Calendar", "Flowise", "FastAPI"],
    timeline: "2 meses",
    challenge: "Alto índice de faltas e gestão manual de agendamentos",
    solution: "Sistema automatizado de agendamento com lembretes inteligentes",
    featured: false
  },
  {
    name: "Carlos Mendes",
    role: "Diretor Comercial",
    company: "Imobiliária Premium",
    sector: "Imóveis",
    content: "A qualidade dos leads melhorou significativamente. O sistema de IA consegue identificar clientes realmente interessados, otimizando nosso tempo de vendas. Nossa taxa de conversão triplicou em apenas 4 meses.",
    rating: 5,
    metrics: [
      { label: "Leads", value: "+400%", icon: Users },
      { label: "Conversão", value: "+300%", icon: Target },
      { label: "Vendas", value: "+180%", icon: TrendingUp },
      { label: "ROI", value: "520%", icon: Award }
    ],
    technologies: ["Next.js", "Convex", "OpenAI", "N8n"],
    timeline: "4 meses",
    challenge: "Baixa qualidade de leads e processo de vendas ineficiente",
    solution: "Plataforma de captação com IA e automação de vendas",
    featured: true
  }
];

const technologies = [
  "Next.js", "React", "Convex", "OpenAI", "N8n", "Typebot", 
  "Flowise", "Evolution API", "Tailwind CSS", "FastAPI", 
  "PostgreSQL", "Power BI", "Docker", "Vercel"
];

const pillars = [
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Estratégias data-driven para maximizar ROI e acelerar o crescimento do seu negócio através de campanhas inteligentes.",
    features: ["Google Ads", "Meta Ads", "SEO Avançado", "Analytics IA"]
  },
  {
    icon: Bot,
    title: "Automação & IA",
    description: "Agentes conversacionais inteligentes e automações que transformam processos e melhoram a experiência do cliente.",
    features: ["WhatsApp IA", "Chatbots Avançados", "Workflows N8n", "Memória Híbrida"]
  },
  {
    icon: Settings,
    title: "Otimização de Processos",
    description: "Análise e reestruturação de fluxos operacionais para máxima eficiência e redução de custos.",
    features: ["Análise de Processos", "Dashboards BI", "Integração APIs", "Monitoramento"]
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                    <Zap className="w-4 h-4 mr-2" />
                    Tecnologia de Ponta em IA
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Transforme seu <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Negócio</span> com Inteligência Artificial
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                    Desenvolvemos soluções inteligentes de automação, chatbots e análise de dados 
                    que geram resultados reais e mensuráveis para sua empresa.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/contato">
                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                      Solicitar Orçamento Gratuito
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/servicos">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800 px-8 py-4 text-lg">
                      Conhecer Soluções
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                  {heroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                {/* AI Visual Element */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-3xl blur-xl" />
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                    <div className="space-y-8">
                      {/* AI Brain Icon */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
                          <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center">
                            <Bot className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold text-white">
                          IA Conversacional Avançada
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          Agentes inteligentes com memória híbrida que aprendem e evoluem 
                          com cada interação, oferecendo atendimento personalizado 24/7.
                        </p>
                      </div>
                      
                      {/* Feature Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-colors">
                          <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                          <div className="text-white font-semibold mb-1">WhatsApp IA</div>
                          <div className="text-xs text-slate-400">Conversas Inteligentes</div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-colors">
                          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                          <div className="text-white font-semibold mb-1">Automação</div>
                          <div className="text-xs text-slate-400">Processos Inteligentes</div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-colors">
                          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                          <div className="text-white font-semibold mb-1">Analytics IA</div>
                          <div className="text-xs text-slate-400">Insights Preditivos</div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-colors">
                          <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                          <div className="text-white font-semibold mb-1">LGPD</div>
                          <div className="text-xs text-slate-400">100% Seguro</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pillars Section */}
      <Section className="py-20">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Nossos <span className="text-primary">Pilares de Serviço</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Três pilares fundamentais que sustentam o crescimento e a transformação digital do seu negócio.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div key={index} className="group relative bg-gradient-to-br from-background to-secondary rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Background Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-muted mb-6 leading-relaxed">
                        {pillar.description}
                      </p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3">
                        {pillar.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0" />
                            <span className="text-muted group-hover:text-foreground transition-colors duration-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/servicos">
                <Button size="lg" className="group">
                  Explorar Todos os Serviços
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */
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

      {/* Differentials Section */}
      <Section className="py-20 bg-gradient-to-br from-secondary via-background to-secondary">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Nossos <span className="text-primary">Diferenciais</span>
              </h2>
              <p className="text-xl text-muted max-w-4xl mx-auto">
                O que nos torna únicos no mercado de transformação digital e automação inteligente.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {differentials.map((differential, index) => {
                const Icon = differential.icon;
                return (
                  <div key={index} className="group relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Highlight Badge */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {differential.highlight}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    {/* Stat */}
                    <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
                      {differential.stat}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {differential.title}
                    </h3>
                    <p className="text-muted leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {differential.description}
                    </p>
                    
                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16 text-center">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Transformação Digital com <span className="text-primary">Resultados Garantidos</span>
                </h3>
                <p className="text-muted mb-6">
                  Nossa abordagem IA-first e expertise técnica avançada garantem soluções que realmente transformam negócios.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/sobre">
                    <Button variant="outline" size="lg">
                      Conheça Nossa História
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button size="lg">
                      Fale com Especialista
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Success Cases Section */}
      <Section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Transformação Digital Comprovada
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Cases de <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Sucesso</span>
              </h2>
              <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed">
                Descubra como empresas de diferentes setores alcançaram resultados extraordinários 
                com nossas soluções de IA e automação.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {successCases.map((case_, index) => (
                <div key={index} className={`group relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
                  case_.featured 
                    ? 'border-primary/30 shadow-lg shadow-primary/10' 
                    : 'border-border hover:border-primary/20'
                }`}>
                  {case_.featured && (
                    <div className="absolute -top-3 left-6">
                      <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        ⭐ Destaque
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(case_.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-muted font-medium">{case_.sector}</span>
                  </div>
                  
                  <p className="text-muted mb-6 italic leading-relaxed text-sm">
                    "{case_.content}"
                  </p>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {case_.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <metric.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-lg font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="text-xs text-muted mb-2 font-medium">Tecnologias:</div>
                    <div className="flex flex-wrap gap-1">
                      {case_.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Client Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {case_.name}
                      </p>
                      <p className="text-xs text-muted">
                        {case_.role}
                      </p>
                      <p className="text-xs text-muted font-medium">
                        {case_.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted mb-1">Timeline</div>
                      <div className="text-sm font-bold text-primary">
                        {case_.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-8 text-center border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Pronto para ser o próximo caso de sucesso?
              </h3>
              <p className="text-muted mb-6 max-w-2xl mx-auto">
                Agende uma consultoria gratuita e descubra como podemos transformar seu negócio com IA e automação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                    Agendar Consultoria Gratuita
                    <Calendar className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline">
                    Ver Todos os Cases
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
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

      {/* CTA Final Section */}
      <Section className="py-24 bg-gradient-to-br from-primary/5 via-secondary to-primary/10 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main CTA Content */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Transformação Digital Garantida
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Pronto para <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Revolucionar</span><br />
                seu Negócio?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Junte-se a mais de <strong className="text-primary">50+ empresas</strong> que já transformaram seus resultados com nossas soluções de IA, automação e marketing digital.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/contato">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageSquare className="mr-2 w-5 h-5" />
                  Solicitar Orçamento Gratuito
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/planos">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1">
                  <Target className="mr-2 w-5 h-5" />
                  Ver Planos e Preços
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Conformidade LGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>Resultados Garantidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
