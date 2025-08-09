'use client';

import { useState } from 'react';

import type { Metadata } from 'next';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Container, Input, Section, Textarea } from '@repo/ui';
import {
  Bot,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Users,
  Zap,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecione um serviço'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  timeline: z.string().min(1, 'Selecione um prazo'),
});

type ContactForm = z.infer<typeof contactSchema>;

const services = [
  { value: 'chatbot', label: 'Chatbots e Assistentes IA' },
  { value: 'automation', label: 'Automação de Processos' },
  { value: 'website', label: 'Sites e Landing Pages' },
  { value: 'analytics', label: 'Análise de Dados e BI' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'mobile', label: 'Aplicativos Mobile' },
  { value: 'consulting', label: 'Consultoria em IA' },
  { value: 'custom', label: 'Projeto Personalizado' },
];

const budgets = [
  { value: '5k-10k', label: 'R$ 5.000 - R$ 10.000' },
  { value: '10k-25k', label: 'R$ 10.000 - R$ 25.000' },
  { value: '25k-50k', label: 'R$ 25.000 - R$ 50.000' },
  { value: '50k-100k', label: 'R$ 50.000 - R$ 100.000' },
  { value: '100k+', label: 'Acima de R$ 100.000' },
  { value: 'discuss', label: 'Prefiro discutir' },
];

const timelines = [
  { value: 'asap', label: 'O mais rápido possível' },
  { value: '1month', label: 'Até 1 mês' },
  { value: '3months', label: 'Até 3 meses' },
  { value: '6months', label: 'Até 6 meses' },
  { value: 'flexible', label: 'Flexível' },
];

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contato@aidaeon.com',
    description: 'Resposta em até 2 horas',
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+55 (11) 99999-9999',
    description: 'Atendimento 24/7',
  },
  {
    icon: MapPin,
    title: 'Localização',
    value: 'São Paulo, SP',
    description: 'Atendimento remoto e presencial',
  },
  {
    icon: Clock,
    title: 'Horário',
    value: '24/7 Online',
    description: 'Suporte contínuo',
  },
];

const features = [
  {
    icon: CheckCircle,
    title: 'Resposta Rápida',
    description: 'Retornamos seu contato em até 2 horas úteis',
  },
  {
    icon: Users,
    title: 'Consultoria Gratuita',
    description: 'Primeira consulta sem custo para entender suas necessidades',
  },
  {
    icon: Zap,
    title: 'Proposta Personalizada',
    description: 'Orçamento detalhado baseado no seu projeto específico',
  },
  {
    icon: Calendar,
    title: 'Agendamento Flexível',
    description: 'Reuniões online ou presenciais conforme sua preferência',
  },
];

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form data:', data);

      setIsSubmitted(true);
      toast.success(
        'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      );
      reset();
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-foreground mb-4 text-3xl font-bold">
              Mensagem Enviada com Sucesso!
            </h1>
            <p className="text-foreground-muted mb-8 text-lg">
              Recebemos sua mensagem e nossa equipe entrará em contato em até 2
              horas úteis. Enquanto isso, que tal conhecer nossos cases de
              sucesso?
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Enviar Nova Mensagem
              </Button>
              <Button asChild>
                <a href="/portfolio">Ver Portfólio</a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <Section className="pb-16 pt-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-foreground mb-6 text-4xl font-bold md:text-6xl">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-foreground-muted mb-8 text-xl">
              Pronto para transformar seu negócio? Vamos conversar sobre como
              nossas soluções podem acelerar seus resultados.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Form & Info */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-foreground mb-6 text-2xl font-bold">
                    Solicite seu Orçamento
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Nome Completo *
                        </label>
                        <Input
                          {...register('name')}
                          placeholder="Seu nome completo"
                          error={errors.name?.message ?? ''}
                        />
                      </div>
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          {...register('email')}
                          type="email"
                          placeholder="seu@email.com"
                          error={errors.email?.message ?? ''}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Telefone/WhatsApp *
                        </label>
                        <Input
                          {...register('phone')}
                          placeholder="(11) 99999-9999"
                          error={errors.phone?.message ?? ''}
                        />
                      </div>
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Empresa
                        </label>
                        <Input
                          {...register('company')}
                          placeholder="Nome da sua empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-foreground mb-2 block text-sm font-medium">
                        Serviço de Interesse *
                      </label>
                      <select
                        {...register('service')}
                        className="border-border bg-background text-foreground focus:ring-primary w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
                      >
                        <option value="">Selecione um serviço</option>
                        {services.map(service => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Orçamento Estimado *
                        </label>
                        <select
                          {...register('budget')}
                          className="border-border bg-background text-foreground focus:ring-primary w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
                        >
                          <option value="">Selecione uma faixa</option>
                          {budgets.map(budget => (
                            <option key={budget.value} value={budget.value}>
                              {budget.label}
                            </option>
                          ))}
                        </select>
                        {errors.budget && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.budget.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Prazo Desejado *
                        </label>
                        <select
                          {...register('timeline')}
                          className="border-border bg-background text-foreground focus:ring-primary w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
                        >
                          <option value="">Selecione um prazo</option>
                          {timelines.map(timeline => (
                            <option key={timeline.value} value={timeline.value}>
                              {timeline.label}
                            </option>
                          ))}
                        </select>
                        {errors.timeline && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.timeline.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-foreground mb-2 block text-sm font-medium">
                        Descreva seu Projeto *
                      </label>
                      <Textarea
                        {...register('message')}
                        placeholder="Conte-nos mais sobre seu projeto, objetivos e desafios..."
                        rows={5}
                        error={errors.message?.message ?? ''}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Enviando...'
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-foreground mb-6 text-xl font-bold">
                    Informações de Contato
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                            <Icon className="text-primary h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-foreground font-medium">
                              {info.title}
                            </h4>
                            <p className="text-foreground-muted">
                              {info.value}
                            </p>
                            <p className="text-foreground-muted text-sm">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-foreground mb-6 text-xl font-bold">
                    Por que nos escolher?
                  </h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <Icon className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                          <div>
                            <h4 className="text-foreground mb-1 font-medium">
                              {feature.title}
                            </h4>
                            <p className="text-foreground-muted text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Actions */}
      <Section className="bg-background-secondary py-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-foreground mb-12 text-center text-3xl font-bold">
              Outras Formas de Contato
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="cursor-pointer p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <MessageSquare className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">WhatsApp</h3>
                <p className="text-foreground-muted mb-3 text-sm">
                  Converse diretamente conosco
                </p>
                <Button
                  size="sm"
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Abrir Chat
                </Button>
              </Card>

              <Card className="cursor-pointer p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">
                  Agendar Reunião
                </h3>
                <p className="text-foreground-muted mb-3 text-sm">
                  Marque uma videochamada
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Agendar
                </Button>
              </Card>

              <Card className="cursor-pointer p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Bot className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Chat IA</h3>
                <p className="text-foreground-muted mb-3 text-sm">
                  Tire dúvidas com nossa IA
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Iniciar Chat
                </Button>
              </Card>

              <Card className="cursor-pointer p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <Globe className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">
                  Central de Ajuda
                </h3>
                <p className="text-foreground-muted mb-3 text-sm">
                  Documentação e tutoriais
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Acessar
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
