document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tabelaUsuarios = document.getElementById("tabela_usuarios");
    const corpoTabela = tabelaUsuarios.querySelector("tbody");
    const mensagemVazia = document.getElementById("mensagem_vazia");
    const btnVerTodos = document.querySelector("button.btn-success:nth-child(2)");

    // Lista de usuários
    let usuarios = [];

    // Exibir a tabela ao clicar no botão "Ver Todos"
    btnVerTodos.addEventListener("click", () => {
        tabelaUsuarios.classList.remove("hidden");
    });

    // Função para atualizar a tabela
    const atualizarTabela = () => {
        corpoTabela.innerHTML = "";

        if (usuarios.length === 0) {
            corpoTabela.appendChild(mensagemVazia);
        } else {
            usuarios.forEach((usuario, index) => {
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td>${usuario.tipo === "1" ? "Administrador" : "Vendedor"}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" data-index="${index}" onclick="editarUsuario(${index})">Alterar</button>
                        <button class="btn btn-danger btn-sm" data-index="${index}" onclick="excluirUsuario(${index})">Excluir</button>
                    </td>`;
                corpoTabela.appendChild(linha);
            });
        }
    };
    // Função para cadastrar um novo usuário
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // 

        const nome = document.getElementById("nome_usuario").value;
        const tipo = document.getElementById("tipo_usuario").value;
        const email = document.getElementById("email_usuario").value;
        const senha = document.getElementById("senha_usuario").value;
        const confirmaSenha = document.getElementById("confirma_senha_usuario").value;

        if (senha !== confirmaSenha) {
            alert("As senhas não coincidem!");
            return;
        }
''
        usuarios.push({ nome, tipo, email });

        // Resetar o formulário
        form.reset();
        document.querySelector(".btn-close").click(); // Fechar modal

        // Atualizar tabela e exibir mensagem de sucesso
        atualizarTabela();
        alert("Usuário cadastrado com sucesso!");
    });
    
    // Função para excluir um usuário
    window.excluirUsuario = (index) => {
        if (confirm("Tem certeza que deseja excluir este usuário?")) {
            usuarios.splice(index, 1);
            atualizarTabela();
        }
    };

    // Função para editar um usuário
    window.editarUsuario = (index) => {
        const usuario = usuarios[index];

        document.getElementById("nome_usuario").value = usuario.nome;
        document.getElementById("tipo_usuario").value = usuario.tipo;
        document.getElementById("email_usuario").value = usuario.email;

        // Abrir o modal de edição
        const modal = new bootstrap.Modal(document.getElementById("modal_usuario"));
        modal.show();

        // Atualizar o usuário ao salvar
        form.onsubmit = (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome_usuario").value;
            const tipo = document.getElementById("tipo_usuario").value;
            const email = document.getElementById("email_usuario").value;

            usuarios[index] = { nome, tipo, email };

            form.reset();
            modal.hide();

            atualizarTabela();
            alert("Usuário alterado com sucesso!");

            // Restaurar o comportamento padrão do formulário
            form.onsubmit = null;
        };
    };

    atualizarTabela();
});
