import { PortfolioData } from '../core/models/portfolio.models';

export const SITE_URL = 'https://vmsvitor.code-byte.com';
export const GITHUB_URL = 'https://github.com/VitorMeloDS';

export const NAVIGATION = [
  { id: 'hero', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Experiência' },
  { id: 'education', label: 'Formação' },
  { id: 'contact', label: 'Contato' },
];

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: 'Vitor Melo da Silva',
    title: 'Desenvolvedor Full Stack Pleno | Tech Lead',
    location: 'Maceió, AL',
    email: 'vmsvitordev@gmail.com',
    summary:
      'Desenvolvedor Full Stack com mais de 4 anos de experiência em aplicações web, APIs robustas e liderança técnica. Especialista em ecossistemas modernos com foco em qualidade, DevSecOps e automação.',
    highlights: ['Tech Lead', 'APIs REST', 'Testes automatizados', 'Docker', 'CI/CD'],
    socialLinks: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vitor-melo-ds/', icon: 'linkedin' },
      { name: 'GitHub', url: GITHUB_URL, icon: 'github' },
      { name: 'E-mail', url: 'mailto:vmsvitordev@gmail.com', icon: 'mail' },
      { name: 'Website', url: SITE_URL, icon: 'globe' },
    ],
    resume: {
      url: 'Curriculo_Vitor_Melo.pdf',
      fileName: 'Vitor_Melo_Curriculo.pdf',
    },
  },
  about: {
    paragraphs: [
      'Sou um profissional apaixonado por desenvolvimento web, com experiência sólida em criar e manter aplicações de alta performance. Minha jornada inclui o desenvolvimento de SPAs, APIs REST robustas e plataformas corporativas utilizando Angular, Vue.js, NestJS, Laravel e Docker.',
      'Atuo como Tech Lead, sendo responsável por liderar equipes tecnicamente, definir padrões de arquitetura, revisar códigos e implementar práticas de DevSecOps, observabilidade e automação de processos via Azure DevOps e CI/CD.',
      'Estou constantemente atualizando minhas habilidades e explorando novas tecnologias para enfrentar desafios de desenvolvimento com excelência técnica e entregas de qualidade.',
    ],
    highlights: ['Tech Lead', 'APIs REST', 'Testes automatizados', 'Docker', 'DevSecOps', 'CI/CD'],
  },
  skillCategories: [
    {
      category: 'Back-End',
      technologies: ['PHP / Laravel', 'Node.js / NestJS', 'TypeScript', 'APIs REST'],
    },
    {
      category: 'Front-End & Mobile',
      technologies: ['Angular', 'Vue.js', 'Ionic', 'Oracle APEX'],
    },
    {
      category: 'Bancos & Mensageria',
      technologies: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'RabbitMQ'],
    },
    {
      category: 'DevOps & Ferramentas',
      technologies: ['Docker', 'Azure DevOps', 'CI/CD', 'Elastic Stack (ELK)', 'Snyk', 'Git', 'Linux'],
    },
    {
      category: 'Mobile & PWA',
      technologies: ['PWA', 'Android', 'iOS', 'TWA'],
    },
    {
      category: 'Práticas',
      technologies: ['Testes unitários e integração', 'DevSecOps', 'Observabilidade', 'Automação'],
    },
  ],
  softSkills: [
    { name: 'Liderança técnica', description: 'Definição de padrões, revisão de código e mentoria de equipes.', icon: 'crown' },
    { name: 'Comunicação', description: 'Clareza na troca de informações técnicas e não técnicas.', icon: 'message-circle' },
    { name: 'Trabalho em equipe', description: 'Colaboração efetiva em squads multidisciplinares ágeis.', icon: 'users' },
    { name: 'Proatividade', description: 'Antecipação de problemas e busca por melhorias contínuas.', icon: 'zap' },
    { name: 'Resiliência', description: 'Adaptação a desafios e entrega sob pressão.', icon: 'shield' },
    { name: 'Mentoria', description: 'Apoio ao crescimento de colegas e compartilhamento de conhecimento.', icon: 'graduation-cap' },
  ],
  projects: [
    {
      id: 'pesquisas',
      title: 'Sistema de Pesquisas',
      company: 'SENAI Alagoas',
      description: 'Plataforma corporativa para gestão e aplicação de pesquisas institucionais, com fluxos de coleta de dados, relatórios e integração com ecossistema educacional.',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Azure DevOps'],
      isCorporate: true,
    },
    {
      id: 'avaliacoes',
      title: 'Sistema de Avaliações',
      company: 'SENAI Alagoas',
      description: 'Sistema para avaliações de ensino profissionalizante e educação básica, com módulos de gestão, aplicação de testes e geração de indicadores pedagógicos.',
      technologies: ['Angular', 'Laravel', 'PostgreSQL', 'CI/CD'],
      isCorporate: true,
    },
    {
      id: 'treinamentos',
      title: 'Sistema de Treinamentos',
      company: 'SENAI Alagoas / Mesha',
      description: 'Ferramenta para gestão de treinamentos corporativos e educacionais, com trilhas de aprendizado, acompanhamento de progresso e certificações.',
      technologies: ['Vue.js', 'NestJS', 'Docker', 'PostgreSQL'],
      isCorporate: true,
    },
    {
      id: 'cursos-online',
      title: 'Plataforma de Cursos Online',
      company: 'SENAI Alagoas',
      description: 'Administração de plataforma de cursos online com publicação de conteúdos, gestão de alunos, aplicativos móveis e pipelines de deploy automatizados.',
      technologies: ['Angular', 'Node.js', 'Azure DevOps', 'CI/CD'],
      isCorporate: true,
    },
    {
      id: 'sso-oauth',
      title: 'SSO com OAuth2',
      company: 'Mesha Tecnologia',
      description: 'Implementação de Single Sign-On com OAuth2 para integração segura entre múltiplos sistemas corporativos, centralizando autenticação e autorização.',
      technologies: ['NestJS', 'OAuth2', 'Docker', 'Redis'],
      isCorporate: true,
    },
    {
      id: 'integracao-sistemas',
      title: 'Integração Multi-sistemas',
      company: 'Mesha Tecnologia',
      description: 'Criação de integrações entre múltiplos sistemas legados e modernos, com mensageria assíncrona, filas e sincronização de dados em tempo real.',
      technologies: ['NestJS', 'RabbitMQ', 'Redis', 'Docker'],
      isCorporate: true,
    },
    {
      id: 'cosi',
      title: 'COSI — Colóquio de Estudantes de SI',
      company: 'IFAL (Organizador)',
      description: 'Evento acadêmico organizado com palestras, minicursos e oficinas de tecnologia. Responsável pela organização, minicurso de Node.js/TypeScript/Firebase e desafio técnico front-end.',
      technologies: ['Vue.js', 'Node.js', 'Firebase', 'Vercel'],
      demoUrl: 'https://cosi.vercel.app',
      isCorporate: false,
    },
  ],
  experiences: [
    {
      id: 'senai',
      company: 'SENAI Alagoas',
      role: 'Desenvolvedor Full Stack Pleno | Tech Lead',
      period: 'Abr 2025 — Atual',
      location: 'Maceió, AL',
      highlights: [
        'Liderança técnica de equipes com foco em padrões, revisão de código e arquitetura.',
        'Desenvolvimento de sistemas de pesquisas, avaliações, treinamentos e plataforma de cursos online.',
        'Implementação de DevSecOps, observabilidade (ELK), CI/CD via Azure DevOps e Snyk.',
        'Escrita e execução de testes unitários e de integração.',
      ],
    },
    {
      id: 'mesha-pleno',
      company: 'Mesha Tecnologia',
      role: 'Desenvolvedor Full Stack Pleno',
      period: 'Ago 2024 — Abr 2025',
      location: 'Maceió, AL',
      highlights: [
        'Liderança técnica, levantamento de requisitos e definição de padrões de teste.',
        'Integração entre múltiplos sistemas, SSO OAuth2 e automações com N8N.',
        'Desenvolvimento de APIs com NestJS, Docker e Git Hooks.',
      ],
    },
    {
      id: 'mesha',
      company: 'Mesha Tecnologia',
      role: 'Desenvolvedor Full Stack',
      period: 'Abr 2023 — Set 2024',
      location: 'Maceió, AL',
      highlights: [
        'Desenvolvimento web com Vue.js, NestJS, PHP, Laravel e Docker.',
        'Criação de scripts de testes unitários e manutenção de sistemas de fidelidade/convênio.',
        'Atuação em squads ágeis com SCRUM.',
      ],
    },
    {
      id: 'ofm',
      company: 'OFM Systems',
      role: 'Analista Desenvolvedor',
      period: 'Abr 2022 — Abr 2023',
      location: 'Maceió, AL',
      highlights: [
        'Criação e manutenção de APIs em Laravel, TypeScript e Node.js.',
        'Desenvolvimento de interfaces com Oracle APEX, Laravel e Vue/AngularJS.',
        'Apps mobile multiplataforma com AngularJS e Ionic Framework.',
        'Automação de processos internos para ganho de eficiência operacional.',
      ],
    },
  ],
  education: [
    {
      id: 'estacio',
      institution: 'Estácio',
      degree: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      period: 'Concluído',
      status: 'Graduação',
      description: 'Formação com foco em Engenharia de Software, Desenvolvimento Web/Mobile e Arquitetura de Sistemas.',
    },
    {
      id: 'ifal',
      institution: 'Instituto Federal de Alagoas (IFAL)',
      degree: 'Bacharelado em Sistemas de Informação',
      period: '2020 — 2025',
      status: 'Em andamento / Transferência',
      description: 'Gerenciamento de projetos, UML, metodologias ágeis (Scrum/Kanban), segurança da informação e desenvolvimento de software.',
    },
  ],
  certifications: [
    { id: 'dio-scrum', name: 'Projetos ágeis com SCRUM', issuer: 'Digital Innovation One', issuedAt: 'Dez 2021' },
    { id: 'senac-ti', name: 'Assistente de Tecnologia da Informação', issuer: 'Senac Brasil', issuedAt: 'Mar 2022' },
    { id: 'senac-be', name: 'Desenvolvimento Web — Back End', issuer: 'Senac Brasil', issuedAt: 'Mar 2022' },
    { id: 'alu-vue', name: 'Vue3: explorando o framework', issuer: 'Alura', issuedAt: 'Mai 2023' },
    { id: 'alu-node', name: 'Node: testes unitários e de integração', issuer: 'Alura', issuedAt: 'Jul 2023' },
    { id: 'alu-css', name: 'CSS: Flexbox e layouts responsivos', issuer: 'Alura', issuedAt: 'Jul 2023' },
    { id: 'ifal-connect', name: 'Connect tech', issuer: 'IFAL', issuedAt: 'Out 2023' },
  ],
  contactLinks: [
    { id: 'email', label: 'E-mail', value: 'vmsvitordev@gmail.com', url: 'mailto:vmsvitordev@gmail.com', icon: 'mail', action: 'copy' },
    { id: 'linkedin', label: 'LinkedIn', value: '@vitor-melo-ds', url: 'https://www.linkedin.com/in/vitor-melo-ds/', icon: 'linkedin', action: 'link' },
    { id: 'github', label: 'GitHub', value: '@VitorMeloDS', url: GITHUB_URL, icon: 'github', action: 'link' },
    { id: 'website', label: 'Website', value: 'vmsvitor.code-byte.com', url: SITE_URL, icon: 'globe', action: 'link' },
  ],
  navigation: NAVIGATION,
};
