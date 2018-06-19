import Control from './Control';

/**
 * Integer
 * @param {*} options 
 */
function Integer(options) {
    Control.call(this, options);

    options = options || {};

    this.value = options.value || 0;

    this.min = - Infinity;
    this.max = Infinity;

    this.step = 1;
};

Integer.prototype = Object.create(Control.prototype);
Integer.prototype.constructor = Integer;

Integer.prototype.render = function () {
    this.dom = document.createElement('input');
    this.dom.className = 'Number';
    this.dom.value = '0';

    this.dom.addEventListener('keydown', function (event) {
        event.stopPropagation();
    }, false);

    this.setValue(this.value);

    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);

    var distance = 0;
    var onMouseDownValue = 0;

    var pointer = [0, 0];
    var prevPointer = [0, 0];

    var _this = this;

    function onMouseDown(event) {
        event.preventDefault();

        distance = 0;
        onMouseDownValue = scope.value;
        prevPointer = [event.clientX, event.clientY];

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);
    }

    function onMouseMove(event) {
        var currentValue = scope.value;
        pointer = [event.clientX, event.clientY];
        distance += (pointer[0] - prevPointer[0]) - (pointer[1] - prevPointer[1]);

        var value = onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * _this.step;
        value = Math.min(scope.max, Math.max(scope.min, value)) | 0;

        if (currentValue !== value) {
            _this.setValue(value);
            _this.dom.dispatchEvent(changeEvent);
        }

        prevPointer = [event.clientX, event.clientY];
    }

    function onMouseUp(event) {
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);

        if (Math.abs(distance) < 2) {
            _this.dom.focus();
            _this.dom.select();
        }
    }

    function onChange(event) {
        _this.setValue(dom.value);
    }

    function onFocus(event) {
        _this.dom.style.backgroundColor = '';
        _this.dom.style.cursor = '';
    }

    function onBlur(event) {
        _this.dom.style.backgroundColor = 'transparent';
        _this.dom.style.cursor = 'col-resize';
    }

    onBlur();

    dom.addEventListener('mousedown', onMouseDown, false);
    dom.addEventListener('change', onChange, false);
    dom.addEventListener('focus', onFocus, false);
    dom.addEventListener('blur', onBlur, false);

    this.parent.appendChild(this.dom);
};

Integer.prototype.getValue = function () {
    return this.value;
};

Integer.prototype.setValue = function (value) {
    if (value !== undefined) {
        value = parseInt(value);

        this.value = value;
        this.dom.value = value;
    }

    return this;
};

Integer.prototype.setStep = function (step) {
    this.step = parseInt(step);
    return this;
};

Integer.prototype.setRange = function (min, max) {
    this.min = min;
    this.max = max;

    return this;
};

export default Integer;