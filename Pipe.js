class Pipe {
    constructor( gap, moved, pipes) {
        this.top = {sprite: new Image()}
        this.bot = {sprite: new Image()}
        this.gap = gap
        this.moved = moved
        this.pipes = pipes


    }
    draw()
    {
        for (let i = 0; i < this.pipes.length; i++) {
            let p = this.pipes[i];
            sctx.drawImage(this.top.sprite, p.x, p.y)
            sctx.drawImage(this.bot.sprite, p.x, p.y + parseFloat(this.top.sprite.height) + this.gap)
        }
    }
    update()
    {
        if (state.curr !== state.Play) return;
        if (frames % 100 === 0) {
            this.pipes.push({x: parseFloat(scrn.width), y: -210 * Math.min(Math.random() + 1, 2)});
        }
        this.pipes.forEach(pipe => {
            pipe.x -= dx;
        })

        if (this.pipes.length && this.pipes[0].x < -this.top.sprite.width) {
            this.pipes.shift();
            this.moved = true;
        }

    }
}