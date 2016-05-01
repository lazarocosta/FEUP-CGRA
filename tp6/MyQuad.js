/**
 * MyQuad
 * @constructor
 */
 var minSS;
 var minTT;
 var maxSS;
 var maxTT;

 function MyQuad(scene) {
 	CGFobject.call(this,scene);

   minSS = 0;
   minTT = 0;
   maxSS = 1;
   maxTT = 1;
 	this.initBuffers();
 };

 function MyQuad(scene, minS, maxS, minT, maxT){
   CGFobject.call(this,scene);

   minSS=minS;
    minTT = minT;
    maxSS=maxS;
    maxTT=maxT;

   this.initBuffers();

 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;


 MyQuad.prototype.initBuffers = function() {
   this.vertices = [
  	-0.5, -0.5, 0,
  	0.5, -0.5, 0,
  	-0.5, 0.5, 0,
  	0.5, 0.5, 0
  	];

    this.texCoords = [
    	maxSS, maxTT,
    	minSS, maxTT,
    	maxSS, minTT,
    	minSS, minTT
   ];
  	this.indices = [
  	0, 1, 2,
  	3, 2, 1
  	];

   this.normals = [
   0, 0, 1,
   0, 0, 1,
   0, 0, 1,
   0, 0, 1
   ];

   this.primitiveType = this.scene.gl.TRIANGLES;
   this.initGLBuffers();
 };
