const URL = "https://teachablemachine.withgoogle.com/models/RdnseH8co/";

let model, webcam, maxPredictions;

const startButton = document.getElementById("start-button");
const webcamContainer = document.getElementById("webcam-container");
const resultContainer = document.getElementById("result-container");
const messageContainer = document.getElementById("message-container");
const countdownEl = document.getElementById("countdown");
const resultEmoji = document.getElementById("result-emoji");
const shareContainer = document.getElementById("share-container");
const retryButton = document.getElementById("retry-button");
const shareTwitter = document.getElementById("share-twitter");
const shareCopy = document.getElementById("share-copy");

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

let lastResult = "";

startButton.addEventListener("click", init);
retryButton.addEventListener("click", retry);
shareTwitter.addEventListener("click", shareToTwitter);
shareCopy.addEventListener("click", copyLink);

async function init() {
    startButton.textContent = "로딩 중...";
    startButton.disabled = true;
    shareContainer.style.display = "none";
    resultEmoji.textContent = "";
    resultEmoji.className = "";
    messageContainer.textContent = "";
    messageContainer.className = "";

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

    // Countdown 3, 2, 1
    for (let sec = 3; sec >= 1; sec--) {
        countdownEl.textContent = sec;
        countdownEl.className = "active";
        await sleep(800);
        countdownEl.className = "";
        await sleep(200);
    }
    countdownEl.style.display = "none";

    messageContainer.textContent = "분석 중...";
    messageContainer.className = "";

    const startTime = Date.now();
    let bestClass = "";
    let bestProb = 0;
    let bestPrediction = null;

    await new Promise((resolve) => {
        async function loop() {
            if (Date.now() - startTime >= 3000) {
                resolve();
                return;
            }
            webcam.update();
            const prediction = await model.predict(webcam.canvas);

            for (let i = 0; i < maxPredictions; i++) {
                const className = prediction[i].className;
                const probability = prediction[i].probability;
                const percent = (probability * 100).toFixed(1);

                const label = document.getElementById("label-" + i);
                const bar = document.getElementById("bar-" + i);

                label.textContent = className + ": " + percent + "%";
                bar.style.width = percent + "%";

                if (isDogClass(className)) {
                    bar.style.backgroundColor = "#f59e0b";
                } else {
                    bar.style.backgroundColor = "#8b5cf6";
                }

                if (probability > bestProb) {
                    bestProb = probability;
                    bestClass = className;
                    bestPrediction = prediction;
                }
            }

            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);
    });

    webcam.stop();

    // Show final result
    if (bestPrediction) {
        for (let i = 0; i < maxPredictions; i++) {
            const className = bestPrediction[i].className;
            const percent = (bestPrediction[i].probability * 100).toFixed(1);
            const label = document.getElementById("label-" + i);
            const bar = document.getElementById("bar-" + i);
            label.textContent = className + ": " + percent + "%";
            bar.style.width = percent + "%";
        }
    }

    const isDog = isDogClass(bestClass);
    const messages = isDog ? dogMessages : catMessages;
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    resultEmoji.textContent = isDog ? "🐶" : "🐱";
    resultEmoji.className = "show";
    messageContainer.textContent = randomMsg;
    messageContainer.className = isDog ? "result-dog" : "result-cat";
    lastResult = isDog ? "강아지상" : "고양이상";

    shareContainer.style.display = "block";
}

function retry() {
    // Remove old webcam canvas
    const canvas = webcamContainer.querySelector("canvas");
    if (canvas) canvas.remove();

    countdownEl.style.display = "";
    countdownEl.className = "";
    countdownEl.textContent = "";
    resultContainer.innerHTML = "";
    resultEmoji.textContent = "";
    resultEmoji.className = "";
    messageContainer.textContent = "";
    messageContainer.className = "";
    shareContainer.style.display = "none";
    startButton.style.display = "";
    startButton.textContent = "다시 테스트하기";
    startButton.disabled = false;
}

function shareToTwitter() {
    const text = "AI 동물상 테스트 결과: 나는 " + lastResult + "! 너도 해봐!";
    const url = window.location.href;
    window.open(
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url),
        "_blank"
    );
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        shareCopy.textContent = "복사 완료!";
        setTimeout(() => { shareCopy.textContent = "링크 복사"; }, 2000);
    });
}

function isDogClass(name) {
    const lower = name.toLowerCase();
    return lower.includes("강아지") || lower.includes("dog");
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
