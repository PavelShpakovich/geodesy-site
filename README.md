# Geodesy Services Website# Geodesy Services Website# Geodesy Services WebsiteThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Modern Next.js website for geodesy services with Contentful CMS integration, server-side rendering, and responsive design.

## 🚀 Tech StackModern, professional website for geodesy services built with **Next.js 15** and **Contentful CMS**.Modern, professional website for geodesy services built with **Next.js 15** and **Contentful CMS**.## Getting Started

- **Framework**: Next.js 16.0.2 (App Router, React Server Components, Turbopack)

- **React**: 19.2.0 (with useActionState, useFormStatus)

- **TypeScript**: 5.x (strict mode)## 🚀 Tech Stack## 🚀 Tech StackFirst, run the development server:

- **CMS**: Contentful v11 (with Preview API support)

- **Styling**: Tailwind CSS v4.0.16

- **UI Components**: shadcn/ui (Radix UI primitives)

- **Email**: Nodemailer (SMTP integration)- **Framework**: Next.js 15 (App Router)- **Framework**: Next.js 15 (App Router)```bash

- **Caching**: Next.js unstable_cache (1 week revalidation)

- **CMS**: Contentful (Headless CMS)

## ✨ Features

- **Language**: TypeScript- **CMS**: Contentful (Headless CMS)npm run dev

### Core Features

- 🎨 **Fully Responsive Design**: Mobile-first approach with optimized breakpoints- **Styling**: Tailwind CSS

- 📱 **Mobile Menu**: Interactive hamburger menu with smooth transitions

- 📧 **Contact Form**: Server Actions with useActionState for progressive enhancement- **UI Components**: shadcn/ui- **Language**: TypeScript# or

- 🔄 **Real-time CMS**: Contentful webhook integration for instant cache invalidation

- 🔍 **SEO Optimized**: Dynamic metadata, Open Graph, Twitter Cards- **Icons**: Lucide React

- ⚡ **Performance**: Server Components, streaming, lazy initialization patterns

- **Content**: Contentful SDK with Preview Mode- **Styling**: Tailwind CSSyarn dev

### Architecture Patterns

- **Server/Client Split**: Clear separation of data fetching (HeaderServer) and UI state (Header)

- **Proxy Pattern**: Lazy Contentful client initialization to prevent browser execution

- **Preview Mode**: Draft content preview with cache bypass## 📋 Prerequisites- **UI Components**: shadcn/ui# or

- **Type Safety**: Contentful Entry Skeletons with TypeScript validation

- **Caching Strategy**: unstable_cache with webhook-based revalidation

## 📁 Project Structure- Node.js 18+ and npm- **Icons**: Lucide Reactpnpm dev

`````- Contentful account (free tier available)

geodesy-site/

├── app/                          # Next.js App Router- **Content**: Contentful SDK with Preview Mode# or

│   ├── layout.tsx                # Root layout with HeaderServer/Footer

│   ├── page.tsx                  # Homepage with Hero/Advantages/Services## 🛠️ Setup Instructions

│   ├── globals.css               # Tailwind + custom container utility

│   ├── services/                 # Services sectionbun dev

│   │   ├── page.tsx              # Services list page

│   │   └── [slug]/page.tsx       # Individual service pages### 1. Clone and Install

│   ├── about/page.tsx            # About us page

│   ├── contacts/page.tsx         # Contact page with form## 📋 Prerequisites```

│   └── api/                      # API routes

│       ├── revalidate/route.ts   # Contentful webhook handler```bash

│       └── preview/route.ts      # CMS preview mode

├── components/git clone <your-repo-url>- Node.js 18+ and npmOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

│   ├── layout/

│   │   ├── Header.tsx            # Client component (mobile menu state)cd geodesy-site

│   │   ├── HeaderServer.tsx      # Server component (data fetching)

│   │   └── Footer.tsx            # Footer with company infonpm install- Contentful account (free tier available)

│   ├── home/

│   │   ├── Hero.tsx              # Hero section with gradient```

│   │   ├── AdvantagesSection.tsx # Advantages grid

│   │   ├── ServicesPreview.tsx   # Services cardsYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

│   │   └── ContactCTA.tsx        # Contact call-to-action

│   ├── services/### 2. Environment Variables

│   │   ├── ServicesList.tsx      # Services grid layout

│   │   └── ServiceCard.tsx       # Individual service card## 🛠️ Setup Instructions

│   ├── contacts/

│   │   ├── ContactForm.tsx       # Form with useActionStateCopy `.env.local.example` to `.env.local` and fill in your Contentful credentials:

│   │   └── SubmitButton.tsx      # Button with useFormStatus

│   └── ui/                       # shadcn/ui componentsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

├── lib/

│   ├── contentful/```bash

│   │   ├── client.ts             # Proxy-based lazy client

│   │   ├── api.ts                # Data fetching functionscp .env.local.example .env.local### 1. Clone and Install

│   │   └── types/                # TypeScript type definitions

│   ├── actions/```

│   │   └── contact.ts            # Server Action for contact form

│   └── utils/## Learn More

│       └── email.ts              # Nodemailer configuration

├── SMTP_SETUP.md                 # Email configuration guideRequired variables:

├── CONTENTFUL_WEBHOOK_SETUP.md   # Webhook setup instructions

└── instructions.md               # Development phases documentation````bash

`````

````env

## 🛠️ Setup Instructions

# Contentful Space Configurationgit clone <your-repo-url>To learn more about Next.js, take a look at the following resources:

### 1. Prerequisites

- Node.js 18+ and npm/yarnCONTENTFUL_SPACE_ID=your_space_id_here

- Contentful account with space created

- SMTP credentials (Gmail, SendGrid, or other)CONTENTFUL_ACCESS_TOKEN=your_delivery_token_herecd geodesy-site



### 2. Environment VariablesCONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token_here



Create `.env.local` in the project root:CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_herenpm install- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.



```bash

# Contentful CMS

CONTENTFUL_SPACE_ID=your_space_id# Preview Mode```- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token

CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_tokenCONTENTFUL_PREVIEW_MODE=false

CONTENTFUL_ENVIRONMENT=master

CONTENTFUL_PREVIEW_SECRET=change_this_to_random_string

# Email (SMTP)

SMTP_HOST=smtp.gmail.com

SMTP_PORT=587

SMTP_SECURE=false# Site Configuration### 2. Configure ContentfulYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

SMTP_USER=your-email@gmail.com

SMTP_PASS=your-app-passwordNEXT_PUBLIC_SITE_URL=http://localhost:3000

SMTP_FROM=your-email@gmail.com

SMTP_TO=recipient@example.com```



# Webhook Security (optional but recommended)

WEBHOOK_SECRET=your-random-secret-string

```### 3. Run Migrations#### Create a Contentful Space## Deploy on Vercel



### 3. Install Dependencies



```bashCreate content types in Contentful:

npm install

````

### 4. Contentful Setup```bash1. Sign up at [Contentful](https://www.contentful.com/)The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

#### Create Content Typesnpm run contentful:migrate

The project requires these Contentful content types:

`````2. Create a new space

1. **Company Info** (`companyInfo`)

   - name: Short Text

   - description: Long Text

   - address: Short TextThis will create 5 content types:3. Go to **Settings → API keys** and create API keysCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

   - phone: Short Text

   - email: Short Text- `companyInfo` - Company information (Single Type)

   - workHours: Short Text

   - telegram: Short Text (optional)- `service` - Services list

   - viber: Short Text (optional)

   - whatsapp: Short Text (optional)- `advantage` - Company advantages#### Get API Credentials



2. **Service** (`service`)- `review` - Customer reviews

   - title: Short Text

   - description: Long Text- `seoPage` - SEO metadataYou'll need:

   - slug: Short Text (unique)

- **Space ID**: Found in Settings → General Settings

3. **Advantage** (`advantage`)

   - title: Short Text### 4. Generate TypeScript Types- **Content Delivery API Token**: Create in Settings → API keys

   - description: Long Text

- **Content Preview API Token**: Create in Settings → API keys

4. **SEO Page** (`seoPage`)

   - slug: Short Text (unique)```bash- **Content Management Token**: Create in Settings → API keys (for type generation)

   - title: Short Text

   - description: Long Textnpm run contentful:types

   - keywords: Short Text (optional)

   - ogImage: Media (optional)```### 3. Environment Variables



#### Populate Content

Add at least one entry for each content type to avoid empty pages.

This generates type-safe interfaces in `lib/contentful/types-generated.ts`.Copy `.env.local.example` to `.env.local` and fill in your Contentful credentials:

#### Configure Webhook (for cache revalidation)

See `CONTENTFUL_WEBHOOK_SETUP.md` for detailed instructions.



### 5. Email Configuration### 5. Start Development Server```bash



See `SMTP_SETUP.md` for detailed SMTP setup instructions for:cp .env.local.example .env.local

- Gmail (with App Passwords)

- SendGrid```bash````

- Other SMTP providers

npm run dev

### 6. Run Development Server

```Edit `.env.local`:

```bash

npm run dev

`````

Open [http://localhost:3000](http://localhost:3000) to see your site.```bash

Open [http://localhost:3000](http://localhost:3000) in your browser.

# Contentful Configuration

## 🏗️ Architecture Details

## 📁 Project StructureCONTENTFUL_SPACE_ID=your_space_id_here

### Server/Client Component Strategy

CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here

**HeaderServer.tsx** (Server Component):

`typescript`CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_token_here

export async function Header() {

const companyInfo = await getCompanyInfo();geodesy-site/CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here

return <HeaderClient companyInfo={companyInfo} />;

}├── app/ # Next.js App Router

````

│   ├── page.tsx             # Home page# Preview Mode

**Header.tsx** (Client Component):

```typescript│   ├── layout.tsx           # Root layoutCONTENTFUL_PREVIEW_MODE=false

'use client';

export default function HeaderClient({ companyInfo }) {│   └── api/                 # API routesCONTENTFUL_PREVIEW_SECRET=your_random_secret_here

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive UI logic only├── components/              # React components

}

```│   ├── layout/             # Header, Footer, Navigation# Site Configuration



This pattern:│   ├── sections/           # Page sections (Hero, Services, etc.)NEXT_PUBLIC_SITE_URL=http://localhost:3000

- ✅ Keeps data fetching server-side

- ✅ Prevents API imports in client bundles│   └── ui/                 # shadcn/ui components```

- ✅ Enables client-side interactivity (mobile menu)

- ✅ Avoids "use server" directive conflicts├── lib/



### Contentful Client Initialization│   └── contentful/         # Contentful integration### 4. Create Content Models in Contentful



Uses Proxy pattern to defer initialization until first access:│       ├── api.ts          # Type-safe API functions



```typescript│       ├── client.ts       # Contentful client configurationCreate the following content types in your Contentful space:

// client.ts

let contentfulClientInstance: ContentfulClientApi | null = null;│       └── types-generated.ts  # Auto-generated types



const getContentfulClient = (preview = false) => {├── contentful/             # Contentful management#### Company Info (Single Type) - ID: `companyInfo`

  if (!contentfulClientInstance) {

    contentfulClientInstance = createClient({│   ├── migrations/         # Content type migrations

      space: process.env.CONTENTFUL_SPACE_ID!,

      accessToken: preview ? previewToken : deliveryToken,│   └── run-migrations.ts   # Migration runner| Field       | Type       | Required |

      environment: process.env.CONTENTFUL_ENVIRONMENT,

      host: preview ? 'preview.contentful.com' : undefined,└── public/                 # Static assets| ----------- | ---------- | -------- |

    });

  }```| name        | Short text | ✅       |

  return contentfulClientInstance;

};| description | Long text  | ✅       |



// Proxy prevents browser execution## 🔄 Contentful Workflow| address     | Short text | ✅       |

export const contentfulClient = new Proxy({} as ContentfulClientApi, {

  get: (_, prop) => getContentfulClient()[prop as keyof ContentfulClientApi],| phone       | Short text | ✅       |

});

```### Adding Content| email       | Short text | ✅       |



### Caching Strategy| workHours   | Short text | ✅       |



All data fetching functions use `unstable_cache` with preview bypass:1. Go to your Contentful space: `https://app.contentful.com/spaces/YOUR_SPACE_ID`| telegram    | Short text | ❌       |



```typescript2. Navigate to "Content" tab| viber       | Short text | ❌       |

export const getCompanyInfo = async (preview = false) => {

  if (preview) {3. Click "Add entry" and select content type| whatsapp    | Short text | ❌       |

    return getCompanyInfoUncached(preview); // No cache for drafts

  }4. Fill in fields and publish



  return unstable_cache(#### Service (Collection Type) - ID: `service`

    async () => getCompanyInfoUncached(false),

    ['company-info'],### Updating Content Types

    {

      revalidate: 604800, // 1 week| Field       | Type           | Required |

      tags: ['contentful', 'company-info'],

    }When you need to modify content type structure:| ----------- | -------------- | -------- |

  )();

};| title       | Short text     | ✅       |

````

1. Create a new migration in `contentful/migrations/`:| description | Long text | ✅ |

Cache invalidation via webhook:

````typescript| price       | Short text     | ✅       |

// app/api/revalidate/route.ts

revalidateTag('contentful');```typescript| slug        | Short text     | ✅       |

revalidateTag(`seo-${slug}`);

```// Example: contentful/migrations/06-add-field-to-service.ts| image       | Media (single) | ❌       |



### Contact Form (Server Actions)npm run contentful:migrate



Uses React 19's `useActionState` and `useFormStatus`:```#### Advantage (Collection Type) - ID: `advantage`



```typescript

// components/contacts/ContactForm.tsx

'use client';2. Regenerate TypeScript types:| Field       | Type       | Required |

const [state, formAction] = useActionState(sendContactEmail, initialState);

| ----------- | ---------- | -------- |

<form action={formAction}>

  {/* form fields */}```bash| title       | Short text | ✅       |

  <SubmitButton />

</form>npm run contentful:types| description | Long text  | ✅       |



// components/contacts/SubmitButton.tsx```

const { pending } = useFormStatus();

<Button disabled={pending}>#### Review (Collection Type) - ID: `review`

  {pending ? 'Отправка...' : 'Отправить'}

</Button>3. Update Entry Skeletons in `lib/contentful/api.ts` to match new fields

````

| Field | Type | Required |

Server Action:

`````typescript### Preview Mode| ------ | ------------ | -------- |

// lib/actions/contact.ts

export async function sendContactEmail(prevState: any, formData: FormData) {| author | Short text   | ✅       |

  // Validate and send email

  return { success: true, message: 'Email sent!' };Test unpublished content:| text   | Long text    | ✅       |

}

```| rating | Number (1-5) | ✅       |



## 📦 Available Scripts```bash



```bash# Set in .env.local#### SEO Page (Collection Type) - ID: `seoPage`

npm run dev          # Start development server (Turbopack)

npm run build        # Build for productionCONTENTFUL_PREVIEW_MODE=true

npm run start        # Start production server

npm run lint         # Run ESLint```| Field       | Type       | Required |

npm run type-check   # Run TypeScript compiler check

```| ----------- | ---------- | -------- |



## 🚀 DeploymentOr use the preview API route: `/api/preview?secret=YOUR_SECRET&slug=home`| slug        | Short text | ✅       |



### Vercel (Recommended)| title       | Short text | ✅       |



1. **Connect Repository**: Import your Git repository to Vercel## 🎨 Styling| description | Long text  | ✅       |

2. **Environment Variables**: Add all variables from `.env.local`

3. **Deploy**: Vercel auto-detects Next.js and configures build settings

4. **Webhook URL**: Use `https://your-domain.vercel.app/api/revalidate` for Contentful webhook

This project uses:### 5. Generate TypeScript Types

### Build Configuration

- **Framework**: Next.js- **Tailwind CSS** for utility-first styling

- **Build Command**: `npm run build`

- **Output Directory**: `.next`- **shadcn/ui** for pre-built accessible componentsAfter creating content models in Contentful:

- **Install Command**: `npm install`

- **Node Version**: 18.x or higher- **CSS Variables** for theming (see `app/globals.css`)



## 🐛 Troubleshooting```bash



### "Expected parameter accessToken" Error### Adding shadcn/ui Componentsnpm run contentful:types

- **Cause**: Contentful client initialized in browser context

- **Solution**: Already fixed with Proxy pattern in `lib/contentful/client.ts````



### Cache Errors: "incrementalCache is missing"```bash

- **Cause**: `unstable_cache` executed in browser

- **Solution**: Use Server/Client split (HeaderServer + Header pattern)npx shadcn-ui@latest add buttonThis generates TypeScript types from your Contentful content models into `lib/contentful/types.ts`.



### "'use server' not allowed" Errorsnpx shadcn-ui@latest add card

- **Cause**: Inline 'use server' in files imported by client components

- **Solution**: Remove 'use server' directives from `lib/contentful/api.ts` (already removed)```**Watch mode** (auto-regenerate on changes):



### Hydration Warnings

- **Cause**: Browser extensions modifying DOM

- **Solution**: Add `suppressHydrationWarning` to `<html>` and `<body>` tags (already added)## 📝 TypeScript Types```bash



### Pages Not Centerednpm run contentful:types:watch

- **Cause**: Missing container constraints

- **Solution**: Custom `.container` utility in `globals.css` with auto margins (already added)We follow the **official Contentful v10+ TypeScript pattern**:```



### Email Not Sending

- **Cause**: SMTP credentials incorrect or App Password not configured

- **Solution**: See `SMTP_SETUP.md` for provider-specific instructions```typescript### 6. Run Development Server



## 📚 Additional Documentation// lib/contentful/api.ts



- **SMTP_SETUP.md**: Detailed email configuration guideimport { EntrySkeletonType, Entry, EntryFieldTypes } from 'contentful';```bash

- **CONTENTFUL_WEBHOOK_SETUP.md**: Webhook setup for cache revalidation

- **instructions.md**: Phase-by-phase development guide (15 phases)npm run dev



## 🔐 Security Notesinterface ServiceSkeleton extends EntrySkeletonType {```



- Never commit `.env.local` to version control  contentTypeId: 'service';

- Use strong random strings for `WEBHOOK_SECRET`

- Enable 2FA and App Passwords for email accounts  fields: {Open [http://localhost:3000](http://localhost:3000) in your browser.

- Rotate API tokens regularly

- Use environment-specific Contentful environments for staging    title: EntryFieldTypes.Text;



## 📄 License    description: EntryFieldTypes.Text;## 📝 Content Management



This project is proprietary and confidential.    slug: EntryFieldTypes.Text;



## 👨‍💻 Development  };### Adding Content



Built with modern Next.js patterns:}

- Server Components by default

- Client Components only when needed ('use client')1. Go to your Contentful space

- Server Actions for mutations

- unstable_cache for data fetchingexport type Service = Entry<ServiceSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;2. Navigate to **Content**

- TypeScript strict mode

- Contentful Entry Skeletons for type safety```3. Click **Add entry** and select content type



For questions or issues, refer to the troubleshooting section or documentation files.4. Fill in the fields


**Note**: The auto-generated `I*` Entry interfaces in `types-generated.ts` have TypeScript errors because type generation libraries are outdated for Contentful SDK v11. These are **not used** by the application. We manually define Entry Skeletons using `EntryFieldTypes`.5. Click **Publish**



## 🚀 Deployment### Preview Mode (Draft Content)



### Vercel (Recommended)Contentful Preview Mode allows you to view draft/unpublished content before publishing.



1. Push code to GitHub#### Enable Preview Mode

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboardVisit this URL (replace with your secret):

4. Deploy!

`````

### Environment Variables for Productionhttp://localhost:3000/api/preview?secret=YOUR_PREVIEW_SECRET&slug=/

````

Add these in Vercel dashboard:

#### Exit Preview Mode

```env

CONTENTFUL_SPACE_ID=your_space_idVisit:

CONTENTFUL_ACCESS_TOKEN=your_delivery_token

CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token```

CONTENTFUL_MANAGEMENT_TOKEN=your_management_tokenhttp://localhost:3000/api/exit-preview

CONTENTFUL_PREVIEW_MODE=false```

CONTENTFUL_PREVIEW_SECRET=your_random_secret

NEXT_PUBLIC_SITE_URL=https://yourdomain.com#### Configure Preview in Contentful

````

1. Go to **Settings → Content preview**

## 📦 Available Scripts2. Add preview URL: `http://localhost:3000/api/preview?secret=YOUR_SECRET&slug={entry.fields.slug}`

3. For production: `https://yourdomain.com/api/preview?secret=YOUR_SECRET&slug={entry.fields.slug}`

````bash

npm run dev              # Start development server## 🏗️ Project Structure

npm run build            # Build for production

npm run start            # Start production server```

npm run lint             # Run ESLintgeodesy-site/

├── app/                    # Next.js App Router

# Contentful│   ├── api/               # API routes

npm run contentful:migrate  # Run content type migrations│   │   ├── preview/       # Preview mode endpoint

npm run contentful:types    # Generate TypeScript types│   │   └── exit-preview/  # Exit preview endpoint

```│   ├── layout.tsx         # Root layout

│   └── page.tsx           # Home page

## 🔧 Troubleshooting├── components/

│   ├── layout/            # Header, Footer

### "unknownContentType" errors│   ├── sections/          # Hero, Advantages, Reviews

│   └── ui/                # shadcn/ui components

This means content types don't exist in Contentful yet:├── lib/

│   ├── contentful/        # Contentful integration

1. Run migrations: `npm run contentful:migrate`│   │   ├── client.ts      # Contentful client setup

2. Verify content types exist in Contentful UI│   │   ├── api.ts         # API functions

3. Check API permissions are set to public for `find` and `findOne`│   │   └── types.ts       # TypeScript types

│   ├── constants/         # Text constants

### TypeScript errors in types-generated.ts│   └── utils.ts           # Utility functions

├── public/                # Static assets

This is expected. The auto-generated Entry interfaces have errors but aren't used. Application uses manually defined Skeletons in `api.ts`.├── .contentfulrc.json     # Contentful config

├── .env.local            # Environment variables

### Content not showing└── package.json          # Dependencies

````

1. Verify you've added content entries in Contentful

2. Check `.env.local` has correct credentials## 🔧 Development Workflow

3. Verify content is published (not draft)

4. Check browser console for API errors### 1. Update Content Models

## 📚 DocumentationWhen you add/modify content types in Contentful:

- [Next.js Documentation](https://nextjs.org/docs)```bash

- [Contentful Documentation](https://www.contentful.com/developers/docs/)# Regenerate TypeScript types

- [Contentful TypeScript](https://www.contentful.com/developers/docs/javascript/tutorials/using-contentful-in-typescript/)npm run contentful:types

- [Tailwind CSS](https://tailwindcss.com/docs)

- [shadcn/ui](https://ui.shadcn.com/)# Or watch for changes

npm run contentful:types:watch

## 📄 License```

MIT### 2. Update API Functions

Edit `lib/contentful/api.ts` to add new data fetching functions.

### 3. Create Components

Use the generated types for type safety:

```tsx
import { getServices } from '@/lib/contentful/api';
import type { Service } from '@/lib/contentful/types';

export async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
}
```

### 4. Enable Preview Mode

```tsx
import { draftMode } from 'next/headers';
import { getServices } from '@/lib/contentful/api';

export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const services = await getServices(preview);

  return <div>...</div>;
}
```

## 📦 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run contentful:types # Generate types from Contentful
npm run contentful:types:watch # Watch and regenerate types
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables from `.env.local`
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables in your hosting provider:

```bash
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
CONTENTFUL_PREVIEW_ACCESS_TOKEN
CONTENTFUL_MANAGEMENT_TOKEN
CONTENTFUL_PREVIEW_MODE=false
CONTENTFUL_PREVIEW_SECRET
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📚 Best Practices

### Content Modeling

- Use **Single Type** for unique content (Company Info)
- Use **Collection Type** for multiple entries (Services, Reviews)
- Always add **slug** field for URL-friendly identifiers
- Use **validation rules** in Contentful to ensure data quality

### Performance

- Content is fetched at build time (Static Site Generation)
- Use `revalidate` for Incremental Static Regeneration:

```tsx
export const revalidate = 3600; // Revalidate every hour
```

### Type Safety

- Always regenerate types after modifying content models
- Use generated types throughout your application
- Never use `any` - leverage TypeScript for safety

### Preview Mode

- Keep preview secret secure (use environment variables)
- Set up preview URLs in Contentful for content editors
- Test preview mode before deploying

## 🔒 Security

- Never commit `.env.local` (already in `.gitignore`)
- Use different API tokens for development and production
- Rotate management tokens regularly
- Keep preview secret random and secure

## 🐛 Troubleshooting

### Types not generating

```bash
# Check your .contentfulrc.json configuration
# Ensure CONTENTFUL_MANAGEMENT_TOKEN is set
npm run contentful:types
```

### Preview mode not working

1. Check `CONTENTFUL_PREVIEW_SECRET` matches in URL and `.env.local`
2. Ensure `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is correct
3. Clear browser cookies and try again

### Content not updating

1. Check if content is published in Contentful
2. If using ISR, wait for revalidation period
3. Clear Next.js cache: `rm -rf .next && npm run dev`

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request
