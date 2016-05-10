/**
 * My Arm
 * @constructor
 */
 function MyArm(scene) {
 	CGFobject.call(this, scene);

 	this.body= new MyLamp(this.scene,12,12);
  this.arm= new MyCilinder(this.scene,12,12);

 };

 MyArm.prototype = Object.create(CGFobject.prototype);
 MyArm.prototype.constructor = MyArm;

 MyArm.prototype.setAngle = function(angle, direction) {
 }
 

 MyArm.prototype.display = function() {

   this.scene.pushMatrix();
   	this.scene.scale(0.15, 0.4, 0.15);
   	this.scene.translate(0.0, -1.0, 0.0);
   	this.arm.display();
   	this.scene.popMatrix();

    this.scene.pushMatrix();
     this.scene.scale(0.15, 0.4, 0.15);
     this.scene.translate(0.0, 1.0, 0.0);
     this.arm.display();
     this.scene.popMatrix();


   	this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 1,0,0)
   	this.scene.scale(0.15, 0.15, 0.15);

   	this.body.display();
   	this.scene.popMatrix();
 }
