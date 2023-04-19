async function initWebGL() {

    /* SETUP */
    const canvas = document.getElementById("canvas"); // get canvas
    const gl = canvas.getContext("webgl2"); // get webgl context

    gl.clearColor(0, 0, 0, 1); // color of the canvas

    // makes the shapes render correctly
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.enable(gl.DEPTH_TEST);
    /*******/


    /* SHADER AND PROGRAM */
    const program = await setup(gl);
    gl.useProgram(program);
    /******/

    /* SCENE SETUP */
    /******/

    /* GEOMETRY */
    const myScene = new scene(gl, canvas, program); // stores all of the shapes we make

    // insert shapes here

    const floor = new cube(gl, program);
    floor.setColor([1.0, 1.0, 1.0]);
    floor.translate([0, -2, 5]);
    floor.rotate([0, 0, 0]);
    floor.scale([1000, 0.1, 1000]);
    myScene.addObject(floor);
    
    const myCube = new cube(gl, program); // makes a cube shape using the cube class
    myCube.setColor([0.5, 1.0, 0]); // sets the color of the cube
    myCube.translate([0.75, 0.75, 0]); // translates the initial position of the cube
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



