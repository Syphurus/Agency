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
      "no-console": "off", // Disable no-console rule
      "@typescript-eslint/no-require-imports": "off", // Disable no-require-imports rule
      "no-undef": "off", // Disable no-undef rule
      "no-implicit-globals": "off", // Disable no-implicit-globals rule
      "no-var": "off", // Allow `var` declarations
      "prefer-const": "off", // Disable prefer-const rule
      "prefer-let": "off", // Disable prefer-let rule
      eqeqeq: "off", // Disable eqeqeq rule
      "no-alert": "off", // Disable no-alert rule
      "no-else-return": "off", // Disable no-else-return rule
      "no-magic-numbers": "off", // Disable no-magic-numbers rule
      "consistent-return": "off", // Disable consistent-return rule
      camelcase: "off", // Disable camelcase rule
      "no-eq-null": "off", // Disable no-eq-null rule
      "no-fallthrough": "off", // Disable no-fallthrough rule
      "no-new": "off", // Disable no-new rule
      "no-mixed-spaces-and-tabs": "off", // Disable no-mixed-spaces-and-tabs rule
      "no-trailing-spaces": "off", // Disable no-trailing-spaces rule
      "no-shadow": "off", // Disable no-shadow rule
      "prefer-arrow-callback": "off", // Disable prefer-arrow-callback rule
      "no-lone-blocks": "off", // Disable no-lone-blocks rule
      "no-unreachable": "off", // Disable no-unreachable rule
      "space-before-function-paren": "off", // Disable space-before-function-paren rule
      "no-redeclare": "off", // Disable no-redeclare rule
      "no-useless-escape": "off", // Disable no-useless-escape rule
      "no-duplicate-imports": "off", // Disable no-duplicate-imports rule
      "no-duplicate-keys": "off", // Disable no-duplicate-keys rule
      "import/no-anonymous-default-export": "off", // Disable import/no-anonymous-default-export rule
      "react/jsx-no-literals": "off", // Disable react/jsx-no-literals rule
      "react/no-deprecated": "off", // Disable react/no-deprecated rule
      "react/react-in-jsx-scope": "off", // Disable react/react-in-jsx-scope rule
      "react/jsx-no-target-blank": "off", // Disable react/jsx-no-target-blank rule
      "react/jsx-uses-react": "off", // Disable react/jsx-uses-react rule
      "react/jsx-uses-vars": "off", // Disable react/jsx-uses-vars rule
      "jsx-quotes": "off", // Disable jsx-quotes rule
      "react/prop-types": "off", // Disable react/prop-types rule
      "react/no-unknown-property": "off", // Disable react/no-unknown-property rule
      "react/no-array-index-key": "off", // Disable react/no-array-index-key rule
      "react/jsx-pascal-case": "off", // Disable react/jsx-pascal-case rule
      "react/no-unescaped-entities": "off", // Disable react/no-unescaped-entities rule
      "react/no-children-prop": "off", // Disable react/no-children-prop rule
      "react/forbid-prop-types": "off", // Disable react/forbid-prop-types rule
      "react/sort-comp": "off", // Disable react/sort-comp rule
      "jsx-a11y/no-onchange": "off", // Disable jsx-a11y/no-onchange rule
      "jsx-a11y/anchor-is-valid": "off", // Disable jsx-a11y/anchor-is-valid rule
      "jsx-a11y/no-static-element-interactions": "off", // Disable jsx-a11y/no-static-element-interactions rule
      "jsx-a11y/aria-role": "off", // Disable jsx-a11y/aria-role rule
      "jsx-a11y/aria-props": "off", // Disable jsx-a11y/aria-props rule
      "jsx-a11y/accessible-emoji": "off", // Disable jsx-a11y/accessible-emoji rule
      "jsx-a11y/img-redundant-alt": "off", // Disable jsx-a11y/img-redundant-alt rule
    },
  },
];

export default eslintConfig;
