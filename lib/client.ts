import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { type SanityImageSource } from '@sanity/image-url';

export const Client = createClient({
  projectId: 'cprr9tyl',
  dataset: 'production',
  apiVersion: '2023-05-29',
  useCdn: true,
});

// helper wrappers rather than pre‑executed promises so requests fire when called
export async function getRoutes(): Promise<Route[]> {
  return Client.fetch<Route[]>(
    `*[_type == "routes"]{ ..., "children": children[]-> } | order(_createdAt asc)`
  );
}

export async function getRoute(slug: string): Promise<Route | null> {
  return Client.fetch<Route | null>(
    `*[_type == "routes" && slug.current == $slug]{ ..., "children": children[]-> }[0]`,
    { slug }
  );
}

export async function getContactInfo(): Promise<ContactInfo> {
  return Client.fetch<ContactInfo>(`*[_type == "contactInfo"][0]`);
}

export async function getRecommendations(): Promise<CardProps[]> {
  return Client.fetch<CardProps[]>(`*[_type == "recommendations"][0].cards`);
}

const builder = createImageUrlBuilder(Client);

export const urlFor = (source: SanityImageSource) => builder.image(source!);
