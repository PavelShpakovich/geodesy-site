import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEducationItemFields {
    institution: EntryFieldTypes.Symbol;
    degree: EntryFieldTypes.Symbol;
    year?: EntryFieldTypes.Symbol;
}

export type TypeEducationItemSkeleton = EntrySkeletonType<TypeEducationItemFields, "educationItem">;
export type TypeEducationItem<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEducationItemSkeleton, Modifiers, Locales>;
