		module.exports = function(config){
		  config.set({
			basePath : '../',
			files : [
				'js/angular.js',
				'js/angular-mocks.js',
			  'test/unit/**/*.js'
			],
			autoWatch : true,
			frameworks: ['jasmine'],
			browsers : ['Chrome', 'Firefox'],
			plugins : [
					'karma-chrome-launcher',
					'karma-firefox-launcher',
					'karma-jasmine'
					],
			junitReporter : {
			  outputFile: 'test_out/unit.xml',
			  suite: 'unit'
			}

		  });
		};