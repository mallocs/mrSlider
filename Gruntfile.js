'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
/****
    usemin: {
      html: 'demos/dark.html',
      options: {
        banner: '<%= banner %>'
      }
    },
    useminPrepare: {
      html: 'test/visual/dark.html',
      options: {
        dest: 'demos'
      }
    },
****/
    clean: {
      dist: ['dist'],
      build: ['build']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
      },
      jquery: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/jquery-ui/ui/core.js',
              'bower_components/jquery-ui/ui/widget.js',
              'bower_components/jquery-ui/ui/effect.js',
              'bower_components/jquery-ui/ui/effect-*.js'],
        dest: 'build/jquery.custom.js'
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      distWithJQuery: {
        src: ['build/jquery.custom.js', 'src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.bundle.js'
      },
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.min.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      distWithJQuery: {
        src: '<%= concat.distWithJQuery.dest %>',
        dest: 'dist/<%= pkg.name %>.bundle.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect', 'qunit', 'clean:dist',
'cssmin', 'concat', 'uglify', 'clean:build']);
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('build', ['jshint', 'cssmin', 'concat', 'uglify']); //, 'clean:build']);
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
};
