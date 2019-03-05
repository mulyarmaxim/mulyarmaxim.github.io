;(function() {
    let navigation = document.querySelector('.navigation');
    let buttons = document.querySelectorAll('.navigation__button');
    let slides = document.querySelectorAll('.slide');
    let mainBlock = document.querySelector('.main');
    let flag = false;

    navigation.onclick = function(e) {
        let target = e.target;

        function init(target) {
            if (target.classList.contains('navigation__button--active') || flag) {
                return;
            }

            flag = true;
            let previousIndex = navigation.querySelector('.navigation__button--active').dataset.index;
            let index = target.dataset.index;

            animateHidden(previousIndex);

            setTimeout(deleteActiveClass, 950);

            setTimeout(animateShow, 950, index);

            setTimeout(addActiveClass, 950, index);

            setTimeout(resetAnimateStyle, 1950);

            setTimeout(() => {flag = false}, 2000);
        }

        function deleteActiveClass() {

            for (let i = 0; i < 3; i++) {
                buttons[i].classList.remove('navigation__button--active');
                slides[i].classList.remove('slide--active');
            }

        }

        function addActiveClass(index) {

            buttons[index].classList.add('navigation__button--active');
            slides[index].classList.add('slide--active');

        }

        function animateHidden(previousIndex) {
            mainBlock.classList.add('main--animate');
            slides[previousIndex].style = 'animation-name: hidden;';
        }

        function animateShow(index) {
            slides[index].style = 'animation-name: show;';
        }

        function resetAnimateStyle() {

            for (let i = 0; i < 3; i++) {
                slides[i].style = '';
            }

            mainBlock.classList.remove('main--animate');

        }

        while (target.tagName !== 'NAV') {
            if (target.tagName === 'BUTTON') {
                init(target);
                return;
            }
            target = target.parentNode;
        }

    }
})();