/**
 * MyDrone
 * @constructor
 */

var Rotation = function(speed) {
   //var t = 1 / speed; //Period - time necessary to complete one complete rotation;
   return 2 * Math.PI * speed;
};



function MyDrone(scene) {
   CGFobject.call(this, scene);

   this.scene = scene;
   this.angle = 0;
   this.movementTilt = 0;
   this.x = 0;
   this.y = 0;
   this.z = 0;
   this.strain = 1;
   this.rotation = 0;
   this.upBox = false;
   this.destination = false;

   this.SPEED = {
      SLOW: Rotation(0.2 * this.scene.UPDATE_PERIOD * 0.001),
      MEDIUM: Rotation(1 * this.scene.UPDATE_PERIOD * 0.001),
      FAST: Rotation(10 * this.scene.UPDATE_PERIOD * 0.001)
   };

   this.cilinder1 = new MyCilinder(this.scene, 12, 1);
   this.cilinder2 = new MyCilinder(this.scene, 12, 1);
   this.body = new MyHalfSphere(this.scene, 12, 12);
   this.circle = new MyCircle(this.scene, 12);
   this.frontArm = new MyArm(this.scene);
   this.sideArm = new MyArm(this.scene);
   this.backArm = new MyArm(this.scene);
   this.legs = new MyLegs(this.scene, 5, 1);
   this.box = new MyUnitCubeQuad(this.scene);
   this.hook = new MyHook(this.scene);


   this.initBuffers();
}

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.setAngle = function(angle) {
   this.angle += angle;
};

MyDrone.prototype.move = function(horMov, vertMov) {

   //var x = this.x;
   //var z = this.z;

   this.x += horMov * Math.sin(this.angle * degToRad);
   this.z += horMov * Math.cos(this.angle * degToRad);
   this.y += vertMov;

   this.ifLift();
   //console.log("x:" + this.x + " y:" + this.y + " z:" + this.z);
   this.destDone();
};

MyDrone.prototype.ifLift = function() {

   var dy = this.y - this.strain;
   if (this.x >= 1.60 && (this.x <= 2.1)) {
      if ((this.z <= -5.7) && (this.z >= -6.3)) {
         if (dy >= -4.2 && dy <= -3.8)
            this.upBox = true;
      }
   }
};

MyDrone.prototype.destDone = function() {

   var dy = this.y - this.strain;

   if (this.x < -4.75 && this.x > -6)
      if (this.z < -0.5 && this.z > -2)
         if (dy < -0.7 && dy > -1.5) {
            this.destination = true;
            this.rotation = this.angle;
         }

};


MyDrone.prototype.setStrain = function(direcion) {

   if (direcion == -1) {
      if (this.strain > 0.3)
         this.strain -= 0.1;
   }
   if (direcion == 1)
      this.strain += 0.1;

   this.hook.setStrain(direcion);

   var esta = this.y - this.strain;
   console.log(esta);
   this.ifLift();
   this.destDone();


};


MyDrone.prototype.setIncline = function(tilt) {
   if (tilt === 1)         this.movementTilt += 10;
   else if (tilt === -1)   this.movementTilt -= 10;
   else if (tilt === 0){
      if(this.movementTilt < 0)
         this.movementTilt += 5;
      else if(this.movementTilt > 0)
         this.movementTilt -= 5;
   }
   if(this.movementTilt > 55)
      this.movementTilt = 55;
   else if(this.movementTilt < -55)
      this.movementTilt = -55;
};

MyDrone.prototype.up = function(value) {

   this.y += value;
   this.destDone();
   this.ifLift();

   var esta = this.y - this.strain;
   console.log(esta);
};

MyDrone.prototype.update = function(DIRECTION) {
   switch (DIRECTION) {
      case this.scene.DIRECTION.STATIC:
         this.frontArm.setAngle(this.SPEED.MEDIUM);
         this.sideArm.setAngle(this.SPEED.MEDIUM);
         this.backArm.setAngle(this.SPEED.MEDIUM);
         this.setIncline(0);
         break;
      case this.scene.DIRECTION.ROTATION_LEFT:
         this.frontArm.setAngle(this.SPEED.SLOW);
         this.sideArm.setAngle(this.SPEED.FAST);
         this.backArm.setAngle(this.SPEED.SLOW);
         this.setIncline(0);
         this.setAngle(5);
         break;
      case this.scene.DIRECTION.ROTATION_RIGHT:
         this.frontArm.setAngle(this.SPEED.SLOW);
         this.sideArm.setAngle(this.SPEED.FAST);
         this.backArm.setAngle(this.SPEED.SLOW);
         this.setIncline(0);
         this.setAngle(-5);
         break;
      case this.scene.DIRECTION.FORWARD:
         this.frontArm.setAngle(this.SPEED.SLOW);
         this.sideArm.setAngle(this.SPEED.MEDIUM);
         this.backArm.setAngle(this.SPEED.FAST);
         this.setIncline(1);
         this.move(0.25,0);
         break;
      case this.scene.DIRECTION.BACKWARD:
         this.frontArm.setAngle(this.SPEED.FAST);
         this.sideArm.setAngle(this.SPEED.MEDIUM);
         this.backArm.setAngle(this.SPEED.SLOW);
         this.setIncline(-1);
         this.move(-0.25,0);
         break;
      case this.scene.DIRECTION.UP:
         this.setIncline(0);
         this.move(0,0.25);
         break;
      case this.scene.DIRECTION.DOWN:
         this.setIncline(0);
         this.move(0,-0.25);
         break;
   }
};

MyDrone.prototype.display = function() {

   //this.z += ofset * Math.cos(this.angle * degToRad);

   if (!this.upBox) {
      this.scene.pushMatrix();
      this.scene.translate(2, -4.4, -6);
      this.scene.frontAppearance.apply();
      this.box.display();
      this.scene.popMatrix();
   }

   if (this.destination) {
      this.scene.pushMatrix();
      this.scene.translate(-5, -0.8, -1);
      this.scene.rotate(this.rotation * degToRad, 0, 1, 0);
      this.scene.frontAppearance.apply();
      this.box.display();
      this.scene.popMatrix();
   }

   this.scene.translate(this.x, this.y, this.z);
   this.scene.rotate(this.angle * degToRad, 0, 1, 0);

   this.scene.greyAppearance.apply();
   this.hook.display();

   if (this.upBox && !this.destination) {
      this.scene.pushMatrix();
      this.scene.translate(0, -this.strain - 0.55, 0);
      this.scene.boxAppearance.apply();
      this.box.display();
      this.scene.popMatrix();
   }


   this.scene.rotate(this.movementTilt * degToRad, 1, 0, 0);

   this.scene.pushMatrix();
   this.scene.translate(0, 0, -1.5);
   this.scene.scale(0.1, 0.1, 3);
   this.scene.boxAppearance.apply();
   this.cilinder1.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-1.5, 0, 0);
   this.scene.rotate(Math.PI / 2, 0, 1, 0);
   this.scene.scale(0.1, 0.1, 3);
   this.cilinder1.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.scale(0.85, 0.85, 0.85);
   this.scene.blueAppearance.apply();
   this.body.display();
   this.scene.materialA.apply();
   this.circle.display();
   this.scene.popMatrix();

   /*fronte*/
   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(0, -1.66, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.scene.boxAppearance.apply();
   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(1.66, 0, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.scene.materialA.apply();
   this.cilinder2.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(-1.66, 0, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(0, 1.66, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura

   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0, 0.15, 1.7);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(-this.frontArm.angle, 0, 0, 1);
   this.scene.GreenAppearance.apply();
   this.frontArm.display();
   this.scene.popMatrix(); //front

   this.scene.pushMatrix();
   this.scene.translate(1.7, 0.15, 0);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(this.sideArm.angle, 0, 0, 1);
   this.scene.VioAppearance.apply();
   this.sideArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-1.7, 0.15, 0);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(this.sideArm.angle, 0, 0, 1);
   this.sideArm.display();
   this.scene.popMatrix();



   this.scene.pushMatrix();
   this.scene.translate(0, 0.15, -1.7);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(-this.backArm.angle, 0, 0, 1);
   this.backArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-0.5, -0.6, 0.2);
   this.scene.rotate(Math.PI, 0, 1, 0);
   this.scene.scale(0.7, 0.5, 0.7);
   this.scene.backAppearance.apply();
   this.legs.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0.5, -0.6, -0.2);
   this.scene.scale(0.7, 0.5, 0.7);
   this.legs.display();
   this.scene.popMatrix();
};
