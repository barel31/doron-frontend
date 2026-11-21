import { getContactInfo, getRoute } from '@/lib/client';
import Content from '@/components/Content';
import { type Metadata, type ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import metadataGenerator from '@/service/metadataGenerator';

export const generateMetadata = async (
  _args: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> => metadataGenerator('/', parent);

export default async function Home() {
  const [contact, maybeRoute, recommendations] = await Promise.all([
    getContactInfo(),
    getRoute('/'),
    getRoute('recommendations'),
  ]);

  if (!maybeRoute) {
    notFound();
  }
  const route: Route = maybeRoute;

  return (
    <div className="page-content page-content-home text-slate-950 text-center">
      <Content
        recommendations={recommendations ?? undefined}
        isHomePage={true}
        route={route ?? undefined}
        contact={contact}
      />
    </div>
  );
}
