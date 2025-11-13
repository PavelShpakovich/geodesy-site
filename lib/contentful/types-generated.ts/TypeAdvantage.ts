import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAdvantageFields {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
}

export type TypeAdvantageSkeleton = EntrySkeletonType<TypeAdvantageFields, "advantage">;
export type TypeAdvantage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAdvantageSkeleton, Modifiers, Locales>;
