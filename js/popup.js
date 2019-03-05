;(function() {
    let main = document.querySelector('.main');

    function createIFrame(name) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('iframe__wrapper');

        let iFrame = document.createElement('iframe');
        iFrame.src = 'portfolio/' + name + '/index.html';

        let button = document.createElement('button');
        wrapper.appendChild(button);

        wrapper.appendChild(iFrame);

        return wrapper;
    }

    function removeIFrame(iframe) {
        iframe.classList.add('iframe__hidden');
        setTimeout( () => {
            document.body.removeChild(iframe);
        }, 480 );
    }

    main.onclick = function(e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        let iframe = createIFrame(e.target.dataset.name);
        let closeButton = iframe.querySelector('button');

        document.body.appendChild(iframe);
        window.scrollTo(0, 0);
        closeButton.onclick = function(e) {
            removeIFrame(iframe);
        }
    }
})();