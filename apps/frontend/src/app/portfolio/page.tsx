import type { Metadata } from "next";
import { Container, Section, Button, Card } from "@repo/ui";
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Bot,
  Globe,
  BarChart3,
  Zap,
  ShoppingCart,
  MessageSquare,
  Target,
  Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Conheça nossos cases de sucesso em Marketing Digital, Automação e IA. Projetos que transformaram negócios e geraram resultados excepcionais.",
};

const projects = [
  {
    id: 1,
    title: "E-commerce Fashion - Automação Completa",
    category: "E-commerce",
    client: "Loja de Moda Online",
    description: "Implementação de chatbot inteligente, automação de vendas e dashboard analytics para loja de roupas femininas.",
    image: "/api/placeholder/600/400",
    technologies: ["Typebot", "Evolution API", "N8n", "Convex", "Next.js"],
    results: [
      { metric: "Vendas", value: "+340%", icon: TrendingUp },
      { metric: "Atendimento", value: "24/7", icon: Clock },
      { metric: "Conversão", value: "+180%", icon: Target },
      { metric: "Satisfação", value: "98%", icon: Star }
    ],
    features: [
      "Chatbot WhatsApp com catálogo integrado",
      "Automação de follow-up pós-venda",
      "Dashboard de vendas em tempo real",
      "Integração com estoque e pagamentos",
      "Sistema de recomendações por IA"
    ],
    testimonial: {
      text: "A AidaEon transformou completamente nossa operação. O chatbot não só aumentou nossas vendas, mas também melhorou drasticamente a experiência dos nossos clientes.",
      author: "Maria Silva",
      role: "CEO, Fashion Store"
    },
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "Clínica Médica - Agendamento Inteligente",
    category: "Saúde",
    client: "Clínica Especializada",
    description: "Sistema completo de agendamento automatizado, lembretes e gestão de pacientes via WhatsApp.",
    image: "/api/placeholder/600/400",
    technologies: ["Typebot", "Google Calendar", "Flowise", "FastAPI"],
    results: [
      { metric: "Agendamentos", value: "+250%", icon: TrendingUp },
      { metric: "No-show", value: "-70%", icon: Users },
      { metric: "Eficiência", value: "+300%", icon: Zap },
      { metric: "Satisfação", value: "96%", icon: Star }
    ],
    features: [
      "Agendamento automático via WhatsApp",
      "Lembretes inteligentes personalizados",
      "Triagem inicial automatizada",
      "Integração com prontuário eletrônico",
      "Dashboard de gestão médica"
    ],
    testimonial: {
      text: "Nossos pacientes adoram a praticidade do agendamento pelo WhatsApp. Reduzimos drasticamente as faltas e melhoramos nossa organização.",
      author: "Dr. João Santos",
      role: "Diretor Médico"
    },
    link: "#",
    featured: false
  },
  {
    id: 3,
    title: "Imobiliária - Lead Generation IA",
    category: "Imóveis",
    client: "Imobiliária Premium",
    description: "Plataforma de captação e qualificação de leads com IA, site responsivo e automação de vendas.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "Convex", "OpenAI", "N8n", "Tailwind CSS"],
    results: [
      { metric: "Leads", value: "+400%", icon: Users },
      { metric: "Qualificação", value: "+220%", icon: Target },
      { metric: "Vendas", value: "+180%", icon: TrendingUp },
      { metric: "ROI", value: "450%", icon: Award }
    ],
    features: [
      "Site responsivo com busca avançada",
      "Chatbot qualificador de leads",
      "CRM integrado com automações",
      "Tours virtuais 360°",
      "Analytics avançado de performance"
    ],
    testimonial: {
      text: "A qualidade dos leads melhorou significativamente. O sistema de IA consegue identificar clientes realmente interessados, otimizando nosso tempo de vendas.",
      author: "Carlos Mendes",
      role: "Diretor Comercial"
    },
    link: "#",
    featured: true
  },
  {
    id: 4,
    title: "Restaurante - Delivery Automatizado",
    category: "Alimentação",
    client: "Rede de Restaurantes",
    description: "Sistema completo de pedidos via WhatsApp, gestão de delivery e analytics de vendas.",
    image: "/api/placeholder/600/400",
    technologies: ["Typebot", "Evolution API", "PostgreSQL", "N8n"],
    results: [
      { metric: "Pedidos", value: "+280%", icon: ShoppingCart },
      { metric: "Ticket Médio", value: "+45%", icon: TrendingUp },
      { metric: "Eficiência", value: "+200%", icon: Zap },
      { metric: "Satisfação", value: "94%", icon: Star }
    ],
    features: [
      "Cardápio digital interativo",
      "Pedidos automatizados via WhatsApp",
      "Gestão de entregadores",
      "Sistema de avaliações",
      "Relatórios de vendas detalhados"
    ],
    testimonial: {
      text: "Nossos pedidos triplicaram desde a implementação. O sistema é muito intuitivo e nossos clientes adoram a facilidade de pedir pelo WhatsApp.",
      author: "Ana Costa",
      role: "Proprietária"
    },
    link: "#",
    featured: false
  },
  {
    id: 5,
    title: "Consultoria - Dashboard Executivo",
    category: "Consultoria",
    client: "Consultoria Empresarial",
    description: "Dashboard executivo com BI avançado, automação de relatórios e insights de IA para tomada de decisão.",
    image: "/api/placeholder/600/400",
    technologies: ["Power BI", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
    results: [
      { metric: "Decisões", value: "+150%", icon: BarChart3 },
      { metric: "Tempo", value: "-80%", icon: Clock },
      { metric: "Precisão", value: "+300%", icon: Target },
      { metric: "ROI", value: "280%", icon: Award }
    ],
    features: [
      "Dashboard executivo personalizado",
      "Relatórios automatizados",
      "Análise preditiva com IA",
      "Integração multi-sistemas",
      "Alertas inteligentes"
    ],
    testimonial: {
      text: "Agora temos visibilidade completa do negócio em tempo real. As análises de IA nos ajudam a antecipar tendências e tomar decisões mais assertivas.",
      author: "Roberto Lima",
      role: "CEO"
    },
    link: "#",
    featured: false
  },
  {
    id: 6,
    title: "Academia - Gestão de Alunos IA",
    category: "Fitness",
    client: "Rede de Academias",
    description: "Sistema completo de gestão de alunos, planos de treino personalizados e acompanhamento via IA.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "Convex", "OpenAI", "Typebot", "FastAPI"],
    results: [
      { metric: "Retenção", value: "+85%", icon: Users },
      { metric: "Engajamento", value: "+200%", icon: TrendingUp },
      { metric: "Satisfação", value: "97%", icon: Star },
      { metric: "Receita", value: "+160%", icon: Award }
    ],
    features: [
      "App mobile para alunos",
      "Planos de treino personalizados por IA",
      "Acompanhamento nutricional",
      "Chatbot motivacional",
      "Dashboard de performance"
    ],
    testimonial: {
      text: "Nossos alunos estão mais engajados do que nunca. A IA personaliza os treinos de forma impressionante e o app facilita muito o acompanhamento.",
      author: "Marcos Oliveira",
      role: "Diretor"
    },
    link: "#",
    featured: true
  }
];

const stats = [
  { label: "Projetos Entregues", value: "50+", icon: Award },
  { label: "Clientes Satisfeitos", value: "98%", icon: Star },
  { label: "ROI Médio", value: "320%", icon: TrendingUp },
  { label: "Tempo de Entrega", value: "14 dias", icon: Clock }
];

export default function PortfolioPage() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Nosso <span className="text-primary">Portfólio</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Cases de sucesso que demonstram o poder das nossas soluções em 
              Marketing Digital, Automação e IA.
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-foreground-muted">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Projects */}
      <Section className="py-16">
        <Container>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Projetos em Destaque
            </h2>
            <div className="space-y-16">
              {featuredProjects.map((project, index) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="aspect-video bg-background-secondary rounded-lg flex items-center justify-center">
                        <Globe className="w-16 h-16 text-muted" />
                      </div>
                    </div>
                    <div className={`p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {project.category}
                        </span>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {project.title}
                      </h3>
                      
                      <p className="text-foreground-muted mb-6">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.results.map((result, resultIndex) => {
                          const Icon = result.icon;
                          return (
                            <div key={resultIndex} className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-primary" />
                              <span className="text-sm text-foreground-muted">
                                {result.metric}: <strong className="text-primary">{result.value}</strong>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-background-secondary rounded-lg p-4 mb-6">
                        <p className="text-sm text-foreground-muted italic mb-2">
                          "{project.testimonial.text}"
                        </p>
                        <div className="text-sm">
                          <span className="font-medium text-foreground">{project.testimonial.author}</span>
                          <span className="text-foreground-muted"> - {project.testimonial.role}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-2 py-1 bg-background text-xs font-medium text-foreground rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full sm:w-auto">
                        Ver Detalhes
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Other Projects Grid */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Outros Projetos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-background rounded-t-lg flex items-center justify-center">
                    <Globe className="w-12 h-12 text-muted" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-foreground-muted mb-4">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {project.results.slice(0, 2).map((result, resultIndex) => {
                        const Icon = result.icon;
                        return (
                          <div key={resultIndex} className="flex items-center gap-1">
                            <Icon className="w-3 h-3 text-primary" />
                            <span className="text-xs text-foreground-muted">
                              <strong className="text-primary">{result.value}</strong>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Detalhes
                      <ExternalLink className="ml-2 w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Pronto para ser nosso próximo case de sucesso?
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Vamos conversar sobre como podemos transformar seu negócio 
              com nossas soluções em IA e automação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Iniciar Projeto
                </Button>
              </Link>
              <Link href="/planos">
                <Button variant="outline" size="lg">
                  Ver Planos
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}