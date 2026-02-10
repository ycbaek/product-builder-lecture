const URL = "https://teachablemachine.withgoogle.com/models/RdnseH8co/";

let model, webcam, maxPredictions;

const startButton = document.getElementById("start-button");
const webcamContainer = document.getElementById("webcam-container");
const resultContainer = document.getElementById("result-container");
const messageContainer = document.getElementById("message-container");

const dogMessages = [
    "충성! 당신은 강아지상이에요! 🐶",
    "꼬리 흔드는 강아지처럼 밝은 에너지가 느껴져요!",
    "사람들이 당신 곁에 있으면 행복해해요, 강아지상!",
];

const catMessages = [
    "도도한 매력! 당신은 고양이상이에요! 🐱",
    "신비로운 눈빛, 당신은 타고난 고양이상!",
    "쿨하고 세련된 매력의 고양이상이시네요!",
];

startButton.addEventListener("click", init);

async function init() {
    startButton.textContent = "로딩 중...";
    startButton.disabled = true;

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const flip = true;
    const tempWebcam = new tmImage.Webcam(300, 300, flip);

    const [loadedModel] = await Promise.all([
        tmImage.load(modelURL, metadataURL),
        tempWebcam.setup().then(() => tempWebcam.play()),
    ]);

    model = loadedModel;
    webcam = tempWebcam;
    maxPredictions = model.getTotalClasses();

    startButton.style.display = "none";
    webcamContainer.appendChild(webcam.canvas);

    resultContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        const barWrapper = document.createElement("div");
        barWrapper.classList.add("bar-wrapper");

        const label = document.createElement("span");
        label.classList.add("bar-label");
        label.id = "label-" + i;

        const barBg = document.createElement("div");
        barBg.classList.add("bar-bg");

        const barFill = document.createElement("div");
        barFill.classList.add("bar-fill");
        barFill.id = "bar-" + i;

        barBg.appendChild(barFill);
        barWrapper.appendChild(label);
        barWrapper.appendChild(barBg);
        resultContainer.appendChild(barWrapper);
    }

    window.requestAnimationFrame(loop);
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);

    let topClass = "";
    let topProb = 0;

    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className;
        const probability = prediction[i].probability;
        const percent = (probability * 100).toFixed(1);

        const label = document.getElementById("label-" + i);
        const bar = document.getElementById("bar-" + i);

        label.textContent = className + ": " + percent + "%";
        bar.style.width = percent + "%";

        if (className.toLowerCase().includes("강아지") || className.toLowerCase().includes("dog")) {
            bar.style.backgroundColor = "#f59e0b";
        } else {
            bar.style.backgroundColor = "#8b5cf6";
        }

        if (probability > topProb) {
            topProb = probability;
            topClass = className;
        }
    }

    if (topProb > 0.7) {
        const isDog = topClass.toLowerCase().includes("강아지") || topClass.toLowerCase().includes("dog");
        const messages = isDog ? dogMessages : catMessages;
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        messageContainer.textContent = randomMsg;
        messageContainer.className = isDog ? "result-dog" : "result-cat";
    } else {
        messageContainer.textContent = "조금 더 정면을 바라봐 주세요...";
        messageContainer.className = "";
    }
}
