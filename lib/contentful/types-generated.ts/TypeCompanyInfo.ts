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
    latitude?: EntryFieldTypes.Number;
    longitude?: EntryFieldTypes.Number;
    instagram?: EntryFieldTypes.Symbol;
    unp?: EntryFieldTypes.Symbol;
    legalName?: EntryFieldTypes.Symbol;
    bankName?: EntryFieldTypes.Symbol;
    bankAccount?: EntryFieldTypes.Symbol;
    bic?: EntryFieldTypes.Symbol;
    heroImageDesktop?: EntryFieldTypes.AssetLink;
    heroImageMobile?: EntryFieldTypes.AssetLink;
}

export type TypeCompanyInfoSkeleton = EntrySkeletonType<TypeCompanyInfoFields, "companyInfo">;
export type TypeCompanyInfo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCompanyInfoSkeleton, Modifiers, Locales>;
