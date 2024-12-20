let myNodelist = document.getElementsByTagName("li");

for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7"); //caracter x
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

let list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function addElemento() {
    let inputValue = document.getElementById("tarefa").value;

    if (inputValue === '') {
        alert("Você precisa descrever a tarefa");
        return;
    }

    let id = Date.now().toString();
    criarElementoTarefa(id, inputValue);
    salvarTarefa(id, inputValue);

    document.getElementById("tarefa").value = "";
    
}

function alterarFonteLista() {
    let listaItens = document.getElementsByTagName("li");
    for (let i = 0; i < listaItens.length; i++) {
        listaItens[i].style.fontFamily = "Arial, sans-serif"; // Define a fonte
        listaItens[i].style.fontSize = "22px"; // Ajusta o tamanho da fonte
    }
}

function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; // Recupera ou inicializa vazio
    tarefas.forEach(tarefa => {
        criarElementoTarefa(tarefa.id, tarefa.descricao); // Cria a tarefa na lista
    });
}

function criarElementoTarefa(id, descricao) {
    let li = document.createElement("li");
    li.setAttribute("data-id", id); 
    let t = document.createTextNode(descricao);
    li.appendChild(t);
    li.style.backgroundColor = "#FFD700";


    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);


    span.onclick = function () {
        let div = this.parentElement;
        let id = div.getAttribute("data-id"); 
        div.style.display = "none"; 
        excluirTarefa(id); 
    };

    document.getElementById("itemLista").appendChild(li);
}

function salvarTarefa(id, descricao) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push({ id, descricao });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function excluirTarefa(id) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefas.filter(tarefa => tarefa.id !== id); 
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

window.onload = carregarTarefas;