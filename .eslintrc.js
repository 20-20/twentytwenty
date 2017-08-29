module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react'],
  rules: {
    "space-before-function-paren": ["error", "never"],
    "prefer-const": "warn",
    "comma-dangle": ["error", "only-multiline"],
    "space-infix-ops": "off",      // Until eslint #7489 lands
    "new-cap": "off",
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
    "no-return-assign": "off",
    "no-unused-expressions": "off",
    "one-var": "off",
    "new-parens": "off",
    "arrow-body-style": ["warn", "as-needed"],
    "no-unused-vars": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": "error",
    "import/first": "off",
    "comma-style": ["off", "first", {
      exceptions: {
        ArrayExpression: true,
        ObjectExpression: true,
      }
    }],
  },
}
