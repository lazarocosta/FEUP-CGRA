/**
 * MyDrone
 * @constructor
 */

var Rotation = function(speed) {
   var t = 1 / speed; //Period - time necessary to complete one complete rotation;
   return (2 * Math.PI * 0.1) / t;
};

var SPEED = {
   SLOW: Rotation(0.2),
   MEDIUM: Rotation(1),
   FAST: Rotation(10)
};

function MyDrone(scene) {
   CGFobject.call(this, scene);
   this.scene = scene;
   this.angle = 0;
   this.x = 0;
   this.y = 0;
   this.z = 0;

   this.cilinder1 = new MyCilinder(this.scene, 12, 1);
   this.cilinder2 = new MyCilinder(this.scene, 12, 1);
   this.body = new MyLamp(this.scene, 12, 12);
   this.circle = new MyCircle(this.scene, 12);
   this.frontArm = new MyArm(this.scene);
   this.sideArm = new MyArm(this.scene);
   this.backArm = new MyArm(this.scene);
   this.legs = new MyLegs(this.scene,12);

   this.initBuffers();
}

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;


MyDrone.prototype.initBuffers = function() {
   this.vertices = [
      0.5, 0.3, 0, -0.5, 0.3, 0,
      0, 0.3, 2,
   ];

   this.indices = [
      0, 1, 2,
      1, 0, 2,
   ];

   this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
   ];

   this.primitiveType = this.scene.gl.TRIANGLES;
   this.initGLBuffers();
};

MyDrone.prototype.setAngle = function(angle) {
   this.angle += angle;

};

MyDrone.prototype.move = function(ofset) {

   var x = this.x;
   var z = this.z;

   this.x += ofset * Math.sin(this.angle * degToRad);
   this.z += ofset * Math.cos(this.angle * degToRad);

   if (this.x > 4.5) {
      this.x = 4.5;
      this.z = z;
   }

   if (this.z > 4.3) {
      this.z = 4.3;
      this.x = x;
   }
   //console.log(this.x, this.z);
};

MyDrone.prototype.up = function(ofset) {

   this.y += ofset;
   if (this.y < -4.75)
      this.y = -4.75;
};

MyDrone.prototype.update = function(DIRECTION) {
   switch (DIRECTION) {
      case this.scene.DIRECTION.STATIC:
         this.frontArm.setAngle(SPEED.MEDIUM);
         this.sideArm.setAngle(SPEED.MEDIUM);
         this.backArm.setAngle(SPEED.MEDIUM);
         break;
      case this.scene.DIRECTION.ROTATION:
         this.frontArm.setAngle(SPEED.SLOW);
         this.sideArm.setAngle(SPEED.FAST);
         this.backArm.setAngle(SPEED.SLOW);
         break;
      case this.scene.DIRECTION.TRANSLATION:
         this.frontArm.setAngle(SPEED.SLOW);
         this.sideArm.setAngle(SPEED.MEDIUM);
         this.backArm.setAngle(SPEED.FAST);
         //   default:
         //      break;

   }
};

MyDrone.prototype.display = function() {

   // this.scene.rotate(20 * degToRad,0,1,0);
   this.scene.translate(this.x, this.y, this.z);
   this.scene.rotate(this.angle * degToRad, 0, 1, 0);

   this.scene.pushMatrix();
   this.scene.translate(0, 0, -1.5);
   this.scene.scale(0.2, 0.2, 3);
   this.cilinder1.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-1.5, 0, 0);
   this.scene.rotate(Math.PI / 2, 0, 1, 0);
   this.scene.scale(0.2, 0.2, 3);
   this.cilinder1.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.boardAppearance.apply();
   this.body.display();
   this.scene.materialB.apply();
   this.circle.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(1.7, 0, -0.15);
   this.scene.scale(0.3, 0.3, 0.35); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(-1.7, 0, -0.15);
   this.scene.scale(0.3, 0.3, 0.35); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(0, 1.7, -0.15);
   this.scene.scale(0.3, 0.3, 0.35); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(0, -1.7, -0.15);
   this.scene.scale(0.3, 0.3, 0.35); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.translate(1.7, 0.35, 0);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(this.sideArm.angle, 0, 0, 1);
   this.sideArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-1.7, 0.35, 0);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(this.sideArm.angle, 0, 0, 1);
   this.sideArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0, 0.35, 1.7);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(-this.frontArm.angle, 0, 0, 1);
   this.frontArm.display();
   this.scene.popMatrix(); //front

   this.scene.pushMatrix();
   this.scene.translate(0, 0.35, -1.7);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(-this.backArm.angle, 0, 0, 1);
   this.backArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-0.5,-1.2,0.2);
   this.scene.rotate(Math.PI, 0, 1,0);
   this.legs.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0.5,-1.2,-0.2);
   this.legs.display();
   this.scene.popMatrix();

};
