import type { Metadata } from "next";
import { Container, Section, Button, Card } from "@repo/ui";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  ArrowRight, 
  MessageSquare, 
  Globe, 
  BarChart3, 
  Bot,
  Users,
  Clock
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Planos e Preços",
  description: "Escolha o plano ideal para seu negócio: Starter, Professional ou Enterprise. Soluções escaláveis em Marketing Digital, Automação e IA.",
};

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "R$ 2.997",
    period: "/mês",
    description: "Ideal para pequenas empresas que querem começar com automação e IA.",
    popular: false,
    features: [
      { name: "1 Chatbot WhatsApp/Telegram", included: true },
      { name: "Landing Page responsiva", included: true },
      { name: "Automação básica (até 5 workflows)", included: true },
      { name: "Dashboard de analytics", included: true },
      { name: "Suporte por email", included: true },
      { name: "Treinamento inicial (2h)", included: true },
      { name: "Integração com CRM", included: false },
      { name: "Múltiplos canais", included: false },
      { name: "IA avançada", included: false },
      { name: "Suporte prioritário", included: false }
    ],
    cta: "Começar Agora",
    highlights: [
      "Setup em 7 dias",
      "ROI em 30 dias",
      "LGPD Compliant"
    ]
  },
  {
    name: "Professional",
    icon: Star,
    price: "R$ 5.997",
    period: "/mês",
    description: "Para empresas em crescimento que precisam de soluções mais robustas.",
    popular: true,
    features: [
      { name: "3 Chatbots multi-canal", included: true },
      { name: "Site completo + Blog", included: true },
      { name: "Automação avançada (até 15 workflows)", included: true },
      { name: "BI Dashboard personalizado", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "Treinamento completo (8h)", included: true },
      { name: "Integração CRM + ERP", included: true },
      { name: "IA com memória avançada", included: true },
      { name: "API personalizada", included: true },
      { name: "Relatórios semanais", included: false }
    ],
    cta: "Mais Popular",
    highlights: [
      "Setup em 14 dias",
      "ROI em 45 dias",
      "Suporte 24/7"
    ]
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "Sob consulta",
    period: "",
    description: "Soluções customizadas para grandes empresas com necessidades específicas.",
    popular: false,
    features: [
      { name: "Chatbots ilimitados", included: true },
      { name: "Plataforma web completa", included: true },
      { name: "Automação enterprise (ilimitada)", included: true },
      { name: "BI avançado + Data Science", included: true },
      { name: "Suporte dedicado 24/7", included: true },
      { name: "Treinamento personalizado", included: true },
      { name: "Integrações customizadas", included: true },
      { name: "IA proprietária", included: true },
      { name: "APIs dedicadas", included: true },
      { name: "Relatórios em tempo real", included: true }
    ],
    cta: "Falar com Vendas",
    highlights: [
      "Setup personalizado",
      "SLA garantido",
      "Infraestrutura dedicada"
    ]
  }
];

const addOns = [
  {
    icon: MessageSquare,
    name: "Chatbot Adicional",
    price: "R$ 497/mês",
    description: "Chatbot extra para novos canais ou departamentos"
  },
  {
    icon: Globe,
    name: "Landing Page Extra",
    price: "R$ 297/mês",
    description: "Landing page adicional para campanhas específicas"
  },
  {
    icon: BarChart3,
    name: "Relatórios Avançados",
    price: "R$ 397/mês",
    description: "Dashboards personalizados e relatórios detalhados"
  },
  {
    icon: Bot,
    name: "IA Personalizada",
    price: "R$ 997/mês",
    description: "Modelo de IA treinado especificamente para seu negócio"
  }
];

const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim, nossos planos são mensais e podem ser cancelados a qualquer momento sem multa. Você mantém acesso até o final do período pago."
  },
  {
    question: "Há taxa de setup?",
    answer: "Não cobramos taxa de setup. Todo o processo de configuração e treinamento inicial está incluído no valor mensal."
  },
  {
    question: "Vocês oferecem período de teste?",
    answer: "Sim, oferecemos 7 dias de teste gratuito para você experimentar nossa plataforma antes de se comprometer."
  },
  {
    question: "Como funciona o suporte?",
    answer: "Oferecemos suporte via WhatsApp, email e videochamada. Planos Professional e Enterprise têm suporte prioritário."
  },
  {
    question: "Posso fazer upgrade do plano?",
    answer: "Sim, você pode fazer upgrade a qualquer momento. A diferença é cobrada proporcionalmente no período atual."
  }
];

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Planos e <span className="text-primary">Preços</span>
            </h1>
            <p className="text-xl text-foreground-muted mb-8">
              Escolha o plano ideal para acelerar o crescimento do seu negócio 
              com nossas soluções em IA e automação.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-foreground-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>7 dias grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Sem taxa de setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing Plans */}
      <Section className="py-16">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <Card 
                    key={index} 
                    className={`relative p-8 ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                          Mais Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-foreground-muted mb-4">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-foreground-muted">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            feature.included ? 'text-foreground' : 'text-muted'
                          }`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {plan.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-2 text-sm text-primary">
                          <Star className="w-4 h-4" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/contato">
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'bg-background-secondary hover:bg-background-secondary/80'
                        }`}
                        size="lg"
                      >
                        {plan.cta}
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

      {/* Add-ons */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Complementos Disponíveis
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, index) => {
                const Icon = addon.icon;
                return (
                  <Card key={index} className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {addon.name}
                    </h3>
                    <p className="text-sm text-foreground-muted mb-3">
                      {addon.description}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {addon.price}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-foreground-muted">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ainda tem dúvidas?
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Fale com nossos especialistas e descubra qual plano é ideal 
              para o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Users className="mr-2 w-4 h-4" />
                  Falar com Especialista
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Clock className="mr-2 w-4 h-4" />
                Agendar Demonstração
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}