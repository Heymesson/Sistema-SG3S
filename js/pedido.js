document.getElementById('form_pedido').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cliente = document.getElementById('lista_cliente').value;
    const produto = document.getElementById('nome_produto').value;
    const quantidade = document.getElementById('qtd_prod_pedido').value;
    const pagamento = document.getElementById('forma_pagamento').value;
    const valorTotal = document.getElementById('valor_total').value;
    const observacoes = document.getElementById('observacoes').value;

    // Exibir informações do pedido finalizado
    const pedidoInfo = document.getElementById('pedido_info');
    pedidoInfo.innerHTML = `
        <li><strong>Cliente:</strong> ${cliente}</li>
        <li><strong>Produto:</strong> ${produto}</li>
        <li><strong>Quantidade:</strong> ${quantidade}</li>
        <li><strong>Forma de Pagamento:</strong> ${pagamento}</li>
        <li><strong>Valor Total:</strong> ${valorTotal}</li>
        <li><strong>Observações:</strong> ${observacoes}</li>
    `;
    document.getElementById('pedido_finalizado').style.display = 'block';
});

// Botões de ação
document.getElementById('alterar_pedido').addEventListener('click', function() {
    alert("Alterando pedido...");
});

document.getElementById('cancelar_pedido').addEventListener('click', function() {
    document.getElementById('pedido_finalizado').style.display = 'none';
    alert("Pedido cancelado.");
});

document.getElementById('imprimir_pedido').addEventListener('click', function() {
    window.print();
});
