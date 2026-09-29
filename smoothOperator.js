import mensagemTeste from "./debugger.js";

function codeRun() {
    function checarPagina() {

        const ordemServico = document.querySelector("");

        if(ordemServico !== null || undefined) {
            ordemServico.click();
        } else {
            return false;
        }
    }
    checarPagina();
    
    function caixaServico() {

        const servicoTitulo = document.querySelector("");

        if(servicoTitulo !== null || undefined) {
            return true;
        } else {
            return false;
        }
    }
    caixaServico();

    function pegarDados() {

        const id = document.querySelector("");
        const diagnostico = document.querySelector("");
        
        localStorage.setItem("ID", JSON.stringify(id));
        localStorage.setItem("DIAGNÓSTICO", JSON.stringify(diagnostico));


    }

    function estruturaParametro() {

        const estrutura = document.querySelector("");
        
        if(estrutura !== 'cliente') {
            return false;
        } else {
            
        }
    }
    parametros();
}
codeRun();