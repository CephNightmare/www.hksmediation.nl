let Global = new Vue({
    data() {
        return {
            bLazy: null,
            MoveToInstance: new MoveTo({
                tolerance: 100,
                duration: 800
            }),
            formDictionary: {
                _default: (field) => `Dit veld is niet correct ingevuld.`,
                after: (field, [target, inclusion]) => `Dit veld moet groter ${inclusion ? 'of gelijk aan ' : ''} ${target}.`,
                alpha_dash: (field) => `Dit veld mag alleen alfanumerieke karakters, strepen en onderstrepingstekenen bevatten.`,
                alpha_num: (field) => `Dit veld mag alleen alfanumerieke karakters bevatten.`,
                alpha_spaces: (field) => `Dit veld mag alleen alfanumerieke karakters en spaties bevatten.`,
                alpha: (field) => `Dit veld mag alleen alfabetische karakters bevatten.`,
                before: (field, [target, inclusion]) => `De waarde van dit veld moet kleiner ${inclusion ? 'of gelijk aan' : ''} ${target} zijn.`,
                between: (field, [min, max]) => `De waarde van dit veld moet tussen ${min} en ${max} zijn.`,
                confirmed: (field) => `Dit bevestigingsveld komt niet overeen.`,
                credit_card: (field) => `Dit veld is ongeldig.`,
                date_between: (field, [min, max]) => `De datum moet tussen ${min} en ${max} zijn.`,
                date_format: (field, [format]) => `Dit veld moet het volgende formaat hebben: ${format}.`,
                decimal: (field, [decimals = '*'] = []) => `Dit veld mag alleen numerieke, en${!decimals || decimals === '*' ? ' ' : decimals}decimale nummers bevatten.`,
                digits: (field, [length]) => `Dit veld moet ${length} nummers bevatten.`,
                dimensions: (field, [width, height]) => `De dimensies voor dit veld moet ${width} pixels breed en ${height} pixels hoog zijn.`,
                email: (field) => `Dit veld moet een geldig e-mailadres bevatten.`,
                ext: (field) => `Dit veld moet een correct bestand bevatten.`,
                image: (field) => `Dit veld moet een afbeelding bevatten.`,
                included: (field) => `Dit veld moet een geldige waarde bevatten.`,
                integer: (field) => `Dit veld moet een nummer zijn.`,
                ip: (field) => `Dit veld moet een veilig ip adres zijn.`,
                length: (field, [length, max]) => {
                    if (max) {
                        return `Dit veld moet minimaal ${length} karakters en maximaal ${max} karakters bevatten.`;
                    }

                    return `Dit veld moet minimaal ${length} karakters lang zijn.`;
                },
                max: (field, [length]) => `Dit veld mag niet meer karakters bevatten dan ${length}.`,
                max_value: (field, [max]) => `Dit veld moet ${max} karakters of minder bevatten.`,
                mimes: (field) => `Dit veld moet Dit juiste type bestand bevatten.`,
                min: (field, [length]) => `Dit veld moet minimaal ${length} karakters zijn.`,
                min_value: (field, [min]) => `Dit veld moet minimaal ${min} karakters zijn.`,
                excluded: (field) => `Dit veld moet een geldige waarde bevatten`,
                numeric: (field) => `Dit veld mag alleen numerieke karakters bevatten.`,
                regex: (field) => `Dit veld is niet correct ingevoerd.`,
                required: (field) => `Dit veld is verplicht.`,
                size: (field, [size]) => `De bestandsgrootte van dit veld mag niet groter zijn dan ${formatFileSize(size)}.`,
                url: (field) => `Dit veld moet een valide URL zijn.`
            },
        }
    },
    directives: {
        clickOutside: {
            bind: function (el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                    const compName = vNode.context.name;
                    let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
                    if (compName) {
                        warn += `Found in component '${compName}'`
                    }

                    console.warn(warn)
                }
                // Define Handler and cache it on the element
                const bubble = binding.modifiers.bubble;
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                };
                el.__vueClickOutside__ = handler;

                // add Event Listeners
                document.addEventListener('click', handler)
            },
            unbind: function (el, binding) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__);
                el.__vueClickOutside__ = null
            }
        }
    },
    methods: {
        Init() {
            this.Blazy();
            this.Barba();
            this.Veevalidate();
            this.Axios();
        },
        Blazy() {
            this.bLazy = new Blazy({
                breakpoints: [{
                    width: 0,
                    src: 'data-src-small'
                }, {
                    width: 640,
                    src: 'data-src-medium'
                }, {
                    width: 1024,
                    src: 'data-src-large'
                }, {
                    width: 1200,
                    src: 'data-src-xlarge'
                }, {
                    width: 1440,
                    src: 'data-src-xxlarge'
                }]
            })
        },
        Barba() {
            let FadeTransition = Barba.BaseTransition.extend({
                start: function () {
                    // As soon the loading is finished and the old page is faded out, let's fade the new page
                    Promise
                        .all([this.newContainerLoading, this.fadeOut()])
                        .then(this.fadeIn.bind(this));
                },
                fadeOut: function () {
                    return new Promise((resolve, reject) => {
                        document.querySelector('.barba-bg').className += ' barba-bg--visible';
                        window.setTimeout(function () {
                            resolve();
                        }, 500);
                    });
                },
                fadeIn: function () {
                    let _this = this;
                    (this.oldContainer).style.display = 'none';

                    window.scrollTo(0, 0);

                    document.querySelector('.barba-bg').classList.remove('barba-bg--visible');
                    _this.done();
                }
            });

            Barba.Pjax.getTransition = function () {
                return FadeTransition;
            };
        },
        Veevalidate() {
            Vue.use(VeeValidate, {
                locale: 'nl',
                events: 'blur|submit|change',
                classes: true,
                invalidateFalse: true,
                classNames: {
                    invalid: 'input--invalid',
                    valid: 'input--valid'
                },
                dictionary: {
                    nl: { messages: this.formDictionary }
                }
            });
        },
        SmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                if (anchor.getAttribute('href').length > 1) {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();

                        let target = document.querySelector(this.getAttribute('href'));
                        Listeners.MoveToInstance.move(target);
                    });
                }
            });
        },
        Axios() {
            // Add a response interceptor
            axios.interceptors.response.use(function (response) {
                // Do something with response data
                return response;
            }, function (error) {
                // Do something with response error
                // todo error handling
                return Promise.reject(error);
            });
        }
    },
    mounted() {
        Barba.Dispatcher.on("transitionCompleted", function () {
            this.Init();
        });
    },
    created() {
        this.Init();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    Barba.Pjax.cacheEnabled = false;
    Barba.Pjax.start();
});
