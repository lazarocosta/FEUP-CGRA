/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.angulo = 2*Math.PI / slices;
  this.circle = new MyCircle(this.scene, slices);

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
  this.indices = [];
  this.normals = [];

  var norm = this.angulo/2;
  var z;
  var incre_z= 1/this.stacks;

  for(i=0; i<this.slices; i++)
  {
    var x;
    var y;
    z=0

	 for(stack=0; stack < this.stacks; stack++)
	 {
    x = Math.cos((i+1)*this.angulo);
    y = Math.sin((i+1)*this.angulo);

    this.vertices.push(x,y,z);
    this.vertices.push(x,y,z+incre_z);

    x = Math.cos(i*this.angulo);
    y = Math.sin(i*this.angulo);

    this.vertices.push(x,y,z);
    this.vertices.push(x,y,z+incre_z);

    this.indices.push(4*i*this.stacks+4*stack,4*i*this.stacks+4*stack+1,4*i*this.stacks+4*stack+2);
    this.indices.push(4*i*this.stacks+4*stack+3, 4*i*this.stacks+4*stack+2, 4*i*this.stacks+4*stack+1);

	  z +=incre_z;

    for(j=0; j < 4; j++)
     this.normals.push(Math.cos(norm), Math.sin(norm), 0);
	 }
   this.norm += this.angulo;

  }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

MyPrism.prototype.display = function() {

   CGFobject.prototype.display.call(this);
    this.circle.display();
    this.scene.rotate(Math.PI,1,0,0);
    this.scene.translate(0,0,-1);
    this.circle.display();
  }
