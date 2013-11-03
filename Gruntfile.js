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
            
            , build: {
                options: {
                    sourceMap: 'build/cordova-wrapper-custom-map.js',
                },    
              files: {
                'build/cordova-wrapper-custom.min.js': 'build/cordova-wrapper-custom.js'
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
            , build : {
                options : {
                    bare : true,
                    flatten : true
                },
                files : (function(){
                    var _buildFile = grunt.file.read('build.conf').replace(/\s/g, '').split(','), i = 0,
                    build = ['dev/cordova-wrapper.coffee'];
                    for(i ; i < _buildFile.length; i++){
                        if(grunt.file.exists('dev/cordova_coffee/'+_buildFile[i]+'.coffee')){
                            build.push('dev/cordova_coffee/'+_buildFile[i]+'.coffee');
                            grunt.log.ok('File found : '+'dev/cordova_coffee/'+_buildFile[i]+'.coffee');
                        } else {
                            grunt.log.error('File not found : '+'dev/cordova_coffee/'+_buildFile[i]+'.coffee');
                        }
                    }
                    return { 'build/cordova-wrapper-custom.js' : build};
                })()
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
    
    grunt.registerTask('build', function(){
        clearFolder('build');
        grunt.task.run('coffee:build');
        grunt.task.run('uglify:build');
    });
    
    grunt.registerTask('dist', function(){
        clearFolder('dist');
        grunt.task.run('coffee:dist');
        grunt.task.run('uglify');
    });
    
    grunt.registerTask('dev', function(){
        grunt.task.run('coffee:dev');
    });
    
     grunt.registerTask('clean', function(){
        clearFolder('build');
        clearFolder('dist');
    });
    
    grunt.registerTask('default', [
        'watch'
    ]);
    
    
    
    /*  */
    function clearFolder(folder){
        grunt.file.recurse(folder+'/', function(abspath, rootdir, subdir, filename){
            grunt.file.delete(folder+'/'+filename);
        })
        grunt.file.write(folder+'/index.html', '' );
    }
    
    
};