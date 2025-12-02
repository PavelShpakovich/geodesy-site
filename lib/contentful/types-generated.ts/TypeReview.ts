import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeReviewFields {
    authorName: EntryFieldTypes.Symbol;
    authorLocation?: EntryFieldTypes.Symbol;
    rating: EntryFieldTypes.Integer;
    text: EntryFieldTypes.Text;
    publishedAt: EntryFieldTypes.Date;
    isActive: EntryFieldTypes.Boolean;
}

export type TypeReviewSkeleton = EntrySkeletonType<TypeReviewFields, "review">;
export type TypeReview<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeReviewSkeleton, Modifiers, Locales>;
