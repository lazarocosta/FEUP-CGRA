/**
 * MyPrism
 * @constructor
 */
function MyCilinder(scene, slices, stacks) {
   CGFobject.call(this, scene);

   this.slices = slices;
   this.stacks = stacks;
   this.circle= new MyCircle(this.scene, slices);

   this.initBuffers();
}

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
   this.texCoords = [];

   var ang = 2 * Math.PI / this.slices;
      var n=0;
      var tCoord = 1;
      var sPatch = 1/this.slices;
      var tPatch = 1/this.stacks;
   //Vertices & Normals
   for (var ind = 0; ind <= this.stacks; ind++) {

      var sCoord = 0;

      for (var m = 0; m < this.slices; m++) {
         this.vertices.push(Math.cos(ang * m), Math.sin(ang * m), n);
         this.texCoords.push(sCoord, tCoord);
         this.normals.push(Math.cos(ang * m), Math.sin(ang * m), 0);
         sCoord += sPatch;
      }
      tCoord -= tPatch;
      n += 1/this.stacks;
   }

   //Indices
   for (var j = 0; j < this.stacks; j++) {
      for (var i = 0; i < (this.slices); i += 1) {
         this.indices.push((i + 1) % (this.slices) + (j + 0) * this.slices,
                           (i + 0) % (this.slices) + (j + 1) * this.slices,
                           (i + 0) % (this.slices) + (j + 0) * this.slices);

         this.indices.push((i + 0) % (this.slices) + (j + 1) * this.slices,
                           (i + 1) % (this.slices) + (j + 0) * this.slices,
                           (i + 1) % (this.slices) + (j + 1) * this.slices);
      }

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
};
