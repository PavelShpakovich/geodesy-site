import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCertificationItemFields {
    title: EntryFieldTypes.Symbol;
    issuer?: EntryFieldTypes.Symbol;
    year?: EntryFieldTypes.Symbol;
}

export type TypeCertificationItemSkeleton = EntrySkeletonType<TypeCertificationItemFields, "certificationItem">;
export type TypeCertificationItem<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCertificationItemSkeleton, Modifiers, Locales>;
