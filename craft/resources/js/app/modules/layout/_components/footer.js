Barba.Dispatcher.on("transitionCompleted", function () {
    if (document.getElementById('footer')) {
        Layout.components.footer = new Vue({
            el: document.getElementById("footer"),
            store,
            data: function () {
                return {
                    formObj: {},
                    formJSON: {}
                }
            },
            computed: {},
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

