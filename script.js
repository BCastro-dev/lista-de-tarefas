// ====================================================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM (Document Object Model)
// Guardamos em variáveis as referências aos elementos HTML com os quais
// iremos interagir.
// ====================================================================
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskCount = document.getElementById('task-count');
const completedCount = document.getElementById('completed-count');

// ====================================================================
// 2. ESTADO DA APLICAÇÃO (Dados em memória)
// As tarefas são salvas em um array (lista) de objetos JavaScript.
// Cada tarefa tem o formato:
// {
//   id: 1712000000000,   // Número identificador único (timestamp)
//   text: "Minha tarefa", // Texto digitado pelo usuário
//   completed: false      // Se foi concluída ou não (booleano)
// }
// ====================================================================
let tasks = [];

// ====================================================================
// 3. PERSISTÊNCIA DE DADOS COM LOCALSTORAGE
// O LocalStorage é um recurso do navegador que permite guardar informações
// mesmo após fechar ou recarregar a página.
// ====================================================================

// Carrega as tarefas salvas no navegador
function loadTasks() {
  const savedTasks = localStorage.getItem('minhas_tarefas');
  if (savedTasks) {
    // Converte o texto JSON salvo de volta para um array de objetos
    tasks = JSON.parse(savedTasks);
  }
}

// Salva as tarefas atuais no navegador
function saveTasks() {
  // Converte nosso array de objetos para uma string no formato JSON
  localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

// ====================================================================
// 4. FUNÇÃO DE RENDERIZAÇÃO
// Esta função "desenha" a lista na tela de acordo com o array "tasks".
// Toda vez que adicionamos, concluímos ou removemos uma tarefa,
// chamamos esta função para atualizar a interface visual.
// ====================================================================
function renderTasks() {
  // Limpa o conteúdo HTML atual da lista para não duplicar itens
  taskList.innerHTML = '';

  // Exibe ou oculta a mensagem de lista vazia
  if (tasks.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  // ==================================================================
  // ORDENAÇÃO: Move as tarefas concluídas para o final da lista
  // Criamos uma cópia [...tasks] para não alterar a ordem dos dados originais
  // Se a tarefa estiver concluída (true), ela é enviada para baixo.
  // ==================================================================
  const sortedTasks = [...tasks].sort((a, b) => {
    // Se 'a' estiver concluída e 'b' estiver pendente, 'a' desce (+1)
    if (a.completed && !b.completed) return 1;
    // Se 'a' estiver pendente e 'b' concluída, 'a' sobe (-1)
    if (!a.completed && b.completed) return -1;
    // Se ambas têm o mesmo status, mantém a ordem original (0)
    return 0;
  });

  // Percorre a lista já ordenada para criar os elementos HTML
  sortedTasks.forEach((task) => {
    // 1. Cria o elemento <li> para a tarefa
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    // 2. Cria a área clicável que contém o checkbox e o texto
    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';
    // Ao clicar em qualquer parte desse bloco, alterna entre concluída/pendente
    contentDiv.addEventListener('click', () => {
      toggleTask(task.id);
    });

    // Caixa de verificação visual
    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';

    // Texto da atividade
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    // Junta checkbox e texto dentro da div de conteúdo
    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(textSpan);

    // 3. Cria o botão de deletar (ícone 'X')
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = 'Excluir atividade';
    deleteBtn.addEventListener('click', (event) => {
      // Impede que o clique no botão de excluir também acione o clique na tarefa
      event.stopPropagation();
      deleteTask(task.id);
    });

    // 4. Junta tudo dentro do elemento <li>
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    // 5. Insere o <li> na nossa lista <ul>
    taskList.appendChild(li);
  });

  // Atualiza os contadores no rodapé/resumo
  updateCounters();
}

// ====================================================================
// 5. FUNÇÕES DE AÇÃO (Lógica de Negócio)
// ====================================================================

// Adiciona uma nova tarefa à lista
function addTask(text) {
  const newTask = {
    // Identificador único (timestamp + número aleatório para evitar colisões)
    id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    text: text.trim(),
    completed: false
  };

  // Adiciona a nova tarefa no início ou no fim do array
  tasks.push(newTask);

  // Salva e atualiza a interface
  saveTasks();
  renderTasks();
}

// Alterna o status de concluído de uma tarefa específica
function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }
    return task;
  });

  // Salva e atualiza a interface
  saveTasks();
  renderTasks();
}

// Remove uma tarefa com base no seu ID
function deleteTask(id) {
  // Filtra mantendo apenas as tarefas que têm ID diferente do selecionado
  tasks = tasks.filter((task) => task.id !== id);

  // Salva e atualiza a interface
  saveTasks();
  renderTasks();
}

// Atualiza o resumo com a quantidade de tarefas
function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  taskCount.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'} no total`;
  completedCount.textContent = `${completed} concluída${completed === 1 ? '' : 's'}`;
}

// ====================================================================
// 6. EVENT LISTENERS (Escutadores de eventos do usuário)
// ====================================================================

// Ouve o envio do formulário (ao clicar no botão ou pressionar 'Enter')
taskForm.addEventListener('submit', (event) => {
  // Evita o comportamento padrão do navegador de recarregar a página
  event.preventDefault();

  const text = taskInput.value.trim();

  // Garante que não adicionamos tarefas vazias
  if (text !== '') {
    addTask(text);
    taskInput.value = ''; // Limpa o campo de entrada
    taskInput.focus();   // Mantém o cursor pronto para a próxima digitação
  }
});

// ====================================================================
// 7. INICIALIZAÇÃO
// Quando o script é carregado pela primeira vez, busca os dados salvos
// e renderiza a tela inicial.
// ====================================================================
loadTasks();
renderTasks();
