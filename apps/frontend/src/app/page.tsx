import Link from 'next/link';

import { Button, Container, Section } from '@repo/ui';
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const heroStats = [
  { label: 'Clientes Atendidos', value: '50+' },
  { label: 'ROI Médio', value: '320%' },
  { label: 'Projetos Entregues', value: '100+' },
  { label: 'Satisfação', value: '98%' },
];

const services = [
  {
    icon: Bot,
    title: 'Chatbots e Assistentes IA',
    description:
      'Agentes inteligentes com memória híbrida para atendimento 24/7 e automação de vendas.',
    features: ['WhatsApp', 'Telegram', 'Instagram', 'Memória Avançada'],
  },
  {
    icon: Zap,
    title: 'Automação de Processos',
    description:
      'Workflows inteligentes que conectam sistemas e automatizam tarefas repetitivas.',
    features: ['N8n', 'Zapier', 'Integração APIs', 'Monitoramento'],
  },
  {
    icon: Globe,
    title: 'Sites e Landing Pages',
    description:
      'Websites modernos, responsivos e otimizados para conversão com tecnologias de ponta.',
    features: ['Next.js', 'SEO Otimizado', 'Performance', 'Responsivo'],
  },
  {
    icon: BarChart3,
    title: 'Análise de Dados e BI',
    description:
      'Dashboards inteligentes e insights acionáveis para tomada de decisão estratégica.',
    features: ['Power BI', 'Dashboards', 'IA Preditiva', 'Relatórios'],
  },
  {
    icon: Target,
    title: 'Marketing Digital',
    description:
      'Estratégias data-driven para maximizar ROI em campanhas digitais.',
    features: ['Google Ads', 'Meta Ads', 'SEO', 'Analytics'],
  },
  {
    icon: Smartphone,
    title: 'Aplicativos Mobile',
    description:
      'Apps nativos e híbridos com foco em experiência do usuário e performance.',
    features: ['React Native', 'Flutter', 'UI/UX', 'Performance'],
  },
];

const differentials = [
  {
    icon: Code,
    title: 'Expertise Técnica Avançada',
    description:
      'Stack tecnológica de ponta com Next.js, IA Generativa, N8n e arquitetura escalável para soluções enterprise.',
    stat: '10+ anos',
    highlight: 'VibeCode',
  },
  {
    icon: Shield,
    title: 'Conformidade LGPD Total',
    description:
      'Todas as soluções seguem rigorosamente a LGPD, com criptografia end-to-end e políticas de privacidade robustas.',
    stat: '100%',
    highlight: 'Seguro',
  },
  {
    icon: Bot,
    title: 'Modelo IA-First',
    description:
      'Abordagem pioneira com IA Generativa, agentes conversacionais com memória e automações inteligentes.',
    stat: 'IA-First',
    highlight: 'Inovação',
  },
  {
    icon: TrendingUp,
    title: 'Resultados Comprovados',
    description:
      'ROI médio de 320% e aumento de 340% em conversões através de soluções data-driven e otimizadas.',
    stat: '320%',
    highlight: 'ROI',
  },
  {
    icon: Clock,
    title: 'Entrega Ágil',
    description:
      'Metodologia ágil com entregas em sprints, garantindo rapidez sem comprometer a qualidade.',
    stat: '14 dias',
    highlight: 'Velocidade',
  },
  {
    icon: Users,
    title: 'Suporte Especializado',
    description:
      'Equipe técnica dedicada com suporte contínuo, treinamento e consultoria estratégica incluída.',
    stat: '24/7',
    highlight: 'Suporte',
  },
];

const successCases = [
  {
    name: 'Maria Silva',
    role: 'CEO, Fashion Store',
    company: 'E-commerce Fashion',
    sector: 'Varejo',
    content:
      'A AidaEon transformou completamente nossa operação. O chatbot não só aumentou nossas vendas em 340%, mas também melhorou drasticamente a experiência dos nossos clientes. A automação de atendimento reduziu nosso tempo de resposta de horas para segundos.',
    rating: 5,
    metrics: [
      { label: 'Vendas', value: '+340%', icon: TrendingUp },
      { label: 'Tempo Resposta', value: '<30s', icon: Clock },
      { label: 'Satisfação', value: '98%', icon: Star },
      { label: 'ROI', value: '450%', icon: Award },
    ],
    technologies: ['WhatsApp IA', 'Typebot', 'N8n', 'Analytics'],
    timeline: '3 meses',
    challenge: 'Alto volume de atendimento manual e baixa conversão',
    solution: 'Chatbot inteligente com IA conversacional e automação de vendas',
    featured: true,
  },
  {
    name: 'Dr. João Santos',
    role: 'Diretor Médico',
    company: 'Clínica Especializada',
    sector: 'Saúde',
    content:
      'Nossos pacientes adoram a praticidade do agendamento pelo WhatsApp. Reduzimos drasticamente as faltas em 70% e melhoramos nossa organização. O sistema de lembretes inteligentes revolucionou nossa gestão.',
    rating: 5,
    metrics: [
      { label: 'No-show', value: '-70%', icon: Users },
      { label: 'Agendamentos', value: '+250%', icon: Calendar },
      { label: 'Eficiência', value: '+300%', icon: Zap },
      { label: 'Satisfação', value: '96%', icon: Heart },
    ],
    technologies: ['Typebot', 'Google Calendar', 'Flowise', 'FastAPI'],
    timeline: '2 meses',
    challenge: 'Alto índice de faltas e gestão manual de agendamentos',
    solution: 'Sistema automatizado de agendamento com lembretes inteligentes',
    featured: false,
  },
  {
    name: 'Carlos Mendes',
    role: 'Diretor Comercial',
    company: 'Imobiliária Premium',
    sector: 'Imóveis',
    content:
      'A qualidade dos leads melhorou significativamente. O sistema de IA consegue identificar clientes realmente interessados, otimizando nosso tempo de vendas. Nossa taxa de conversão triplicou em apenas 4 meses.',
    rating: 5,
    metrics: [
      { label: 'Leads', value: '+400%', icon: Users },
      { label: 'Conversão', value: '+300%', icon: Target },
      { label: 'Vendas', value: '+180%', icon: TrendingUp },
      { label: 'ROI', value: '520%', icon: Award },
    ],
    technologies: ['Next.js', 'Convex', 'OpenAI', 'N8n'],
    timeline: '4 meses',
    challenge: 'Baixa qualidade de leads e processo de vendas ineficiente',
    solution: 'Plataforma de captação com IA e automação de vendas',
    featured: true,
  },
];

const technologies = [
  'Next.js',
  'React',
  'Convex',
  'OpenAI',
  'N8n',
  'Typebot',
  'Flowise',
  'Evolution API',
  'Tailwind CSS',
  'FastAPI',
  'PostgreSQL',
  'Power BI',
  'Docker',
  'Vercel',
];

const pillars = [
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    description:
      'Estratégias data-driven para maximizar ROI e acelerar o crescimento do seu negócio através de campanhas inteligentes.',
    features: ['Google Ads', 'Meta Ads', 'SEO Avançado', 'Analytics IA'],
  },
  {
    icon: Bot,
    title: 'Automação & IA',
    description:
      'Agentes conversacionais inteligentes e automações que transformam processos e melhoram a experiência do cliente.',
    features: [
      'WhatsApp IA',
      'Chatbots Avançados',
      'Workflows N8n',
      'Memória Híbrida',
    ],
  },
  {
    icon: Settings,
    title: 'Otimização de Processos',
    description:
      'Análise e reestruturação de fluxos operacionais para máxima eficiência e redução de custos.',
    features: [
      'Análise de Processos',
      'Dashboards BI',
      'Integração APIs',
      'Monitoramento',
    ],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="from-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-r via-transparent" />
          <div className="bg-primary/20 absolute left-1/4 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 opacity-20 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="space-y-10">
                <div className="space-y-8">
                  <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
                    <Zap className="mr-2 h-4 w-4" />
                    Tecnologia de Ponta em IA
                  </div>

                  <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                    Transforme seu{' '}
                    <span className="from-primary bg-gradient-to-r to-blue-400 bg-clip-text text-transparent">
                      Negócio
                    </span>{' '}
                    com Inteligência Artificial
                  </h1>

                  <p className="max-w-2xl text-xl leading-relaxed text-slate-300 md:text-2xl">
                    Desenvolvemos soluções inteligentes de automação, chatbots e
                    análise de dados que geram resultados reais e mensuráveis
                    para sua empresa.
                  </p>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row">
                  <Link href="/contato">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 w-full px-8 py-4 text-lg text-white sm:w-auto"
                    >
                      Solicitar Orçamento Gratuito
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/servicos">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-slate-600 px-8 py-4 text-lg text-white hover:bg-slate-800 sm:w-auto"
                    >
                      Conhecer Soluções
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 lg:grid-cols-4">
                  {heroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                {/* AI Visual Element */}
                <div className="relative">
                  <div className="from-primary/30 absolute inset-0 rounded-3xl bg-gradient-to-br to-blue-500/30 blur-xl" />
                  <div className="relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 backdrop-blur-xl">
                    <div className="space-y-8">
                      {/* AI Brain Icon */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="bg-primary/20 absolute inset-0 rounded-full blur-lg" />
                          <div className="from-primary relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br to-blue-400">
                            <Bot className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-center">
                        <h3 className="text-2xl font-bold text-white">
                          IA Conversacional Avançada
                        </h3>
                        <p className="leading-relaxed text-slate-300">
                          Agentes inteligentes com memória híbrida que aprendem
                          e evoluem com cada interação, oferecendo atendimento
                          personalizado 24/7.
                        </p>
                      </div>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center transition-colors hover:bg-slate-700/50">
                          <MessageSquare className="text-primary mx-auto mb-3 h-8 w-8" />
                          <div className="mb-1 font-semibold text-white">
                            WhatsApp IA
                          </div>
                          <div className="text-xs text-slate-400">
                            Conversas Inteligentes
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center transition-colors hover:bg-slate-700/50">
                          <Zap className="text-primary mx-auto mb-3 h-8 w-8" />
                          <div className="mb-1 font-semibold text-white">
                            Automação
                          </div>
                          <div className="text-xs text-slate-400">
                            Processos Inteligentes
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center transition-colors hover:bg-slate-700/50">
                          <BarChart3 className="text-primary mx-auto mb-3 h-8 w-8" />
                          <div className="mb-1 font-semibold text-white">
                            Analytics IA
                          </div>
                          <div className="text-xs text-slate-400">
                            Insights Preditivos
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center transition-colors hover:bg-slate-700/50">
                          <Shield className="text-primary mx-auto mb-3 h-8 w-8" />
                          <div className="mb-1 font-semibold text-white">
                            LGPD
                          </div>
                          <div className="text-xs text-slate-400">
                            100% Seguro
                          </div>
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
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
                Nossos <span className="text-primary">Pilares de Serviço</span>
              </h2>
              <p className="text-muted mx-auto max-w-3xl text-xl">
                Três pilares fundamentais que sustentam o crescimento e a
                transformação digital do seu negócio.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className="from-background to-secondary border-border group relative rounded-2xl border bg-gradient-to-br p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Background Gradient Effect */}
                    <div className="from-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Icon */}
                    <div className="from-primary to-primary/80 relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-foreground group-hover:text-primary mb-4 text-2xl font-bold transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-muted mb-6 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3">
                        {pillar.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <div className="bg-primary mr-2 h-2 w-2 flex-shrink-0 rounded-full" />
                            <span className="text-muted group-hover:text-foreground transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="border-primary/20 absolute inset-0 rounded-2xl border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link href="/servicos">
                <Button size="lg" className="group">
                  Explorar Todos os Serviços
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section className="bg-secondary py-20">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
                Nossas <span className="text-primary">Soluções</span>
              </h2>
              <p className="text-muted mx-auto max-w-3xl text-xl">
                Oferecemos um ecossistema completo de soluções tecnológicas para
                acelerar o crescimento do seu negócio.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-background border-border rounded-xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
                      <Icon className="text-primary h-7 w-7" />
                    </div>
                    <h3 className="text-foreground mb-4 text-xl font-bold">
                      {service.title}
                    </h3>
                    <p className="text-muted mb-6">{service.description}</p>
                    <ul className="text-muted space-y-2 text-sm">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="text-primary mr-2 mt-1 h-4 w-4 flex-shrink-0" />
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
      <Section className="from-secondary via-background to-secondary bg-gradient-to-br py-20">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
                Nossos <span className="text-primary">Diferenciais</span>
              </h2>
              <p className="text-muted mx-auto max-w-4xl text-xl">
                O que nos torna únicos no mercado de transformação digital e
                automação inteligente.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {differentials.map((differential, index) => {
                const Icon = differential.icon;
                return (
                  <div
                    key={index}
                    className="bg-background/80 border-border/50 hover:border-primary/30 group relative rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {/* Background Glow Effect */}
                    <div className="from-primary/5 to-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Highlight Badge */}
                    <div className="from-primary to-primary/80 absolute -right-3 -top-3 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white shadow-lg">
                      {differential.highlight}
                    </div>

                    {/* Icon */}
                    <div className="from-primary/20 to-primary/10 relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                      <Icon className="text-primary h-8 w-8" />
                    </div>

                    {/* Stat */}
                    <div className="text-primary mb-3 text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
                      {differential.stat}
                    </div>

                    {/* Content */}
                    <h3 className="text-foreground group-hover:text-primary mb-4 text-xl font-bold transition-colors duration-300">
                      {differential.title}
                    </h3>
                    <p className="text-muted group-hover:text-foreground leading-relaxed transition-colors duration-300">
                      {differential.description}
                    </p>

                    {/* Hover Border Effect */}
                    <div className="border-primary/20 absolute inset-0 rounded-2xl border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-background/80 border-border/50 mx-auto max-w-4xl rounded-2xl border p-8 backdrop-blur-sm">
                <h3 className="text-foreground mb-4 text-2xl font-bold">
                  Transformação Digital com{' '}
                  <span className="text-primary">Resultados Garantidos</span>
                </h3>
                <p className="text-muted mb-6">
                  Nossa abordagem IA-first e expertise técnica avançada garantem
                  soluções que realmente transformam negócios.
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
      <Section className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 dark:from-slate-900 dark:to-slate-800">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <div className="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
                <Award className="mr-2 h-4 w-4" />
                Transformação Digital Comprovada
              </div>
              <h2 className="text-foreground mb-6 text-4xl font-bold md:text-6xl">
                Cases de{' '}
                <span className="from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-transparent">
                  Sucesso
                </span>
              </h2>
              <p className="text-muted mx-auto max-w-4xl text-xl leading-relaxed">
                Descubra como empresas de diferentes setores alcançaram
                resultados extraordinários com nossas soluções de IA e
                automação.
              </p>
            </div>

            <div className="mb-16 grid gap-8 lg:grid-cols-3">
              {successCases.map((case_, index) => (
                <div
                  key={index}
                  className={`bg-background/80 group relative rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    case_.featured
                      ? 'border-primary/30 shadow-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/20'
                  }`}
                >
                  {case_.featured && (
                    <div className="absolute -top-3 left-6">
                      <div className="from-primary rounded-full bg-gradient-to-r to-blue-600 px-4 py-1 text-xs font-semibold text-white">
                        ⭐ Destaque
                      </div>
                    </div>
                  )}

                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(case_.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-500"
                      />
                    ))}
                    <span className="text-muted ml-2 text-sm font-medium">
                      {case_.sector}
                    </span>
                  </div>

                  <p className="text-muted mb-6 text-sm italic leading-relaxed">
                    "{case_.content}"
                  </p>

                  {/* Metrics Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {case_.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-800/50"
                      >
                        <div className="mb-1 flex items-center justify-center">
                          <metric.icon className="text-primary h-4 w-4" />
                        </div>
                        <div className="text-primary text-lg font-bold">
                          {metric.value}
                        </div>
                        <div className="text-muted text-xs">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="text-muted mb-2 text-xs font-medium">
                      Tecnologias:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {case_.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="border-border flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-foreground text-sm font-semibold">
                        {case_.name}
                      </p>
                      <p className="text-muted text-xs">{case_.role}</p>
                      <p className="text-muted text-xs font-medium">
                        {case_.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-muted mb-1 text-xs">Timeline</div>
                      <div className="text-primary text-sm font-bold">
                        {case_.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="from-primary/10 border-primary/20 rounded-2xl border bg-gradient-to-r to-blue-600/10 p-8 text-center">
              <h3 className="text-foreground mb-4 text-2xl font-bold">
                Pronto para ser o próximo caso de sucesso?
              </h3>
              <p className="text-muted mx-auto mb-6 max-w-2xl">
                Agende uma consultoria gratuita e descubra como podemos
                transformar seu negócio com IA e automação.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="from-primary hover:from-primary/90 bg-gradient-to-r to-blue-600 hover:to-blue-600/90"
                  >
                    Agendar Consultoria Gratuita
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline">
                    Ver Todos os Cases
                    <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
              Nossa <span className="text-primary">Stack Tecnológica</span>
            </h2>
            <p className="text-muted mb-12 text-xl">
              Utilizamos as ferramentas mais modernas e poderosas para construir
              soluções de alta performance.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-secondary border-border flex flex-col items-center justify-center rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-foreground text-center font-semibold">
                    {tech}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Final Section */}
      <Section className="from-primary/5 via-secondary to-primary/10 relative overflow-hidden bg-gradient-to-br py-24">
        {/* Background Effects */}
        <div className="bg-grid-white/[0.02] bg-grid-16 absolute inset-0">
          <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
        <div className="bg-primary/20 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            {/* Main CTA Content */}
            <div className="mb-12">
              <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <Zap className="h-4 w-4" />
                Transformação Digital Garantida
              </div>

              <h2 className="text-foreground mb-6 text-4xl font-bold leading-tight md:text-6xl">
                Pronto para{' '}
                <span className="text-primary from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                  Revolucionar
                </span>
                <br />
                seu Negócio?
              </h2>

              <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl leading-relaxed">
                Junte-se a mais de{' '}
                <strong className="text-primary">50+ empresas</strong> que já
                transformaram seus resultados com nossas soluções de IA,
                automação e marketing digital.
              </p>
            </div>

            {/* Stats Row */}
            <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contato">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Solicitar Orçamento Gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/planos">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Ver Planos e Preços
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="text-muted-foreground flex flex-col items-center justify-center gap-6 text-sm sm:flex-row">
              <div className="flex items-center gap-2">
                <Shield className="text-primary h-4 w-4" />
                <span>100% Conformidade LGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-primary h-4 w-4" />
                <span>Resultados Garantidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-primary h-4 w-4" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
