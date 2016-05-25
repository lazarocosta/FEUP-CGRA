/**
 * MyCircle
 * @constructor
 */
function MyCircle(scene, slices) {
   CGFobject.call(this, scene);

   this.slices = slices;
   this.initBuffers();
}

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function() {
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
   this.texCoords = [];

   var ang = 2 * Math.PI / this.slices;
   var x;
   var y;

   for (var m = 0; m < this.slices; m++) {
      x = Math.cos(ang * m);
      y = Math.sin(ang * m);
      this.vertices.push(x, y, 0);
      this.normals.push(x, y, 0);
      this.texCoords.push(0.5 - 0.5 * x, 0.5 - 0.5 * y);

   }

   this.vertices.push(0, 0, 0); //center
   this.normals.push(0, 0, 1);

   var center = this.vertices[length - 1];

   for (i = 0; i < this.slices - 1; i++)
      this.indices.push(i + 1, i, center);

   this.primitiveType = this.scene.gl.TRIANGLES;
   this.initGLBuffers();
};
