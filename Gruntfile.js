module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    'sftp-deploy': {
      build: {
        auth: {
          host: 'j1x.co',
          port: 22,
          authKey: 'key1'
        },
        src: '_site',
        dest: '/var/www/j1x-blog/public_html/',
        exclusions: ['/_site/**/.DS_Store', '/_site/**/Thumbs.db', '_site/tmp'],
        serverSep: '/',
        concurrency: 4,
        progress: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-sftp-deploy');

  grunt.registerTask('deploy', [
    'sftp-deploy'
  ]);

};
