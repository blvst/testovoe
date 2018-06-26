import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import merge from 'merge-stream';
import spritesmith from 'gulp.spritesmith';
import gulpif from 'gulp-if';
import buffer from 'vinyl-buffer';
import imagemin from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import importer from 'postcss-import';
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import sourcemaps from 'gulp-sourcemaps';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';

import webpack from 'webpack';
import statsLogger from 'webpack-stats-logger';
import webpackConfig from './webpack.config';

// create server
gulp.task('server', (done) => {
  browserSync({
    port: 3000,
    server: {
      baseDir: './build',
      directory: false,
    },
  });

  done();
});

// reload bs
gulp.task('bsReload', () => {
  browserSync.reload();
});

// create png sprites
gulp.task('sprites', () => {
  const spriteData = gulp.src('images/*.png')
    .pipe(plumber({ errorHandler: errorHandler('Error in \'sprites\' task') }))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
    }));

  const imgStream = spriteData.img
    .pipe(plumber({ errorHandler: errorHandler('Error in \'sprites\' task') }))
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('./app/static/images/'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('.app/static/styles/helpers/'));

  return merge(imgStream, cssStream);
});

// create svg sprites
gulp.task('svg', () => {
  return gulp.src('./app/icons/**/*.svg')
    .pipe(plumber({ errorHandler: errorHandler('Error in \'svg\' task') }))
    .pipe(svgSprite({
      title: false,
      id: 'icon_%f',
      className: '%f',
      templates: [
        'default-svg',
      ],
      mode: {
        symbol: true,
      },
    }))
    .pipe(gulpif(/\.svg$/, rename('icon.svg')))
    .pipe(gulp.dest('./build/assets/images/'));
});

// copy static resources
gulp.task('static', () => {
  return gulp.src('./app/static/**/*.*')
    .pipe(gulp.dest('./build/assets/'));
});

// compile styles
gulp.task('styles', () => {
  return gulp.src('./app/styles/app.pcss')
    .pipe(plumber({ errorHandler: errorHandler('Error in \'styles\' task') }))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      importer({
        from: 'app/styles/app.css',
      }),
      stylelint(),
      precss(),
      autoprefixer(),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./build/assets/'));
});

// compile templates
gulp.task('templates', () => {
  return gulp.src('app/pages/*.pug')
    .pipe(plumber({ errorHandler: errorHandler('Error in \'templates\' task') }))
    .pipe(pug({ basedir: 'app' }))
    .pipe(gulp.dest('build/'));
});

// run webpack
gulp.task('scripts', (done) => {
  const scriptsErrorHandler = errorHandler('Error in \'scripts\' task');

  webpack(webpackConfig, (error, stats) => {
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length) {
      jsonStats.errors.forEach((message) => {
        scriptsErrorHandler.call({
          emit() { /* noop */ },
        }, { message });
      });
    }
    statsLogger(error, stats);

    if (process.env.NODE_ENV === 'production') {
      done();
    }
  });

  done();
});

// create watchers
gulp.task('watch', () => {
  const styles = gulp.watch('app/{components,styles}/**/*.pcss');
  styles.on('all', gulp.series('styles', 'bsReload'));

  const templates = gulp.watch('app/{components,pages}/**/*.pug');
  templates.on('all', gulp.series('templates', 'bsReload'));

  const js = gulp.watch('app/{components,js}/**/*.js');
  js.on('all', gulp.series('bsReload'));

  const stat = gulp.watch('app/static/**/*.*');
  stat.on('all', gulp.series('static', 'bsReload'));

  const svg = gulp.watch('app/icons/**/*.svg');
  svg.on('all', gulp.series('svg', 'bsReload'));
});

// compile styles dependencies
gulp.task('styles:dependencies', gulp.series(
  'sprites',
  'svg',
  'static',
  'styles',
));

// run build
gulp.task('build', gulp.parallel('styles:dependencies', 'scripts', 'templates'));

// run dev mode
gulp.task('default', gulp.series(
  gulp.parallel('styles:dependencies', 'scripts', 'templates'),
  'server',
  'watch',
));
