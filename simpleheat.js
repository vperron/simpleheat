/*
 (c) 2014, Vladimir Agafonkin
 simpleheat, a tiny JavaScript library for drawing heatmaps with Canvas
 https://github.com/mourner/simpleheat
*/

(function () { 'use strict';

function simpleheat(canvas) {
    // jshint newcap: false, validthis: true
    if (!(this instanceof simpleheat)) { return new simpleheat(canvas); }

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._forcedAlpha = 0.5;
    this._data = [];
}

simpleheat.prototype = {

    defaultRadius: 25,

    defaultGradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (r, blur) {
        if ((blur === null) || (blur === undefined)) {
          blur = 15;
        }

        var r2 = this._r = r + blur;

        return this;
    },

    gradient: function (grad) {

        this._grad = d3.scale.linear()
          .domain(_.keys(grad))
          .range(_.values(grad))

        return this;
    },

    draw: function () {
        if (!this._grad) {
            this.gradient(this.defaultGradient);
        }

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);
        ctx.globalAlpha = this._forcedAlpha;
        
        var r = this._r;

        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.fillStyle = this._grad(p[2] / this._max);
            ctx.beginPath();
            ctx.rect(p[0] - r/2, p[1] - r/2, r, r);
            ctx.closePath();
            ctx.fill();
        }
        return this;
    }

};

window.simpleheat = simpleheat;

})();
