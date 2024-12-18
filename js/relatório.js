document.addEventListener("DOMContentLoaded", function () {
    const valorVenda = document.getElementById('valor_venda');
    const valorCompra = document.getElementById('valor_compra');
    const valorRecebido = document.getElementById('valor_recebido');

    function mascaraValor(input) {
        input.addEventListener("input", function () {
            let valor = input.value.replace(/\D/g, "");
            valor = (valor / 100).toFixed(2) + "";
            valor = valor.replace(".", ",");
            valor = valor.replace(/(\d)(\d{3})(\d{1,2}$)/, "$1.$2,$3");
            input.value = valor;
        });
    }

    mascaraValor(valorVenda);
    mascaraValor(valorCompra);
    mascaraValor(valorRecebido);
});

// Validação do formulário ao enviar
document.getElementById('form_geracao_relatorio').addEventListener('submit', function (e) {
    e.preventDefault();
    // Validar campos obrigatórios
    let valid = true;
    this.querySelectorAll('input[required], select[required]').forEach(function (input) {
        if (!input.value) {
            input.classList.add('is-invalid');
            valid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (valid) {
        // Processar o envio do formulário
    }
});