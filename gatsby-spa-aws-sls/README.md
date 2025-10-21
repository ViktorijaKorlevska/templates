# Gatsby SPA AWS Serverless Template

A comprehensive, production-ready template for building modern web applications with Gatsby.js, AWS infrastructure, and Sanity.io CMS integration. This template provides a complete development environment with TypeScript, Tailwind CSS, serverless backend, and multi-domain support.

## 🚀 Features

- **Frontend**: Gatsby.js v5 with TypeScript and React 18
- **Styling**: Tailwind CSS v3 with custom design system
- **CMS**: Sanity.io headless CMS with custom schemas
- **Infrastructure**: AWS CDK for serverless deployment
- **Multi-domain**: Support for multiple domains and environments
- **SEO**: Comprehensive SEO with structured data and Open Graph
- **Edge Functions**: Lambda@Edge for request/response processing
- **Content Delivery**: CloudFront CDN with optimized caching
- **Type Safety**: Full TypeScript coverage across all layers

## 📁 Project Structure

```
gatsby-spa-aws-sls/
├── client/                 # Gatsby.js frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── templates/      # Page templates for programmatic routing
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions and helpers
│   │   └── services/       # Data services and API clients
│   ├── gatsby-config.js    # Gatsby configuration
│   ├── gatsby-node.ts      # Build-time page generation
│   └── package.json
├── backend/               # Serverless backend services
│   └── content-service/   # Content API service
├── cms/                   # Sanity.io CMS configuration
│   ├── schemas/           # Content schemas and types
│   ├── sanity.config.js   # CMS configuration
│   └── package.json
├── client-lambda-edge/    # CloudFront Lambda@Edge functions
└── README.md
```

## 🛠 Setup & Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- AWS CLI configured with appropriate permissions
- Sanity.io account and project

### 1. Environment Configuration

**IMPORTANT**: Before starting, you must configure these environment variables for your business.

Create three environment files in the `client/` directory:

**`.env.development`** (for local development):

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=development

# Site Configuration
GATSBY_DOMAIN_URL=http://localhost:8000
GATSBY_ENV=development

# Business Branding (customize these!)
GATSBY_SITE_NAME=Your Business Name
GATSBY_SITE_SHORT_NAME=YourBiz
GATSBY_SITE_DESCRIPTION=Your business description for SEO and PWA
GATSBY_SITE_AUTHOR=@yourbusiness
GATSBY_THEME_COLOR=#000000
GATSBY_LANG=en
```

**`.env.staging`** (for staging environment):

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=staging

# Site Configuration
GATSBY_DOMAIN_URL=https://staging.yourbusiness.com
GATSBY_ENV=staging

# Business Branding (same as development)
GATSBY_SITE_NAME=Your Business Name
GATSBY_SITE_SHORT_NAME=YourBiz
GATSBY_SITE_DESCRIPTION=Your business description for SEO and PWA
GATSBY_SITE_AUTHOR=@yourbusiness
GATSBY_THEME_COLOR=#000000
GATSBY_LANG=en
```

**`.env.production`** (for production):

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production

# Site Configuration
GATSBY_DOMAIN_URL=https://yourbusiness.com
GATSBY_ENV=production

# Business Branding (same as development)
GATSBY_SITE_NAME=Your Business Name
GATSBY_SITE_SHORT_NAME=YourBiz
GATSBY_SITE_DESCRIPTION=Your business description for SEO and PWA
GATSBY_SITE_AUTHOR=@yourbusiness
GATSBY_THEME_COLOR=#000000
GATSBY_LANG=en
```

**CMS Configuration (`cms/.env.local`)**:

```env
SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_DATASET=production
```

### 📝 What to Replace

When setting up your project, replace these placeholder values:

| Variable                       | Replace With                 | Example                                                  |
| ------------------------------ | ---------------------------- | -------------------------------------------------------- |
| `your_sanity_project_id`       | Your Sanity.io project ID    | `abc123def`                                              |
| `Your Business Name`           | Your actual business name    | `Acme Corporation`                                       |
| `YourBiz`                      | Short version (max 12 chars) | `Acme`                                                   |
| `Your business description...` | SEO-friendly description     | `Professional consulting services for modern businesses` |
| `@yourbusiness`                | Your social media handle     | `@acmecorp`                                              |
| `yourbusiness.com`             | Your actual domain           | `acmecorp.com`                                           |
| `#000000`                      | Your brand color (hex)       | `#1E3A8A`                                                |
| `en`                           | Your primary language        | `en`, `es`, `fr`, etc.                                   |

### 🎨 PWA Icon Requirements

Replace the default icon at `client/src/images/icon.png` with your business logo:

#### **Icon Specifications**:

- **Format**: PNG (preferred) or JPG
- **Dimensions**: 512x512 pixels (minimum)
- **Recommended**: 1024x1024 pixels for best quality
- **Background**: Should work on both light and dark backgrounds
- **Design**: Simple, recognizable logo that scales well

#### **Technical Requirements**:

- **File size**: Under 1MB for optimal performance
- **Transparency**: PNG with transparent background recommended
- **Shape**: Square format (1:1 aspect ratio)
- **Content**: Avoid thin lines or small text that may not be visible at small sizes

#### **Auto-Generated Sizes**:

Gatsby will automatically generate these PWA icon sizes from your 512x512+ source image:

- 192x192 (Android Chrome)
- 512x512 (Android Chrome, iOS Safari)
- 180x180 (iOS Safari)
- 167x167 (iOS Safari iPad)
- 152x152 (iOS Safari iPad)
- 120x120 (iOS Safari iPhone)
- 76x76 (iOS Safari iPad)

#### **Design Tips**:

- ✅ Use your main logo or brand symbol
- ✅ Ensure good contrast with background
- ✅ Test at small sizes (48x48px) for clarity
- ✅ Use consistent brand colors
- ❌ Avoid complex designs or fine details
- ❌ Don't include text unless it's part of your logo
- ❌ Avoid rectangular logos (will be cropped to square)

### 2. Install Dependencies

```bash
# Install all dependencies
cd client && npm install
cd ../cms && npm install
cd ../backend/content-service && npm install
cd ../client-lambda-edge && npm install
```

### 3. CMS Setup

```bash
# Deploy Sanity schemas
cd cms
npx sanity deploy
```

### 4. Development

```bash
# Start development server (uses .env.development)
cd client
npm run start:dev

# Alternative: use default develop command
npm run develop

# In another terminal - start CMS
cd cms
npm run dev
```

## ✅ Getting Started Checklist

Follow this checklist when setting up the template for your business:

### Initial Setup

- [ ] **Clone the template** to your project directory
- [ ] **Install dependencies** in all folders (`client/`, `cms/`, `backend/`)
- [ ] **Create Sanity.io project** and get your project ID
- [ ] **Configure environment files** with your business information

### Branding & Content

- [ ] **Replace logos and icons** in `client/src/images/`
- [ ] **Update brand colors** in `tailwind.config.ts`
- [ ] **Customize environment variables** (site name, description, colors)
- [ ] **Set up domain name** in environment files
- [ ] **Configure PWA settings** (name, short_name, theme_color)

### Content Management

- [ ] **Deploy Sanity schemas** to your project
- [ ] **Create initial content** in Sanity Studio
- [ ] **Set up domain configuration** in Sanity
- [ ] **Add translations** for your target languages
- [ ] **Configure SEO settings** in domain configuration

### Development & Deployment

- [ ] **Test development build** with `npm run start:dev`
- [ ] **Set up staging environment** with staging domain
- [ ] **Configure AWS credentials** for deployment
- [ ] **Test production build** before going live
- [ ] **Set up CI/CD pipeline** for automated deployments

### Business Customization

- [ ] **Add business-specific pages** (About, Services, Contact, etc.)
- [ ] **Customize SEO schemas** for your business type
- [ ] **Set up analytics** and tracking codes
- [ ] **Configure payment/booking systems** if needed
- [ ] **Add business-specific features** and integrations

## 🚀 Available Scripts

The template includes environment-specific scripts for different deployment stages:

### Development Scripts

```bash
# Development build and serve
npm run start:dev          # Clean + develop with .env.development
npm run build:dev          # Clean + build with .env.development
npm run develop            # Standard gatsby develop
```

### Staging Scripts

```bash
# Staging build and serve
npm run start:staging       # Clean + develop with .env.staging
npm run build:staging       # Clean + build with .env.staging
```

### Production Scripts

```bash
# Production build and serve
npm run start:production    # Clean + develop with .env.production
npm run build:production    # Clean + build with .env.production
npm run build               # Standard production build
```

### Utility Scripts

```bash
npm run clean              # Clean Gatsby cache
npm run serve              # Serve built site
npm run typecheck          # TypeScript type checking
```

## 🌐 Multi-Domain Configuration

The template supports multiple domains and environments through Sanity.io configuration:

### Domain Schema (CMS)

Create domain documents in Sanity with:

- **slug**: Domain identifier (e.g., "main", "blog")
- **baseUrl**: Full domain URL
- **seo**: SEO metadata (title, description, image, tags)
- **translations**: Localization strings
- **socialLinks**: Social media links

### Environment URLs

- **Development**: `http://localhost:8000`
- **Staging**: `https://staging.yourdomain.com`
- **Production**: `https://yourdomain.com`

## 📄 Page Creation System

Pages are created programmatically in `gatsby-node.ts`:

### Adding New Pages

1. **Create Page Template** (`src/templates/pages/your-page.tsx`):

```tsx
import React from "react";
import { PageProps } from "gatsby";
import Layout from "../../components/core/Layout";
import { GatsbyPageContext } from "../../types/sanity";

interface YourPageTemplateProps extends PageProps {
  pageContext: GatsbyPageContext;
}

const YourPageTemplate: React.FC<YourPageTemplateProps> = ({ pageContext }) => {
  const currentPage = {
    title: "Your Page Title",
    seo: {
      title: "Your Page Title",
      description: "Your page description for SEO",
    },
  };

  return (
    <Layout
      domain={pageContext?.domain}
      translations={pageContext?.translations || []}
      currentPage={currentPage}
      pageUrl={pageContext?.pageUrl}
    >
      <YourPageContent pageContext={pageContext} />
    </Layout>
  );
};

export default YourPageTemplate;
```

2. **Register in gatsby-node.ts**:

```typescript
// Add to page creation logic
createPage({
  path: "/your-page",
  component: path.resolve(`./src/templates/pages/your-page.tsx`),
  context: {
    ...globalContext,
    pageUrl: `${baseUrl}/your-page`,
  },
});
```

## 🎨 Component Development

### Layout Component

The `Layout` component provides the main page structure:

- **Props**: `domain`, `translations`, `currentPage`, `pageUrl`, `entity`
- **Features**: SEO integration, navigation, footer, cookie consent

### SEO Component

Comprehensive SEO handling with:

- **Meta tags**: Title, description, image, robots
- **Open Graph**: Social media optimization
- **Structured Data**: JSON-LD schema markup
- **Canonical URLs**: Proper URL canonicalization

## 📊 Customizing SEO & Structured Data

### Custom Schema Implementation

The SEO component includes structured data that should be customized based on your business needs:

**For Business/Organization**:

```typescript
const CreateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${defaultDomainUrl}#organization`,
    name: "Your Business Name",
    url: defaultDomainUrl,
    logo: {
      "@type": "ImageObject",
      url: `${defaultDomainUrl}/logo.png`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-123-4567",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business St",
      addressLocality: "City",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "US",
    },
  };
};
```

**For E-commerce**:

```typescript
const CreateProductSchema = (product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Your Brand",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
};
```

**For Blog/Articles**:

```typescript
const CreateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Your Publication",
    },
  };
};
```

### Customizing SEO Component

1. **Update Schema Logic** in `src/components/core/SEO.tsx`:

```typescript
const GetEntitySchema = () => {
  if (!currentPage || !entity) return null;

  // Customize based on your content type
  switch (currentPage.contentType) {
    case "product":
      return CreateProductSchema(currentPage);
    case "article":
      return CreateArticleSchema(currentPage);
    default:
      return CreateWebPageSchema(currentPage);
  }
};
```

2. **Add Content Type to CurrentPage Interface**:

```typescript
export interface CurrentPage {
  title?: string;
  contentType?: "webpage" | "article" | "product" | "service";
  seo?: {
    title?: string;
    description?: string;
    image?: { url: string };
  };
}
```

## 🔄 Type Replication from Sanity

To keep TypeScript types synchronized with Sanity schemas:

### 1. Install Sanity Codegen

```bash
cd cms
npm install @sanity/codegen --save-dev
```

### 2. Configure Codegen (`cms/codegen.config.ts`):

```typescript
import { SanityCodegenConfig } from "@sanity/codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./schemas/**/*.ts",
  generates: {
    "../client/src/types/sanity-generated.ts": {
      preset: "typescript",
    },
  },
};

export default config;
```

### 3. Add Scripts (`cms/package.json`):

```json
{
  "scripts": {
    "codegen": "sanity codegen",
    "codegen:watch": "sanity codegen --watch"
  }
}
```

### 4. Generate Types:

```bash
cd cms
npm run codegen
```

### 5. Use Generated Types (`client/src/types/sanity.ts`):

```typescript
// Re-export generated types
export * from "./sanity-generated";

// Extend with custom interfaces
export interface GatsbyPageContext extends SanityDomain {
  translations?: SanityTranslation[];
  pageUrl?: string;
  buildInfo?: BuildInfo;
}
```

## 🚀 Deployment

### AWS Infrastructure

```bash
# Deploy backend services
cd backend
npm run deploy

# Deploy Lambda@Edge functions
cd client-lambda-edge
npm run deploy
```

### Frontend Deployment

```bash
# Build and deploy static site
cd client
npm run build
aws s3 sync public/ s3://your-bucket-name
```

## 🔧 Configuration Files

### Key Configuration Files:

- **`gatsby-config.ts`**: Gatsby plugins, site metadata, and PWA configuration
- **`gatsby-node.ts`**: Build-time page generation, sitemap, and GraphQL
- **`tailwind.config.ts`**: Tailwind CSS customization and brand colors
- **`tsconfig.json`**: TypeScript configuration
- **`sanity.config.ts`**: CMS configuration and plugins

## 🚨 Troubleshooting

### Common Issues and Solutions

**Build fails with "GraphQL API not deployed"**:

- Solution: Set up your Sanity.io project and deploy the GraphQL API
- Run: `cd cms && npx sanity graphql deploy`

**Environment variables not loading**:

- Check: Ensure `.env.*` files are in the `client/` directory
- Check: Variable names start with `GATSBY_` for client-side access
- Check: `env-cmd` dependency is installed

**PWA manifest errors**:

- Check: `src/images/icon.png` exists and meets specifications (512x512px minimum)
- Check: All PWA environment variables are set correctly
- Check: Theme colors are valid hex codes (e.g., `#1E3A8A`)
- Check: Icon file size is under 1MB
- Check: Icon is square format (1:1 aspect ratio)

**PWA icon not displaying correctly**:

- Ensure icon is at least 512x512 pixels
- Use PNG format with transparent background
- Test icon clarity at 48x48px size
- Avoid thin lines or small text in the design
- Clear browser cache and test on different devices

**TypeScript errors**:

- Run: `npm run typecheck` to see specific errors
- Check: All imports have proper file extensions
- Check: Sanity types are generated with `npm run codegen`

**Sitemap not generating**:

- Check: Sanity data is available during build
- Check: `public/` directory permissions
- Check: Build completes successfully

**Development server issues**:

- Clear cache: `npm run clean`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check: Port 8000 is available

### Getting Help

- Check the documentation in each component's README
- Review the code examples in `src/templates/`
- Consult the Sanity.io and Gatsby.js documentation
- Open an issue for bugs or feature requests

## 📚 Development Guidelines

### Code Organization

- **Components**: Organized by feature/domain
- **Types**: Centralized in `src/types/`
- **Services**: Data fetching and business logic
- **Utils**: Pure utility functions

### Best Practices

- Use TypeScript strictly
- Follow React best practices
- Implement proper error boundaries
- Write comprehensive tests
- Document component APIs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions and support:

- Check the documentation in each component's README
- Review the code examples in `src/templates/`
- Consult the Sanity.io and Gatsby.js documentation
- Open an issue for bugs or feature requests

---

**Happy coding! 🎉**
