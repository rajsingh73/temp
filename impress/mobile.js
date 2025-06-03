 let highestZ = 1;
  class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    currentX = 0;
    currentY = 0;
    prevX = 0;
    prevY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
      const updatePosition = () => {
        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      };

      const start = (x, y) => {
        this.holdingPaper = true;
        this.touchStartX = x;
        this.touchStartY = y;
        this.prevX = x;
        this.prevY = y;
        paper.style.zIndex = highestZ++;
      };

      const move = (x, y) => {
        if (!this.holdingPaper) return;
        this.velX = x - this.prevX;
        this.velY = y - this.prevY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevX = x;
        this.prevY = y;

        updatePosition();
      };

      const end = () => {
        this.holdingPaper = false;
      };

      // Mouse events for desktop
      paper.addEventListener('mousedown', e => start(e.clientX, e.clientY));
      window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
      window.addEventListener('mouseup', end);

      // Touch events for mobile
      paper.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        start(touch.clientX, touch.clientY);
      }, { passive: true });

      window.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        move(touch.clientX, touch.clientY);
      }, { passive: true });

      window.addEventListener('touchend', end);

      // Initialize position and rotation
      updatePosition();
    }
  }
  const papers = Array.from(document.querySelectorAll('.paper'));
  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
