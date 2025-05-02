import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off", // Disable no-unused-expressions rule
      "@typescript-eslint/no-this-alias": "off", // Disable no-this-alias rule
      "no-unused-vars": "off", // Disable no-unused-vars rule
      "no-console": "warn", // Optionally, change console error to warning
    },
  },
];

export default eslintConfig;
