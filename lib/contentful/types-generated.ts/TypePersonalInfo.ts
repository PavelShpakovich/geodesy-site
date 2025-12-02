import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCertificationItemSkeleton } from "./TypeCertificationItem";
import type { TypeEducationItemSkeleton } from "./TypeEducationItem";
import type { TypeEquipmentItemSkeleton } from "./TypeEquipmentItem";
import type { TypeLicenseItemSkeleton } from "./TypeLicenseItem";

export interface TypePersonalInfoFields {
    name: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    photo?: EntryFieldTypes.AssetLink;
    story?: EntryFieldTypes.Text;
    yearsInBusiness?: EntryFieldTypes.Integer;
    projectsCompleted?: EntryFieldTypes.Integer;
    clientsServed?: EntryFieldTypes.Integer;
    regionsServed?: EntryFieldTypes.Symbol;
    education?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEducationItemSkeleton>>;
    certifications?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCertificationItemSkeleton>>;
    licenses?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLicenseItemSkeleton>>;
    equipmentDescription?: EntryFieldTypes.Text;
    equipmentList?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEquipmentItemSkeleton>>;
}

export type TypePersonalInfoSkeleton = EntrySkeletonType<TypePersonalInfoFields, "personalInfo">;
export type TypePersonalInfo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePersonalInfoSkeleton, Modifiers, Locales>;
