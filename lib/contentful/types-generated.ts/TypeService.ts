import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeServiceFields {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    fullDescription?: EntryFieldTypes.RichText;
    metaDescription?: EntryFieldTypes.Symbol;
    price: EntryFieldTypes.Symbol;
    timeframe?: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    imageAltText?: EntryFieldTypes.Symbol;
}

export type TypeServiceSkeleton = EntrySkeletonType<TypeServiceFields, "service">;
export type TypeService<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeServiceSkeleton, Modifiers, Locales>;
