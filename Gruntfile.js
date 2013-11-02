'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        /*******************/
        
       uglify: {
            dist: {
                options: {
                    sourceMap: 'dist/cordova-wrapper-map.js',
                },    
              files: {
                'dist/cordova-wrapper.min.js': 'dist/cordova-wrapper.js'
              }
            }
        },
        
        /**/
        
        coffee : {
            dev: {
                options: {
                    bare: true,
                    flatten: true,
                },
                files: {'dev/cordova-wrapper.js':['dev/cordova-wrapper.coffee', 'dev/cordova_coffee/*.coffee']} 
            }
            
            , dist : {
                options: {
                    bare: true,
                    flatten: true,
                },
                files: {'dist/cordova-wrapper.js':['dev/cordova-wrapper.coffee', 'dev/cordova_coffee/*.coffee']} 
            }
        },
        
        /*******************/
        
        watch: {
            coffee: {
            files: ['dev/cordova-wrapper.coffee', 'dev/cordova_coffee/*.coffee'],
            tasks: 'coffee:dev'
            }
        }
        
        /*******************/
        
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-coffee");
    
    grunt.registerTask('dist', function(){
        grunt.file.recurse('dist/', function(abspath, rootdir, subdir, filename){
            grunt.file.delete('dist/'+filename);
        })
        
        grunt.task.run('coffee:dist');
        grunt.task.run('uglify');
    });
    
    grunt.registerTask('dev', function(){
        grunt.task.run('coffee:dev');
    });
    
    grunt.registerTask('default', [
        'watch'
    ]);
    
};