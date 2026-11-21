import { getRoute, urlFor } from '@/lib/client';
import { type ResolvingMetadata, type Metadata } from 'next';

export default async function generateMetadata(
  slug: string,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [route, parentData] = await Promise.all([getRoute(slug), parent]);

  // Fallback values for non-specific routes
  const fallbackTitle = parentData.title?.absolute || 'עו"ד דורון חדד - מומחה בייעוץ משפטי';
  const fallbackDescription =
    parentData.description ||
    'עו"ד דורון חדד מתמחה בדיני משפחה, נדל"ן, משפט מסחרי ושירותים משפטיים נוספים.';
  const fallbackKeywords =
    typeof parentData.keywords === 'string'
      ? parentData.keywords
      : 'עו"ד דורון חדד, ייעוץ משפטי, משרד עורכי דין, דיני משפחה, נדל"ן, משפט מסחרי';

  // If the route is not found, return Metadata for the "not found" page
  if (!route) {
    const notFoundTitle = `עמוד לא נמצא | ${fallbackTitle}`;
    const notFoundDescription = `העמוד שחיפשת אינו קיים. חזור לדף הבית של עו"ד דורון חדד למידע נוסף על שירותים משפטיים.`;

    return buildMetadata({
      title: notFoundTitle,
      description: notFoundDescription,
      keywords: fallbackKeywords,
      url: `/not-found/${slug}`,
      robots: { index: false, follow: false },
    });
  }

  // Specific metadata for the route
  const routeTitle = route.name || 'מידע משפטי';
  const routeDescription =
    route?.content?.[0]?.children?.[0]?.text ||
    'מידע מקיף על שירותי משפט באתר של עו"ד דורון חדד.';
  const routeKeywords =
    typeof route.keywords === 'string'
      ? `${route.keywords}, ${fallbackKeywords}`
      : `${fallbackKeywords}`;

  // Avoid adding "בית" if the slug corresponds to the homepage
  const isHomePage = slug === '' || slug === 'home' || slug === '/';
  const finalTitle = isHomePage
    ? fallbackTitle
    : `${routeTitle} | ${fallbackTitle}`;

  return buildMetadata({
    title: finalTitle,
    description: `${routeDescription} | ${fallbackDescription}`,
    keywords: routeKeywords,
    url: `/${slug}`,
    image: route.image ? urlFor(route.image).width(1200).height(630).url() : undefined,
  });
}

/**
 * Helper function to construct Metadata with OpenGraph and Twitter properties
 */
function buildMetadata({
  title,
  description,
  keywords,
  url,
  image,
  robots,
}: {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image?: string;
  robots?: { index: boolean; follow: boolean };
}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'עו"ד דורון חדד',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_PRODUCTION_URL + url,
    },
    robots: robots ?? { index: true, follow: true },
  };

  return metadata;
}
