class Particle {
    constructor(opt) {
      this.number = opt.number || 100;
      this.colors = this.handleArrayParams(opt.colors) || ['#400606', '#c7b4aa', '#ffffff'];
      this.width = opt.width || 15;
      this.height = opt.height || 7;
      this.duration = opt.duration || 3000;
      this.delay = opt.delay || 100;
    }
    handleArrayParams(arr) {
      return Array.isArray(arr) && arr.length > 0 && arr.every(el => el[0] === '#') ? arr : false;
    }
    getRandom(max, min = 0) {
      min = Math.ceil(min);
      max = Math.floor(max + 1);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    getRange(num, range = 0.5) {
      const symbol = Math.random() > 0.5 ? +1 : -1;
      return num + this.getRandom(Math.floor(num * range)) * symbol;
    }
    start() {
      for (let i = 0; i < this.number; i++) {
        const temp = document.createElement('span');
        temp.style.cssText += `
          position: absolute;
          transform-style: preserve-3d;
          animation-timing-function: cubic-bezier(${this.getRandom(3) * 0.1}, 0, 1, 1);
          animation-iteration-count: infinite;
          width: ${this.getRange(this.width, 0.7)}px;
          height: ${this.getRange(this.height, 0.7)}px;
          top: -${this.width * 2}px;
          left: calc(${this.getRandom(100)}% - ${this.width * 0.5}px);
          background-color: ${this.colors[this.getRandom(this.colors.length - 1)]};
          animation-name: fallen_${this.getRandom(5, 1)};
          animation-duration: ${this.getRange(this.duration)}ms;
          animation-delay: ${this.getRange(this.delay)}ms;
         `;
        document.getElementById("particle").append(temp);
      };
    }}
  
  
  
  
  const party = new Particle({ number: 300, colors: ['#ffca76', '#ffb9b9', '#fff180'] });
  party.start();