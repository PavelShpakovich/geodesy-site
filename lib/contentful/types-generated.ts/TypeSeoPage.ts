import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSeoPageFields {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
}

export type TypeSeoPageSkeleton = EntrySkeletonType<TypeSeoPageFields, "seoPage">;
export type TypeSeoPage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSeoPageSkeleton, Modifiers, Locales>;
