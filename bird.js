class Bird {
    constructor(x, y, speed, gravity, thrust, frame, rotation) {
        // this.image = image;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.gravity = gravity;
        this.thrust = thrust;
        this.frame = frame;
        this.rotation = rotation;
        this.animations =
            [
                {sprite: new Image()},
                {sprite: new Image()},
                {sprite: new Image()},


            ]
    }


    draw() {
        let h = this.animations[this.frame].sprite.height;
        let w = this.animations[this.frame].sprite.width;
        sctx.save();
        sctx.translate(this.x, this.y);
        sctx.rotate(this.rotation * RAD);
        sctx.drawImage(this.animations[this.frame].sprite, -w / 2, -h / 2);
        sctx.restore();
    }

    update() {
        let r = parseFloat(this.animations[0].sprite.width) / 2;
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
                if (this.y + r >= gnd.y || this.collisioned()) {
                    state.curr = state.gameOver;
                }

                break;
            case state.gameOver :
                this.frame = 1;
                if (this.y + r < gnd.y) {
                    this.y += this.speed;
                    this.setRotation()
                    this.speed += this.gravity * 2;
                } else {
                    this.speed = 0;
                    this.y = gnd.y - r;
                    this.rotation = 90;
                    if (!SFX.played) {
                        SFX.die.play();
                        SFX.played = true;
                    }
                }
                break;
        }
        this.frame = this.frame % this.animations.length;
    }

    flap() {
        if (this.y > 0) {
            SFX.flap.play();
            this.speed = -this.thrust;
        }
    }

    setRotation(){
        if (this.speed <= 0) {

            this.rotation = Math.max(-25, -25 * this.speed / (-1 * this.thrust));
        } else if (this.speed > 0) {
            this.rotation = Math.min(90, 90 * this.speed / (this.thrust * 2));
        }
    }
    collisioned(){
        if (!pipe.pipes.length) return;
        let bird = this.animations[0].sprite;
        let x = pipe.pipes[0].x;
        let y = pipe.pipes[0].y;
        let r = bird.height / 4 + bird.width / 4;
        let roof = y + pipe.top.sprite.height;
        let floor = roof + pipe.gap;
        let w = pipe.top.sprite.width;
        if (this.x + r >= x) {
            if (this.x + r < x + w) {
                if (this.y - r <= roof || this.y + r >= floor) {
                    SFX.hit.play();
                    return true;
                }

            } else if (pipe.moved) {
                UI.score.curr++;
                SFX.score.play();
                pipe.moved = false;
            }


        }

    }
}