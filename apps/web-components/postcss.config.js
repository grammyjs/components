/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions',
      ],
    }),

    require('@fullhuman/postcss-purgecss')({
      blocklist: [
        /^q-table/,
        /^q-loading/,
        /^q-avatar/,
        /^q-badge/,
        /^q-banner/,
        /^q-breadcrumbs/,
        /^q-carousel/,
        /^q-field/,
        /^q-form/,
        /^q-file/,
        /^q-radio/,
        /^q-uploader/,
        /^q-skeleton/,
        /^q-splitter/,
        /^q-stepper/,
        /^q-notification/,
        /^q-expansion/,
        /^q-panel/,
        /^q-bar/,
        /^q-tree/,
        /^q-toggle/,
        /^q-timeline/,
        /^q-rating/,
        /^q-pull/,
        /^q-popup/,
        /^q-parallax/,
        /^q-pagination/,
        /^q-menu/,
        /^q-editor/,
        /^q-dialog/,
        /^q-chip/,
        /^q-card/,
        /^q-linear/,
        /^q-header/,
        /^q-drawer/,
        /^q-knob/,
        /^q-list/,
        /^q-item/,
        /^q-img/,
        /^q-footer/,
        /^shadow/,
      ],

      // Specify the paths to all of the template files in your project
      content: [
        './index.html',
        './src/**/*',
        './node_modules/quasar/dist/**/*',
      ],
    })

    // https://github.com/elchininet/postcss-rtlcss
    // If you want to support RTL css, then
    // 1. yarn/npm install postcss-rtlcss
    // 2. optionally set quasar.config.js > framework > lang to an RTL language
    // 3. uncomment the following line:
    // require('postcss-rtlcss')
  ],
};
