import mensagemTeste from "./debugger.js"

function codeRun() {
    function pageChecker() {
        const a = 1;
        if(a == 1) {
            mensagemTeste();
        } else {
            console.log("erro1");
        }
    }
    pageChecker();

    function anotherCheck() {
        const b = 2;
        if(b == 2) {
            mensagemTeste();
        } else {
            console.log("erro2");
        }
    }
    anotherCheck();
}
codeRun();