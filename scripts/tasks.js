const obterUsuario = a =>
{
    //=> função (arrow function)

    const userName = document.querySelector('.user-name')
    // Chamada para getMe
    // O primeiro argumento é o endereço completo da API, no caso users/getMe é para obter as informações do usuário
    // Sempre enviamos a informação do Content-type para o servidor entender o tipo de informação que enviamos (uma string em formato JSON)
    // Para informações privadas (ou seja, que só um usuario autenticado pode acessar) precisamo informar o JWT (no authorization do header)
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', {
        headers: {
            'Content-type': 'application/json',
            authorization: a //a = parametro
        }
    })
        // O primeiro retorno é um objeto resposta, para acessar o valor da resposta (os dados) precisamos pedir para transformar a resposta em um objeto
        .then(resposta => resposta.json())
        // O segundo retorno obtem a resposta em formato JSON
        // Em seguida buscamos o elemento na tela e anexamos o valor (nome + sobrenome)
        .then(usuario =>
        {
            userName.innerText = `${usuario.firstName} ${usuario.lastName}` //inserindo os dados firsName e lastName dentro do elemento userName
        })
}

// Obtem um valor que está guardado no navegador do usuário
const chave = localStorage.getItem('chave jwt')

// Executa a função passando como argumento o JWT
obterUsuario(chave) //chave vai substituir o parametro a do authorization

const btn = document.getElementById('closeApp')

btn.onclick = function ()
{
    //estou registrando uma função quando o evento "event" acontecer

    localStorage.clear()
    window.location.href = 'index.html'
}

function marcarConcluída(tarefaID)
{
    
}

window.onload = function ()
{
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: chave
        }
    })
        .then(resposta => resposta.json())
        .then(tarefas =>
        {
            const tasks = document.querySelector('.tarefas-pendentes')
            tasks.innerHTML="";
            tarefas.forEach(tarefa =>
            {
                const li = document.createElement('li')
                const div1 = document.createElement('div')
                const descricao = document.createElement('div')

                const button = document.createElement('button');
                button.classList.add('not-done');
                button.addEventListener('click', function(){
                    console.log('Concluída');
                    marcarConcluída(tarefa.id)
                })

                const p1 = document.createElement('p')
                const p2 = document.createElement('p')
                const description = document.createTextNode(tarefa.description)
                let data = new Date(tarefa.createdAt)
                let dataFormatada = 'Criada em: ' + data.toLocaleDateString('pt-BR')
                const dataNode = document.createTextNode(dataFormatada)
                
                p1.appendChild(description)
                p2.appendChild(dataNode)
                descricao.appendChild(p1)
                descricao.appendChild(p2)
                
                li.classList.add('tarefa')
                descricao.classList.add('descricao')
                p1.classList.add('nome')
                p2.classList.add('timestamp')
                
                li.appendChild(button)
                li.appendChild(div1)
                li.appendChild(descricao)
                tasks.appendChild(li)

                console.log(tarefa.description)
            })
        })
}

const form = document.querySelector('#submit')

form.addEventListener('click', function (event)
{
    const atividade = {
        description: document.querySelector('#novaTarefa').value,
        completed: false
    }
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: chave
        },
        body: JSON.stringify(atividade)
    })
        .then(response => response.json())
        .then(novaTarefa =>
        {
            const li = document.createElement('li')
            const div1 = document.createElement('div')
            const descricao = document.createElement('div');
//botão pra marcar como concluído
            const button = document.createElement('button');
            button.classList.add('not-done');

            const p1 = document.createElement('p')
            const p2 = document.createElement('p')
            const description = document.createTextNode(novaTarefa.description)
            const createdAt = document.createTextNode(novaTarefa.createdAt)
            p1.appendChild(description)
            p2.appendChild(createdAt)
            descricao.appendChild(p1)
            descricao.appendChild(p2)
            div1.appendChild(button)
            //div1.classList.add('not-done')
            li.classList.add('tarefa')
            descricao.classList.add('descricao')
            p1.classList.add('nome')
            p2.classList.add('timestamp')
            li.appendChild(div1)
            li.appendChild(descricao)
            tasks.appendChild(li)

            // let notDone = document.querySelector('button.not-done');
            // notDone.onclick = function ()
            button.addEventListener('click', function(){
                console.log('clicoiu');
                alert("alou")
            })

            console.log(novaTarefa)
        })
})

