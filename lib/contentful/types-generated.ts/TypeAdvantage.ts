import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAdvantageFields {
    title: EntryFieldTypes.Symbol;
    icon?: EntryFieldTypes.Symbol<"Award" | "BadgePercent" | "Briefcase" | "Building" | "Calculator" | "CheckCircle" | "Clock" | "Compass" | "FileText" | "Heart" | "Home" | "Landmark" | "Lock" | "Mail" | "Map" | "MapPin" | "MessageSquare" | "Mountain" | "PenTool" | "Phone" | "Ruler" | "Satellite" | "Settings" | "Shield" | "ShieldCheck" | "Star" | "Target" | "ThumbsUp" | "TreePine" | "UserCheck" | "Users" | "Wrench" | "Zap">;
    description: EntryFieldTypes.Text;
}

export type TypeAdvantageSkeleton = EntrySkeletonType<TypeAdvantageFields, "advantage">;
export type TypeAdvantage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAdvantageSkeleton, Modifiers, Locales>;
