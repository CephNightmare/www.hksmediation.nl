Barba.Dispatcher.on("transitionCompleted", function () {
    if (document.getElementById('faq')) {
        Layout.components.faq = new Vue({
            el: document.getElementById("faq"),
            store,
            data: function () {
                return {
                    selectedFaq: null
                }
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