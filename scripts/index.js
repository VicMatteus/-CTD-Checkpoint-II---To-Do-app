const form = document.querySelector("#btn");
const senha = document.getElementById("inputPassword"); //pega o valor das informações do form
const email = document.getElementById("inputEmail");

form.onclick = (function (validar) {
  validar.preventDefault();

  if (email.value.trim() == "") {
    validar.preventDefault();     // verificar se o campo email está vazio
    alert("E-mail não informado");
    email.focus();    // Deixa o input com o focus
    return;      // retorna a função e não olha as outras linhas
  }
  if (senha.value.trim() == "") {
    validar.preventDefault();
    alert("Senha não informada");
    senha.focus();
    return;
  }

  const objeto =
  {
    email: email.value,
    password: senha.value
  }

  fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objeto)
  })
    .then(function (response) { return response.json() }) //json converte o objeto em java script
    .then(function (response) {
      localStorage.setItem("chave jwt", response.jwt) //a função irá receber como parametro a resposta do .then anterior e irá retornar a chave jwt e armazenar no computador do usúario através de localStore. 

      if (localStorage.getItem("chave jwt") == response.jwt) { //comparação das chave que salvei response.jwt com o localStorage
        return window.location.href = "tarefas.html" //manda o usuario para a página de login
      }
      else {
        alert("E-mail e/ou senha incorretos.")
      }
    })
});
