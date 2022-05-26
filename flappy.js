class Flappy{
    sprite;
    constructor(x, y, speed, gravity, thrust, frame, rotation) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.gravity = gravity;
        this.thrust = thrust;
        this.frame = frame;
        this.rotation = rotation;
        this.sprite = new Image();
    }
    draw(){
        this.y = parseFloat(scrn.height - this.sprite.height);
        sctx.drawImage(this.sprite, this.x, this.y);
    }
    update()
    {
        if (state.curr !== state.Play) return;
        this.x -= dx;
        this.x = this.x % (this.sprite.width / 2);
        // let r = parseFloat(this.sprite.width) / 2;
        switch (state.curr) {
            case state.getReady :
                this.rotation = 0;
                this.y += (frames % 10 === 0) ? Math.sin(frames * RAD) : 0;
                this.frame += (frames % 10 === 0) ? 1 : 0;
                break;
            case state.Play :
                this.frame += (frames % 5 === 0) ? 1 : 0;
                this.y += this.speed;
                this.setRotation()
                this.speed += this.gravity;
                // if (this.y + r >= gnd.y || this.collision()) {
                //     state.curr = state.gameOver;
                // }

                break;
            // case state.gameOver :
            //     this.frame = 1;
            //     if (this.y + r < gnd.y) {
            //         this.y += this.speed;
            //         this.setRotation()
            //         this.speed += this.gravity * 2;
            //     } else {
            //         this.speed = 0;
            //         this.y = gnd.y - r;
            //         this.rotation = 90;
            //         if (!SFX.played) {
            //             SFX.die.play();
            //             SFX.played = true;
            //         }
            //     }
            //     break;
        }
        this.frame = this.frame % this.sprite.length;
    }

    // flap() {
    //     if (this.y > 0) {
    //         SFX.flap.play();
    //         this.speed = -this.thrust;
    //     }
    // }

    setRotation(){
        if (this.speed <= 0) {

            this.rotation = Math.max(-25, -25 * this.speed / (-1 * this.thrust));
        } else if (this.speed > 0) {
            this.rotation = Math.min(90, 90 * this.speed / (this.thrust * 2));
        }
    }


}
