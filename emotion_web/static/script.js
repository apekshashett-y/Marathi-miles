const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const result = document.getElementById("result");
const ctx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream);

setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => {
        result.innerText = "Emotion: " + data.emotion;
    });
}, 1500);
