const form = document.querySelector("#btn");

         const nome = document.querySelector("#nome");
         const sobrenome = document.querySelector("#sobrenome");
         const email = document.querySelector("#email");
         const senha = document.querySelector("#senha");
         const repetirSenha = document.querySelector("#repetirSenha");

form.onclick = (function (event) { //estou registrando uma função quando o evento "event" acontecer
    event.preventDefault();

        if (nome.value.trim() == "") {
             event.preventDefault();
             alert("Informe seu nome");
             nome.focus(); //define o foco no elemento especificado
             return;
         }
         if (sobrenome.value.trim() == "") {
             event.preventDefault();
             alert("Informe seu sobrenome");
             sobrenome.focus();
             return;
         }
         if (email.value.trim() == "") {
             event.preventDefault();
             alert("Informe um email válido");
             email.focus();
             return;
         }
         if (senha.value.trim() == "") {
             event.preventDefault();
             alert("Informe uma senha");
             senha.focus();
             return;
         }
        if (repetirSenha.value.trim() !== senha.value.trim()) {
            event.preventDefault();
            alert("A senha nãe é igual");
            repetirSenha.focus();
            return;
        }
        else {

        const objeto =
        {
            firstName: nome.value,
            lastName: sobrenome.value,
            email: email.value,
            password: senha.value
        }

        fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objeto)
        })
            .then(function (response) { return response.json() }) //json converte o objeto em java script
            .then(function (response) {localStorage.setItem("jwt", response.jwt) //a função irá receber como parametro a resposta do .then anterior e irá retornar a chave jwt e armazenar no computador do usúario através de localStore. 
                
                if (localStorage.getItem("jwt") == response.jwt) { //comparação das chave que salvei response.jwt com o localStorage
                    return window.location.href = "tarefas.html" //manda o usuario para a página de login
                }
                else {
                    alert ("Usuario já existe")
                }
            })
        
        }
});