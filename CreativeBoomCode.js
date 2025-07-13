const Eyes = () => {

  const leftEyeCentreX = 14;
  const rightEyeCentreX = 40;
  const eyeCentreY = 15;
  const eyeBallOffset = 4.5;

  // Keep a track of the current mouse position
  let mouseX = document.body.clientWidth / 2;
  let mouseY = document.body.clientHeight / 2;
  document.addEventListener('mousemove', function(ev) {
    mouseX = ev.clientX;
    mouseY = ev.clientY;
  });

  function initEyes(containerEl) {

    var canvas = document.createElement('canvas');
    if (!isCanvasSupported(canvas)) return;
    canvas.classList.add('masthead__eyes');
    canvas.width = 60;
    canvas.height = 30;
    containerEl.appendChild(canvas);
    rescaleCanvas(canvas);

    // Add in hat logo
    //var hat = document.createElement('img');
    //var ts = Math.floor(Date.now() / 1000);
    //hat.src = '/assets/front/img/eyes/santa-hat.svg';
    //hat.classList.add('masthead__hat');
    //logoContainer.appendChild(hat);
    // Done Hat logo

    function calculateLookAtMobile() {
      let lookAtY = 300;

      const totalHeight = window.innerHeight;
      const totalWidth = window.innerWidth;
      const scrollY = window.scrollY;
      const damping = .3;
      const scrollProportion = scrollY / totalHeight;

      const lookAtX = (totalWidth / 2) * Math.sin(scrollProportion * 2 * Math.PI * damping);
      return [lookAtX, lookAtY];
    }

    function drawEyes() {

      if (window.innerWidth && window.innerWidth <= 1024) {
        var lookAt = calculateLookAtMobile();
        lookAtX = lookAt[0];
        lookAtY = lookAt[1];
      } else {
        var lookAtX = mouseX;
        var lookAtY = mouseY;
      }

      if (lookAtX && lookAtY) {

        var canvasRect = canvas.getBoundingClientRect();
        var documentLeftEyeCentreX = canvasRect.left + leftEyeCentreX;
        var documentRightEyeCentreX = canvasRect.left + rightEyeCentreX;
        var documentEyeCentreY = canvasRect.top + eyeCentreY;


        // Clear the canvas
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Left eye
        let diffX = lookAtX - documentLeftEyeCentreX;
        let diffY = lookAtY - documentEyeCentreY;
        let angle = Math.atan2(diffY, diffX);
        drawEyeBall(ctx, leftEyeCentreX, eyeCentreY, angle);

        // Right eye
        diffX = lookAtX - documentRightEyeCentreX;
        diffY = lookAtY - documentEyeCentreY;
        angle = Math.atan2(diffY, diffX);
        drawEyeBall(ctx, rightEyeCentreX, eyeCentreY, angle);

      }

      window.requestAnimationFrame(drawEyes);

    }

    window.requestAnimationFrame(drawEyes);

  }

  // Initialise the eyes
  const containerEls = document.querySelectorAll("[data-eyes]")
  for(let i = 0; i < containerEls.length; i++) {
    initEyes(containerEls[i]);
  }

  function rescaleCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      var oldWidth = canvas.width;
      var oldHeight = canvas.height;
      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + 'px';
      canvas.style.height = oldHeight + 'px';
      ctx.scale(ratio, ratio);
    }
  }

  function isCanvasSupported(el) {
    return !!(el.getContext && el.getContext('2d'));
  }

  function drawEyeBall(ctx, centreX, centreY, angle) {
    var eyeBallCentreX = eyeBallOffset * Math.cos(angle) + centreX;
    var eyeBallCentreY = eyeBallOffset * Math.sin(angle) + centreY;

    // Draw the outer eye, with a scale to make it slightly oval
    ctx.save()
    ctx.scale(0.92, 1);
    ctx.beginPath();
    ctx.arc(centreX, centreY, 12, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centreX, centreY, 8.5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(eyeBallCentreX, eyeBallCentreY, 4.5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.restore();
  }




};

export default Eyes;
