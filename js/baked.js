/* * * * * * * * * * * * * * * * * *
 *  Grid Mesh Animation (baked.js)
 *
 *  Ryan Needham
 * * * * * * * * * * * * * * * * * */
window.onload = heroAnimation

function heroAnimation () {
    
    /* * * * * * * * * * * * * * * * * * 
     * CONTEXT
     * * * * * * * * * * * * * * * * * */
    var canvas      = document.getElementById("heroCanvas")
    canvas.width    = window.innerWidth
    canvas.height   = window.innerHeight * 0.96
    
    var gl          = canvas.getContext('webgl')
    gl.clearColor   (0.32, 0.32, 0.32, 1.0)
    gl.clear        (gl.COLOR_BUFFER_BIT)
    gl.enable       (gl.DEPTH_TEST)
    gl.enable       (gl.CULL_FACE)
    gl.frontFace    (gl.CCW)
    gl.cullFace     (gl.BACK)
    
    document.addEventListener("resize", function () {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight * 0.96
        
        // projection transform
        var projection    = new Float32Array(16)
        var projectionLoc = gl.getUniformLocation(Shader, 'projection')
        
        mat4.perspective (
            projection,
            glMatrix.toRadian(60),        // fov
            canvas.width / canvas.height, // aspect
            0.01,                         // near
            42                            // far
        )
        
        gl.uniformMatrix4fv(projectionLoc, gl.FALSE, projection)
    })

    /* * * * * * * * * * * * * * * * * * 
     * SHADERS
     * * * * * * * * * * * * * * * * * */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, [
        'attribute vec3 vertPos;',
        //'attribute vec3 vertCol;',
        'varying vec3 fragCol;',
        'uniform mat4 model;',
        'uniform mat4 view;',
        'uniform mat4 projection;',
        'uniform float amp;',
        'float rand(vec2 co) { return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}',
        'void main (void) {',
            //'fragCol = vertCol;',
            'float lift = rand(vec2(vertPos.x, vertPos.z)) * amp;',
            'gl_Position = projection * view * model * vec4(vertPos.x, vertPos.y + lift, vertPos.z, 1.0);',
        '}'
    ].join('\n'))
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader))
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
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader))
    }

    // Program
    var Shader = gl.createProgram()
    gl.attachShader (Shader, vertexShader)
    gl.attachShader (Shader, fragmentShader)
    gl.linkProgram  (Shader)

    /* * * * * * * * * * * * * * * * * * 
     * GRID / FLOOR MESH
     * * * * * * * * * * * * * * * * * */
    var width      = 100
    var height     = 100
    var startX     = (width  / 2) * -1
    var endZ       = (height / 2) * -1
    var xIndex     = 0
    var zIndex     = height
    var landscape  = []
    var step       = 0.5
    var simplexMachine = new SimplexNoise()
    
    // Data
    for (var x = startX; x < width; x += step * 2, xIndex++) {
        for (var z = height; z > endZ; z -= step * 2, zIndex--) {
            
            // TRIANGLE 1 VERT 1
            landscape.push(x - step)    // position x
            landscape.push(0.0)         // position y
            landscape.push(z + step)    // position z

            // TRIANGLE 1 VERT 2
            landscape.push(x - step)    // position x
            landscape.push(0.0)         // position y
            landscape.push(z - step)    // position z
            
            // TRIANGLE 1 VERT 3
            landscape.push(x + step)    // position x
            landscape.push(0.0)         // position y
            landscape.push(z + step)    // position z
            
            // TRIANGLE 2 VERT 1
            landscape.push(x + step)    // position x
            landscape.push(0.0)         // position y
            landscape.push(z + step)    // position z
            
            // TRIANGLE 2 VERT 2
            landscape.push(x - step)    // position x
            landscape.push(0.0)         // position y
            landscape.push(z - step)    // position z
            
            // TRIANGLE 2 VERT 3
            landscape.push(x + step)    // position x
            landscape.push(0.0)         // position y
            landscape.push(z - step)    // position z
        }
    }

    // Buffer Vertices Data
	var landscapeVBO = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, landscapeVBO)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(landscape), gl.STATIC_DRAW)

	var positionAttribLocation = gl.getAttribLocation(Shader, 'vertPos')
	gl.vertexAttribPointer (positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0)
	gl.enableVertexAttribArray(positionAttribLocation)

    /* * * * * * * * * * * * * * * * * * 
     * TRANSFORMATION MATRICES
     * * * * * * * * * * * * * * * * * */
    gl.useProgram(Shader)
    
    // view transform
    var view    = new Float32Array(16)
    var viewLoc = gl.getUniformLocation(Shader, 'view')
    mat4.lookAt(
        view, 
        [0, 2, -5],    // position 
        [0, 0, 1000],  // forward
        [0, 1, 0]      // up
    )

    // projection transform
    var projection    = new Float32Array(16)
    var projectionLoc = gl.getUniformLocation(Shader, 'projection')
    mat4.perspective(
        projection,
        glMatrix.toRadian(60),        // fov
        canvas.width / canvas.height, // aspect
        0.01,                         // near
        10                            // far
    )

    gl.uniformMatrix4fv(viewLoc, gl.FALSE, view)
    gl.uniformMatrix4fv(projectionLoc, gl.FALSE, projection)

    /* * * * * * * * * * * * * * * * * * 
     * MAIN LOOP
     * * * * * * * * * * * * * * * * * */
    var identity = new Float32Array(16)
    var angle    = 0
    var camZ     = -5
    var amp      = 0

    mat4.identity(identity)

    function update () {
        // clear
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // bind shader
        gl.useProgram(Shader)

        /** 
         * model transform 
         */
        var modelLoc = gl.getUniformLocation(Shader, 'model')
        var model    = new Float32Array(16)
        var xRot     = new Float32Array(16)
        var zRot     = new Float32Array(16)
        var scale    = new Float32Array(16)
        mat4.rotate (xRot, identity, angle, [0, 1, 0])
        mat4.rotate (zRot, identity, angle, [1, 0, 0])
        mat4.scale  (scale, identity, [0.75, 0.75, 0.75])
        mat4.mul    (model, xRot, zRot)
        mat4.mul    (model, model, scale)

        // pass uniforms to GPU
        gl.uniformMatrix4fv(modelLoc, gl.FALSE, model)

        /**
         * move camera forward
         */
        mat4.lookAt(
            view, 
            [0, 1, camZ], // position 
            [0, 0, 1000],  // forward
            [0, 1, 0]  // up
        );
        gl.uniformMatrix4fv(viewLoc, gl.FALSE, view)
        camZ += 0.032
        
        /** 
         * animate mesh
         */
        gl.uniform1f(gl.getUniformLocation(Shader, 'amp'), Math.sin(amp)*1.2)
        amp += 0.025
        
        /** 
         * render
         */
        gl.drawArrays(gl.LINES, 0, landscape.length / 3)
        
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update);   
}