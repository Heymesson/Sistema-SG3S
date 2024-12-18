// Array para armazenar os clientes
let clientes = [];

// Seleção dos elementos da página
const btnCadastrarCliente = document.getElementById("cadastrar_cliente");
const btnVerTodos = document.getElementById("ver_todos");
const listaContainer = document.getElementById("lista-container");
const btnFecharSucesso = document.getElementById("btnFecharSucesso");

// Função para exibir uma mensagem de sucesso na modal
function mostrarMensagemSucesso(mensagem) {
    const mensagemElemento = document.getElementById("mensagemSucesso");
    mensagemElemento.textContent = mensagem;

    const modal = new bootstrap.Modal(document.getElementById("modalSucesso"));
    modal.show();
}

// Event listener para fechar o modal de sucesso corretamente
btnFecharSucesso.addEventListener("click", () => {
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalSucesso"));
    modal.hide();
});

// Função para atualizar a tabela de clientes
function atualizarTabela() {
    if (clientes.length === 0) {
        listaContainer.innerHTML = "<p class='text-center'>Nenhum cliente cadastrado.</p>";
        return;
    }
    let tabelaHTML = `<table class='table table-striped'>
        <thead>
            <tr>
                <th>Nome do Responsável</th>
                <th>Razão Social</th>
                <th>Nome Fantasia</th>
                <th>CNPJ</th>
                <th>Telefone</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>`;
    clientes.forEach((cliente, index) => {
        tabelaHTML += `<tr>
            <td>${cliente.nomeResponsavel}</td>
            <td>${cliente.razaoSocial}</td>
            <td>${cliente.nomeFantasia}</td>
            <td>${cliente.cnpj}</td>
            <td>${cliente.telefoneCelular}</td>
            <td>
                <button class='btn btn-warning btn-sm' onclick='editarCliente(${index})'>Alterar</button>
                <button class='btn btn-danger btn-sm' onclick='excluirCliente(${index})'>Excluir</button>
            </td>
        </tr>`;
    });
    tabelaHTML += "</tbody></table>";
    listaContainer.innerHTML = tabelaHTML;
}

// Função para cadastrar cliente
btnCadastrarCliente.addEventListener("click", () => {
    const nomeResponsavel = document.getElementById("nome_resp").value;
    const razaoSocial = document.getElementById("nome_soc").value;
    const nomeFantasia = document.getElementById("nome_fan").value;
    const rg = document.getElementById("rg").value;
    const cnpj = document.getElementById("cnpj").value;
    const telefoneFixo = document.getElementById("tel_fixo").value;
    const telefoneCelular = document.getElementById("tel_celular").value;
    const inscricaoEstadual = document.getElementById("insc_estadual").value;
    const email = document.getElementById("email").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const bairro = document.getElementById("bairro").value;
    const cep = document.getElementById("cep").value;
    const complemento = document.getElementById("complemento").value;

    // Adicionar cliente ao array
    clientes.push({
        nomeResponsavel,
        razaoSocial,
        nomeFantasia,
        rg,
        cnpj,
        telefoneFixo,
        telefoneCelular,
        inscricaoEstadual,
        email,
        cidade,
        estado,
        bairro,
        cep,
        complemento
    });

    // Mostrar a mensagem de sucesso
    mostrarMensagemSucesso("Cliente cadastrado com sucesso!");

    // Resetar o formulário
    document.querySelector("form").reset();

    // Fechar a modal de cadastro
    const modal = bootstrap.Modal.getInstance(document.getElementById("modal_cliente"));
    modal.hide(); 
});

// Função para exibir a tabela ao clicar em "Ver Todos"
btnVerTodos.addEventListener("click", () => {
    atualizarTabela();
});

// Função para editar cliente
function editarCliente(index) {
    const cliente = clientes[index];

    document.getElementById("nome_resp").value = cliente.nomeResponsavel;
    document.getElementById("nome_soc").value = cliente.razaoSocial;
    document.getElementById("nome_fan").value = cliente.nomeFantasia;
    document.getElementById("rg").value = cliente.rg;
    document.getElementById("cnpj").value = cliente.cnpj;
    document.getElementById("tel_fixo").value = cliente.telefoneFixo;
    document.getElementById("tel_celular").value = cliente.telefoneCelular;
    document.getElementById("insc_estadual").value = cliente.inscricaoEstadual;
    document.getElementById("email").value = cliente.email;
    document.getElementById("cidade").value = cliente.cidade;
    document.getElementById("estado").value = cliente.estado;
    document.getElementById("bairro").value = cliente.bairro;
    document.getElementById("cep").value = cliente.cep;
    document.getElementById("complemento").value = cliente.complemento;

    const modal = new bootstrap.Modal(document.getElementById("modal_cliente"));
    modal.show();

    btnCadastrarCliente.removeEventListener("click", adicionarCliente);
    btnCadastrarCliente.addEventListener("click", () => {
        clientes[index] = {
            nomeResponsavel: document.getElementById("nome_resp").value,
            razaoSocial: document.getElementById("nome_soc").value,
            nomeFantasia: document.getElementById("nome_fan").value,
            rg: document.getElementById("rg").value,
            cnpj: document.getElementById("cnpj").value,
            telefoneFixo: document.getElementById("tel_fixo").value,
            telefoneCelular: document.getElementById("tel_celular").value,
            inscricaoEstadual: document.getElementById("insc_estadual").value,
            email: document.getElementById("email").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            bairro: document.getElementById("bairro").value,
            cep: document.getElementById("cep").value,
            complemento: document.getElementById("complemento").value
        };
        mostrarMensagemSucesso("Cliente alterado com sucesso!");
        atualizarTabela();
        modal.hide();
    });
}

// Função para excluir cliente
function excluirCliente(index) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        clientes.splice(index, 1);
        mostrarMensagemSucesso("Cliente excluído com sucesso!");
        atualizarTabela();
    }
}

// Função para validar o formulário
function validarFormulario() {
    let camposValidos = true;

    // Verifica campos obrigatórios
    document.querySelectorAll("#formCadastro [required]").forEach((campo) => {
        if (!campo.value.trim()) {
            campo.classList.add("is-invalid"); // Adiciona classe de erro
            camposValidos = false;
        } else {
            campo.classList.remove("is-invalid"); // Remove classe de erro
        }
    });

    return camposValidos;
}

// Máscaras de entrada com IMask
// Máscaras de entrada com InputMask
document.addEventListener("DOMContentLoaded", () => {
    // Inicialize as máscaras nos campos
    const campos = {
        rg: IMask(document.getElementById("rg"), { mask: "000000000" }),
        cnpj: IMask(document.getElementById("cnpj"), { mask: "00.000.000/0000-00" }),
        tel_fixo: IMask(document.getElementById("tel_fixo"), { mask: "(00) 0000-0000" }),
        tel_celular: IMask(document.getElementById("tel_celular"), { mask: "(00) 00000-0000" }),
        cep: IMask(document.getElementById("cep"), { mask: "00000-000" }),
    };

    // Teste no console para verificar inicialização
    console.log("Máscaras inicializadas:", campos);
});
