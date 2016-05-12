/**
 * MyLegs
 * @constructor
 */
 function MyLegs(scene, slices) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.angulo = (2*Math.PI)/(4*this.slices);
  this.base = new MyUnitCubeQuad(this.scene);
//  this.textS = 1.0 / this.slices;
  //this.textT = 1.0 / this.stacks;

 	this.initBuffers();
 };

MyLegs.prototype = Object.create(CGFobject.prototype);
 MyLegs.prototype.constructor = MyLegs;

 MyLegs.prototype.initBuffers = function() {

 	this.vertices = [];
  this.indices = [];
  this.normals = [];
  //this.texCoords = [];

  var x, y,z,i;

    for(i=0; i <=this.slices;i++)
    {
      x = Math.cos(i*this.angulo);
      y = Math.sin(i*this.angulo);
      z = 0;

      this.vertices.push(x,y,z);
      this.normals.push(x,y,z);

      z++;
      this.vertices.push(x,y,z);
      this.normals.push(x,y,z);
    }

    for(i=0; i < this.slices; i++)
    {
      this.indices.push(i*2,2*i+1,2*i+2);
      this.indices.push(2*i+2,2*i+1,i*2);

      this.indices.push(2*i+1, 2*i+3, 2*i+2);
      this.indices.push(2*i+2, 2*i+3, 2*i+1);
    }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyLegs.prototype.display = function() {

   this.scene.pushMatrix();
   this.scene.scale(1,1,0.5);
   CGFobject.prototype.display.call(this);
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.translate(1,0,0.2);
   this.scene.scale(0.5,0.05,3 );
   this.base.display();
   this.scene.popMatrix();




  }
