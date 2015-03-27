/*
 *  Задаем название шаблона
 */
var templateName = 'agency';
/*
 *  Ниже строки не изменять
 */

// Подключаем плагины Gulp
var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    jade = require('gulp-jade'),
    scss = require('gulp-sass'),
    jadeglob = require('gulp-jade-globbing'),
    scssglob = require('gulp-css-globbing'),
    rename = require('gulp-rename');

// Задача по-умолчанию
gulp.task('default', ['server','jade','scss','js','watch']);

gulp.task('server', function() {
    connect.server();
});

// Собираем JADE
gulp.task('jade', function() {
    gulp.src('./app/themes/'+templateName+'/[^_]*.jade')
        .pipe(jadeglob())
        .pipe(jade({
            pretty: true
        }))
        .pipe(rename({
            extname: ".php"
        }))
        .pipe(gulp.dest('./public/themes/'+templateName+'/'))
});

// Собираем SCSS
gulp.task('scss', function() {
    return gulp.src('./app/themes/'+templateName+'/scss/[^_]*.scss')
        .pipe(scssglob({
            extensions: ['.css', '.scss'],
            scssImportPath: {
                leading_underscore: false,
                filename_extension: false
            }
        }))
        .pipe(scss())
        .on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest('./public/themes/'+templateName+'/css/'));
});

// Собираем JavaScript
gulp.task('js', function() {
    return gulp.src(['./app/themes/'+templateName+'/js/[^_]*.js'])
        .pipe(gulp.dest('./public/themes/'+templateName+'/js/'));
});

// Наблюдаем за изменением файлов и компилируем измененные файлы
gulp.task('watch', function() {
    gulp.watch('./app/themes/'+templateName+'/**/*.jade', ['jade']);
    gulp.watch('./app/themes/'+templateName+'/**/*.scss', ['scss']);
    gulp.watch('./app/themes/'+templateName+'/**/*.js', ['js']);
});
