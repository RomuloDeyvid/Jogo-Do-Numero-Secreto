let tentativas = 1;
let listaNumerosSorteados = []
let numeroLimite = 100
let numeroSecreto = geraNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 0 e 100.');
}


function verificarChute() {
    let chute = document.querySelector('input').value
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou o número secreto');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor')
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior')
        }
        limparCampo()
    } tentativas++

}

// Para gerar o número aleatório ele é atribuido a uma variavel, e uma variavell pra armazenar a quantidade de elementos. Se essa quantidade chegar ao limite, a lista é resetada. Se o número já estiver sido sorteado a função volta ao começo. Se não tiver sido sorteado antes, ela adiciona a lista de números sorteados e retorna o valor da função.

function geraNumeroAleatorio() {
    let numeroEscolhido= parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaNumerosSorteados = []
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return geraNumeroAleatorio()
    } else{
        listaNumerosSorteados.push(numeroEscolhido)
        console.log(listaNumerosSorteados)
        return numeroEscolhido
    }


}
function limparCampo() {
    chute = document.querySelector('input')
    chute.value = ''
}
function reiniciarJogo() {
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

exibirMensagemInicial()