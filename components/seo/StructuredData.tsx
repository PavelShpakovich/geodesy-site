import Script from 'next/script';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * Properly escaped and formatted for SEO
 */
export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0), // No formatting for production
          }}
          strategy='beforeInteractive'
        />
      ))}
    </>
  );
}
