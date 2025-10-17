# Gatsby + AWS CDK + Sanity.io Template

This is a full-stack template project that combines Gatsby.js for the frontend, AWS CDK for infrastructure and backend, and Sanity.io for content management. The template is structured to provide a scalable, maintainable, and TypeScript-first development experience.

## Project Structure

```
/
├── client/               # Gatsby.js frontend application
├── backend/             # AWS CDK infrastructure and backend code
└── cms/                 # Sanity.io content management system
```

### Directory Overview

- `client/`: Contains the Gatsby.js frontend application written in TypeScript
- `backend/`: Houses both the AWS CDK infrastructure code and backend business logic in TypeScript
- `cms/`: Contains the Sanity.io project with content schemas and configurations

## Client (Gatsby.js Frontend)

The frontend is built with Gatsby.js and TypeScript, providing a fast, modern web application with static site generation capabilities.

### Key Features

- TypeScript-first development
- Static site generation with dynamic capabilities
- Integration with Sanity.io CMS
- SEO optimized
- Performance optimized with automatic code splitting
- Tailwind CSS for utility-first styling and rapid UI development

### Client Directory Structure

```
client/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components and routes
│   ├── templates/     # Page templates for dynamic content
│   ├── styles/        # Global styles and theme configuration
│   ├── utils/         # Utility functions and helpers
│   └── types/         # TypeScript type definitions
├── gatsby-config.ts   # Gatsby configuration
├── gatsby-node.ts     # Gatsby Node API implementation
├── gatsby-browser.ts  # Browser-specific configurations
├── gatsby-ssr.ts     # Server-side rendering configurations
└── tsconfig.json     # TypeScript configuration
```

### Key Dependencies

- `gatsby`: Static site generator
- `react` & `react-dom`: UI library
- `typescript`: Type safety and developer experience
- `@sanity/client`: Sanity.io client for content fetching
- `graphql`: Data query language
- `tailwindcss`: Utility-first CSS framework
- `@tailwindcss/forms`: Form styles plugin
- `@tailwindcss/typography`: Typography plugin for content styling

## Backend (AWS CDK)

The backend is built using AWS CDK with TypeScript, providing Infrastructure as Code (IaC) and serverless backend services.

### Key Features

- Infrastructure as Code using AWS CDK
- Serverless architecture
- TypeScript-based Lambda functions
- API Gateway integration
- DynamoDB for data persistence
- CloudFront distribution for content delivery

### Backend Directory Structure

```
backend/
├── bin/              # CDK app entry point
├── lib/              # CDK stack definitions
├── src/
│   ├── functions/    # Lambda function implementations
│   ├── models/       # Data models and interfaces
│   ├── services/     # Business logic and services
│   └── utils/        # Utility functions
├── test/             # Test files
├── cdk.json          # CDK configuration
└── tsconfig.json     # TypeScript configuration
```

### Key Dependencies

- `aws-cdk-lib`: AWS CDK core library
- `@aws-cdk/aws-lambda`: Lambda function constructs
- `@aws-cdk/aws-apigateway`: API Gateway constructs
- `@aws-cdk/aws-dynamodb`: DynamoDB constructs
- `typescript`: Type safety and developer experience

## CMS (Sanity.io)

The content management system is built with Sanity.io, providing a flexible and customizable headless CMS solution.

### Key Features

- Customizable content models
- Real-time collaboration
- Image asset handling
- Rich text editor
- TypeScript schema definitions

### CMS Directory Structure

```
cms/
├── schemas/          # Content type definitions
│   ├── documents/    # Document type schemas
│   └── objects/      # Object type schemas
├── src/
│   ├── desk/        # Desk tool configuration
│   └── components/   # Custom input components
├── static/          # Static assets
├── sanity.config.ts # Sanity studio configuration
└── sanity.cli.ts    # Sanity CLI configuration
```

### Key Dependencies

- `@sanity/cli`: Sanity command line interface
- `@sanity/client`: Sanity client library
- `@sanity/vision`: Content visualization tool
- `typescript`: Type safety and developer experience

## Getting Started

### Prerequisites

- Node.js v21.7.3
- AWS CLI configured with appropriate credentials
- Sanity CLI (`npm install -g @sanity/cli`)
- AWS CDK CLI (`npm install -g aws-cdk`)

### Initial Setup

1. **Clone the template**

   ```bash
   git clone <repository-url> my-project
   cd my-project
   ```

2. **Setup CMS**

   ```bash
   cd cms
   npm install
   npm run dev
   ```

   Configure your Sanity project ID and dataset in `sanity.config.ts`

3. **Setup Backend**

   ```bash
   cd ../backend
   npm install
   npm run cdk bootstrap
   ```

   Configure your AWS profile and region in `cdk.json`

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```
   Configure your Sanity project ID in `gatsby-config.ts`

### Development Workflow

1. **CMS Development**

   - Run `npm run dev` in the `cms` directory
   - Access Sanity Studio at `http://localhost:3333`

2. **Backend Development**

   - Run `npm run build` to compile TypeScript
   - Run `npm run cdk deploy` to deploy infrastructure changes
   - Run `npm run test` to run unit tests

3. **Frontend Development**
   - Run `npm run develop` in the `client` directory
   - Access the site at `http://localhost:8000`
   - GraphiQL interface at `http://localhost:8000/___graphql`

### Deployment

1. **Deploy CMS**

   ```bash
   cd cms
   npm run deploy
   ```

2. **Deploy Backend**

   ```bash
   cd backend
   npm run cdk deploy
   ```

3. **Deploy Frontend**
   ```bash
   cd client
   npm run build
   npm run deploy
   ```

## Environment Variables

Create the following environment files:

### Client (.env.development and .env.production)

```
GATSBY_SANITY_PROJECT_ID=your-project-id
GATSBY_SANITY_DATASET=production
GATSBY_API_ENDPOINT=your-api-endpoint
```

### Backend (.env)

```
AWS_PROFILE=your-profile
AWS_REGION=your-region
STAGE=dev
```

### CMS (.env)

```
SANITY_STUDIO_API_PROJECT_ID=your-project-id
SANITY_STUDIO_API_DATASET=production
```
