let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits");
let kbSpeed = document.getElementById("kbs");
let mbSpeed = document.getElementById("mbs");
let info = document.getElementById("info");
let resultTxt = document.getElementById("result-txt");
const btnReset = document.getElementById("btn-reset");
const imageTest = document.getElementById("image");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 8;
let testCompleted = 0;

//Obtem uma imagem aleatoria do unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

//Quando a imagem carregar
image.onload = async function () {
    endTime = new Date().getTime();

    //Obtem o tamanho da imagem
    await fetch(imageApi).then((res) => {
        imageSize = res.headers.get("content-length");
        calculateSpeed();
    });
};

//Função para calcular a velocidade
function calculateSpeed() {
    //Pegar o tempo em segundos
    let TimeDuration = (endTime - startTime) / 1000;
    //Bits totais
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / TimeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    //Se todos os testes forem completados (Obtem 5 imagens então calcula a média)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        //Mostra a velocidade média
        console.log(`
        Velocidade em Bits:  ${averageSpeedInBps}
        Velocidade em Kbs:  ${averageSpeedInKbps}
        Velocidade em Mbs:  ${averageSpeedInMbps}`)

        if (averageSpeedInMbps >= 0.80) {
            resultTxt.innerHTML = `${averageSpeedInMbps} Mbs`;
        } else if (averageSpeedInKbps <= 799 && averageSpeedInKbps >= 0.01) {
            resultTxt.innerHTML = `${averageSpeedInKbps} Kbs`;
        } else {
            resultTxt.innerHTML = `${averageSpeedInBps} Bits`;
        }

        info.style.opacity = 1;
        info.innerHTML = "Teste Completo!";
        imageTest.src = "images/f_test.gif";
        btnReset.style.opacity = 1;
        btnReset.innerHTML = "Refazer Teste"
    } else {
        //Executa o próximo teste
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

btnReset.addEventListener("click", () => {
    window.location.reload(true);
})

//Função parar iniciar o teste
const init = async () => {
    resultTxt.innerHTML = "Testando...";
    startTime = new Date().getTime();
    image.src = imageApi;
    imageTest.src = "images/test.gif";
};

//Executa o teste quando a janela é carregada
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};