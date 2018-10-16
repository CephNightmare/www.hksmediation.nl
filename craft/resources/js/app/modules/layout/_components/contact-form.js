Barba.Dispatcher.on("transitionCompleted", function () {
    if (document.getElementById('contact-form')) {
        Layout.components.contactForm = new Vue({
            el: document.getElementById("contact-form"),
            store,
            data: function () {
                return {
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

