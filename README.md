# Portfólio — Vitor Melo da Silva

Portfólio pessoal desenvolvido com **Angular 22**, **TailwindCSS v4** e arquitetura modular standalone. Design moderno com glassmorphism, dark/light mode, animações on-scroll e navegação sticky.

## Pré-requisitos

- Node.js 20+
- npm 10+

## Instalação e execução

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:4200)
npm start

# Build de produção
npm run build
```

Os arquivos de produção são gerados em `dist/portfolio-app/browser/`.

## Estrutura do projeto

```
src/app/
├── core/           # Models e services (theme, scroll-spy, seo)
├── shared/         # Componentes reutilizáveis e diretivas
├── layout/         # Header, footer e main layout
├── features/       # Seções da landing page
└── data/           # Conteúdo centralizado (portfolio.data.ts)
```

## Personalização

### Conteúdo

Edite [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts) para atualizar:

- Informações pessoais e redes sociais
- Experiências profissionais
- Projetos, habilidades e formação
- Links de contato

### Avatar

Substitua [`src/assets/images/avatar.svg`](src/assets/images/avatar.svg) pela sua foto (recomendado: JPG/PNG 400×400px) e atualize o `src` em `hero.component.ts`.

### Tema

O tema escuro é o padrão. O toggle no header alterna entre dark/light e persiste em `localStorage`.

## Funcionalidades

- Navegação suave entre seções com header sticky e indicador de seção ativa
- Dark/light mode com persistência
- Animações on-scroll (Intersection Observer)
- Lazy loading de seções com `@defer (on viewport)`
- SEO básico e meta tags Open Graph
- Botão "voltar ao topo"
- Cards de contato com copiar e-mail

## Tecnologias

- Angular 22 (Standalone Components, Signals, RxJS)
- TailwindCSS v4
- TypeScript 6
- SCSS

## Autor

**Vitor Melo da Silva** — [LinkedIn](https://www.linkedin.com/in/vitor-melo-ds/) | [GitHub](https://github.com/vitor-melo-ds)
