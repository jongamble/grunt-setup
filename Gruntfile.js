module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {                               // Target
          options: {                        // Target options
            style: 'compressed'
          },
          files: {                          // Dictionary of files
            'lib/css/main.css': 'src/scss/main.scss'
          }
        }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'lib/img/'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        files: {
          'lib/js/scripts.js': ['src/js/vendor/*.js', 'src/js/main.js'],
          'lib/js/ie8.js': ['src/js/fallbacks-polyfills/*.js', 'src/js/ie8.js'],
        },
      },
    },
    uglify: {
      options: {
        preserveComments: 'none'
      },
      my_target: {
        files: {
          'lib/js/modernizr-min.js': ['src/js/modernizr.2.7.2.js'],
          'lib/js/scripts-min.js': ['lib/js/scripts.js'],
          'lib/js/ie8-min.js': ['lib/js/ie8.js'],
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        force: true
      },
      css: {
        files: ['src/scss/**/*', 'src/scss/*'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      markup: {
        files: ['**/*.html', '**/*.php'],
        tasks: [],
        options: {
          livereload: true,
        }
      },
      javascript: {
        files: ['src/js/src/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      img: {
        files: ['src/img/*'],
        tasks: ['imagemin'],
        options: {
          livereload: true
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'imagemin', 'concat', 'uglify', 'watch']);

};