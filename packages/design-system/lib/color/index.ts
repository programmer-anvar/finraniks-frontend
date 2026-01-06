const colors = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

const getDeterministicColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return colors[Math.abs(hash) % colors.length];
};

const DEFAULT_COLOR_CLASSES = [
  // 1. Blue
  "bg-[#DDF7FF] text-[#056C87] shadow-[inset_0_0_0_1px_rgb(208,239,247)] " +
  "dark:bg-[#1A3946] dark:text-[#A9EBFC] dark:shadow-[inset_0_0_0_1px_rgb(10,78,107)]",

  // 2. Green
  "bg-[#E6FAED] text-[#066C3D] shadow-[inset_0_0_0_1px_rgb(210,240,218)] " +
  "dark:bg-[#123727] dark:text-[#A9FCCA] dark:shadow-[inset_0_0_0_1px_rgb(12,78,44)]",

  // 3. Orange
  "bg-[#FFF2E0] text-[#A85C00] shadow-[inset_0_0_0_1px_rgb(250,228,200)] " +
  "dark:bg-[#3F2B10] dark:text-[#FFD9A1] dark:shadow-[inset_0_0_0_1px_rgb(90,55,15)]",

  // 4. Red
  "bg-[#FFE8E8] text-[#9E1C1C] shadow-[inset_0_0_0_1px_rgb(250,210,210)] " +
  "dark:bg-[#3B1313] dark:text-[#FFBABA] dark:shadow-[inset_0_0_0_1px_rgb(85,25,25)]",

  // 5. Purple
  "bg-[#F3E8FF] text-[#5E2CA5] shadow-[inset_0_0_0_1px_rgb(230,210,255)] " +
  "dark:bg-[#2A1740] dark:text-[#D8B7FF] dark:shadow-[inset_0_0_0_1px_rgb(60,35,90)]",

  // 6. Pink
  "bg-[#FFE8F3] text-[#A82C65] shadow-[inset_0_0_0_1px_rgb(250,210,230)] " +
  "dark:bg-[#401A2B] dark:text-[#FFC7E1] dark:shadow-[inset_0_0_0_1px_rgb(90,35,60)]",

  // 7. Yellow
  "bg-[#FFF9E0] text-[#8C7A00] shadow-[inset_0_0_0_1px_rgb(250,240,200)] " +
  "dark:bg-[#3F3A10] dark:text-[#FFF2A9] dark:shadow-[inset_0_0_0_1px_rgb(90,80,15)]",

  // 8. Teal
  "bg-[#E0FFF9] text-[#007A67] shadow-[inset_0_0_0_1px_rgb(200,250,240)] " +
  "dark:bg-[#103F37] dark:text-[#A9FFF1] dark:shadow-[inset_0_0_0_1px_rgb(15,90,75)]",

  // 9. Indigo
  "bg-[#E8ECFF] text-[#2C3CA5] shadow-[inset_0_0_0_1px_rgb(210,220,255)] " +
  "dark:bg-[#171C40] dark:text-[#B7C3FF] dark:shadow-[inset_0_0_0_1px_rgb(35,45,90)]",

  // 10. Gray
  "bg-[#F2F4F5] text-[#3A3A3A] shadow-[inset_0_0_0_1px_rgb(220,225,230)] " +
  "dark:bg-[#1E1E1E] dark:text-[#D0D0D0] dark:shadow-[inset_0_0_0_1px_rgb(60,60,60)]",

  // 11. Sky Blue
  "bg-[#E5F4FF] text-[#0A5C9E] shadow-[inset_0_0_0_1px_rgb(210,235,255)] " +
  "dark:bg-[#102B46] dark:text-[#A9D9FF] dark:shadow-[inset_0_0_0_1px_rgb(20,60,90)]",

  // 12. Mint Green
  "bg-[#E0FFF3] text-[#047A56] shadow-[inset_0_0_0_1px_rgb(200,250,230)] " +
  "dark:bg-[#103F2C] dark:text-[#A9FFE0] dark:shadow-[inset_0_0_0_1px_rgb(15,80,55)]",

  // 13. Coral
  "bg-[#FFE9E0] text-[#A84324] shadow-[inset_0_0_0_1px_rgb(250,215,200)] " +
  "dark:bg-[#3F1A10] dark:text-[#FFC2A9] dark:shadow-[inset_0_0_0_1px_rgb(90,40,25)]",

  // 14. Lavender
  "bg-[#F1E8FF] text-[#6236A8] shadow-[inset_0_0_0_1px_rgb(230,215,255)] " +
  "dark:bg-[#281B3F] dark:text-[#D2B9FF] dark:shadow-[inset_0_0_0_1px_rgb(60,40,90)]",

  // 15. Sand
  "bg-[#FFF5E5] text-[#9E6C0A] shadow-[inset_0_0_0_1px_rgb(250,230,200)] " +
  "dark:bg-[#3F3210] dark:text-[#FFE3A9] dark:shadow-[inset_0_0_0_1px_rgb(85,70,20)]",

  // 16. Rose
  "bg-[#FFE6EB] text-[#A82C4C] shadow-[inset_0_0_0_1px_rgb(250,210,220)] " +
  "dark:bg-[#401A22] dark:text-[#FFC7D2] dark:shadow-[inset_0_0_0_1px_rgb(90,35,50)]",

  // 17. Aqua
  "bg-[#E0FBFF] text-[#05687A] shadow-[inset_0_0_0_1px_rgb(200,245,250)] " +
  "dark:bg-[#103A46] dark:text-[#A9F6FC] dark:shadow-[inset_0_0_0_1px_rgb(10,70,85)]",

  // 18. Olive
  "bg-[#F2F9E0] text-[#5A7300] shadow-[inset_0_0_0_1px_rgb(220,240,200)] " +
  "dark:bg-[#2C3510] dark:text-[#E9FFAD] dark:shadow-[inset_0_0_0_1px_rgb(55,70,20)]",

  // 19. Mauve
  "bg-[#FAE8F9] text-[#7C2C73] shadow-[inset_0_0_0_1px_rgb(240,210,240)] " +
  "dark:bg-[#341633] dark:text-[#F3B9F1] dark:shadow-[inset_0_0_0_1px_rgb(70,35,70)]",

  // 20. Slate
  "bg-[#E8EEF2] text-[#2F465C] shadow-[inset_0_0_0_1px_rgb(215,225,230)] " +
  "dark:bg-[#151E25] dark:text-[#A9C7E0] dark:shadow-[inset_0_0_0_1px_rgb(40,55,70)]",
];

function getColorById(id: string, colorClasses = DEFAULT_COLOR_CLASSES) {
  let hash = 0;
  for (let i = 0; i < id?.length; i++) {
    hash = id?.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorClasses.length;
  return colorClasses[index];
}

/**
 * Generates a random OKLCH color string
 * @param options Optional configuration for the color generation
 * @returns A string in the format 'oklch(L% C H)'
 */
function getRandomOklchColor(options?: {
  minLightness?: number; // 0-100
  maxLightness?: number; // 0-100
  minChroma?: number; // 0-0.5 (recommended range for sRGB)
  maxChroma?: number; // 0-0.5
}): string {
  const {
    minLightness = 30,
    maxLightness = 90,
    minChroma = 0.05,
    maxChroma = 0.2,
  } = options || {};

  // Generate random values within specified ranges
  const L = Math.floor(
    Math.random() * (maxLightness - minLightness + 1) + minLightness
  );
  const C = (Math.random() * (maxChroma - minChroma) + minChroma).toFixed(3);
  const H = Math.floor(Math.random() * 360);

  return `oklch(${L}% ${C} ${H})`;
}

/**
 * Generates a consistent OKLCH color based on a given ID string
 * @param id The input string to hash (e.g., user ID or type)
 * @param options Optional bounds for OKLCH values
 * @returns A string in the format 'oklch(L% C H)'
 */
function getHashedOklchColor(
  id: string,
  options?: {
    minLightness?: number; // 0–100
    maxLightness?: number; // 0–100
    minChroma?: number; // 0–0.5 (sRGB-safe)
    maxChroma?: number; // 0–0.5
  }
): string {
  const {
    minLightness = 30,
    maxLightness = 90,
    minChroma = 0.05,
    maxChroma = 0.2,
  } = options || {};

  // Simple hash function (djb2)
  let hash = 5381;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 33) ^ id.charCodeAt(i);
  }

  const normalized = Math.abs(hash);

  // Map hash to values
  const L = (normalized % (maxLightness - minLightness + 1)) + minLightness;

  const chromaRange = maxChroma - minChroma;
  const C = ((normalized % 1000) / 1000) * chromaRange + minChroma;

  const H = normalized % 360;

  return `oklch(${L}% ${C.toFixed(3)} ${H})`;
}

type GET_CHART_COLOR = (T: { percentage?: number }) => string;

const getChartColorBasedOnPercentage: GET_CHART_COLOR = ({ percentage }) => {
  // Red
  if (!percentage) {
    return "oklch(0.58 0.2217 17.4)";
  }

  // Red
  if (percentage <= 49) {
    return "oklch(0.58 0.2217 17.4)";
  }

  // Warning
  if (percentage >= 50 && percentage <= 89) {
    return "oklch(0.83 0.1179 87.62)";
  }

  // Green
  if (percentage >= 90) {
    return "oklch(0.71 0.1971 148.43)";
  }

  // Red
  return "oklch(0.58 0.2217 17.4)";
};

const getHexChartColorBasedOnPercentage: GET_CHART_COLOR = ({ percentage }) => {
  // Red
  if (!percentage) {
    return "#df1a47";
  }

  // Red
  if (percentage <= 49) {
    return "#df1a47";
  }

  // Warning
  if (percentage >= 50 && percentage <= 89) {
    return "#e8c368";
  }

  // Green
  if (percentage >= 90) {
    return "#1ac154";
  }

  // Red
  return "#df1a47";
};

export const getInverseHexChartColorBasedOnPercentage: GET_CHART_COLOR = ({ percentage }) => {
  // Green
  if (!percentage) {
    return "#1ac154";
  }

  // Green
  if (percentage <= 49) {
    return "#1ac154";
  }

  // Warning
  if (percentage >= 50 && percentage <= 89) {
    return "#e8c368";
  }

  // Red
  if (percentage >= 90) {
    return "#df1a47";
  }

  // Red
  return "#df1a47";
};



const scoreColors = [
  '#D3212C', '#D3212C', '#D3212C',
  '#FF7A49', '#FF7A49',
  '#FFCA2D', '#FFCA2D',
  '#3CDA73', '#3CDA73',
  '#006B3D', '#006B3D',
] as const;
const getScoreColor = (num: number) => {
  const roundedNum = Math.max(0, Math.min(10, Math.floor(num)));
  return scoreColors[roundedNum];
};

export {
  getScoreColor,
  getDeterministicColor,
  getRandomOklchColor,
  getHashedOklchColor,
  getColorById,
  getChartColorBasedOnPercentage,
  getHexChartColorBasedOnPercentage,
};
