Barba.Dispatcher.on("transitionCompleted", function () {
    if (document.getElementById('cta-form')) {
        Layout.components.ctaForm = new Vue({
            el: document.getElementById("cta-form"),
            store,
            data: function () {
                return {}
            },
            computed: {
            },
            mounted: function () {
            },
            methods: {},
            created: function () {
            },
            destroyed: function () {
            }
        });
    }
});

