Barba.Dispatcher.on("transitionCompleted", function () {
    if (document.getElementById('header')) {
        Layout.components.header = new Vue({
            el: document.getElementById("header"),
            store,
            data: function () {
                return {
                    scrolled: false
                }
            },
            computed: {
                menuExpanded: {
                    get() {
                        return this.$store.state.Layout.menuExpanded;
                    },
                    set(value) {
                        this.$store.dispatch('Layout/changeMenuExpanded', value)
                    }
                }
            },
            mounted: function () {
            },
            methods: {
            },
            created: function () {
            },
            destroyed: function () {
            }
        });
    }
});

