// menu

fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-placeholder').innerHTML = data;
        });


// mouse curser


 const canvas = document.getElementById("trail");
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const maxParticles = 40;
    let mouse = { x: w/2, y: h/2 };

    document.addEventListener("mousemove", e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      spawnParticles();
    });

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.life = Math.random() * 40 + 30;
        this.age = 0;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.hue = Math.random() * 360; // rainbow colors
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.age++;
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${1 - this.age/this.life})`;
        ctx.arc(this.x, this.y, Math.max(0, this.size*(1 - this.age/this.life)), 0, Math.PI*2);
        ctx.fill();
      }
    }

    function spawnParticles() {
      for (let i = 0; i < 3; i++) {
        if (particles.length < maxParticles) {
          particles.push(new Particle(mouse.x, mouse.y));
        } else {
          particles.shift();
          particles.push(new Particle(mouse.x, mouse.y));
        }
      }
    }

    function animate() {
      ctx.clearRect(0,0,w,h);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.age > p.life) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    animate();