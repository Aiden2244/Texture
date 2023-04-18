// basic vertex shader
const vertexShaderSource = `#version 300 es
    in vec4 a_position;
    out vec3 v_color;
    
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 u_color;
    
    void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * a_position;
        v_color = u_color;
    }
`;

// basic fragment shader
const fragmentShaderSource = `#version 300 es
    precision mediump float;

    in vec3 v_color;
    out vec4 fragColor;
    void main() {
        fragColor = vec4(v_color, 1);
    }
`;


function initWebGL() {

    /* SETUP */
    const canvas = document.getElementById("canvas"); // get canvas
    const gl = canvas.getContext("webgl2"); // get webgl context

    gl.clearColor(0, 0, 0, 1); // color of the canvas

    // makes the shapes render correctly
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    /*******/


    /* SHADER AND PROGRAM */
    // build shaders
    const vertexShader = buildShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = buildShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    // create and use program
    const program = buildProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    /******/

    /* SCENE SETUP */
    /******/

    /* GEOMETRY */
    const myScene = new scene(gl, canvas, program); // stores all of the shapes we make

    // insert shapes here

    const floor = new cube(gl, program);
    floor.setColor([0.2, 0.2, 0.2]);
    floor.translate([0, -2, 5]);
    floor.rotate([0, 0, 0]);
    floor.scale([1000, 0.1, 1000]);
    myScene.addObject(floor);
    
    const myCube = new cube(gl, program); // makes a cube shape using the cube class
    myCube.setColor([0.5, 1.0, 0]); // sets the color of the cube
    myCube.translate([1, 0, 0]); // translates the initial position of the cube
    myCube.rotate([0, 0, 0]); // sets the initial rotation of the cube
    myCube.scale([1, 1, 1]); // sets the initial scale of the cube
    myScene.addObject(myCube); // adds the cube to the scene

    const myCube2 = new cube(gl, program);
    myCube2.translate([-1, 0, 0]);
    myCube2.rotate([0, 0, 0]);
    myCube2.scale([0.75, 1, 1]);
    myScene.addObject(myCube2);

    const myCube3 = new cube(gl, program);
    myCube3.translate([0, 1, 10]);
    myScene.addObject(myCube3);

    // insert shapes above

    /******/

    /* ANIMATION */
    myScene.animate();
    /******/
    

}


