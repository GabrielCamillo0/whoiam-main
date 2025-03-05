document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded fired. Iniciando animação de loading.");
    const loadingScreen = document.getElementById("loading-screen");
    const loadingText = document.getElementById("loading-text");
    let progress = 0;
    const intervalTime = 10; // tempo em milissegundos
  
    const intervalId = setInterval(() => {
      progress++;
      if (loadingText) {
        loadingText.textContent = progress + "%";
      }
      if (progress >= 100) {
        clearInterval(intervalId);
        console.log("Loading completo. Iniciando fade-out.");
        if (loadingScreen) {
          loadingScreen.style.transition = "opacity 0.5s ease-out";
          loadingScreen.style.opacity = "0";
          setTimeout(() => {
            loadingScreen.style.display = "none";
            console.log("Tela de loading removida.");
          }, 500);
        }
      }
    }, intervalTime);
  });
  