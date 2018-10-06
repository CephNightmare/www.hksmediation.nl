Barba.Dispatcher.on("transitionCompleted", function () {
    if (document.getElementById('text')) {
        Layout.components.text = new Vue({
            el: document.getElementById("text"),
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

