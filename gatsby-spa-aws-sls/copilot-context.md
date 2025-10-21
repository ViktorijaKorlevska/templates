# Gatsby SPA AWS Serverless Template - Production Ready

## 🎯 Template Overview

This is a **production-ready, business-focused template** for building modern web applications using Gatsby.js, AWS serverless infrastructure, and Sanity.io CMS. The template is designed to be **customized for specific business needs** through AI-assisted development.

### 🚀 Template Status: PRODUCTION READY

- ✅ Complete TypeScript coverage
- ✅ Multi-domain support with environment handling
- ✅ Programmatic page creation system
- ✅ Comprehensive SEO with structured data
- ✅ GDPR-compliant cookie consent
- ✅ Centralized data services
- ✅ Full documentation and setup guides

## 📋 AI Assistant Usage Instructions

When a user requests to build a business application using this template:

### 1. Business Analysis Phase

```
User Input: "Build an e-commerce website for selling handmade jewelry"
AI Actions:
1. Analyze business type, target audience, and requirements
2. Plan content types needed (products, categories, reviews, etc.)
3. Design SEO schema for business type (Product, Organization, etc.)
4. Identify required pages and user flows
5. Plan Sanity.io schemas and content structure
```

### 2. Customization Planning

```
Business Requirements Analysis:
- Content Types: What data models are needed?
- Pages: What pages should be created programmatically?
- SEO Strategy: What structured data schemas fit the business?
- Features: Shopping cart, contact forms, booking system, etc.
- Integrations: Payment processors, analytics, third-party APIs
```

### 3. Implementation Approach

```
Systematic Development:
1. Update Sanity schemas for business content types
2. Customize SEO component for business-specific structured data
3. Create page templates for business pages
4. Update gatsby-node.ts for business page creation
5. Implement business-specific components and features
6. Configure domain and environment settings
```

## 🏗 Current Template Architecture

### Project Structure

```
gatsby-spa-aws-sls/
├── client/                 # Gatsby.js frontend (TypeScript + React)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── core/      # Layout, SEO, Header, Footer, CookieConsent
│   │   │   ├── context/   # React context providers (locale)
│   │   │   └── ui/        # Business-specific UI components
│   │   ├── templates/     # Page templates for programmatic routing
│   │   │   ├── pages/     # Homepage, 404, business pages
│   │   │   └── content/   # Dynamic content templates
│   │   ├── services/      # DataService utility class
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Utility functions
│   ├── gatsby-config.js   # Gatsby configuration
│   ├── gatsby-node.ts     # Programmatic page creation
│   └── package.json
├── backend/               # AWS serverless backend
│   ├── content-service/   # Content API microservice
│   └── core/             # Shared backend utilities
├── cms/                   # Sanity.io headless CMS
│   ├── schemas/          # Content type definitions
│   └── sanity.config.js  # CMS configuration
├── client-lambda-edge/    # CloudFront edge functions
└── README.md             # Complete setup and customization guide
```

### 🔧 Core Systems (Ready for Business Customization)

#### 1. Multi-Domain System

- **Domain Configuration**: Sanity-based domain management
- **Environment Handling**: Dev, staging, production URLs
- **SEO Per Domain**: Domain-specific metadata and structured data

#### 2. Programmatic Page Creation

- **gatsby-node.ts**: Creates pages with full context (domain, translations, pageUrl)
- **Page Templates**: Reusable templates for business content types
- **Context Passing**: Complete data flow from build-time to components

#### 3. SEO & Structured Data System

- **Customizable Schemas**: Ready for business-specific structured data
- **URL Management**: Environment-aware canonical URLs
- **Meta Tag System**: Comprehensive Open Graph and Twitter Cards

#### 4. Content Management

- **Sanity.io Integration**: Headless CMS with custom schemas
- **Type Generation**: Automated TypeScript types from Sanity schemas
- **Translation System**: Multi-language support with locale context

## 💼 Business Customization Areas

### For E-commerce Businesses

```typescript
// Sanity Schemas to Add:
- Product (name, price, images, variants, inventory)
- Category (name, slug, description, image)
- Order (customer, items, total, status)
- Customer (profile, addresses, order history)

// SEO Schemas to Implement:
- Product schema with offers, reviews, availability
- Organization schema with business info
- BreadcrumbList for navigation
```

### For Service Businesses

```typescript
// Sanity Schemas to Add:
- Service (name, description, price, duration)
- TeamMember (name, role, bio, image)
- Testimonial (client, content, rating, date)
- Booking (service, date, customer, status)

// SEO Schemas to Implement:
- Service schema with provider info
- LocalBusiness schema with location, hours
- Person schema for team members
```

### For Content/Blog Sites

```typescript
// Sanity Schemas to Add:
- Article (title, content, author, category, tags)
- Author (name, bio, image, social links)
- Category (name, description, color)
- Newsletter (subscribers, campaigns)

// SEO Schemas to Implement:
- Article schema with author, publisher
- Person schema for authors
- WebSite schema with search action
```

## 🎨 Component Architecture (Business-Ready)

### Layout System

```typescript
// Current Layout Props (ready for business extension):
interface LayoutProps {
  domain?: Domain; // Business domain configuration
  translations?: Translation[]; // Multi-language support
  currentPage?: CurrentPage; // Page-specific SEO and content
  pageUrl?: string; // Environment-aware URLs
  entity?: boolean; // Business entity flag for structured data
  showNav?: boolean; // Navigation control
  showFooter?: boolean; // Footer control
}
```

### SEO Component (Customization Ready)

```typescript
// Ready for business-specific structured data:
const GetEntitySchema = () => {
  // Customize based on business type:
  switch (currentPage.contentType) {
    case "product":
      return CreateProductSchema(currentPage);
    case "service":
      return CreateServiceSchema(currentPage);
    case "article":
      return CreateArticleSchema(currentPage);
    case "event":
      return CreateEventSchema(currentPage);
    default:
      return CreateWebPageSchema(currentPage);
  }
};
```

### DataService (Business Logic Ready)

```typescript
// Centralized service for business operations:
class DataService {
  static translate(key: string, lang?: string, category?: string): string;
  static getCurrentDomain(domains: Domain[]): Domain;
  static getBaseUrl(): string; // Environment-aware URL generation
  static formatCurrency(amount: number, currency?: string): string;
  static formatDate(date: Date, format?: string): string;
  // Add business-specific methods here
}
```

## 🔄 Type System (Sanity Integration)

### Automated Type Generation

```bash
# Generate TypeScript types from Sanity schemas:
cd cms && npm run codegen

# Types are automatically created in:
client/src/types/sanity-generated.ts
```

### Business Type Extensions

```typescript
// Extend generated types for business needs:
export interface BusinessPageContext extends GatsbyPageContext {
  products?: Product[];
  services?: Service[];
  businessInfo?: BusinessInfo;
  // Add business-specific context
}
```

## 📋 Business Implementation Workflow

### Phase 1: Business Analysis & Planning

```
AI Assistant Process:
1. Analyze business description and requirements
2. Identify target audience and use cases
3. Plan content architecture and user flows
4. Design SEO strategy and structured data needs
5. Map required integrations and third-party services
```

### Phase 2: Content & Schema Design

```
Sanity.io Customization:
1. Design business-specific content types
2. Create custom input components if needed
3. Set up content relationships and references
4. Configure field validation and required fields
5. Plan content migration and initial data
```

### Phase 3: Frontend Customization

```
Component Development:
1. Create business-specific page templates
2. Implement custom UI components for business needs
3. Add business logic to DataService
4. Customize SEO schemas for business type
5. Update gatsby-node.ts for business page creation
```

### Phase 4: Features & Integration

```
Business Features:
1. Implement business-specific functionality
2. Add third-party service integrations
3. Set up forms, payments, or booking systems
4. Configure analytics and tracking
5. Add business-specific authentication if needed
```

## 🛠 Development Setup & Customization

### Prerequisites

- Node.js 18+ and npm/yarn
- AWS CLI configured with appropriate permissions
- Sanity.io account and project
- Business requirements and branding assets

### Quick Start for New Business

```bash
# 1. Clone and setup
git clone <template-repo> business-website
cd business-website

# 2. Install dependencies
cd client && npm install
cd ../cms && npm install
cd ../backend/content-service && npm install

# 3. Configure environment files
# Create three environment files in client/ directory:
# .env.development, .env.staging, .env.production
# Each with: SANITY_PROJECT_ID, SANITY_DATASET, GATSBY_DOMAIN_URL, GATSBY_ENV

# 4. Customize CMS schemas
cd cms
# Add business-specific schemas in schemas/ directory
npm run dev  # Start Sanity Studio

# 5. Start development
cd ../client
npm run start:dev  # Uses .env.development automatically
```

### Environment Configuration

The template uses a simplified environment system with three core variables:

**Required Environment Variables per .env file:**

```bash
# .env.development
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=development
GATSBY_DOMAIN_URL=http://localhost:8000
GATSBY_ENV=development

# .env.staging
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=staging
GATSBY_DOMAIN_URL=https://staging.yourbusiness.com
GATSBY_ENV=staging

# .env.production
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
GATSBY_DOMAIN_URL=https://yourbusiness.com
GATSBY_ENV=production
```

### Available npm Scripts

**Environment-specific scripts** (automatically load correct .env file):

```bash
# Development
npm run start:dev          # Develop with .env.development
npm run build:dev          # Build with .env.development

# Staging
npm run start:staging       # Develop with .env.staging
npm run build:staging       # Build with .env.staging

# Production
npm run start:production    # Develop with .env.production
npm run build:production    # Build with .env.production

# Standard scripts
npm run develop            # Standard gatsby develop
npm run build              # Standard gatsby build
npm run clean              # Clean gatsby cache
npm run typecheck          # TypeScript checking
```

### Key Configuration Points

1. **Environment Files**: Three .env files with SANITY_PROJECT_ID, SANITY_DATASET, GATSBY_DOMAIN_URL, GATSBY_ENV
2. **Sanity Configuration**: gatsby-config.ts uses SANITY_PROJECT_ID and SANITY_DATASET variables
3. **npm Scripts**: Use environment-specific scripts (start:dev, build:staging, etc.)
4. **Sanity Schemas**: Create content types for business needs in cms/schemas/
5. **SEO Configuration**: Update structured data for business type in components/core/SEO.tsx
6. **Branding**: Replace logos, colors, fonts in Tailwind config and components

### Key Configuration Points

1. **Environment Variables**: Set business domain, Sanity project, AWS region
2. **Sanity Schemas**: Create content types for business needs
3. **SEO Configuration**: Update structured data for business type
4. **Branding**: Replace logos, colors, fonts in Tailwind config
5. **Content**: Add initial business content through Sanity Studio

## 🔧 Technical Specifications

### Current Dependencies

```json
{
  "gatsby": "^5.14.6",
  "react": "^18.3.1",
  "typescript": "^5.6.3",
  "@sanity/client": "^6.22.2",
  "tailwindcss": "^3.4.14",
  "@tailwindcss/typography": "^0.5.15"
}
```

### Performance & SEO Features

- ✅ Static Site Generation (SSG) for optimal performance
- ✅ Automatic code splitting and lazy loading
- ✅ Image optimization with Gatsby Image
- ✅ Progressive Web App (PWA) ready
- ✅ Comprehensive meta tags and Open Graph
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Canonical URLs and sitemap generation
- ✅ GDPR-compliant cookie consent

### Deployment Architecture

- **Frontend**: Static files deployed to S3 + CloudFront CDN
- **Backend**: Serverless Lambda functions via AWS CDK
- **CMS**: Sanity.io hosted headless CMS
- **Edge**: Lambda@Edge for request/response processing
- **DNS**: Route 53 with SSL certificates via ACM

## 📊 Business Examples & Use Cases

### E-commerce Implementation Example

```typescript
// Business: Online jewelry store
// AI Implementation Steps:

// 1. Sanity Schemas Created:
- Product (name, price, images, materials, sizes, inventory)
- Collection (name, description, featured products)
- Customer (profile, orders, wishlist)
- Review (rating, content, customer, product)

// 2. SEO Schemas Implemented:
- Product schema with offers, reviews, availability
- Organization schema with business contact info
- BreadcrumbList for category navigation
- AggregateRating for product reviews

// 3. Pages Created Programmatically:
- /products/[slug] - Individual product pages
- /collections/[slug] - Product collection pages
- /cart - Shopping cart functionality
- /checkout - Secure checkout process

// 4. Business Features Added:
- Stripe payment integration
- Inventory management
- Customer accounts and order tracking
- Product search and filtering
```

### Service Business Implementation Example

```typescript
// Business: Digital marketing agency
// AI Implementation Steps:

// 1. Sanity Schemas Created:
- Service (name, description, packages, pricing)
- CaseStudy (title, client, results, testimonials)
- TeamMember (name, role, expertise, bio)
- BlogPost (title, content, author, category)

// 2. SEO Schemas Implemented:
- Service schema with provider details
- Organization schema with team and location
- Article schema for blog posts
- Person schema for team members

// 3. Pages Created Programmatically:
- /services/[slug] - Service detail pages
- /case-studies/[slug] - Portfolio showcases
- /blog/[slug] - Content marketing articles
- /team/[member] - Team member profiles

// 4. Business Features Added:
- Contact form with service inquiry
- Case study portfolio display
- Blog with categories and tags
- Team showcase with expertise areas
```

## 🎯 AI Assistant Guidelines for Business Implementation

### When User Describes Their Business:

#### 1. Business Analysis Phase

```
Extract from user description:
- Business type and industry
- Target audience and demographics
- Core services or products offered
- Key business goals and objectives
- Required features and functionality
- Integration needs (payments, bookings, etc.)
```

#### 2. Technical Planning Phase

```
Plan implementation approach:
- Content architecture for business needs
- Required Sanity.io schemas and relationships
- Page structure and navigation flow
- SEO strategy and structured data requirements
- Third-party integrations and APIs needed
- Performance and scalability considerations
```

#### 3. Development Execution Phase

```
Systematic implementation:
1. Create/modify Sanity schemas for business content
2. Update SEO component with business-appropriate structured data
3. Create page templates for business content types
4. Implement business-specific components and features
5. Configure gatsby-node.ts for business page generation
6. Set up required integrations and external services
7. Update environment configurations and deployment settings
```

## 🔧 Template Customization Areas

### Content Management (Sanity.io)

- **Schema Design**: Business-specific content types and relationships
- **Field Customization**: Custom input components for business needs
- **Validation Rules**: Business logic for content requirements
- **Workflow Configuration**: Content publishing and review processes

### SEO & Marketing

- **Structured Data**: Business-appropriate schema.org markup
- **Meta Tags**: Industry-specific SEO optimization
- **Social Media**: Platform-specific sharing optimization
- **Analytics**: Business KPI tracking and conversion measurement

### User Experience

- **Navigation**: Business-appropriate menu structure
- **Forms**: Contact, inquiry, booking, or purchase forms
- **Search**: Product/service/content search functionality
- **Authentication**: Customer accounts and user management

### Business Features

- **E-commerce**: Shopping cart, payments, inventory
- **Booking**: Appointment scheduling, calendar integration
- **Communication**: Contact forms, live chat, newsletters
- **Analytics**: Custom tracking for business metrics

## 🚀 Production Deployment & Scaling

### Environment Configuration

```bash
# Development Environment
GATSBY_SANITY_PROJECT_ID=your-project-id
GATSBY_SANITY_DATASET=development
GATSBY_DOMAIN_URL=http://localhost:8000
GATSBY_STAGE=development

# Staging Environment
GATSBY_SANITY_DATASET=staging
GATSBY_DOMAIN_URL=https://staging.yourbusiness.com
GATSBY_STAGE=staging

# Production Environment
GATSBY_SANITY_DATASET=production
GATSBY_DOMAIN_URL=https://yourbusiness.com
GATSBY_STAGE=production
```

### Deployment Pipeline

1. **Content Management**: Deploy Sanity schemas and initial content
2. **Infrastructure**: Deploy AWS CDK stacks for backend services
3. **Frontend Build**: Generate optimized static site with Gatsby
4. **CDN Deployment**: Deploy to S3 + CloudFront for global delivery
5. **DNS Configuration**: Set up custom domains with SSL certificates

### Performance Optimization

- **Static Generation**: All pages pre-built at deploy time
- **Image Optimization**: Responsive images with WebP format
- **Code Splitting**: Automatic JavaScript bundle optimization
- **CDN Caching**: Global content delivery with edge caching
- **Lazy Loading**: Progressive loading for improved performance

## 📋 Final Template Status

### ✅ Completed Core Systems

- [x] **Multi-domain Architecture**: Environment-aware URL generation
- [x] **Programmatic Page Creation**: gatsby-node.ts with full context passing
- [x] **SEO System**: Comprehensive meta tags, Open Graph, structured data
- [x] **Content Management**: Sanity.io integration with type generation
- [x] **Layout System**: Flexible Layout component with proper prop flow
- [x] **Translation System**: Multi-language support with locale context
- [x] **Cookie Consent**: GDPR-compliant with granular controls
- [x] **DataService**: Centralized utility class for all data operations
- [x] **Type Safety**: Full TypeScript coverage across all layers
- [x] **Documentation**: Complete setup and customization guides

### 🎯 Ready for Business Implementation

The template is **production-ready** and optimized for **AI-assisted business customization**. When a user describes their business needs:

1. **Analyze** business requirements and target audience
2. **Plan** content architecture and technical approach
3. **Customize** Sanity schemas for business content types
4. **Implement** business-specific pages, components, and features
5. **Configure** SEO schemas appropriate for the business type
6. **Deploy** with business branding and domain configuration

### 🔄 Maintenance & Updates

- **Type Synchronization**: Use `npm run codegen` to sync Sanity types
- **Content Updates**: Use Sanity Studio for non-technical content management
- **Feature Extensions**: Add business features through component composition
- **Performance Monitoring**: Built-in analytics and Core Web Vitals tracking
- **Security Updates**: Regular dependency updates and security patches

---

## 🎉 Template Ready for Business Applications

This template provides a **complete foundation** for building modern, scalable web applications tailored to specific business needs through AI-assisted development. The architecture supports rapid customization while maintaining production-quality standards for performance, SEO, and user experience.
