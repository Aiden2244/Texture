/* SHAPE CLASS */
class shape {
    constructor(gl, program) {
        this.gl = gl; // gl context
        this.program = program; // WebGL program

        this.color = [Math.random(), Math.random(), Math.random()]; // default color of the shape
        this.lightingDirection = [0, 3, 0]; // default lighting direction
        this.lightingColor = [1, 1, 0.8]; // default lighting color
        this.ambientLight = [0.2, 0.2, 0.2]; // default ambient light

        this.modelMatrix = glMatrix.mat4.create(); // each shape has its own model matrix
    }

    /* MODEL MATRIX FUNCTIONS */
    translate(translationVector) {
        glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, translationVector);
    }

    rotate(rotationVector) {
        glMatrix.mat4.rotate(this.modelMatrix, this.modelMatrix, rotationVector[0], [1, 0, 0]);
        glMatrix.mat4.rotate(this.modelMatrix, this.modelMatrix, rotationVector[1], [0, 1, 0]);
        glMatrix.mat4.rotate(this.modelMatrix, this.modelMatrix, rotationVector[2], [0, 0, 1]);
    }

    scale(scaleFactor) {
        glMatrix.mat4.scale(this.modelMatrix, this.modelMatrix, scaleFactor);
    }
    /******/

    /* COLOR FUNCTION */
    setColor(color) {
        this.color = color;
    }
    /******/

    /* ANIMATION FUNCTIONs */

    // rotations
    animateXRotation(factor) {
        if (!factor) 
            factor = 1;
        this.rotate([0.01 * factor, 0, 0]);
    }

    animateYRotation(factor) {
        if (!factor) 
            factor = 1;
        this.rotate([0, 0.01 * factor, 0]);
    }

    animateZRotation(factor) {
        if (!factor) 
            factor = 1;
        this.rotate([0, 0, 0.01 * factor]);
    }

    // scales
    animateXScaling(flag, factor) {
        if (!factor) 
            factor = 1;
        this.scale([1 + (factor * 0.01 * flag), 1, 1]);
        
    }

    animateYScaling(flag, factor) {
        if (!factor) 
            factor = 1;
        this.scale([1, 1 + (factor * 0.01 * flag), 1]);
        
    }

    animateZScaling(flag, factor) {
        if (!factor) 
            factor = 1;
        this.scale([1, 1, 1 + (factor * 0.01 * flag)]);
        
    }

    // translations
    animateXTranslation(flag, factor) {
        if (!factor)
            factor = 1;
        this.translate([0.01 * flag * factor, 0, 0]);
    }

    animateYTranslation(flag, factor) {
        if (!factor)
            factor = 1;
        this.translate([0, 0.01 * flag * factor, 0]);
    }

    animateXTranslation(flag, factor) {
        if (!factor)
            factor = 1;
        this.translate([0, 0, 0.01 * flag * factor]);
    }
    /******/

    /* DRAW FUNCTION */
    draw() {
        // set up vertex attributes
        const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");


        // set up model matrix
        const modelMatrix = this.modelMatrix;
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "modelMatrix"), false, modelMatrix);

        // set up color uniform
        const u_color_location = this.gl.getUniformLocation(this.program, "u_color");
        this.gl.uniform3fv(u_color_location, this.color);
    
        const size = 4;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this.gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(positionAttributeLocation);

        // set up lighting
        const u_lightColorLocation = this.gl.getUniformLocation(this.program, "u_lightColor");
        const u_ambientLightLocation = this.gl.getUniformLocation(this.program, "u_ambientLight");
        const u_lightDirectionLocation = this.gl.getUniformLocation(this.program, "u_lightDirection");
        
        this.gl.uniform3fv(u_lightColorLocation, this.lightingColor);
        this.gl.uniform3fv(u_lightDirectionLocation, this.lightingDirection);
        this.gl.uniform3fv(u_ambientLightLocation, this.ambientLight);

        
        // draw
        const primitiveType = this.gl.TRIANGLES;
        const count = this.indices.length;
        this.gl.drawElements(primitiveType, count, this.gl.UNSIGNED_SHORT, offset);
    }
}

class cube extends shape {
    constructor(gl, program) {
        super(gl, program);
        this.vertices = [
            -0.5, -0.5, 0.5, 1.0,
            0.5, -0.5, 0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
            -0.5, 0.5, 0.5, 1.0,
            -0.5, -0.5, -0.5, 1.0,
            0.5, -0.5, -0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
            -0.5, 0.5, -0.5, 1.0
        ];

        this.indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7
        ];

        createBuffer(this.gl, new Float32Array(this.vertices), this.gl.ARRAY_BUFFER);
        createBuffer(this.gl, new Uint16Array(this.indices), this.gl.ELEMENT_ARRAY_BUFFER);
    }
}