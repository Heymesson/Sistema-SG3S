function validarLogin() {
    // Captura os valores dos campos de usuário e senha
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Verifica as credenciais
    if (usuario === "adm" && senha === "123") {
      // Redireciona para o index do administrador
        window.location.href = "index.html";
    } else {
      // Redireciona para o index do vendedor
        window.location.href = "index_vend.html";
    }
}