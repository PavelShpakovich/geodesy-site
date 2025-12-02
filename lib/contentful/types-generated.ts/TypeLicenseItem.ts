import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLicenseItemFields {
    title: EntryFieldTypes.Symbol;
    number?: EntryFieldTypes.Symbol;
    validUntil?: EntryFieldTypes.Symbol;
}

export type TypeLicenseItemSkeleton = EntrySkeletonType<TypeLicenseItemFields, "licenseItem">;
export type TypeLicenseItem<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLicenseItemSkeleton, Modifiers, Locales>;
