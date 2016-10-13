module.exports = function(){

  var paths = {
    src: 'src/',
    src_assets: 'src/assets/',
    dest: 'dist/',
    dest_assets: 'dist/assets/'
  };
   
  var config = {
      global: {
        src: paths.src,
        dest: paths.dest
      },
      src: {
        fonts: [
          paths.src_assets + 'fonts/**/*',
          'node_modules/evolution-core/dist/fonts/**/*'
        ],
        pages: [
          paths.src + 'pages/**/*.html'
        ],
        pages_base: paths.src + 'pages',
        layouts: [
          paths.src + '{layouts,partials}/**/*.{hbs,html}'
        ],
        data: paths.src + 'data/**/*.{json,yml}',
        images: [
          paths.src_assets + 'images/**/*',
          'node_modules/evolution-core/dist/images/**/*'
        ],
        js : paths.src_assets + 'js/**/*.js',
        js_core: [
          // JS Libraries required by Foundation
          'node_modules/jquery/dist/jquery.js',
          'node_modules/what-input/what-input.js',
          // Core Foundation JS files
          'node_modules/foundation-sites/js/foundation.core.js',
          'node_modules/foundation-sites/js/foundation.util.*.js',
          // Individual Foundation JS components
          // If you aren't using a component, just remove it from the list
          'node_modules/foundation-sites/js/foundation.abide.js',
          'node_modules/foundation-sites/js/foundation.accordion.js',
          'node_modules/foundation-sites/js/foundation.accordionMenu.js',
          'node_modules/foundation-sites/js/foundation.drilldown.js',
          'node_modules/foundation-sites/js/foundation.dropdown.js',
          'node_modules/foundation-sites/js/foundation.dropdownMenu.js',
          'node_modules/foundation-sites/js/foundation.equalizer.js',
          'node_modules/foundation-sites/js/foundation.interchange.js',
          'node_modules/foundation-sites/js/foundation.magellan.js',
          'node_modules/foundation-sites/js/foundation.offcanvas.js',
          'node_modules/foundation-sites/js/foundation.orbit.js', // Requires Evolution Animations JS
          'node_modules/foundation-sites/js/foundation.responsiveMenu.js',
          'node_modules/foundation-sites/js/foundation.responsiveToggle.js',
          'node_modules/foundation-sites/js/foundation.reveal.js',
          'node_modules/foundation-sites/js/foundation.slider.js',
          'node_modules/foundation-sites/js/foundation.sticky.js',
          'node_modules/foundation-sites/js/foundation.tabs.js',
          'node_modules/foundation-sites/js/foundation.toggler.js',
          'node_modules/foundation-sites/js/foundation.tooltip.js',
          // Core JS Libraries required by jQuery UI
          'bower_components/jquery-ui/ui/core.js',
          'bower_components/jquery-ui/ui/widget.js',
          'bower_components/jquery-ui/ui/mouse.js',
          'bower_components/jquery-ui/ui/position.js',
          // Individual jQuery UI components
          // If you aren't using a component, just remove it from the list
          'bower_components/jquery-ui/ui/autocomplete.js',
          'bower_components/jquery-ui/ui/datepicker.js',
          'bower_components/jquery-ui/ui/menu.js',
          'bower_components/jquery-ui/ui/slider.js',
          // jQuery Plugins
          // If you aren't using a component, just remove it from the list
          'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
          // 'bower_components/datatables.net/js/jquery.dataTables.js',
          // 'bower_components/datatables.net-zf/js/dataTables.foundation.js',
          // 'bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
          // 'src/assets/js/core/lib/jquery/plugins/jquery.autosize.input.js',
          // Mobile
          // 'src/assets/js/core/lib/mobile/ios-orientationchange-fix.js',
          // Evolution core JS
          // 'src/assets/js/core/atoms/buttons.js',
          // 'src/assets/js/core/atoms/helpers.js',
          // 'src/assets/js/core/molecules/autocomplete.js',
          // 'src/assets/js/core/molecules/data-table.js',
          // 'src/assets/js/core/molecules/datepicker.js',
          // 'src/assets/js/core/molecules/slider.js'
        ],
        js_app: [
          // Application or project level JS files
          paths.src_assets + 'js/app/**/!(app).js',
          paths.src_assets + 'js/app.js',
          'node_modules/evo-conversational-form/dist/conversational-form.js'
        ],
        scss: paths.src_assets + 'scss/**/*.scss'
      },
      dest: {
        fonts: paths.dest_assets + 'fonts/',
        css: paths.dest_assets + 'css/',
        images: paths.dest_assets + 'images/',
        js: paths.dest_assets + 'js/'
      },
      autoprefixer: {
        browsers: [
          'last 2 versions',
          'ie >= 9'
        ]
      },
      deploy: {
        src: paths.dest + '**/*',
        auth: 'key',
        host: 'usfkl21as292v',
        remote_path: '/www/content/uxui/evolution-labs/evo-gulp-poc/'
      },
      browsersync: {
        port: 9000
      },
      notify: {
        build: {
          title: 'Build done.',
          message: 'Files generated successfully.'
        },
        copy: {
          title: 'Files copied.',
          message: 'Files copied successfully.'
        },
        deploy: {
          title: 'Production files deployed.',
          message: 'Production files deployed to FTP server successfully.'
        },
        images: {
          title: 'Images optimized and copied.',
          message: 'Images optimized and copied successfully.'
        },
        js: {
          title: 'Scripts generated.',
          message: 'Scripts generated successfully.'
        },
        lint: {
          title: 'Sass and JS files linted.',
          message: 'Please check the console for errors.'
        },
        pages: {
          title: 'Pages assembled.',
          message: 'Layouts, templates, partials, and data assembled successfully.'
        },
        patterns: {
          title: 'Patterns packaged.',
          message: 'HTML, CSS, and JS for patterns packaged successfully.'
        },
        sass: {
          title: 'Sass files preprocessed.',
          message: 'Sass files preprocessed successfully.'
        },
        server: {
          title: 'Server running.',
          message: 'Build successful. Server is ready and running.'
        },
      },
      panini: {
        root: paths.src + '/pages/',
        layouts: paths.src + '/layouts/',
        partials: [
          paths.src + '/partials/'
        ],
        data: paths.src + '/data/',
        helpers: paths.src + '/helpers/'
      },
      sass: {
        include_paths: [
          'node_modules/foundation-sites/scss/',
          'node_modules/evolution-core/dist/',
          'node_modules/evo-conversational-form/dist/'
        ],
        output_style: 'expanded'
      }
  };

  return config;
};