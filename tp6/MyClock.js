/**
 * MyClock
 * @constructor
 */
function MyClock(scene, slices, stacks) {
   CGFobject.call(this, scene);

   this.hours = new MyClockHand(this.scene, 0.065, 0.5);
   this.minutes = new MyClockHand(this.scene, 0.065, 0.8);
   this.seconds = new MyClockHand(this.scene, 0.035, 0.9);
   this.circle = new MyCircle(this.scene, 12);
   this.cilinder = new MyCilinder(this.scene, 12, 1);
}

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;


MyClock.prototype.update = function(currTime) {

   var seconds = (currTime / 1000) % 60;
   var minutes = (currTime / (1000 * 60)) % 60;
   var hours = (currTime / (1000 * 3600)) % 60;

   this.seconds.setAngle(seconds * 360 / 60);
   this.minutes.setAngle(minutes * 360 / 60);
   this.hours.setAngle(hours * 360 / 12);

};

MyClock.prototype.display = function() {

   this.scene.pushMatrix();
   this.scene.materialB.apply();
   this.scene.translate(0, 0, -1);
   this.cilinder.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0, 0, 0.01);
   this.scene.rotate(180 * degToRad, 0, 1, 0);
   this.scene.clockAppearance.apply();
   this.circle.display();
   this.scene.popMatrix();

   //==============================
   this.scene.pushMatrix();
   this.scene.translate(0, 0, 0.01);
   this.scene.rotate(-30 * degToRad, 0, 0, 1); //nao sei porque mas o meu relogio estava atrasado uma hora em relaçao à hora normal
   this.scene.rotate(180 * degToRad, 0, 1, 0);
   this.scene.materialC.apply();
   this.hours.display();
   this.scene.popMatrix();
   //==================================
   this.scene.pushMatrix();
   this.scene.translate(0, 0, 0.01);
   this.scene.rotate(180 * degToRad, 0, 1, 0);
   this.minutes.display();
   this.scene.popMatrix();
   //============================
   this.scene.pushMatrix();
   this.scene.translate(0, 0, 0.01);
   this.scene.rotate(180 * degToRad, 0, 1, 0);
   this.seconds.display();
   this.scene.popMatrix();
};
