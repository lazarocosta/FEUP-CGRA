/**
 * MyLegs
 * @constructor
 */
function MyLegs(scene, slices, stacks) {
   CGFobject.call(this, scene);

   this.slices = slices;
   this.stacks = stacks;
   this.angulo = (2 * Math.PI) / (4 * this.slices);
   this.increZ = 1 / this.stacks;
   this.base = new MyUnitCubeQuad(this.scene);
   //  this.textS = 1.0 / this.slices;
   //this.textT = 1.0 / this.stacks;

   this.initBuffers();
}

MyLegs.prototype = Object.create(CGFobject.prototype);
MyLegs.prototype.constructor = MyLegs;

MyLegs.prototype.initBuffers = function() {

   this.vertices = [];
   this.indices = [];
   this.normals = [];
   //this.texCoords = [];

   var x, y, z, i, j;

   for (i = 0; i <= this.slices; i++) {
      x = Math.cos(i * this.angulo);
      y = Math.sin(i * this.angulo);
      z = 0;

      this.vertices.push(x, y, z);
      this.normals.push(x, y, z);

      for (j = 0; j < this.stacks - 1; j++) {
         z += this.increZ;
         this.vertices.push(x, y, z);
         this.normals.push(x, y, z);

      }

      z += this.increZ;
      this.vertices.push(x, y, z);
      this.normals.push(x, y, z);
   }

   for (i = 0; i < this.slices; i++) {
      this.indices.push(i * (this.stacks + 1), (this.stacks + 1) * i + 1, (this.stacks + 1) * i + (this.stacks + 1));
      this.indices.push((this.stacks + 1) * i + (this.stacks + 1), (this.stacks + 1) * i + 1, (this.stacks + 1) * i + (this.stacks + 1) + 1);

      for (j = 1; j < this.stacks; j++) {
         this.indices.push(i * (this.stacks + 1) + j, i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j);
         this.indices.push((i + 1) * (this.stacks + 1) + j, i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j + 1); //
         //
         this.indices.push((i + 1) * (this.stacks + 1) + j, i * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j);
         this.indices.push((i + 1) * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j);

      }
      this.indices.push((this.stacks + 1) * i + (this.stacks + 1), (this.stacks + 1) * i + 1, i * (this.stacks + 1));
      this.indices.push((this.stacks + 1) * i + (this.stacks + 1) + 1, (this.stacks + 1) * i + 1, (this.stacks + 1) * i + (this.stacks + 1));

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
   this.scene.translate(0, 0.2, -0.6);
   this.scene.scale(1, 1, 0.25);
   CGFobject.prototype.display.call(this);
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(1, 0.2, 0.2);
   this.scene.scale(0.5, 0.25, 3);
   this.base.display();
   this.scene.popMatrix();
};
