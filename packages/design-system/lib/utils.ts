import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GET_CHANGED_FIELDS = (
  T: { [key: string]: any },
  K: { [key: string]: any }
) => {
  [key: string]: any;
};

const irregularPlurals: Record<string, string> = {
  person: "people",
  man: "men",
  woman: "women",
  child: "children",
  tooth: "teeth",
  foot: "feet",
  mouse: "mice",
  goose: "geese",
  ox: "oxen",
};

const pluralize = (word: string, number: number) => {
  if (number === 1) return word;

  const lower = word.toLowerCase();

  // ✅ Handle irregular nouns
  if (irregularPlurals[lower]) {
    const plural = irregularPlurals[lower];

    // Preserve capitalization (Person -> People)
    return word[0] === word[0].toUpperCase()
      ? plural.charAt(0).toUpperCase() + plural.slice(1)
      : plural;
  }

  // Words ending in 'y' preceded by a consonant -> 'ies'
  if (/[b-df-hj-np-tv-z]y$/i.test(word)) {
    return word.replace(/y$/i, "ies");
  }

  // Words ending in 'f' or 'fe' -> 'ves'
  if (/(?:f|fe)$/i.test(word)) {
    return word.replace(/f(e)?$/i, "ves");
  }

  // Words ending in 'o' preceded by a consonant -> 'es'
  if (/[b-df-hj-np-tv-z]o$/i.test(word)) {
    return word + "es";
  }

  // Words ending with 's', 'x', 'z', 'ch', or 'sh' -> 'es'
  if (/(s|x|z|ch|sh)$/i.test(word)) {
    return word + "es";
  }

  // Default rule
  return word + "s";
};

const ordinalSuffix = (number: number): string => {
  const remainder10 = number % 10;
  const remainder100 = number % 100;

  if (remainder10 === 1 && remainder100 !== 11) return number + "st";
  else if (remainder10 === 2 && remainder100 !== 12) return number + "nd";
  else if (remainder10 === 3 && remainder100 !== 13) return number + "rd";

  return number + "th";
};

function convertToReadable({ number, fixedRoom = 0 }: { number: number; fixedRoom?: number }) {

  if (fixedRoom > 0) {
    if (String(number)?.includes('.')) {
      number = Number(number?.toFixed(fixedRoom))
    }
  }
  function isFloat(n: number) {
    return Number(n) === n && n % 1 !== 0;
  }

  let newValue
  if (isFloat(Number(number))) {
    newValue = number?.toString().split(".")
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    newValue = newValue.join('.')
  } else {
    newValue = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return newValue
}

const getChangedFields: GET_CHANGED_FIELDS = (objA, objB) => {
  function diff(a: any, b: any): any | null {
    // Strict equality, treats NaN as equal
    if (Object.is(a, b)) return null;

    // Handle cases where one is undefined (added/removed)
    if (a === undefined && b !== undefined) return b; // added
    if (a !== undefined && b === undefined) return undefined; // removed

    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);

    // If array types mismatch or one is not an object, return b (replacement)
    const aIsObject = a !== null && typeof a === "object";
    const bIsObject = b !== null && typeof b === "object";
    if (aIsArray !== bIsArray || (!aIsObject && !bIsObject)) {
      return b;
    }

    // Arrays: by default, replace the whole array if any change
    if (aIsArray && bIsArray) {
      if (a.length !== b.length) return b;
      for (let i = 0; i < a.length; i++) {
        if (!Object.is(a[i], b[i])) {
          return b;
        }
      }
      return null;
    }

    // Plain objects: deep diff each key (union of keys)
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    const result: Record<string, any> = {};
    let changed = false;
    for (const key of keys) {
      const sub = diff(a?.[key], b?.[key]);
      if (sub !== null) {
        result[key] = sub;
        changed = true;
      }
    }
    return changed ? result : null;
  }

  return diff(objA, objB) ?? {};
};

function getInitials(sentence: string): string {
  return sentence
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

/**
 * Converts a string from UPPER_SNAKE_CASE to Title Case
 * @param str - The string to convert (e.g., "EMOTIONAL_ATTUNEMENT")
 * @returns Formatted string (e.g., "Emotional Attunement")
 */
function formatToTitleCase(str: string): string {
  if (!str) return "";

  return str
    .toLowerCase() // convert to lowercase
    .split("_") // split by underscore
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1) // capitalize first letter of each word
    )
    .join(" "); // join with spaces
}

const removeUndefinedValuesFromObj = <T>(
  inputObject: T
): {
    [K in keyof T]-?: Exclude<T[K], undefined>;
  } => {
  const result: {
    [K in keyof T]-?: Exclude<T[K], undefined>;
  } = {} as any;

  // eslint-disable-next-line
  for (const key in inputObject) {
    if (inputObject[key] !== undefined) {
      result[key as keyof T] = inputObject[key] as any;
    }
  }

  return result;
};

const copyMsg = ({
  value,
  shouldNotify,
}: {
  value: string;
  shouldNotify?: boolean;
}) => {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value);
      if (shouldNotify) toast.success("Copied to clipboard");
    } else {
      if (shouldNotify) toast.error("Clipboard API not available");
    }
  } catch (err) {
    if (shouldNotify) toast.error("Failed to copy");
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("copyMsg error", err);
    }
  }
};

const deepCleanChanges = (changes: Object, original: Object) => {
  if (typeof changes !== "object" || changes === null) return changes;

  let cleaned: any = Array.isArray(changes) ? [] : {};

  for (const key in changes) {
    const cleanedValue = deepCleanChanges(
      changes[key as keyof typeof changes],
      original?.[key as keyof typeof original]
    );

    if (cleanedValue === undefined) continue;

    const originalValue = original?.[key as keyof typeof original];
    const isDifferent =
      typeof cleanedValue === "object"
        ? Object.keys(cleanedValue).length > 0
        : JSON.stringify(cleanedValue) !== JSON.stringify(originalValue);

    if (isDifferent) {
      cleaned[key] = cleanedValue;
    }
  }

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
};

const formatDate = (date: string | number | Date, format?: string): string => {
  let dt = new Date(date);
  let month = ("00" + (dt.getMonth() + 1)).slice(-2);
  let day = ("00" + dt.getDate()).slice(-2);
  let year = dt.getFullYear();
  let hours = ("00" + dt.getHours()).slice(-2);
  let minutes = ("00" + dt.getMinutes()).slice(-2);
  let seconds = ("00" + dt.getSeconds()).slice(-2);

  switch (format) {
    case "DD-MM-YYYY":
      return day + "-" + month + "-" + year;
    case "DD.MM":
      return day + "." + month;
    case "DD.MM.YYYY / HH:mm:ss":
      return day + "." + month + "." + year + " / " + hours + ":" + minutes + ":" + seconds;
    case "DD.MM.YYYY / HH:mm":
      return day + "." + month + "." + year + " / " + hours + ":" + minutes;
    case "HH:mm / DD.MM.YYYY":
      return hours + ":" + minutes + " / " + day + "." + month + "." + year;
    default:
      return day + "." + month + "." + year;
  }
};

const isPositive = (num: number) => {
  return num >= 0;
};

const formatWholeNum = (x: number) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatWithFixed = (x: number, fixed = 2) => {
  let parts = x.toFixed(fixed).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
const formatNumber = (x: any) => {
  if (x === '-') return x;

  // Handle large numbers better
  if (x > 1000000) {
    let parts = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts;
  }

  if (Math.round(x) !== x) return formatWithFixed(x);
  return formatWholeNum(x);
};
const formatToMillion = (x: number) => {
  // if (x === null) return "-"

  const pureNum = x;
  const numSign = isPositive(pureNum) ? '' : '-';
  let num = Math.abs(pureNum);

  const billion = 1000000000;

  // Format as billions with B suffix
  if (num >= billion) {
    num = num / billion;
    return numSign + num.toFixed(2).replace(/\.00$/, '') + 'B';
  }

  // Format as millions with M suffix
  if (num >= 1000000) {
    num = num / 1000000;
    return numSign + num.toFixed(0) + 'M';
  }

  // Format as thousands with K suffix
  if (num >= 1000) {
    num = num / 1000;
    return numSign + num.toFixed(0) + 'K';
  }


  return numSign + formatNumber(num);
};

export {
  pluralize,
  getInitials,
  cn,
  formatToTitleCase,
  removeUndefinedValuesFromObj,
  copyMsg,
  deepCleanChanges,
  getChangedFields,
  ordinalSuffix,
  convertToReadable,
  formatDate,
  formatToMillion
};
