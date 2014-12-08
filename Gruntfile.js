/* jshint node:true */

module.exports = function( grunt ) {
	grunt.initConfig({
		// package information
		pkg: grunt.file.readJSON( 'package.json' ),

		// add vendor prefixes to css
		autoprefixer: {
			main: {
				browsers: [ 'last 3 versions' ],
				expand: true,
				flatten: true,
				map: true,
				src: 'build/procrastimate.css',
				dest: 'build/procrastimate.css'
			}
		},

		// bump version number
		bump: {
			options: {
				files: [ 'package.json', 'bower.json' ],
				commit: true,
				commitMessage: 'Version updated to v%VERSION%',
				commitFiles: [ 'package.json', 'bower.json' ],
				createTag: true,
				tagName: 'v%VERSION%',
				push: false
			}
		},

		// run the server in development environment
		connect: {
			serve: {
				options: {
					port: 3000,
					useAvailablePort: true
				}
			}
		},

		// config for jshint task
		jshint: {
			options: {
				jshintrc: true
			},
			files: [
				'Gruntfile.js',
				'src/**/*.js'
			]
		},

		// less precompilation
		less: {
			// configure for development environment
			dev: {
				files: {
					'build/procrastimate.css': 'src/less/**/*.less'
				}
			}
		},

		// concat + compress js
		uglify: {
			dev: {
				options: {
					mangle: false,
					compress: false,
					preserveComments: 'all',
					files: [{
						expand: true,
						src: 'src/js/**/*.js',
						dest: 'build/procrastimate.js'
					}]
				}
			}
		},

		// run tasks on file changes
		watch: {
			stylesheets: {
				files: [ 'src/less/**/*.less' ],
				tasks: [ 'less:dev' ]
			}
		}
	});

	// load runners
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-bump' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// register tasks
	grunt.registerTask( 'default', [ 'serve' ] );
	grunt.registerTask( 'serve', [ 'jshint', 'less:dev', 'connect', 'watch' ] );
};