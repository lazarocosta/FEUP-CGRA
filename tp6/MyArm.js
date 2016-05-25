/**
 * My Arm
 * @constructor
 */
function MyArm(scene) {
   CGFobject.call(this, scene);

   this.body = new MyHalfSphere(this.scene, 8, 8);
   this.arm = new MyCilinder(this.scene, 4, 4);
   this.angle = 0;

}

MyArm.prototype = Object.create(CGFobject.prototype);
MyArm.prototype.constructor = MyArm;

MyArm.prototype.setAngle = function(angle) {
   this.angle += (angle * this.scene.wingSpeed) % (Math.PI*2);
};


MyArm.prototype.display = function() {

   this.scene.pushMatrix();
      this.scene.scale(0.07, 0.30, 0.05);
      this.scene.translate(0.0, -1.0, 0.0);
      this.arm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
      this.scene.scale(0.07, 0.30, 0.05);
      this.scene.translate(0.0, 1.0, 0.0);
      this.arm.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.scene.scale(0.12, 0.12, 0.15);
      this.body.display();
   this.scene.popMatrix();
};
