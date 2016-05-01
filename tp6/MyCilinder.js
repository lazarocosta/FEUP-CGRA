/**
 * MyPrism
 * @constructor
 */
 function MyCilinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.angulo = (2*Math.PI )/ slices;
  this.circle= new MyCircle(this.scene, slices);

 	this.initBuffers();
 };

MyCilinder.prototype = Object.create(CGFobject.prototype);
 MyCilinder.prototype.constructor = MyCilinder;

 MyCilinder.prototype.initBuffers = function() {
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

  var norm = 0;
  var z=0;
  var incre_z= 1/this.stacks;

   for(stack=0; stack < this.stacks+1;stack++)
    {
       var x;
      var y;


      for(slices=0; slices < this.slices; slices++)
      {
        x= Math.cos(norm);
        y= Math.sin(norm);

        	this.vertices.push(x,y,z);
          this.normals.push(x,y,1)

          norm += this.angulo

      }
      z += incre_z;
    }
for(pilha=0; pilha < this.stacks; pilha++)
{


    var lados=0;

   for(lados=0; lados < this.slices -1; lados++)
    {
      this.indices.push(lados+pilha*this.slices ,lados+1+pilha*this.slices,lados+this.slices+pilha*this.slices);
      this.indices.push(lados+this.slices+1+pilha*this.slices,lados+this.slices+pilha*this.slices, lados+1+pilha*this.slices);

    }
    this.indices.push(this.slices -1+pilha*this.slices,pilha*this.slices,(pilha+2) *this.slices -1);
    this.indices.push(pilha*this.slices,(pilha+1)*this.slices, (pilha+2) *this.slices -1);
  }



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyCilinder.prototype.display = function() {

		CGFobject.prototype.display.call(this);
    this.circle.display();
    this.scene.rotate(Math.PI,1,0,0);
    this.scene.translate(0,0,-1);
    this.circle.display();
  }
