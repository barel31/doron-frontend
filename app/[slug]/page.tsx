import { getContactInfo, getRoute, getRoutes } from '@/client';
import Content from '@/components/Content';
import { type ResolvingMetadata, type Metadata } from 'next';
import metadataGenerator from '@/service/metadataGenerator';
export const revalidate = 3600; // revalidate every hour

export const generateMetadata = async (
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> => metadataGenerator(params.slug, parent);

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [route, contact] = await Promise.all([getRoute(slug), getContactInfo]);

  return (
    <div
      className={`page-content page-content-${slug} text-slate-950 text-center`}>
      <Content route={route} contact={contact} />
    </div>
  );
}

export async function generateStaticParams() {
  const routes = await getRoutes;

  return routes
    .filter((route) => route.slug.current !== '/')
    .map((route: Route) => ({
      slug: route.slug.current,
    }));
}
