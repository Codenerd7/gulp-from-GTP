const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const inject = require('gulp-inject');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

// Пути к файлам
const paths = {
	src: 'src/',
	dist: 'dist/',
	pug: 'src/pages/**/*.pug',
	pugAll: ['src/pages/**/*.pug', 'src/layouts/**/*.pug', 'src/blocks/**/*.pug', 'src/utils/**/*.pug'], // Для отслеживания изменений
	styles: 'src/assets/styles/style.sass',
	stylesAll: ['src/assets/styles/*.sass', 'src/blocks/**/*.sass', 'src/utils/**/*.sass'], // Для отслеживания изменений
	scripts: 'src/**/*.js',
	images: 'src/assets/images/**/*',
	fonts: 'src/assets/fonts/**/*',
	pngSprites: 'src/sprites/png/*.png',
	sprites: 'src/sprites/svg/**/*.svg'
};

// Конфигурация для SVG спрайтов
const svgConfig = {
	mode: {
		symbol: {
			sprite: "../sprite.svg" // Спрайт будет сохранен как sprite.svg в каталоге svg
		}
	}
};

// Компиляция Pug в HTML с инжектом спрайта
function compilePug() {
	const svgSource = gulp.src(paths.dist + 'img/svg/sprite.svg', { allowEmpty: true });
	return gulp.src(paths.pug)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(inject(svgSource, {
			transform: (filePath, file) => {
				return file.contents.toString(); // Возвращаем содержимое файла как строку
			}
		}))
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(paths.dist))
		.pipe(browserSync.stream());
}

// Создание PNG спрайтов
function createPngSprite() {
	const spriteData = gulp.src(paths.pngSprites).pipe(spritesmith({
		imgName: 'sprite.png', // Имя спрайта
		cssName: 'png-sprite.sass', // Имя файла CSS
		padding: 20, // Отступ между изображениями в спрайте
		imgPath: '../img/png/sprite.png',
		cssFormat: 'sass'
	}));

	const cssStream = spriteData.css
		.pipe(gulp.dest('src/assets/styles')); // Сохраняем файл CSS
	const imgStream = spriteData.img
		.pipe(gulp.dest('dist/img/png')); // Сохраняем спрайт изображений


	return merge(imgStream, cssStream);
}

// Компиляция Sass в CSS без минификации
function compileSass() {
	return gulp.src(paths.styles)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dist + 'css'))
		.pipe(browserSync.stream());
}

// Объединение и компиляция JavaScript без минификации
function compileScripts() {
	return gulp.src(paths.scripts)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dist + 'js'))
		.pipe(browserSync.stream());
}

// Оптимизация изображений
function optimizeImages() {
	return gulp.src(paths.images)
		.pipe(newer(paths.dist + 'img'))
		.pipe(imagemin())
		.pipe(gulp.dest(paths.dist + 'img'))
		.pipe(browserSync.stream());
}

// Копирование шрифтов
function copyFonts() {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dist + 'fonts'))
		.pipe(browserSync.stream());
}



// Создание SVG спрайтов
function createSvgSprite() {
	return gulp.src(paths.sprites)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(cheerio({
			run: function ($) {
				$('*').each(function () {
					const elem = $(this);
					if (elem.attr('stroke')) {
						elem.attr('stroke', 'currentColor');
					}
					if (elem.attr('fill')) {
						elem.attr('fill', 'currentColor');
					}
				});
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(svgSprite(svgConfig))
		.pipe(gulp.dest(paths.dist + 'img/svg'))
		.pipe(browserSync.stream());
}

// Минификация HTML
function minifyHTML() {
	return gulp.src(paths.dist + '**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(paths.dist));
}

// Минификация CSS
function minifyCSS() {
	return gulp.src(paths.dist + 'css/**/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.dist + 'css'));
}

// Минификация JavaScript


// Минификация JavaScript
function minifyJS() {
	return gulp.src(paths.dist + 'js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist + 'js'));
}

// Задача для минификации всех файлов
const minify = gulp.series(minifyHTML, minifyCSS, minifyJS);
gulp.task('minify', minify);

// Удаление папки dist
function clean() {
	return del([paths.dist]);
}

// Запуск сервера разработки
function serve() {
	browserSync.init({
		server: {
			baseDir: paths.dist
		}
	});

	gulp.watch(paths.pugAll, compilePug); // Отслеживание всех Pug файлов
	gulp.watch(paths.styles, compileSass);
	gulp.watch(paths.styles, createPngSprite);
	gulp.watch(paths.stylesAll, compileSass); // Отслеживание всех Pug файлов
	gulp.watch(paths.scripts, compileScripts);
	gulp.watch(paths.images, optimizeImages);
	gulp.watch(paths.fonts, copyFonts);
	gulp.watch(paths.pngSprites, createPngSprite);
	gulp.watch(paths.pngSprites, compileSass);
	gulp.watch(paths.sprites, createSvgSprite);
}

// Таски
exports.clean = clean;
exports.compilePug = compilePug;
exports.compileSass = compileSass;
exports.compileScripts = compileScripts;
exports.optimizeImages = optimizeImages;
exports.copyFonts = copyFonts;
exports.createPngSprite = createPngSprite;
exports.createSvgSprite = createSvgSprite;
exports.serve = serve;

const build = gulp.series(clean, createSvgSprite, createPngSprite, gulp.parallel(compilePug, compileSass, compileScripts, optimizeImages, copyFonts));

// Задача для полного сбора проекта без минификации
gulp.task('build', build);

// Задача для полного сбора проекта с последующей минификацией
gulp.task('build:minify', gulp.series(build, minify));

gulp.task('default', gulp.series(build, serve));
