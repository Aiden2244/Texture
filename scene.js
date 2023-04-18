class scene {
    constructor (gl, canvas, program) {
        this.gl = gl;
        this.canvas = canvas;
        this.program = program;

        this.projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(this.projectionMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 100.0);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "projectionMatrix"), false, this.projectionMatrix);

        this.clock = 0;
        this.flag = 1;

        this.objects = [];

        this.camera = new camera(this.gl, this.program);

        this.addEventListeners();
        console.log(this.camera.position);
    }

    addEventListeners() {
        document.addEventListener('keydown', (event) => {
            
            // rotations
            // when 'j' is pressed. rotate camera left
            if (event.key === 'j') {
                this.camera.rotate(1);
            }
            // when 'l' is pressed. rotate camera right
            else if (event.key === 'l') {
                this.camera.rotate(-1);
                this.objects[0].animateYRotation(-5);
            }

            // strafing
            // when 'a' is pressed. strafe camera left
            else if (event.key === 'a') {
                this.camera.strafe(1);
            }
            // when 'd' is pressed. strafe camera right
            else if (event.key === 'd') {
                this.camera.strafe(-1);
            }

            // pushing
            // when 'w' is pressed. push camera in
            else if (event.key === 'w') {
                this.camera.pushIn(1);
            }
            // when 's' is pressed. push camera out
            else if (event.key === 's') {
                this.camera.pushIn(-1);
            }

            // up and down movement
            // when 'i' is pressed. move camera up
            else if (event.key === 'i') {
                this.camera.pedestal(1);
            }
            // when 'k' is pressed. move camera down
            else if (event.key === 'k') {
                this.camera.pedestal(-1);
            }

            // reset
            // when space is pressed. reset camera
            else if (event.key === ' ') {
                this.camera.reset();
            }

        });

    }


    animate() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); // clear the canvas
        
        
        /* INSERT SHAPE ANIMATIONS HERE */
        this.objects[1].animateXRotation();
        this.objects[1].animateYRotation();
        this.objects[1].animateZRotation();

        this.objects[2].animateYTranslation(this.flag);
        this.objects[2].animateZScaling(this.flag);

        this.objects[3].animateXTranslation(this.flag);
        this.objects[3].animateYScaling(this.flag);
        this.objects[3].animateZRotation(this.flag);
        /******/
    
    
        /* DRAW EVERY SHAPE*/
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(this.gl, this.program);
        }
        /******/
    
        
        /* CYCLE THE CLOCK */
        const cycle_time = 60;

        this.clock += (1 * this.flag)
        if (this.clock === cycle_time) {
            this.flag = -1;
        } else if (this.clock === 0) {
            this.flag = 1;
        }            
        /******/
    
    
        /* ANIMATE AGAIN */
        requestAnimationFrame(() => this.animate());
        /******/
    
    }

    addObject(object) {
        this.objects.push(object);
    }
}