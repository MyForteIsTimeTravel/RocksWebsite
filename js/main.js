/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  main.js
 *
 *  An attempt at a 3D game engine in JavaScript
 *  using WebGL and Three.js
 *
 *  Ryan Needham
 * * * * * * * * * * * * * * * * * * * * * * * * * * */
const container = document.querySelector('#canvasContainer')
var   width     = window.innerWidth
var   height    = window.innerHeight// * 0.60

// handle window resizing
window.addEventListener('resize', resizeCallback, false);
function resizeCallback () {
    width = window.innerWidth
    height    = window.innerHeight * 0.60
    
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    
}

/* * * * * * * * * * * * * *
 * Setup WebGL Rendering
 * * * * * * * * * * * * * */
const VIEW_ANGLE = 70
const ASPECT     = width / height
const NEAR       = 0.1
const FAR        = 1000

var camera
var scene
var renderer
var controls
var effect

// check for VR
if (WEBVR.isAvailable() === false) {
				document.body.appendChild( WEBVR.getMessage() );
}

scene      = new THREE.Scene()
scene.background = new THREE.Color(0x202020)
camera   = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
)

scene.add(camera)

renderer = new THREE.WebGLRenderer({antialias: true})




//camera.position.z = 5
/*
renderer.setSize(width, height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type    = THREE.PCFSoftShadowMap
*/

renderer.setClearColor( 0x505050 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.sortObjects = false;

// Attach canvas renderer
container.appendChild(renderer.domElement)

// vr
controls = new THREE.VRControls( camera );
effect = new THREE.VREffect( renderer );

if ( navigator.getVRDisplays ) {
    navigator.getVRDisplays()
        .then( function ( displays ) {
            effect.setVRDisplay( displays[ 0 ] );
            controls.setVRDisplay( displays[ 0 ] );
        } )
        .catch( function () {
            console.log("NOOOOOPE")
        } );
    document.body.appendChild( WEBVR.getButton( effect ) );
}

/* * * * * * * * * * * * * *
 * Lighting
 * * * * * * * * * * * * * */
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 600
pointLight.rotation   = 20 * (Math.PI / 180)
pointLight.castShadow = true
pointLight.power = 2
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
scene.add(ambientLight)


/* * * * * * * * * * * * * * * *
 * World Objects
 * * * * * * * * * * * * * * * */
var loader = new THREE.JSONLoader();
var mesh

//loader.load( 'assets/textured.json', function ( geometry ) {
    var material = new THREE.MeshLambertMaterial({color:0xc19170});
    var geometry = new THREE.SphereGeometry( 12, 4, 4 )
    
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
        
    scene.add( mesh );

//}); 

var starCount = 1000
var stars = new Array()
var starSpeeds = new Array()

function betterRand () {
    var rand = Math.random()
    if (Math.random() > 0.5) {rand *= -1} 
    return rand;
}

// one way
for (var i = 0; i < starCount; i++) {
    const obj = new THREE.Mesh(
        new THREE.SphereGeometry( 0.2, 4, 4 ),               // Vertex Shader
        new THREE.MeshBasicMaterial({color: 0xDDDDDD})    // Fragment Shader
    );
    
    
    obj.position.x = ((betterRand() + 0.4) * 300)
    obj.position.y = ((betterRand() + 0.4) * 300)
    obj.position.z = ((betterRand() + 0.4) * 300)

    // management
    stars[i] = obj
    var ting = Math.random()
    if (ting < 0.16) {
        obj.material.color.setHex( 0xFFFFFF )
        starSpeeds[i] = 1.0
    }
    else if (ting > 0.16 && ting < 0.66) {
        obj.material.color.setHex( 0xAAAAAA )
        starSpeeds[i] = 0.4
    }
    else if (ting > 0.66) {
        obj.material.color.setHex( 0x444444 )
        starSpeeds[i] = 0.2
    }
    console.log(starSpeeds[i])
    scene.add(obj)
}

/* * * * * * * * * * * * * * * *
 * ON UPDATE
 * * * * * * * * * * * * * * * */
var paused = false
var tick = 0

var radius = 10
var spin = 4

function update () {
    if (!paused) {
        updateTick()
        updateInput()

        
        // animate objects
        
        camera.position.x = (Math.sin((tick + (mouseX*0.01))/spin) * radius)
        camera.position.z = (Math.cos((tick + (mouseY*0.01))/spin) * radius)
        camera.position.x += ( mouseX - camera.position.x ) * 0.001;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;
        
        camera.lookAt(mesh.position)
        
        
        for (var i = 0; i < starCount; i++) {
            if (stars[i].position.y > -200) {
               stars[i].position.y -= starSpeeds[i];
            }
            else {
                stars[i].position.y = 180
            }
        }
        
        
        if (Math.random() > 0.5) { mesh.position.x += Math.random() * 0.001 }
        else { mesh.position.x -= Math.random() * 0.001 }
        
        mesh.rotation.z += 0.01;
        mesh.rotation.y += 0.01;
        
        // Draw the scene
        //renderer.render(scene, camera)
        controls.update()
        effect.render(scene, camera)
    }
    
    // see you again soon
    requestAnimationFrame(update)
}

// guard against unsafe integer values
function updateTick () {
    switch (tick == Number.MAX_SAFE_INTEGER) {
        case true:  tick = 0; break
        case false: tick += 0.01;   break
    }
}

// Entry Point
requestAnimationFrame(update);
