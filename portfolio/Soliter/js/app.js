class App {
  constructor() {
    this.startButton = document.querySelector('.start-game');
    this.mainContainer = document.querySelector('#container');
    this.complexityContainer = document.querySelector('.complexity');

    this._complexity = {
      easy: {
        rowsCount: 8,
        cellsCount: 8,
        mineCount: 10
      },
      middle: {
        rowsCount: 16,
        cellsCount: 16,
        mineCount: 40
      },
      hard: {
        rowsCount: 16,
        cellsCount: 30,
        mineCount: 99
      }
    };

    this.init();
  }

  init() {
    this.startButton.addEventListener('click', this.start.bind(this));
    this.complexityContainer.addEventListener('click', this.setComplexityActiveClass.bind(this));

    this.game = new Game(this.mainContainer, this.getComplexity());

    this.mainContainer.onclick = this.game.handleContainerOnclick.bind(this.game);
    this.mainContainer.oncontextmenu = this.game.handleContainerContextmenu.bind(this.game);
  }

  start() {
    this.game = new Game(this.mainContainer, this.getComplexity());

    this.mainContainer.onclick = this.game.handleContainerOnclick.bind(this.game);
    this.mainContainer.oncontextmenu = this.game.handleContainerContextmenu.bind(this.game);
  }

  setComplexityActiveClass(event) {
    let buttons = this.complexityContainer.querySelectorAll('button');
    let currentElement = event.target;

    if (currentElement.tagName !== 'BUTTON') {
      return false;
    }

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('complexity__item--active');
    }

    currentElement.classList.add('complexity__item--active');
  }

  getComplexity() {
    let currentElement = document.querySelector('.complexity__item--active');

    return this._complexity[currentElement.dataset.complexity];
  }

}
