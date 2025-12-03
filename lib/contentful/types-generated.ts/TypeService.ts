import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeServiceFields {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    price: EntryFieldTypes.Symbol;
    timeframe?: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
}

export type TypeServiceSkeleton = EntrySkeletonType<TypeServiceFields, "service">;
export type TypeService<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeServiceSkeleton, Modifiers, Locales>;
