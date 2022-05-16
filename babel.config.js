module.exports = {
	minified: false,
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				},
				modules: 'commonjs',
			}
		],
		'@babel/preset-typescript'
	]
};