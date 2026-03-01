/**
 * Neon Maze - Canvas background effect (otimizado para carregamento rápido)
 */
(function () {
  var canvas = document.getElementById("mazeCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var t = 0;
  var cellScale = 24;  /* células maiores = menos formas = mais performance */
  var trailOpacity = 0.03;  /* trail um pouco mais forte = menos redesenho percebido */

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function draw() {
    var s = Math.min(canvas.width, canvas.height) / cellScale;
    var g = Math.ceil(canvas.width / s) + 4;
    var h = Math.ceil(canvas.height / (s * 0.5)) + 4;
    var w = canvas.width / 2;
    var v = canvas.height / 2;

    for (var y = -h; y <= h; y += 1) {
      for (var i = -g; i <= g; i += 1) {
        var p = w + ((i - y) * s) / 2;
        var q = v + ((i + y) * s) / 4;
        var m = Math.sqrt(i * i + y * y);
        var n = Math.sqrt(g * g + h * h);
        var e = 1 - m / n;
        var f = s * e * Math.abs(Math.sin(m * 0.5 + t));

        ctx.beginPath();
        ctx.moveTo(p, q - f);
        ctx.lineTo(p + s / 2, q - s / 2 - f);
        ctx.lineTo(p + s, q - f);
        ctx.lineTo(p + s, q);
        ctx.lineTo(p + s / 2, q + s / 2);
        ctx.lineTo(p, q);
        ctx.closePath();

        var gradient = ctx.createLinearGradient(p, q - f, p + s, q);
        gradient.addColorStop(0, "rgba(156,39,176,0.8)");
        gradient.addColorStop(1, "rgba(0,255,255,0.8)");
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,0,0.5)";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p, q);
        ctx.lineTo(p, q - f);
        ctx.moveTo(p + s, q);
        ctx.lineTo(p + s, q - f);
        ctx.moveTo(p + s / 2, q + s / 2);
        ctx.lineTo(p + s / 2, q - s / 2 - f);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0," + trailOpacity + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
    t += 0.012;
    requestAnimationFrame(animate);
  }

  function init() {
    resizeCanvas();
    animate();
  }

  /* Inicia assim que o DOM estiver pronto, sem esperar imagens/iframes */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", resizeCanvas);
})();
