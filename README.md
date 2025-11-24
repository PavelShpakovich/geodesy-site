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
