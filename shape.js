/* SHAPE CLASS */
class shape {
    constructor(gl, program, name) {
        this.gl = gl; // gl context
        this.program = program; // WebGL program

        this.color = [Math.random(), Math.random(), Math.random()]; // default color of the shape
        this.lightingDirection = [0, 3, 0]; // default lighting direction
        this.lightingColor = [1, 1, 0.8]; // default lighting color
        this.ambientLight = [0.2, 0.2, 0.2]; // default ambient light

        this.modelMatrix = glMatrix.mat4.create(); // each shape has its own model matrix

        this.texture = null; // texture of the shape
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

    /* TEXTURE FUNCTION */
    setTexture(texture) {
        this.texture = texture;
    }

    /* NAME FUNCTION */
    setName(name) {
        this.name = name;
    }

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
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(positionAttributeLocation);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // set up lighting
        const u_lightColorLocation = this.gl.getUniformLocation(this.program, "u_lightColor");
        const u_ambientLightLocation = this.gl.getUniformLocation(this.program, "u_ambientLight");
        const u_lightDirectionLocation = this.gl.getUniformLocation(this.program, "u_lightDirection");
        
        this.gl.uniform3fv(u_lightColorLocation, this.lightingColor);
        this.gl.uniform3fv(u_lightDirectionLocation, this.lightingDirection);
        this.gl.uniform3fv(u_ambientLightLocation, this.ambientLight);

        // set up texture

        const useTextureLocation = this.gl.getUniformLocation(this.program, "u_useTexture");
        if (this.texture != null) {
            
            this.gl.uniform1i(useTextureLocation, 1);

            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
            const textureLocation = this.gl.getUniformLocation(this.program, "u_texture");
            this.gl.uniform1i(textureLocation, 0);

            const textureCoordAttributeLocation = this.gl.getAttribLocation(this.program, "a_texCoord");
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer); // Add this line
            this.gl.vertexAttribPointer(textureCoordAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(textureCoordAttributeLocation);

        }
        else {
            this.gl.uniform1i(useTextureLocation, 0);
        }


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
            // Front face
            -0.5, -0.5, 0.5, 1.0,
            0.5, -0.5, 0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
            -0.5, 0.5, 0.5, 1.0,
        
            // Back face
            0.5, -0.5, -0.5, 1.0,
            -0.5, -0.5, -0.5, 1.0,
            -0.5, 0.5, -0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
        
            // Left face
            -0.5, -0.5, -0.5, 1.0,
            -0.5, -0.5, 0.5, 1.0,
            -0.5, 0.5, 0.5, 1.0,
            -0.5, 0.5, -0.5, 1.0,
        
            // Right face
            0.5, -0.5, 0.5, 1.0,
            0.5, -0.5, -0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
        
            // Top face
            -0.5, 0.5, 0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
            -0.5, 0.5, -0.5, 1.0,
        
            // Bottom face
            0.5, -0.5, 0.5, 1.0,
            -0.5, -0.5, 0.5, 1.0,
            -0.5, -0.5, -0.5, 1.0,
            0.5, -0.5, -0.5, 1.0
        ];
        

        this.indices = [
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            8, 9, 10, 8, 10, 11, // Left face
            12, 13, 14, 12, 14, 15, // Right face
            16, 17, 18, 16, 18, 19, // Top face
            20, 21, 22, 20, 22, 23 // Bottom face
        ];
        

        this.textureCoords = [
            // Front face
            0.0, 0.5,
            0.25, 0.5,
            0.25, 0.75,
            0.0, 0.75,
        
            // Back face
            0.5, 0.25,
            0.75, 0.25,
            0.75, 0.5,
            0.5, 0.5,
        
            // Left face
            0.25, 0.5,
            0.5, 0.5,
            0.5, 0.75,
            0.25, 0.75,
        
            // Right face
            0.5, 0.75,
            0.75, 0.75,
            0.75, 1.0,
            0.5, 1.0,
        
            // Top face
            0.5, 0.5,
            0.75, 0.5,
            0.75, 0.75,
            0.5, 0.75,
        
            // Bottom face
            0.75, 0.5,
            1.0, 0.5,
            1.0, 0.75,
            0.75, 0.75
        ];
        

        this.positionBuffer = createBuffer(this.gl, new Float32Array(this.vertices), this.gl.ARRAY_BUFFER);
        this.indexBuffer = createBuffer(this.gl, new Uint16Array(this.indices), this.gl.ELEMENT_ARRAY_BUFFER);
        this.textureCoordBuffer = createBuffer(this.gl, new Float32Array(this.textureCoords), this.gl.ARRAY_BUFFER);

    }
}