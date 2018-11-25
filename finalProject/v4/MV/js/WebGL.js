
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-10, window.innerHeight-10 );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();


scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var material1 = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
//var cube = new THREE.Mesh( geometry, material );

// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('../obj/flower/');
// mtlLoader.setPath('../obj/flower/');
// mtlLoader.load('Poinsetta.mtl', function (materials) {

//     materials.preload();


    var objLoader = new THREE.OBJLoader();
    //objLoader.setMaterials(materials);
    var myOBJ = objLoader.parse(model.file)

    // load a resource
    objLoader.load(myOBJ, function ( object ) {
        object.traverse(function(child) {
        	if (child instanceof THREE.Mesh){
        		child.material = material1;
        	}
        });
        scene.add( object );
    },// called when loading is in progresses
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'An error happened' );

    });
//});
//scene.add( cube );

camera.position.z = 20;

function animate() {
    requestAnimationFrame( animate );
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render( scene, camera );                
}
animate();