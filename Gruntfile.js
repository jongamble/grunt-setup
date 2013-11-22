module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'lib/css',
          require: 'susy',
          outputStyle: 'expanded'
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
        src: ['src/js/src/*.js'],
        dest: 'src/js/scripts.js',
      },
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      my_target: {
        files: {
          'lib/js/scripts.min.js': ['src/js/scripts.js'],
          'lib/js/selectivizr.min.js': ['src/js/selectivizr.js'],
          'lib/js/modernizer.min.js': ['src/js/modernizer.js']
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
        tasks: ['compass'],
        options: {
          livereload: true
        }
      },
      another: {
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'imagemin', 'concat', 'uglify', 'watch']);

};