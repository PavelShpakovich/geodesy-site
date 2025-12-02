import { getAssetUrl } from './client';
import type { PersonalInfo, Review } from './api';

export function extractLinkedEntries<T>(entries: unknown): T[] {
  if (!entries || !Array.isArray(entries)) return [];
  return entries
    .filter((entry): entry is { fields: T } => entry !== null && typeof entry === 'object' && 'fields' in entry)
    .map((entry) => entry.fields);
}

export interface TransformedOwner {
  name: string;
  title: string;
  photo?: string;
  story: string;
}

export interface TransformedStats {
  yearsInBusiness: number;
  projectsCompleted: number;
  clientsServed: number;
  regionsServed: string;
}

export interface TransformedEducation {
  institution: string;
  degree: string;
  year: string;
}

export interface TransformedCertification {
  title: string;
  issuer: string;
  year: string;
}

export interface TransformedLicense {
  title: string;
  number: string;
  validUntil: string;
}

export interface TransformedCredentials {
  education: TransformedEducation[];
  certifications: TransformedCertification[];
  licenses: TransformedLicense[];
}

export interface TransformedEquipmentItem {
  name: string;
  icon: string;
  model: string;
  description: string;
}

export interface TransformedEquipment {
  description: string;
  items: TransformedEquipmentItem[];
}

export interface TransformedPersonalInfo {
  owner: TransformedOwner;
  stats: TransformedStats;
  credentials: TransformedCredentials;
  equipment: TransformedEquipment;
  hasPhoto: boolean;
  hasStats: boolean;
  hasCredentials: boolean;
  hasEquipment: boolean;
}

export function transformPersonalInfo(info: PersonalInfo): TransformedPersonalInfo {
  const fields = info.fields;

  const education = extractLinkedEntries<{ institution: string; degree: string; year?: string }>(fields.education).map(
    (item) => ({
      institution: item.institution,
      degree: item.degree,
      year: item.year || '',
    })
  );

  const certifications = extractLinkedEntries<{ title: string; issuer?: string; year?: string }>(
    fields.certifications
  ).map((item) => ({
    title: item.title,
    issuer: item.issuer || '',
    year: item.year || '',
  }));

  const licenses = extractLinkedEntries<{ title: string; number?: string; validUntil?: string }>(fields.licenses).map(
    (item) => ({
      title: item.title,
      number: item.number || '',
      validUntil: item.validUntil || '',
    })
  );

  const equipmentItems = extractLinkedEntries<{ name: string; icon?: string; model?: string; description?: string }>(
    fields.equipmentList
  ).map((item) => ({
    name: item.name,
    icon: item.icon || '',
    model: item.model || '',
    description: item.description || '',
  }));

  return {
    owner: {
      name: fields.name,
      title: fields.title,
      photo: getAssetUrl(fields.photo) || undefined,
      story: fields.story || '',
    },
    stats: {
      yearsInBusiness: fields.yearsInBusiness || 0,
      projectsCompleted: fields.projectsCompleted || 0,
      clientsServed: fields.clientsServed || 0,
      regionsServed: fields.regionsServed || '',
    },
    credentials: {
      education,
      certifications,
      licenses,
    },
    equipment: {
      description: fields.equipmentDescription || '',
      items: equipmentItems,
    },
    hasPhoto: !!getAssetUrl(fields.photo),
    hasStats: !!(fields.yearsInBusiness || fields.projectsCompleted || fields.clientsServed || fields.regionsServed),
    hasCredentials: education.length > 0 || certifications.length > 0 || licenses.length > 0,
    hasEquipment: equipmentItems.length > 0 || !!fields.equipmentDescription,
  };
}

export interface TransformedReview {
  id: string;
  authorName: string;
  authorLocation?: string;
  text: string;
  rating: number;
  date: string;
}

export function transformReviews(reviews: Review[]): TransformedReview[] {
  return reviews.map((review) => ({
    id: review.sys.id,
    authorName: review.fields.authorName,
    authorLocation: review.fields.authorLocation,
    text: review.fields.text,
    rating: review.fields.rating,
    date: review.fields.publishedAt,
  }));
}
