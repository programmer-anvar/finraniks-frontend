import "server-only";
import type en from "./dictionaries/en.json";
import languine from "./languine.json" with { type: "json" };
import { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

export const locales = [
  languine.locale.source,
  ...languine.locale.targets,
] as const;

export type Dictionary = typeof en;

const dictionaries: Record<string, () => Promise<Dictionary>> =
  Object.fromEntries(
    locales.map((locale) => [
      locale,
      () =>
        import(`./dictionaries/${locale}.json`)
          .then((mod) => mod.default)
          .catch((_err) =>
            import("./dictionaries/en.json").then((mod) => mod.default)
          ),
    ])
  );

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const normalizedLocale = locale.split("-")[0];

  if (!locales.includes(normalizedLocale as any)) {
    return dictionaries.en();
  }

  try {
    return await dictionaries[normalizedLocale]();
  } catch (_error) {
    return dictionaries.en();
  }
};


/**
 * Determines the best-matching locale based on the request headers.
 * Uses Negotiator to extract the preferred language from the request headers.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {string | undefined} - The best-matching locale or undefined if no match is found.
 */
export function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages, locales, "en");
}
