import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEquipmentItemFields {
    name: EntryFieldTypes.Symbol;
    icon?: EntryFieldTypes.Symbol<"Activity" | "Aperture" | "Binoculars" | "Building" | "Camera" | "CircuitBoard" | "Cog" | "Compass" | "Cpu" | "Crosshair" | "Focus" | "Gauge" | "HardDrive" | "Landmark" | "Laptop" | "LocateFixed" | "Map" | "MapPin" | "Monitor" | "Mountain" | "Navigation" | "Radio" | "Ruler" | "Satellite" | "Scale" | "Scan" | "ScanLine" | "ScanSearch" | "Settings" | "Signal" | "Target" | "Telescope" | "TreePine" | "TrendingUp" | "View" | "Wifi" | "Wrench">;
    model?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Symbol;
}

export type TypeEquipmentItemSkeleton = EntrySkeletonType<TypeEquipmentItemFields, "equipmentItem">;
export type TypeEquipmentItem<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEquipmentItemSkeleton, Modifiers, Locales>;
