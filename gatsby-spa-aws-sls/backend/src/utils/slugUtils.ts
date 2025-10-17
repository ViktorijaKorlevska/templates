/**
 * Language-specific character mappings for each domain
 */
interface LanguageMap {
  [key: string]: string;
}

interface DomainLanguageMaps {
  [domain: string]: LanguageMap;
}

// Character mappings for supported domains
const languageMaps: DomainLanguageMaps = {
  // Macedonian Cyrillic to Latin mapping
  mk: {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    ѓ: "gj",
    е: "e",
    ж: "zh",
    з: "z",
    ѕ: "dz",
    и: "i",
    ј: "j",
    к: "k",
    л: "l",
    љ: "lj",
    м: "m",
    н: "n",
    њ: "nj",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    ќ: "kj",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    џ: "dj",
    ш: "sh",
    // Uppercase variants
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Ѓ: "Gj",
    Е: "E",
    Ж: "Zh",
    З: "Z",
    Ѕ: "Dz",
    И: "I",
    Ј: "J",
    К: "K",
    Л: "L",
    Љ: "Lj",
    М: "M",
    Н: "N",
    Њ: "Nj",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    Ќ: "Kj",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Џ: "Dj",
    Ш: "Sh",
  },
  // Serbian Cyrillic to Latin mapping
  rs: {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    ђ: "đ",
    е: "e",
    ж: "ž",
    з: "z",
    и: "i",
    ј: "j",
    к: "k",
    л: "l",
    љ: "lj",
    м: "m",
    н: "n",
    њ: "nj",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    ћ: "ć",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "č",
    џ: "dž",
    ш: "š",
    // Uppercase variants
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Ђ: "Đ",
    Е: "E",
    Ж: "Ž",
    З: "Z",
    И: "I",
    Ј: "J",
    К: "K",
    Л: "L",
    Љ: "Lj",
    М: "M",
    Н: "N",
    Њ: "Nj",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    Ћ: "Ć",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Č",
    Џ: "Dž",
    Ш: "Š",
  },
};

/**
 * Checks if a domain has language-specific character mapping
 */
const hasLanguageMapping = (domain: string): boolean => {
  return domain in languageMaps;
};

/**
 * Transliterates text based on the domain's language mapping
 * @param text - The text to transliterate
 * @param domain - The domain code (e.g., 'mk', 'rs')
 * @returns The transliterated text
 */
export const transliterate = (text: string, domain: string): string => {
  // If domain doesn't have specific mapping, return original text
  if (!hasLanguageMapping(domain)) {
    return text;
  }

  const map = languageMaps[domain];
  return text
    .split("")
    .map((char) => map[char] || char)
    .join("");
};

/**
 * Converts a string to a URL-friendly slug with optional transliteration
 * @param text - The text to convert to a slug
 * @param domain - The domain code (e.g., 'mk', 'rs')
 * @returns A URL-friendly slug
 */
export const toSlug = (text: string, domain: string): string => {
  // First transliterate if needed for the domain
  const processedText = hasLanguageMapping(domain)
    ? transliterate(text, domain)
    : text;

  // Then convert to URL-friendly format
  return processedText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

/**
 * Generates a unique club slug for Sanity from club name, city, and date
 * Handles domain-specific character transliteration if needed
 *
 * @param clubName - The name of the club
 * @param city - The city where the club is located
 * @param domain - The domain code (e.g., 'mk', 'rs')
 * @returns A Sanity-compatible slug object
 */
export const generateClubSlug = (
  clubName: string,
  city: string,
  domain: string
): { _type: "slug"; current: string } => {
  const date = new Date();
  const dateStr = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "");

  // Generate slugs with domain-specific handling
  const nameSlug = toSlug(clubName, domain);
  const citySlug = toSlug(city, domain);

  // Return Sanity-compatible slug object
  return {
    _type: "slug",
    current: `${nameSlug}-${citySlug}-${dateStr}`,
  };
};
