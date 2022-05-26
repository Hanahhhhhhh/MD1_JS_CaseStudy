class Gnd {
    sprite;
    constructor(x, y) {
        this.sprite = new Image()
        this.x = x
        this.y = y
    }

    draw(scrn)
    {
        this.y = parseFloat(scrn.height - this.sprite.height);
        sctx.drawImage(this.sprite, this.x, this.y);
    }
    update()
    {
        if (state.curr !== state.Play) return;
        this.x -= dx;
        this.x = this.x % (this.sprite.width / 2);
    }
}

