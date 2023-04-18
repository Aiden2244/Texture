class camera {
    constructor(gl, program) {
        this.gl = gl;
        this.program = program;

        this.position = [0, 0, 5]
        this.lookAtPoint = [0, 0, 0];
        this.upVector = [0, 1, 0];

        this.viewMatrix = glMatrix.mat4.create();
        this.updateCamera();
    }

    updateCamera() {
        glMatrix.mat4.lookAt(this.viewMatrix, this.position, this.lookAtPoint, [0, 1, 0]);
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "viewMatrix"), false, this.viewMatrix);
    }

    calculateLookDirection() {
        const lookDirection = glMatrix.vec3.create();
        glMatrix.vec3.subtract(lookDirection, this.lookAtPoint, this.position);
        return lookDirection;
    }


    rotate(direction) {
        const angleIncrement = 0.05 * direction;

        // Calculate the rotation matrix around the camera's up vector
        const rotationMatrix = glMatrix.mat4.create();
        glMatrix.mat4.rotate(rotationMatrix, rotationMatrix, angleIncrement, this.upVector);

        // Compute the look direction vector
        const lookDirection = this.calculateLookDirection();

        // Apply the rotation matrix to the look direction
        const rotatedLookDirection = glMatrix.vec3.create();
        glMatrix.vec3.transformMat4(rotatedLookDirection, lookDirection, rotationMatrix);

        // Update the lookAtPoint based on the new look direction
        glMatrix.vec3.add(this.lookAtPoint, this.position, rotatedLookDirection);

        // Update the view matrix with the new position and lookAtPoint
        this.updateCamera();
    }


    strafe(direction) {
        const strafeIncrement = 0.05 * direction;

        // shift the camera's position to the left or right
        const strafeVector = glMatrix.vec3.create(); // the vector to store the translation
        
        const lookDirection = this.calculateLookDirection();

        glMatrix.vec3.cross(strafeVector, this.upVector, lookDirection); // calculate the strafe vector
        glMatrix.vec3.scaleAndAdd(this.position, this.position, strafeVector, strafeIncrement); // shift the camera's position to the left or right

        // shift the camera's lookAtPoint to the left or right
        glMatrix.vec3.scaleAndAdd(this.lookAtPoint, this.lookAtPoint, strafeVector, strafeIncrement);

        // Update the view matrix with the new position and lookAtPoint
        this.updateCamera();
    }

    pushIn(direction) {
        // shift the camera's position forward or backward
        const pushIncrement = 0.05 * direction;

        // Compute the look direction vector
        const lookDirection = this.calculateLookDirection();

        // shift the camera's position forward or backward
        glMatrix.vec3.scaleAndAdd(this.position, this.position, lookDirection, pushIncrement);

        // shift the camera's lookAtPoint forward or backward
        glMatrix.vec3.scaleAndAdd(this.lookAtPoint, this.lookAtPoint, lookDirection, pushIncrement);

        // Update the view matrix with the new position and lookAtPoint
        this.updateCamera();
    }

    pedestal(direction) {

        const pedestalIncrement = 0.05 * direction;

        // shift the camera's position up or down
        glMatrix.vec3.scaleAndAdd(this.position, this.position, this.upVector, pedestalIncrement);

        // shift the camera's lookAtPoint up or down
        glMatrix.vec3.scaleAndAdd(this.lookAtPoint, this.lookAtPoint, this.upVector, pedestalIncrement);

        // Update the view matrix with the new position and lookAtPoint
        this.updateCamera();

        if (this.position[1] <= 0) {
            this.position[1] = 0;
            this.lookAtPoint[1] = 0;
        }
    }

    reset() {
        this.position = [0, 0, 5];
        this.lookAtPoint = [0, 0, 0];
        this.updateCamera();
    }

}
    
    



