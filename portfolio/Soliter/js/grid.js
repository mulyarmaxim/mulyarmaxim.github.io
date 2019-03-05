class Grid {
  constructor(container, gridSize) {
    this.gridSize = gridSize;
    this.container = container;

    this.init();
  }

  static randomNumber(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  init() {
    this.createGrid();
    this.createGridMines();
    this.createGridNumbers();
  }

  createGrid() {
    this.table = document.createElement('table');

    for (let i = 0; i < this.gridSize.rowsCount; i++) {
      let tr = document.createElement('tr');

      for (let j = 0; j < this.gridSize.cellsCount; j++) {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.classList.add('cell');

        td.appendChild(button);
        tr.appendChild(td);
      }

      this.table.appendChild(tr);
    }

    this.container.appendChild(this.table);
  }

  createGridMines() {
    for (let i = 0; i < this.gridSize.mineCount; i++) {
      let rowIndex = Grid.randomNumber(0, this.gridSize.rowsCount - 1);
      let cellIndex = Grid.randomNumber(0, this.gridSize.cellsCount - 1);

      let currentElement = this.table.rows[rowIndex].cells[cellIndex].querySelector('button');

      if (currentElement.classList.contains('mine')) {
        i--;
        continue;
      }

      currentElement.classList.add('mine');
    }
  }

  createGridNumbers() {
    let rows = this.table.rows;

    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].cells;

      for (let j = 0; j < cells.length; j++) {
        let element = this.table.rows[i].cells[j];

        this.createNumber(element);
      }

    }

  }

  createNumber(element) {
    let button = element.querySelector('button');

    if (button.classList.contains('mine')) {
      return;
    }

    let count = 0;

    let neighboringElements = {
      top: this.checkElement(element, 'top'),
      right: this.checkElement(element, 'right'),
      bottom: this.checkElement(element, 'bottom'),
      left: this.checkElement(element, 'left'),
      'left-top': this.checkElement(element, 'left-top'),
      'right-top': this.checkElement(element, 'right-top'),
      'left-bottom': this.checkElement(element, 'left-bottom'),
      'right-bottom': this.checkElement(element, 'right-bottom')
    };

    for (let key in neighboringElements) {
       if (!neighboringElements[key]) {
         continue;
       }

       let currentButton = neighboringElements[key].querySelector('button');

       if (currentButton.classList.contains('mine')) {
         count++;
       }


    }

    if (count !== 0) {
      button.classList.add('number');
      button.innerHTML = count;
    }

  }

  checkElement(element, direction) {
    let rowIndex = element.parentNode.rowIndex;
    let cellIndex = element.cellIndex;

    let checkTopElement = function() {
      return rowIndex === 0;
    }.bind(this);

    let checkRightElement = function() {
      return cellIndex === this.gridSize.cellsCount - 1;
    }.bind(this);

    let checkBottomElement = function() {
      return rowIndex === this.gridSize.rowsCount - 1;
    }.bind(this);

    let checkLeftElement = function() {
      return cellIndex === 0;
    }.bind(this);

    switch(direction) {
      case 'top':
            if ( checkTopElement() ) {
              return null;
            } else {
              return this.table.rows[rowIndex - 1].cells[cellIndex];
            }
      case 'right':
            if ( checkRightElement() ) {
              return null;
            } else {
              return this.table.rows[rowIndex].cells[cellIndex + 1]
            }
      case 'bottom':
            if ( checkBottomElement() ) {
              return null;
            } else {
              return this.table.rows[rowIndex + 1].cells[cellIndex];
            }
      case 'left':
            if ( checkLeftElement() ) {
              return null;
            } else {
              return this.table.rows[rowIndex].cells[cellIndex - 1];
            }
      case 'left-top':
            if ( checkLeftElement() || checkTopElement() ) {
              return null;
            } else {
              return this.table.rows[rowIndex - 1].cells[cellIndex - 1];
            }
      case 'right-top':
            if ( checkRightElement() || checkTopElement() ) {
              return null
            } else {
              return this.table.rows[rowIndex - 1].cells[cellIndex + 1];
            }
      case 'left-bottom':
            if ( checkLeftElement() || checkBottomElement() ) {
              return null
            } else {
              return this.table.rows[rowIndex + 1].cells[cellIndex - 1];
            }
      case 'right-bottom':
            if ( checkRightElement() || checkBottomElement() ) {
              return null;
            } else {
              return this.table.rows[rowIndex + 1].cells[cellIndex + 1];
            }
    }

  }

  showAllCells() {
    let cells = this.container.querySelectorAll('button');
    Array.from(cells);

    cells.forEach(function(item) {
      item.classList.remove('cell');
    })

  }

  clearContainer() {
    this.container.innerHTML = '';
  }

}