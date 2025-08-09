
🤖 Instrução para Agente de IA: Desenvolvimento do Website Portfólio e Plataforma de Serviços Digitais
Objetivo Geral: Desenvolver um website profissional, tecnológico e escalável que funcione como vitrine do portfólio de serviços de marketing digital, automação e IA, facilitando a geração de leads, orçamentos e a contratação de serviços via contratos digitais.

Filosofia de Abordagem: Seguir rigorosamente o VibeCode (programação limpa, focada em performance e legibilidade), com ênfase em IA-first e data-driven nas funcionalidades e apresentação.

1. Estrutura do Projeto e Conteúdo (Baseado no PRD)
Navegação Principal: Deve espelhar os objetivos do site, começando pela Homepage.
Homepage:
Proposta de Valor: Clara, concisa, destacando a sinergia entre Marketing Digital, Automação e IA.
Visão Geral dos Serviços: Blocos visuais que introduzem Marketing Digital, Automação/IA e Tráfego Pago.
Diferenciais Competitivos: Foco na expertise técnica, LGPD, e modelo "IA-first".
CTAs Principais: "Ver Planos", "Solicitar Orçamento", "Sobre", levando às seções correspondentes.
Depoimentos (Placeholder/Futuro): Espaço reservado para feedbacks de clientes.
Sobre Mim / Nossa Empresa:
Narrativa: Histórico, filosofia (VibeCode, data-driven, IA-first), valores (ética, transparência, inovação, LGPD).
Destaque: Seção dedicada às stacks tecnológicas e expertise.
Serviços:
Estrutura: Subseções claras para:
Marketing Digital (Gestão de Redes Sociais, Criação de Conteúdo, Estratégia).
Tráfego Pago (Google Ads, Meta Ads, etc. - Otimização, Análise).
Automação e IA (WhatsApp Flows - Typebot, Flowise, Evolution API; Agentes Conversacionais com Memória; IA Generativa de Conteúdo/Imagens).
Conteúdo: Benefícios claros e objetivos para cada serviço.
Planos e Precificação:
Modelos: Exibir pacotes (Básico, Intermediário, Premium/Agente Inteligente com Memória) com escopos detalhados.
Precificação: Implementar Setup Fee + Mensalidade e modelos de Assinatura. Mencionar flexibilidade de customização.
Portfólio / Estudos de Caso:
Design: Apresentação visualmente atraente.
Conteúdo: Foco em resultados, destacando o uso de IA e automação. Se necessário, criar "projetos hipotéticos" que demonstrem a aplicabilidade das tecnologias.
Contato / Orçamento:
Formulário: Campos essenciais (Nome, Email, Telefone, Empresa, Serviço de Interesse, Mensagem).
Integração: Preparar para integrações futuras (CRM, E-mail Marketing).
CTA Adicional: Iniciador da geração de contrato.
Página de Contrato Digital:
Fluxo: Integração direta com o gerador de contratos e plataforma de assinatura eletrônica.
Blog (Opcional/Futuro): Definir estrutura e SEO para artigos futuros.
2. Stacks Tecnológicas e Orquestração
Fidelidade às Escolhas: A aderência a estas stacks é crucial para demonstrar expertise e eficiência.
Infraestrutura:
Servidor: Hostinger VPS (KVM4) com EasyPanel/Waze Panel.
Orquestrador de Fluxos/Backend: N8n (via Docker no servidor). Responsável por integrações complexas, workflows e gestão de APIs.
Orquestração de IA/Agente Core:
Fluxos Específicos/Prototipagem: Flowise (visual).
Agentes Inteligentes com Memória (Para Evolução): Arquitetura Agent Runtime (FastAPI com ADK) para a orquestração principal e Memory API (FastAPI) para a gestão de memória.
Linguagem para IA: Python para scripts de extração, embeddings e orquestração fina.
Bancos de Dados:
Dados Vetoriais e Estruturados/Grafo Leve: PostgreSQL com pgvector (via Docker). Para embeddings, perfis, histórico de conversas, relações.
Alternativa Simples: ChromaDB (para POCs/início).
Cache/Sessão/Filas: Redis.
Desenvolvimento Frontend:
Framework: Next.js (otimização de SEO, performance, renderização).
Bibliotecas de UI: Shed.CNUI e MagicUI (componentes visuais modernos e responsivos).
Backend (Próprio Site/APIs):
Convex (open-source): Integrado com Next.js para autenticação, bancos de dados e APIs do próprio site.
Integrações Específicas:
WhatsApp: Evolution API (flexibilidade e custo-benefício).
Gerenciamento de Stack/Projetos: Utilizar Better-T-Stack como referência de fluxo de setup e arquitetura.
3. Design System e Interface Visual
Estilo Predominante: Temas Escuros.
Paleta de Cores:
Base: Tons de cinza (do escuro ao claro) para transições suaves e hierarquia visual.
Destaque/CTA: Azul vibrante para botões, links e elementos interativos importantes.
Experiência do Usuário (UX):
Navegação: Intuitiva, seguindo a estrutura do PRD.
Responsividade: Garantir que o site se adapte perfeitamente a todos os dispositivos (desktop, tablet, mobile).
Carregamento: Otimizar imagens e código para performance máxima.
Componentes (Shed.CNUI / MagicUI):
Botões: Cores de destaque no azul vibrante para CTAs. Estados de hover e active definidos.
Formulários: Campos claros, com labels visíveis, estados de foco definidos. Conformidade com LGPD nos formulários de contato.
Cards: Utilizar para apresentar serviços, planos e portfólio de forma organizada e visualmente atraente.
Tipografia: Hierarquia clara de títulos, subtítulos e corpo de texto, utilizando fontes que transmitam profissionalismo e tecnologia.
Elementos de IA/Automação: Design que sugira inovação, inteligência artificial e fluxos de trabalho automatizados (ex: ícones, animações sutis).
4. Funcionalidades de Contratos Digitais e Conformidade Legal
Geração de Contratos:
Entrada de Dados: Coleta de informações do cliente (Nome, CPF/CNPJ, Endereço), empresa, serviços, valores, prazos e pagamentos.
Modelos: Implementar o armazenamento e seleção de modelos de contrato baseados nos serviços contratados.
Output: Geração de um arquivo PDF preciso e completo.
Assinatura Eletrônica:
Integração: Conexão com plataforma de assinatura (Clicksign, DocuSign, HelloSign) para fluxo de envio e coleta de assinaturas.
Conformidade Legal (Prioridade Máxima):
LGPD:
Coleta de consentimento explícito para tratamento de dados.
Políticas de privacidade transparentes e acessíveis.
Termos de uso de dados nas automações claramente definidos.
Direitos do Consumidor: Garantir que todos os termos do contrato estejam em conformidade com o Código de Defesa do Consumidor.
Assinatura Eletrônica: Conformidade com a legislação brasileira sobre validade jurídica de assinaturas eletrônicas.
Inclusão e Diversidade: A linguagem do contrato e a coleta de dados devem ser inclusivas e não discriminatórias (LGPD e LGBT+).
5. Considerações Técnicas e Não-Funcionais
Performance:
Otimização: Código, imagens e assets devem ser otimizados para carregamento rápido em todas as conexões.
Responsividade: Testes em múltiplos dispositivos e tamanhos de tela.
Escalabilidade:
Arquitetura: Pensar em como a solução de IA (Agentes com Memória) e o backend podem escalar com o aumento do número de clientes e interações.
Segurança:
HTTPS: Obrigatório em todo o site.
Proteção: Implementar medidas contra ataques (SQL Injection, XSS, etc.).
Credenciais: Máxima segurança na gestão de chaves de API, senhas e acesso ao banco de dados.
LGPD: Segurança na coleta, armazenamento e processamento de dados pessoais.
SEO:
On-Page: Title tags, meta descriptions, headers (H1-H6), alt text em imagens.
Off-Page: Estratégia de link building (futuro), sitemaps.
Manutenibilidade:
Código: Limpo, modular, bem documentado com comentários claros.
Versionamento: Uso rigoroso do Git para controle de versão.
Testes: Unidades e integrações de funções críticas.
🐝 Chamadas para Ação e Fluxos de Trabalho da IA
Priorizar a Estrutura do Projeto: Começar com a arquitetura do site em Next.js e a implementação das páginas essenciais.
Desenvolver o Design System: Implementar os componentes de UI (Shed.CNUI/MagicUI) com a paleta de cores e o estilo de design definidos.
Integrar o Convex: Para gerenciar as bases de dados do próprio site (usuários, conteúdo estático, formulários).
Desenvolver os Formulários de Contato/Orçamento: Com validação e preparação para futuras integrações.
Implementar o Gerador de Contratos Digitais: Foco na captura de dados e na seleção de modelos.
Integrar a Plataforma de Assinatura Eletrônica: Para fechar o ciclo de contratação.
Configurar o N8n: Para automações de backend e integrações externas (Evolution API, CRM, etc.).
Desenvolver as Soluções de IA: Utilizando Flowise inicialmente e planejando a arquitetura com FastAPI/ADK para agentes com memória.
Implementar Conformidade LGPD e Legal: Em todas as etapas de coleta e manipulação de dados.
Otimizar Performance e SEO: Contínuo ao longo do desenvolvimento.
Observação Final: A criatividade deve ser aplicada na forma como as informações são apresentadas, como os diferenciais são comunicados e como a tecnologia é demonstrada, sempre mantendo a clareza, a funcionalidade e a conformidade. A sinergia entre Marketing Digital, Automação e IA deve ser um fio condutor em toda a experiência do usuário.