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
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

// Задача по-умолчанию
gulp.task('default', ['server','jade','scss','js','images','watch']);

gulp.task('server', function() {
    connect.server();
});

// Копируем шрифты из Bower
gulp.task('bower:fonts', function() {
    return gulp.src('./bower_components/**/fonts/*.**')
        .pipe(gulp.dest('./public/assets/fonts/'))
});

// Собираем JADE
gulp.task('jade', function() {
    return gulp.src('./app/themes/'+templateName+'/[^_]*.jade')
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
        .pipe(scss({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/themes/'+templateName+'/css/'));
});

// Собираем JavaScript
gulp.task('js', function() {
    return gulp.src(['./app/themes/'+templateName+'/js/**/[^_]*.js'])
        .pipe(gulp.dest('./public/themes/'+templateName+'/js/'));
});

// Копируем картинки из папки разработки
gulp.task('images', function() {
    return gulp.src('./app/themes/'+templateName+'/images/**/*.**')
        .pipe(gulp.dest('./public/themes/'+templateName+'/images/'))
});

// Наблюдаем за изменением файлов и компилируем измененные файлы
gulp.task('watch', function() {
    gulp.watch('./app/themes/'+templateName+'/**/*.jade', ['jade']);
    gulp.watch('./app/themes/'+templateName+'/**/*.scss', ['scss']);
    gulp.watch('./app/themes/'+templateName+'/**/*.js', ['js']);
    gulp.watch('./app/themes/'+templateName+'/images/**/*.*', ['images']);
});
