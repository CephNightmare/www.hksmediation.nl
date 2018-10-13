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
                        console.log(this.$store.state.Layout.menuExpanded);
                        return this.$store.state.Layout.menuExpanded;
                    },
                    set(value) {
                        console.log("set computed value menu expanded");
                        this.$store.dispatch('Layout/changeMenuExpanded', value)
                    }
                }
            },
            mounted: function () {
                this.menuExpanded = false;
            },
            methods: {},
            created: function () {
            },
            destroyed: function () {
            }
        });
    }
});

