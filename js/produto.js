document.addEventListener("DOMContentLoaded", function () {
    const formCadastroProduto = document.getElementById('form_cadastro_produto');
    const modalProduto = new bootstrap.Modal(document.getElementById('modal_produto'));
    const listaProdutosDiv = document.getElementById('lista_produtos');
    const verTodosBtn = document.getElementById('ver_todos');
    let produtos = [];
    let isListaVisible = false;

    // Inicialmente esconde a lista de produtos
    listaProdutosDiv.classList.add('hidden');

    // Atualizando campos de cadastro para aceitar números quebrados
    const custoCompraInput = document.getElementById('custo_compra');
    const valorVendaInput = document.getElementById('valor_venda');
    const percentualImpostosInput = document.getElementById('percentual_impostos');

    custoCompraInput.setAttribute('type', 'number');
    valorVendaInput.setAttribute('type', 'number');
    percentualImpostosInput.setAttribute('type', 'number');
    custoCompraInput.setAttribute('type', 'numeric');
    valorVendaInput.setAttribute('type', 'numeric');
    percentualImpostosInput.setAttribute('type', 'numeric');

    // Evento de submit do formulário
    formCadastroProduto.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coletar os dados do formulário
        const nomeProduto = document.getElementById('nome_produto').value;
        const tipoProduto = document.getElementById('tipo_produto').value;
        const cor = document.getElementById('cor').value;
        const composicao = document.getElementById('composicao').value;
        const largura = document.getElementById('largura').value;
        const fornecedor = document.getElementById('fornecedor').value;
        const custoCompra = parseFloat(document.getElementById('custo_compra').value);
        const dataCompra = document.getElementById('data_compra').value;
        const valorVenda = parseFloat(document.getElementById('valor_venda').value);
        const percentualImpostos = parseFloat(document.getElementById('percentual_impostos').value);
        const quantidade = parseInt(document.getElementById('quantidade').value); // Agora pegando a quantidade

        // Criar o objeto do produto
        const produto = {
            nome: nomeProduto,
            tipo: tipoProduto,
            cor: cor,
            composicao: composicao,
            largura: largura,
            fornecedor: fornecedor,
            custoCompra: custoCompra,
            dataCompra: dataCompra,
            valorVenda: valorVenda,
            percentualImpostos: percentualImpostos,
            quantidade: quantidade
        };

        // Adicionar o produto ao array
        produtos.push(produto);

        // Limpar o formulário após o cadastro
        formCadastroProduto.reset();

        // Fechar o modal de cadastro
        modalProduto.hide();

        // Atualizar a lista de produtos
        atualizarListaProdutos();
    });

    // Evento do botão "Ver Todos" para alternar a exibição da lista
    verTodosBtn.addEventListener('click', function () {
        if (!isListaVisible) {
            listaProdutosDiv.classList.remove('hidden');
            verTodosBtn.textContent = 'Ocultar Lista';
        } else {
            listaProdutosDiv.classList.add('hidden');
            verTodosBtn.textContent = 'Ver Todos';
        }
        isListaVisible = !isListaVisible;
    });

    // Atualizar e renderizar a lista de produtos
    function atualizarListaProdutos() {
        listaProdutosDiv.innerHTML = ''; // Limpar a lista antes de exibir os produtos
        if (produtos.length === 0) {
            listaProdutosDiv.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        } else {
            const ul = document.createElement('ul');
            ul.classList.add('list-group');
            produtos.forEach((produto, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `
                    <strong>${produto.nome}</strong><br>
                    Cor: ${produto.cor}<br>
                    Quantidade: ${produto.quantidade}<br>
                    Valor para Venda: R$ ${produto.valorVenda.toFixed(2)}<br>
                    <button class="btn btn-primary btn-sm mt-2" onclick="editarProduto(${index})">Alterar</button>
                    <button class="btn btn-danger btn-sm mt-2 ml-2" onclick="excluirProduto(${index})">Excluir</button>
                `;
                ul.appendChild(li);
            });
            listaProdutosDiv.appendChild(ul);
        }
    }

    // Função para editar um produto
    window.editarProduto = function (index) {
        const produto = produtos[index];
        
        // Preencher o formulário com os dados do produto
        document.getElementById('nome_produto').value = produto.nome;
        document.getElementById('tipo_produto').value = produto.tipo;
        document.getElementById('cor').value = produto.cor;
        document.getElementById('quantidade').value = produto.quantidade;
        document.getElementById('valor_venda').value = produto.valorVenda;

        // Alterar o comportamento do botão de edição
        const submitBtn = document.getElementById('submit_btn');
        submitBtn.textContent = 'Salvar Alterações';
        submitBtn.onclick = function (e) {
            e.preventDefault();

            // Atualizar os dados do produto
            produto.nome = document.getElementById('nome_produto').value;
            produto.tipo = document.getElementById('tipo_produto').value;
            produto.cor = document.getElementById('cor').value;
            produto.quantidade = parseInt(document.getElementById('quantidade').value);
            produto.valorVenda = parseFloat(document.getElementById('valor_venda').value);

            // Atualizar a lista de produtos
            atualizarListaProdutos();

            // Fechar o modal
            modalProduto.hide();

            // Resetar o botão de submit
            submitBtn.textContent = 'Cadastrar Produto';
            submitBtn.onclick = cadastrarProduto;
        };

        modalProduto.show(); // Show modal
    };

    // Função para excluir um produto
    window.excluirProduto = function (index) {
        produtos.splice(index, 1); // Remove o produto do array
        atualizarListaProdutos(); // Atualiza a lista
    };
});

// Adicione máscaras usando IMask
$(document).ready(function () {
    // Máscara para o campo "Custo de Compra" (R$)
    $('#custo_compra').mask('R$ 0.000,00' );

    // Máscara para o campo "Valor de Venda" (R$)
    $('#valor_venda').mask('R$ 0.000,00' );

    // Máscara para o campo "Percentual de Impostos" (%)
    $('#percentual_impostos').mask('0,00%');

    // Máscara para o campo "Largura"
    $('#largura').mask('0.00');

    // Máscara para o campo "Quantidade" 
    $('#quantidade').mask('0.000');
});

