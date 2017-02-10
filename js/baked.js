/* * * * * * * * * * * * * * * * * *
 *  REPLICATE THIS NOISE MESH THING IN WEBGL
 *
 *    int cols, rows;
 *    int scl = 20;
 *    int w = 2000;
 *    int h = 1600;

    float flying = 0;

    float[][] terrain;

    void setup() {
      size(600, 600, P3D);
      cols = w / scl;
      rows = h/ scl;
      terrain = new float[cols][rows];
    }


    void draw() {

      flying -= 0.1;

      float yoff = flying;
      for (int y = 0; y < rows; y++) {
        float xoff = 0;
        for (int x = 0; x < cols; x++) {
          terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
          xoff += 0.2;
        }
        yoff += 0.2;
      }



      background(23);
      stroke(64);
      noFill();

      translate(width/2, height/2+50);
      rotateX(PI/3);
      translate(-w/2, -h/2);
      for (int y = 0; y < rows-1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (int x = 0; x < cols; x++) {
          vertex(x*scl, y*scl, terrain[x][y]);
          vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
          //rect(x*scl, y*scl, scl, scl);
        }
        endShape();
      }
    }
 *
 * * * * * * * * * * * * * * * * * */
window.onload = heroAnimation;

function heroAnimation () {
    
    /* * * * * * * * * * * * * * * * * * 
     * CONTEXT
     * * * * * * * * * * * * * * * * * */
    var canvas = document.getElementById("heroCanvas")
    var gl = canvas.getContext('webgl')
    gl.clearColor(0.32, 0.32, 0.32, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    gl.frontFace(gl.CCW)
    gl.cullFace(gl.BACK)

    /* * * * * * * * * * * * * * * * * * 
     * SHADER
     * * * * * * * * * * * * * * * * * */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, [
        'attribute vec3 vertPos;',
        //'attribute vec3 vertCol;',
        'varying vec3 fragCol;',
        'uniform mat4 model;',
        'uniform mat4 view;',
        'uniform mat4 projection;',
        'float rand(vec2 co) { return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}',
        'void main (void) {',
            //'fragCol = vertCol;',
            'float lift = rand(vec2(vertPos.x, vertPos.z));',
            'gl_Position = projection * view * model * vec4(vertPos.x, vertPos.y + lift, vertPos.z, 1.0);',
        '}'
    ].join('\n'))
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, [
        'precision highp float;',
        //'varying vec3 fragCol;',
        'void main (void) {',
            'gl_FragColor = vec4(0.21, 0.21, 0.21, 1.0);',
        '}'
    ].join('\n'))
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    }

    var Shader = gl.createProgram()
    gl.attachShader(Shader, vertexShader)
    gl.attachShader(Shader, fragmentShader)
    gl.linkProgram(Shader)

    /* * * * * * * * * * * * * * * * * * 
     * MESH
     * * * * * * * * * * * * * * * * * */
    var width = 100;
    var height = 100;
    var startX = (width / 2) * -1;
    var endZ = (height / 2) * -1;
    
    var xIndex = 0;
    var zIndex = height;
    
    var landscape = [];
    
    for (var x = startX; x < width; x += 1.0, xIndex++) {
        for (var z = height; z > endZ; z -= 1.0, zIndex--) {
            // TRIANGLE 1 VERT 1
            landscape.push(x - 0.5);    // position x
            landscape.push(0.0);       // position y
            landscape.push(z + 0.5);    // position z
            //landscape.push(0.0f);       // normal x
            //landscape.push(1.0f);       // normal y
            //landscape.push(0.0f);       // normal z
            //landscape.push(xIndex/width);       // tc u PLACEHOLDER
            //landscape.push((zIndex-1)/height);       // tc v PLACEHOLDER
            
            // TRIANGLE 1 VERT 2
            landscape.push(x - 0.5);    // position x
            landscape.push(0.0);       // position y
            landscape.push(z - 0.5);    // position z
            //landscape.push(0.0f);       // normal x
            //landscape.push(1.0f);       // normal y
            //landscape.push(0.0f);       // normal z
            //landscape.push(xIndex/width);       // tc u PLACEHOLDER
            //landscape.push(zIndex/height);       // tc v PLACEHOLDER
            
            // TRIANGLE 1 VERT 3
            landscape.push(x + 0.5);    // position x
            landscape.push(0.0);       // position y
            landscape.push(z + 0.5);    // position z
            //landscape.push(0.0f);       // normal x
            //landscape.push(1.0f);       // normal y
            //landscape.push(0.0f);       // normal z
            //landscape.push((xIndex+1)/width);       // tc u PLACEHOLDER
            //landscape.push((zIndex-1)/height);       // tc v PLACEHOLDER
            
            // TRIANGLE 2 VERT 1
            landscape.push(x + 0.5);    // position x
            landscape.push(0.0);       // position y
            landscape.push(z + 0.5);    // position z
            //landscape.push(0.0f);       // normal x
            //landscape.push(1.0f);       // normal y
            //landscape.push(0.0f);       // normal z
            //landscape.push((xIndex+1)/width);       // tc u PLACEHOLDER
            //landscape.push((zIndex-1)/height);       // tc v PLACEHOLDER
            
            // TRIANGLE 2 VERT 2
            landscape.push(x - 0.5);    // position x
            landscape.push(0.0);       // position y
            landscape.push(z - 0.5);    // position z
            //landscape.push(0.0f);       // normal x
            //landscape.push(1.0f);       // normal y
            //landscape.push(0.0f);       // normal z
            //landscape.push(xIndex/width);       // tc u PLACEHOLDER
            //landscape.push(zIndex/height);       // tc v PLACEHOLDER
            
            // TRIANGLE 2 VERT 3
            landscape.push(x + 0.5);    // position x
            landscape.push(0.0);       // position y
            landscape.push(z - 0.5);    // position z
            //landscape.push(0.0f);       // normal x
            //landscape.push(1.0f);       // normal y
            //landscape.push(0.0f);       // normal z
            //landscape.push((xIndex+1)/width);       // tc u PLACEHOLDER
            //landscape.push(zIndex/height);       // tc v PLACEHOLDER
        }
    }

	var landscapeVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, landscapeVBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(landscape), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(Shader, 'vertPos');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
    
    gl.useProgram(Shader)
    
    // view transform
    var view  = new Float32Array(16)
    var viewLoc = gl.getUniformLocation(Shader, 'view')
    mat4.lookAt(view, 
        [0, 2, -5], // position 
        [0, 0, 0],  // forward
        [0, 1, 0]  // up
    );

    // projection transform
    var projection = new Float32Array(16)
    var projectionLoc = gl.getUniformLocation(Shader, 'projection')
    mat4.perspective(projection,
        glMatrix.toRadian(60), // fov
        canvas.width / canvas.height, // aspect
        0.01, // near
        1000 // far
    );


    gl.uniformMatrix4fv(viewLoc, gl.FALSE, view)
    gl.uniformMatrix4fv(projectionLoc, gl.FALSE, projection)

    // LOOP
    var identity = new Float32Array(16)
    var angle = 0;
    
    var camZ = -5

    mat4.identity(identity)

    //window.setTimeout(update,8000);
    function update () {
        // clear
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // poll
       // pollGamepads();

        // bind shader
        gl.useProgram(Shader)

        // model transform
        angle = 0 //performance.now() / 1000 / 6 * 2 * Math.PI;
        var model = new Float32Array(16)
        var xRot = new Float32Array(16)
        var zRot = new Float32Array(16)
        var scale = new Float32Array(16)
        var modelLoc = gl.getUniformLocation(Shader, 'model')
        mat4.rotate(xRot,
            identity, // original
            angle, // angle
            [0, 1, 0]   // gain
        );

        mat4.rotate(zRot,
            identity, // original
            angle, // angle
            [1, 0, 0]   // gain
        );

        mat4.scale(scale, identity, [0.75, 0.75, 0.75]);

        mat4.mul(model, xRot, zRot);
        mat4.mul(model, model, scale);

        // pass uniforms to GPU
        gl.uniformMatrix4fv(modelLoc, gl.FALSE, model)

        // move camera forward
        mat4.lookAt(view, 
            [0, 2, camZ], // position 
            [0, 0, 0],  // forward
            [0, 1, 0]  // up
        );
        gl.uniformMatrix4fv(viewLoc, gl.FALSE, view)
        camZ += 0.01
        
        // render
        //gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0)
        gl.drawArrays(gl.LINES, 0, landscape.length / 3)

        // see you again soon
        requestAnimationFrame(update)
    }

    requestAnimationFrame(update);   
}