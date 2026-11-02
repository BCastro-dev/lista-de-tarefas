# 📝 Minha Lista de Tarefas (To-Do List)

Um projeto simples, moderno e didático para quem está dando os primeiros passos no desenvolvimento web!

---

## 🚀 Como executar este projeto

Você **não precisa instalar nada** para rodar este projeto. Ele foi desenvolvido com tecnologias web nativas.

1. Navegue até a pasta onde este projeto está salvo:
   `c:\Users\Pichau\Downloads\lista-de-tarefas`
2. Dê **dois cliques** no arquivo **`index.html`** (ou clique com o botão direito e escolha "Abrir com" e selecione seu navegador favorito, como Google Chrome, Firefox, Edge, etc.).
3. Pronto! A aplicação já estará em funcionamento.

---

## 🧩 Os Três Componentes do Projeto

Para quem está começando a aprender desenvolvimento de software, os pilares da web funcionam em harmonia:

| Arquivo | Tecnologia | Papel no Projeto | Analogia |
|---|---|---|---|
| **`index.html`** | HTML5 | **Estrutura e Conteúdo**: Define os textos, formulário, campo de digitação, botões e listas. | O *esqueleto* do corpo humano |
| **`style.css`** | CSS3 | **Aparência e Design**: Define as cores, fontes, espaçamentos, sombras e a sensação visual. | As *roupas e estilo* |
| **`script.js`** | JavaScript | **Comportamento e Lógica**: Faz os botões funcionarem, adiciona, risca e remove tarefas, além de salvar no navegador. | Os *músculos e o cérebro* |

---

## 💡 Principais Conceitos Aprendidos Neste Código

Ao abrir e ler o arquivo `script.js`, você verá exemplos práticos dos conceitos fundamentais de programação:

1. **Manipulação do DOM (Document Object Model):**
   - Usamos comandos como `document.getElementById` e `document.createElement` para que o JavaScript converse diretamente com a página HTML.
2. **Manipulação de Arrays (Listas):**
   - As tarefas são armazenadas em uma lista (`tasks = []`).
   - Usamos métodos modernos como:
     - `.push()` para adicionar itens.
     - `.map()` para atualizar o status (concluído/não concluído).
     - `.filter()` para excluir tarefas.
3. **Escutadores de Eventos (`addEventListener`):**
   - Fazem a página reagir a ações do usuário, como cliques do mouse ou o ato de apertar **Enter**.
4. **Persistência de Dados (`localStorage`):**
   - As tarefas não somem quando você fecha ou atualiza a página! Elas ficam guardadas no armazenamento local do seu próprio navegador.

---

## 🎯 Desafios para praticar (Próximos Passos)

Se você quiser continuar aprendendo, tente adicionar estas funcionalidades por conta própria:

- [ ] **Filtros visuais:** Adicionar botões para mostrar "Todas", "Apenas Pendentes" ou "Apenas Concluídas".
- [ ] **Limpar todas:** Adicionar um botão no rodapé que apague todas as tarefas concluídas de uma vez.
- [ ] **Edição:** Permitir que o usuário dê dois cliques no texto de uma tarefa para editá-la.
