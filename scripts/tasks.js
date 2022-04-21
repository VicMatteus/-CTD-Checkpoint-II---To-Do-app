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

function excluir(task)
{
    show("exlcuir");
    settings = {
        "method": "DELETE",
        "headers": {
            "authorization": chave
        }
    }
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${task.id}`, settings)
        .then(resposta => resposta.json())
        .then(informacao => 
        {
            alert(informacao);
            carregarTarefas();
        })
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
            let pendentes = querySelector('.tarefas-pendentes');
            let terminadas = querySelector('.tarefas-terminadas');
            pendentes.innerHTML = "";
            terminadas.innerHTML = "";
            tarefas.forEach(tarefa =>
            {
                if (tarefa.completed)
                {
                    let data = new Date(tarefa.createdAt)
                    let dataFormatada = data.toLocaleDateString('pt-BR')

                    let li = document.createElement('li');
                    li.classList.add("tarefa");

                    let item = `
                        <div class="concluida"></div>
                        <div class="descricao">
                            <p class="nome">${tarefa.description}</p>
                            <p class="timestamp">Criada em: ${dataFormatada}</p>
                        </div>`
                    
                    template = document.createElement('template');
                    template.innerHTML = item;
                    
                    li.appendChild(template.content);

                    let excluirBtn = document.createElement('button');
                    excluirBtn.classList.add('excluir');
                    excluirBtn.innerText = 'Excluir'
                    excluirBtn.addEventListener('click', function ()
                    {
                        excluir(tarefa);
                    });
                    li.appendChild(excluirBtn);
                    terminadas.appendChild(li)
                }
                else
                {
                    let data = new Date(tarefa.createdAt);
                    let dataFormatada = data.toLocaleDateString('pt-BR');

                    let li = document.createElement('li');
                    li.classList.add("tarefa");
                    let not_done = document.createElement('div');
                    not_done.classList.add('not-done');
                    not_done.addEventListener('click', () => marcarConcluida(tarefa));

                    li.append(not_done);
                    let task = `<div class="descricao">
                            <p class="nome">${tarefa.description}</p>
                            <p class="timestamp">Criada em: ${dataFormatada}</p>
                        </div>`
                    template = document.createElement('template');
                    template.innerHTML = task;
                    li.appendChild(template.content)
                    /*
                    essa é uma jogada bacana tirada daqui: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
                    */
                    let excluirBtn = document.createElement('button');
                    excluirBtn.classList.add('excluir');
                    excluirBtn.innerText = 'Excluir'
                    excluirBtn.addEventListener('click', function ()
                    {
                        excluir(tarefa);
                    });
                    li.appendChild(excluirBtn);
                    pendentes.appendChild(li);
                }
            })
        })
}

const botaoCriar = getId('btnEnvia')
botaoCriar.addEventListener('click', function (event) //inflizmente, com submit não funciona bem.
{
    const descricao = getId('novaTarefa').value;
    if (descricao) //uso de truthy e falsy
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
            .then(response =>
            {
                return response.json()
            })
            .then(novaTarefa =>
            {
                //Aqui, o problema de apenas criar uma tarefa por login estava no botão. Não sei o motivo ainda.
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

