import { notFound } from 'next/navigation';
import BackgroundImage from './BackgroundImage';
import ContentBody from './ContentBody';
import ContentHeader from './ContentHeader';

interface Props {
  // route may be null or omitted in callers; the component already handles
  // missing values by calling `notFound()`.
  route?: Route | null;
  contact?: ContactInfo;
  recommendations?: Route;
  isHomePage?: boolean;
}

function Content({ route, contact, recommendations, isHomePage }: Props) {
  // `route` might be undefined or null, so guard here and redirect to 404
  if (!route) return notFound();

  const slug = route?.slug?.current;

  return (
    <div className="content m-auto text-center">
      <BackgroundImage route={route} />
      <ContentHeader route={route} />
      <ContentBody
        route={route}
        contact={contact}
        slug={slug}
        recommendations={recommendations}
        isHomePage={isHomePage}
      />
    </div>
  );
}

export default Content;
