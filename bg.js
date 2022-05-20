class Bg {
    sprite;
    constructor(x, y) {
        this.sprite = new Image()
        this.x = x;
        this.y = y;

    }
    draw(scrn)
    {
         let y = parseFloat(scrn.height - this.sprite.height);
        sctx.drawImage(this.sprite, this.x, this.y);
    }
}
