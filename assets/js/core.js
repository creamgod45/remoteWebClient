let url = "";
let username = "";
let password = "";
(function () {
    'use strict'
    window.addEventListener("load", async () => {
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        await init();
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    });

    function init() {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');
        var ts = Array.prototype.slice.call(forms);
        console.log(ts)
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', async function (event) {
                    if (form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                        url = document.querySelector("#ServerName").value;
                        username = document.querySelector("#username").value;
                        password = document.querySelector("#password").value;
                        let data = {
                            "username": username,
                            "password": password,
                            "page": ""
                        };
                        await connectToServer(url, data, async (a) => {
                            await console.log(a);
                            await document.querySelector(".login-panel").remove();
                            document.querySelector(".vm").innerHTML = a.build;
                        }, error => console.log);
                        data = {
                            "username": username,
                            "password": password,
                            "page": "index"
                        };
                        setTimeout(() => {
                            connectToServer(url, data, async (a) => {
                                await document.querySelector(".test").remove();
                                document.querySelector(".vm").innerHTML = a.build;
                            }, error => console.log);
                        }, 3000);
                    }
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated');
                }, false)
            })
    }
})();


/**
 *
 * @param url
 * @param data
 * @param callback
 * @param error
 * @returns {Promise<void>}
 */
async function connectToServer(url, data, callback, error) {
    await fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then((raw) => raw.json())
        .catch((e) => error(e))
        .then((res) => callback(res));
}
async function scopePage(page) {
    let data = {
        "username": username,
        "password": password,
        "page": page
    };
    await connectToServer(url, data, async (a) => {
        await console.log(a);
        document.querySelector(".app").remove();
        document.querySelector(".vm").innerHTML = a.build;
    }, error => console.log);
}