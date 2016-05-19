/**
 * MyDrone
 * @constructor
 */

var Rotation = function(speed) {
   //var t = 1 / speed; //Period - time necessary to complete one complete rotation;
   return (2 * Math.PI * 0.1) * speed;
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
   this.angleInclination = 0;
   this.x = 0;
   this.y = 0;
   this.z = 0;
   this.strain=1;


   this.cilinder1 = new MyCilinder(this.scene, 12, 1);
   this.cilinder2 = new MyCilinder(this.scene, 12, 1);
   this.body = new MyLamp(this.scene, 12, 12);
   this.circle = new MyCircle(this.scene, 12);
   this.frontArm = new MyArm(this.scene);
   this.sideArm = new MyArm(this.scene);
   this.backArm = new MyArm(this.scene);
   this.legs = new MyLegs(this.scene,12,1);
   this.hook = new MyCilinder(this.scene, 3, 1);
   this.box = new MyUnitCubeQuad(this.scene);

   this.incline = false;
   this.upBox= false;
   this.destination=false;


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

   this.ifLift();
   console.log("x:"+this.x+ " y:"+this.y+ " z:"+this.z);
   this.destDone();
};

MyDrone.prototype.ifLift = function(){

  var dy= this.y-this.strain;
  if(this.x>=1.90 && (this.x <= 2.1))
  {
    if((this.z <=-5.9) && (this.z >= -6.1))
    {
      if(dy>= -4.4 && dy<= -4.2)
        this.upBox=true;
    }
  }
}

MyDrone.prototype.destDone = function(){

  var dy= this.y-this.strain;

  if(this.x <-4.6 && this.x > -5.4)
    if(this.z < -0.3 && this.z> -1.3)
      if(dy < -0.6 && dy > -1.4)
        this.destination=true;
}


MyDrone.prototype.setStrain = function(direcion){

  if(direcion==-1)
  {
    if(this.strain > 0.6)
      this.strain-=0.1;
  }
  if(direcion==1)
  this.strain+=0.1;

  var esta= this.y-this.strain;
  console.log(esta);
  this.ifLift();
  this.destDone();


};


MyDrone.prototype.setIncline = function(tilt){
   this.incline = true;
   if(tilt == 1)
      this.angleInclination = 10;
   else if( tilt == -1)
      this.angleInclination = -10;
   else if (tilt == 0)
      this.incline = false;
};

MyDrone.prototype.up= function(value) {

   this.y += value;
   this.destDone();
   this.ifLift();

    var esta= this.y-this.strain;
    console.log(esta);
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

  this.z += ofset * Math.cos(this.angle * degToRad);

   if(!this.upBox)
   {
     this.scene.pushMatrix();
     this.scene.translate(2,-4.4,-6);
     this.box.display();
     this.scene.popMatrix();
 }

  if(this.destination)
  {
    this.scene.pushMatrix();
    this.scene.translate(-5,-0.8,-1);
    this.box.display();
    this.scene.popMatrix();
  }

   this.scene.translate(this.x, this.y, this.z);
   this.scene.rotate(this.angle * degToRad, 0, 1, 0);

   this.scene.pushMatrix();
   this.scene.rotate(Math.PI/2,1,0,0);
   this.scene.scale(0.1,0.1,this.strain);
   this.hook.display();
   this.scene.popMatrix();

   if(this.upBox && !this.destination)
   {
     this.scene.pushMatrix();
     this.scene.translate(0,-this.strain,0);
     this.box.display();
     this.scene.popMatrix();
   }

   if(this.incline){
      this.scene.rotate(this.angleInclination * degToRad, 1,0,0);
      //this.scene.rotate(this.angleInclination * this.angle, 0,1,0);
   }

   this.scene.pushMatrix();
   this.scene.translate(0, 0, -1.5);
   this.scene.scale(0.1, 0.1, 3);
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
   this.scene.boardAppearance.apply();
   this.body.display();
   this.scene.materialB.apply();
   this.circle.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(1.7, 0, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(-1.7, 0, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(0, 1.7, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(-Math.PI / 2, 1, 0, 0);
   this.scene.translate(0, -1.7, -0.15);
   this.scene.scale(0.17, 0.17, 0.25); //ultimo é a altura
   this.cilinder2.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.translate(1.7, 0.15, 0);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(this.sideArm.angle, 0, 0, 1);
   this.sideArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-1.7, 0.15, 0);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(this.sideArm.angle, 0, 0, 1);
   this.sideArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0, 0.15, 1.7);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(-this.frontArm.angle, 0, 0, 1);
   this.frontArm.display();
   this.scene.popMatrix(); //front

   this.scene.pushMatrix();
   this.scene.translate(0, 0.15, -1.7);
   this.scene.rotate(Math.PI / 2, 1, 0, 0);
   this.scene.rotate(-this.backArm.angle, 0, 0, 1);
   this.backArm.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(-0.5,-1.0,0.2);
   this.scene.rotate(Math.PI, 0, 1,0);
   this.scene.scale(0.9, 0.9, 0.9);
   this.legs.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0.5,-1.0,-0.2);
   this.scene.scale(0.9, 0.9, 0.9);
   this.legs.display();
   this.scene.popMatrix();
};
