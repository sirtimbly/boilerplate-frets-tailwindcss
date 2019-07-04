var purgecss = require("@fullhuman/postcss-purgecss");

var purgeFromFrets = require("purgecss-from-frets");

module.exports = {
	plugins: [
		require('tailwindcss')('tailwind.config.js'),
		require('autoprefixer'),
		purgecss({
			content: ['./src/components/**/*.ts', './src/views/**/*.ts'],
			extractors: [{
				extractor: purgeFromFrets,
				extensions: ["ts"]
			}],
			whitelist: ['html', 'body', 'input', 'button', 'select'],
			whitelistPatterns: [/w\-\d+.+\d/],
			rejected: true
		})
	]
};
