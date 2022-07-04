module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"eslint-config-prettier",
		"standard",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"no-unused-vars": "warn",
		semi: ["error", "always"],
		"space-before-function-paren": [
			"error",
			{
				anonymous: "never",
				named: "never",
				asyncArrow: "always",
			},
		],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"no-tabs": "off",
		"comma-dangle": [2, "always-multiline"],
		camelcase: "warn",
		"object-shorthand": ["error", "never"],
		"react/prop-types": "off",
		"multiline-ternary": ["error", "never"],
	},
};
