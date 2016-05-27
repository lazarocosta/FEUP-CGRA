/**
 * MyLegs
 * @constructor
 */
function MyLegs(scene, slices, stacks) {
   CGFobject.call(this, scene);

   this.slices = slices;
   this.stacks = stacks;
   this.increZ = 1 / this.stacks;
   this.base = new MyUnitCubeQuad(this.scene);

   this.initBuffers();
}

MyLegs.prototype = Object.create(CGFobject.prototype);
MyLegs.prototype.constructor = MyLegs;

MyLegs.prototype.initBuffers = function() {

      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var ang = (2 * Math.PI) / (4 * this.slices);
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
         for (var i = 0; i < (this.slices-1); i += 1) {
            this.indices.push((i + 1) % (this.slices) + (j + 0) * this.slices,
                              (i + 0) % (this.slices) + (j + 1) * this.slices,
                              (i + 0) % (this.slices) + (j + 0) * this.slices);

            this.indices.push((i + 0) % (this.slices) + (j + 0) * this.slices,
                              (i + 0) % (this.slices) + (j + 1) * this.slices,
                              (i + 1) % (this.slices) + (j + 0) * this.slices);

            this.indices.push((i + 0) % (this.slices) + (j + 1) * this.slices,
                              (i + 1) % (this.slices) + (j + 0) * this.slices,
                              (i + 1) % (this.slices) + (j + 1) * this.slices);

            this.indices.push((i + 1) % (this.slices) + (j + 1) * this.slices,
                              (i + 1) % (this.slices) + (j + 0) * this.slices,
                              (i + 0) % (this.slices) + (j + 1) * this.slices);
         }

      }

   this.primitiveType = this.scene.gl.TRIANGLES;
   this.initGLBuffers();
};

MyLegs.prototype.display = function() {

   this.scene.pushMatrix();
   this.scene.translate(0, 0.2, 0.65);
   this.scene.scale(1, 1, 0.25);
   CGFobject.prototype.display.call(this);
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0, 0.2, -0.65);
   this.scene.scale(1, 1, 0.25);
   CGFobject.prototype.display.call(this);
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(1, 0.2, 0.2);
   this.scene.scale(0.3, 0.25, 3);
   this.base.display();
   this.scene.popMatrix();
};
