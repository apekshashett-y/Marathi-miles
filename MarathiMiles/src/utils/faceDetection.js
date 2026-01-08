export async function detectEmotionFromBackend(imageBase64) {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image: imageBase64
    })
  });

  const data = await response.json();
  return data.emotion;
}
