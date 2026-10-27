import type { Lang } from "@/i18n/ui"

/** A value with one variant per locale. */
export type Localized<T> = Record<Lang, T>
