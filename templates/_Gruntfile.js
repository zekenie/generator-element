module.exports = function(grunt) {

    grunt.initConfig({
        'connect': {
            demo: {
                options: {
                    open: true,
                    keepalive: true
                }
            }
        },
        'gh-pages': {
            options: {
                clone: 'bower_components/<%= githubRepo %>'
            },
            src: [
                'bower_components/**/*',
                '!bower_components/<%= githubRepo %>/**/*',
                'demo/*', 'src/*', 'index.html'
            ]
        }<% if (solution != 'VanillaJS') { %>,
        'replace': {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        }<% } %>
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');<% if (solution != 'VanillaJS') { %>
    grunt.loadNpmTasks('grunt-text-replace');<% } %>
<% if (solution != 'VanillaJS') { %>
    grunt.registerTask('build',  ['replace']);<% } %>
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);

};
