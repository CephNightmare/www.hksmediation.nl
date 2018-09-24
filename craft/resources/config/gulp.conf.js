module.exports = function ()
{
    //Define these paths relative to the gulpfile.js
    const paths = {
        node: 'node_modules/',
        dist: '../web/public/',
        src: '',
        root: '../../'
    };

    const conditions = {
        manifest: false,
        webkey: false
    };

    const config = {
        conditions: conditions,
        paths: paths,
        js: {
            vendors: {
                src: [
                    paths.src + "js/vendors/**/*.js",
                    paths.node + "moveto/dist/moveTo.js",
                    paths.node + "barba.js/dist/barba.min.js",
                    paths.node + "flickity/dist/flickity.pkgd.min.js",
                    paths.node + "blazy/blazy.min.js",
                    paths.node + "es6-promise/dist/es6-promise.min.js",
                    paths.node + "nodelist-foreach-polyfill/index.js",
                    paths.node + "vee-validate/dist/vee-validate.min.js",
                    paths.node + "axios/dist/axios.min.js",
                    paths.node + "vue-recaptcha/dist/vue-recaptcha.js",
                    paths.node + "vuex/dist/vuex.js",
                    paths.node + "vue/dist/vue.js",
                    paths.node + "formdata-polyfill/formdata.min.js",
                ]
            },

            main: {
                app: {
                    src: [
                        // 1. Retrieve: Global functions
                        paths.src + "js/app/global.js",
                        // 2. Retrieve: namespacing modules, store and mixins. also retrieve routes
                        paths.src + "js/app/**/index.js",
                        // 3. Retrieve the API functions
                        paths.src + "js/app/modules/**/_api/**/*.js",
                        // 4. Retrieve the store data
                        paths.src + "js/app/modules/**/_store/**/*.js",
                        // 5. Retrieve the store setter
                        paths.src + "js/app/store/store.js",
                        // 6. Retrieve mixins
                        paths.src + "js/app/mixins/**/*.js",
                        // 7. Retrieve module components
                        paths.src + "js/app/modules/**/_components/**/*.js",
                    ],
                    watch: paths.src + 'js/app/**/*.js',
                },

                webkey: {
                    src: [
                        // 1. Retrieve: Global functions
                        paths.src + "js/app/global.js",
                        // 2. Retrieve: namespacing modules, store and mixins. also retrieve routes
                        paths.src + "js/app/**/index.js",
                        // 3. Retrieve the API functions
                        paths.src + "js/app/modules/**/_api/**/*.js",
                        // 4. Retrieve the store data
                        paths.src + "js/app/modules/**/_store/**/*.js",
                        // 5. Retrieve the store setter
                        paths.src + "js/app/store/store.js",
                        // 6. Retrieve mixins
                        paths.src + "js/app/mixins/**/*.js",
                        // 7. Retrieve module components
                        paths.src + "js/app/modules/**/_components/**/*.js",
                    ],
                    watch: paths.src + 'js/webkey/**/*.js',
                },
            },
        },

        scss: {
            watch: paths.src + 'scss/shared/**/*.scss',

            app: {
                src: [
                    paths.src + 'scss/app/main.scss',
                ],
                watch: paths.src + 'scss/app/**/*.scss',
            },

            webkey: {
                src: [
                    paths.src + 'scss/webkey/webkey.scss',
                    paths.src + 'scss/webkey/editor.scss'
                ],
                watch: paths.src + 'scss/webkey/**/*.scss',
            }
        },

        images: {
            src: paths.src + 'images/**/*',
            watch: paths.src + 'images/**/*',
            dest: paths.dist + 'images/'
        },
        blade: {
            watch: paths.root + 'resources/views/**/*.php',
        },
        fonts: {
            src: [
                paths.src + 'fonts/**/*'
            ],
            dest: paths.dist + 'fonts/'
        }
    };

    return config;
};