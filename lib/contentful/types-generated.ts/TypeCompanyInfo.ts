import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCompanyInfoFields {
    name: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    address: EntryFieldTypes.Symbol;
    phone: EntryFieldTypes.Symbol;
    email: EntryFieldTypes.Symbol;
    workHours: EntryFieldTypes.Symbol;
    telegram?: EntryFieldTypes.Symbol;
    viber?: EntryFieldTypes.Symbol;
    whatsapp?: EntryFieldTypes.Symbol;
}

export type TypeCompanyInfoSkeleton = EntrySkeletonType<TypeCompanyInfoFields, "companyInfo">;
export type TypeCompanyInfo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCompanyInfoSkeleton, Modifiers, Locales>;
