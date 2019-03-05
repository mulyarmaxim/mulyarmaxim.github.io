class Game {
  constructor(container, complexity) {
    this.container = container;
    this._flagCount = 0;
    this.complexity = complexity;
    this.grid = new Grid(this.container, complexity);
    this.winPopup = document.querySelector('.popup-victory');
    this.loosePopup = document.querySelector('.popup-loose');

    this.init();
  }

  init() {
    this.grid.clearContainer();

    this._flagCount = 0;
    this.grid = new Grid(this.container, this.complexity);
  }

  handleContainerOnclick(event) {
    let target = event.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    if (target.classList.contains('flag')) {
      return false;

    } else if (target.classList.contains('mine')
               &&  !target.classList.contains('flag')) {

      this.loose();

    } else if (target.classList.contains('number')) {

      target.classList.remove('cell');

    } else {

      target.classList.remove('cell');

    }
  }

  handleContainerContextmenu(event) {
    event.preventDefault();
    let target = event.target;

    if (target.classList.contains('cell')) {
      this.setFlag(target);
    }

    this.win();
  }

  win() {
    let count = this.complexity.mineCount;
    let trueFlag = this.container.querySelectorAll('.mine.flag').length;

    if (count === trueFlag) {
      this.winPopup.style.display = 'block';
      this.grid.showAllCells();
      setTimeout(() => {
        this.winPopup.style.display = 'none';
      }, 2000);
    }
  }

  loose() {
    this.grid.showAllCells();

    this.loosePopup.style.display = 'block';

    setTimeout( () => {
      this.loosePopup.style.display = 'none';
    }, 2000);
  }

  setFlag(element) {
    console.log(this.complexity);
    let flagCount = this.container.querySelectorAll('.flag').length;

    if (flagCount === this.complexity.mineCount
        && !element.classList.contains('flag')) {
      return false;
    } else {
      element.classList.toggle('flag');
    }
  }
}