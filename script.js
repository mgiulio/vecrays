if (!isSecureContext)
    console.warn('This page is not running in a secute context. Serve it via HTTPS.');

if ('paintWorklet' in CSS)
    init();
else
    console.warn('The CSS Paint API is not supported, using the fallback image');

    function init() {
    let defaults = {
        startAlpha: 1.00,
        endAlpha: 0.01,
        numRays: 10
    };

    let 
        root = document.documentElement
        ,gui = document.body.querySelector('#gui')
        ,numRaysSlider = gui.querySelector('#num-rays')
        ,startAlphaSlider = gui.querySelector('#start-alpha')
        ,endAlphaSlider = gui.querySelector('#end-alpha')
        ,header = document.body.querySelector('header')
    ;

    CSS.paintWorklet.addModule('paint.js');

    if ('registerProperty' in CSS) {
        CSS.registerProperty({
        name: '--num-rays',
        syntax: '<integer>',
        inherits: false,
        initialValue: defaults.numRays,
        });
        CSS.registerProperty({
        name: '--start-alpha',
        syntax: '<number>',
        inherits: false,
        initialValue: defaults.startAlpha,
        });
        CSS.registerProperty({
        name: '--end-alpha',
        syntax: '<number>',
        inherits: false,
        initialValue: 0.2,
        });
    }
    else {
        if (getComputedStyle(header).getPropertyValue('--num-rays') === '')
        header.style.setProperty('--num-rays', defaults.numRays);
        if (getComputedStyle(header).getPropertyValue('--start-alpha') === '')
        header.style.setProperty('--start-alpha', defaults.startAlpha);
        if (getComputedStyle(header).getPropertyValue('--end-alpha') === '')
        header.style.setProperty('--end-alpha', defaults.endAlpha);
    }

    numRaysSlider.addEventListener('input', function(e) { 
        let slider = e.target;
        let newValue = parseFloat(slider.value);
        slider.parentElement.querySelector('span').innerText = newValue;
        header.style.setProperty('--num-rays', newValue); 
    });
    numRaysSlider.value = parseFloat(getComputedStyle(header).getPropertyValue('--num-rays'));
    numRaysSlider.dispatchEvent(new InputEvent('input'));

    startAlphaSlider.addEventListener('input', function(e) { 
        let slider = e.target;
        let newValue = parseFloat(slider.value);
        slider.parentElement.querySelector('span').innerText = newValue.toFixed(2);
        header.style.setProperty('--start-alpha', newValue); 
    });
    startAlphaSlider.value = parseFloat(getComputedStyle(header).getPropertyValue('--start-alpha'));
    startAlphaSlider.dispatchEvent(new InputEvent('input'));

    endAlphaSlider.addEventListener('input', function(e) { 
        let slider = e.target;
        let newValue = parseFloat(slider.value);
        slider.parentElement.querySelector('span').innerText = newValue.toFixed(2);
        header.style.setProperty('--end-alpha', newValue); 
    });
    endAlphaSlider.value = parseFloat(getComputedStyle(header).getPropertyValue('--end-alpha'));
    endAlphaSlider.dispatchEvent(new InputEvent('input'));
}