//Funções longas que vou chamar direto, então vou reduzir seus tamanhos
querySelector = (seletor) => document.querySelector(seletor);
getId = (id) => document.getElementById(id);
show = (msg) => console.log(msg);

const obterUsuario = chave =>
{
    const userName = document.querySelector('.user-name')
    // Chamada para getMe
    // O primeiro argumento é o endereço completo da API, no caso users/getMe é para obter as informações do usuário
    // Sempre enviamos a informação do Content-type para o servidor entender o tipo de informação que enviamos (uma string em formato JSON)
    // Para informações privadas (ou seja, que só um usuario autenticado pode acessar) precisamo informar o JWT (no authorization do header)
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', {
        headers: {
            'Content-type': 'application/json',
            authorization: chave //a = parametro
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

const chave = localStorage.getItem('jwt');

obterUsuario(chave);

const btnDeslogar = getId('closeApp');
btnDeslogar.onclick = function ()
{
    localStorage.clear();
    window.location.href = 'index.html';
}

function marcarConcluida(tarefa)
{
    let body = {
        "description": tarefa.description,
        "completed": true
    }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            authorization: chave,
        },
        body: JSON.stringify(body)
    })
        .then(resposta => resposta.json())
        .then(tarefaAtualizada =>
        {
            carregarTarefas();
        });
}

window.onload = carregarTarefas();
function carregarTarefas()
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
            const tasks = querySelector('.tarefas-pendentes')
            //setTimeout(() => {
                tasks.innerHTML="";
                tarefas.forEach(tarefa =>
                {
                    if(tarefa.completed)
                    {
                        let data = new Date(tarefa.createdAt)
                        let dataFormatada = data.toLocaleDateString('pt-BR')
                        let task = `
                        <li class="tarefa">
                            <div class="concluida"></div>
                            <div class="descricao">
                            <p class="nome">${tarefa.description}</p>
                            <p class="timestamp">Criada em: ${dataFormatada}</p>
                            </div>
                        </li>`
                        let terminadas = querySelector('.tarefas-terminadas');
                        terminadas.innerHTML += task;
                    }
                    else
                    {
                        /*Assim eu não consigui adicionar a funcionalidade de cada item ter seu botão atrelado a propria tarefa :/
                        let pendentes = querySelector('.tarefas-pendentes');
                        let data = new Date(tarefa.createdAt);
                        let dataFormatada = data.toLocaleDateString('pt-BR');
                        let task = `
                        <li class="tarefa">
                        <button class="not-done"></button>
                        <div class="descricao">
                            <p class="nome">${tarefa.description}</p>
                            <p class="timestamp">Criada em: ${dataFormatada}</p>
                        </div>
                        </li>`
                        pendentes.innerHTML += task;
                        */
                       const li = document.createElement('li')
                       const descricao = document.createElement('div')
   
                       const button = document.createElement('button');
                       button.classList.add('not-done');
                       button.addEventListener('click', function(){
                           show('Concluída');
                           marcarConcluida(tarefa);
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
   
                       li.appendChild(descricao)
                       tasks.appendChild(li)
                    }
                    show(tarefa.description)
                })
                /*
                funciona
                //ativa o gatilho da ação ao clicar no item de marcar concluida
                botaoMarcar = querySelectorAll('button');
                for(const botao of botaoMarcar)
                {
                    show('botao');
                    botao.addEventListener('click', function ()
                    {
                        marcarConcluida(tarefa)
                    })
                }
                */
                
            //}, 1000);
            })
}

const botaoCriar = getId('btnEnvia')
botaoCriar.addEventListener('click', function (event)
{
    const descricao = getId('novaTarefa').value;
    if(descricao) //uso de truthy e falsy
    {
        const body = {
            description: descricao,
            completed: false
        };
        fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: chave
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json()
            })
            .then(novaTarefa =>
            {
                getId('novaTarefa').value = '';
                carregarTarefas();
            })
    }
    else
    {
        event.preventDefault(); 
        //ficará melhor quando eu alertar direto pelo estilo no HTML
        alert('insira um nome válido para a tarefa');
    }

})

