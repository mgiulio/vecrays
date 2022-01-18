class Rays {
    static get inputProperties() { 
        return [
            '--num-rays',
            '--start-alpha',
            '--end-alpha',
        ]; 
    }

    getProps(props) {
        let p;

        p = props.get('--num-rays');
        if ('value' in p) 
            this.n = p.value; // CSS.registerProperty() supported
        else 
            this.n = parseInt(p.toString())

        p = props.get('--start-alpha');
        if ('value' in p) 
            this.startAlpha = p.value; // CSS.registerProperty() supported
        else 
            this.startAlpha = parseFloat(p.toString())

        p = props.get('--end-alpha');
        if ('value' in p) 
            this.endAlpha = p.value; // CSS.registerProperty() supported
        else 
            this.endAlpha = parseFloat(p.toString())
    }

    paint(ctx, size, props) {
        this.getProps(props);

        let
            c = [size.width / 2, size.height / 2],
            r = distance(c, [size.width, 0]),
            deltaTheta = (2 * Math.PI) / (2*this.n),
            i
        ;

        let gradient = ctx.createRadialGradient(c[0], c[1], 0, c[0], c[1], r);
        gradient.addColorStop(0, `hsla(0, 0%, 100%, ${this.startAlpha}`);
        gradient.addColorStop(1, `hsla(0, 0%, 100%, ${this.endAlpha}`);

        let startAngle = 0;
        ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.moveTo(c[0], c[1]);
            for (i = 1; i <= this.n; i++) {
                ctx.lineTo(c[0] + r * Math.cos(startAngle), c[1] + r * Math.sin(startAngle));
                ctx.arc(c[0], c[1], r, startAngle, startAngle + deltaTheta);
                ctx.lineTo(c[0], c[1]);
                startAngle += deltaTheta * 2;
          }
            ctx.fill();
    }
}

function distance(p1, p2) {
    let 
        dx = p2[0] - p1[0],
        dy = p2[1] - p1[1]
    ;

    return Math.sqrt(dx*dx + dy*dy);
}

registerPaint('rays', Rays);