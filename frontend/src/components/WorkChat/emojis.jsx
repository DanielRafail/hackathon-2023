import React, { useEffect, useRef } from 'react';

const FallingEmojis = () => {
  const containerRef = useRef(null);
  const emojis = ['🌽', '🍇', '🍌', '🍒', '🍕', '🍷', '🍭', '💖', '💩', '🐷', '🐸', '🐳', '🎃', '🎾', '🌈', '🍦', '💁', '🔥', '😁', '😱', '🌴', '👏', '💃'];
  let circles = [];

  useEffect(() => {
    for (let i = 10; i < 15; i++) {
      addCircle(i * 150, [400 + 0, 100], emojis[Math.floor(Math.random() * emojis.length)]);
      addCircle(i * 150, [400 + 0, -100], emojis[Math.floor(Math.random() * emojis.length)]);
      addCircle(i * 150, [400 - 200, -100], emojis[Math.floor(Math.random() * emojis.length)]);
      addCircle(i * 150, [400 + 200, 100], emojis[Math.floor(Math.random() * emojis.length)]);
    }

    function addCircle(delay, range, color) {
      setTimeout(function () {
        let c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
          x: -0.15 + Math.random() * 0.3,
          y: 1 + Math.random() * 1
        }, range);
        circles.push(c);
      }, delay);
    }
    function Circle(x, y, c, v, range) {
      this.x = x;
      this.y = y;
      this.color = c;
      this.v = v;
      this.range = range;
      this.element = document.createElement('span');
      this.element.style.opacity = 0;
      this.element.style.position = 'absolute';
      this.element.style.fontSize = '26px';
      this.element.style.color = `hsl(${Math.random() * 360 | 0},80%,50%)`;
      this.element.innerHTML = c;
      containerRef.current.appendChild(this.element);
      this.update = function () {
        let emojiX = this.x + this.element.offsetLeft;
        let emojiY = this.y + this.element.offsetTop;
        let container = document.querySelector("#discord-container");
        let containerX = container.offsetLeft;
        let containerY = container.offsetTop;
        let containerWidth = container.offsetWidth;
        let containerHeight = container.offsetHeight;

        if (emojiX < containerX || emojiX > containerX + containerWidth || emojiY < containerY || emojiY > containerY + containerHeight) {
          this.element.style.visibility = "hidden";
        } else {
          this.element.style.visibility = "visible";
        }
        if (this.y > 800) {
          this.y = 80 + Math.random() * 4;
          this.x = this.range[0] + Math.random() * this.range[1];
        }
        this.y += this.v.y;
        this.x += this.v.x;
        this.element.style.opacity = 1;
        this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
        this.element.style.webkitTransform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
        this.element.style.mozTransform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
      }
    }
    function animate() {
      for (let i in circles) {
        circles[i].update();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div id="animate" ref={containerRef} />
  );
};

export default FallingEmojis;