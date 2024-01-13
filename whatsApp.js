const nomes = [];
const numero = [];




class Loader {
    constructor() {
        this.btn = document.querySelector("button");
        this.audio = document.querySelector("audio");
        this.loader = document.createElement("div");
        this.criaLoader();

    }

    criaLoader() {
        this.loader.setAttribute("class", "loader")
    }

    carregando() {
        this.loader.classList.remove("send");
        this.loader.innerText = "";
        this.loader.classList.add("loader");
        this.btn.parentElement.appendChild(this.loader);
        this.btn.remove();
        const g = this.gerator();
        g.next().done;
        setTimeout(() => {
            console.log(this.btn);
            this.loader.parentElement.appendChild(this.btn);
            this.loader.remove();
        }, 3500)
    }
    *gerator() {
        yield setTimeout(() => {
            this.loader.classList.remove("loader");
            this.loader.classList.add("send");
            this.loader.innerText = "SEND";
            this.audio.play();
        }, 1500);


    }

}


class Ids {
    constructor() {
        this.allRegister = [...document.querySelectorAll("input")];
        this.forms();

    }

    forms() {
        this.userId = document.querySelector(".user_token_id");
        this.instanceId = document.querySelector(".instance_id");
        this.instanceToken = document.querySelector(".instance_token");
        this.npoit = document.querySelector(".npoit");
        this.message = document.querySelector(".message");
    }
    tester() {
        return this.testEmpty();
    }

    testEmpty() {
        const removido = this.allRegister.map((e) => {
            e.removeAttribute("placeholder");
            e.previousElementSibling.style.animation = "";
            return e
        });
        const valid = removido.reduce((acumulador, valor) => {
            if (valor.value === "") {
                this.error(valor, "VAZIO");
                return acumulador += 1;
            }
            return acumulador += 0;
        }, 0)
        if (valid > 0) return false;
        return true;
    }

    error(campo, msg) {
        campo.setAttribute("placeholder", msg);
        campo.focus();
        campo.previousElementSibling.style.animation = "alert 1s infinite";
    }

    get() {
        return this.userId.value;
    }
    get() {
        return this.instanceId.value;
    }
    get() {
        return this.instanceToken.value;
    }
    get() {
        return this.npoit.value;
    }
    get() {
        return this.message.value;
    }

}

class EnviaMensagem {
    constructor() {
        this.carregar = new Loader();
        this.event();
    }


    async values() {
        const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message"

        if ((id.tester())) {
            this.carregar.carregando();
            for (let t in nomes) {
                const response = await fetch(GZAPPY_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'user_token_id': id.user_token_id.value,
                    },
                    body: JSON.stringify({
                        instance_id: id.instanceId.value,
                        instance_token: id.instanceToken.value,
                        message: [nomes[t], id.message.value],
                        phone: numero[t] + ""
                    })
                })

                const data = await response.json()

                console.log(data);
            }
        }
        { msg: 'Messages sent' }
    }

    async submit() {
        await this.values();
    }



    event() {
        const btn = document.querySelector("button");
        btn.addEventListener("click", (e) => {
           this.submit();

        })
    }
}

class Learquiv {
    constructor() {
        this.lendo();
    }


    lendo() {

        const xmlhttp = new XMLHttpRequest();
            
            xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let myObj = JSON.parse(this.responseText);
                console.log(myObj);
                for (let chave in myObj.usuarios) {
                    nomes.push(myObj.usuarios[chave].nome);
                    numero.push(myObj.usuarios[chave].numero);

                }
            }
        };
        xmlhttp.open("GET", id.npoit.value, true);
        xmlhttp.send();
    }
}
const id = new Ids();
const le = new Learquiv();
const envia = new EnviaMensagem();


