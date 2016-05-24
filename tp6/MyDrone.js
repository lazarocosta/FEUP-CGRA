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
   this.rotacion;
   this.incline = false;
   this.upBox= false;
   this.destination=false;


   this.cilinder1 = new MyCilinder(this.scene, 12, 1);
   this.cilinder2 = new MyCilinder(this.scene, 12, 1);
   this.body = new MyLamp(this.scene, 12, 12);
   this.circle = new MyCircle(this.scene, 12);
   this.frontArm = new MyArm(this.scene);
   this.sideArm = new MyArm(this.scene);
   this.backArm = new MyArm(this.scene);
   this.legs = new MyLegs(this.scene,12,1);
   this.box = new MyUnitCubeQuad(this.scene);
   this.hook=new MyHook(this.scene);


   this.initBuffers();
}

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;


/*MyDrone.prototype.initBuffers = function() {
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
};*/

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
  if(this.x>=1.60 && (this.x <= 2.1))
  {
    if((this.z <=-5.7) && (this.z >= -6.3))
    {
      if(dy>= -4.2   && dy<= -3.8)
        this.upBox=true;
    }
  }
}

MyDrone.prototype.destDone = function(){

  var dy= this.y-this.strain;

  if(this.x <-4.75 && this.x > -6)
    if(this.z < -0.5 && this.z> -2)
      if(dy < -0.3 && dy > -0.7)
        {
          this.destination=true;
          this.rotacion=  this.angle;
        }

}


MyDrone.prototype.setStrain = function(direcion){

  if(direcion==-1)
  {
    if(this.strain > 0.3)
      this.strain-=0.1;
  }
  if(direcion==1)
  this.strain+=0.1;

  this.hook.setStrain(direcion);

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

  //this.z += ofset * Math.cos(this.angle * degToRad);

   if(!this.upBox)
   {
     this.scene.pushMatrix();
     this.scene.translate(2,-4.4,-6);
     this.scene.fronteAppearance.apply();
     this.box.display();
     this.scene.popMatrix();
 }

  if(this.destination)
  {
    this.scene.pushMatrix();
    this.scene.translate(-5,-0.8,-1);
    this.scene.rotate(this.rotacion * degToRad, 0, 1, 0);
    this.scene.fronteAppearance.apply();
    this.box.display();
    this.scene.popMatrix();
  }

   this.scene.translate(this.x, this.y, this.z);
   this.scene.rotate(this.angle * degToRad, 0, 1, 0);

    this.scene.greyAppearance.apply();
    this.hook.display();

   if(this.upBox && !this.destination)
   {
     this.scene.pushMatrix();
     this.scene.translate(0,-this.strain-0.55,0);
     this.scene.boxAppearance.apply();
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
   this.scene.translate(-0.5,-1.0,0.2);
   this.scene.rotate(Math.PI, 0, 1,0);
   this.scene.scale(0.9, 0.9, 0.9);
  this.scene.backAppearance.apply();
   this.legs.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.translate(0.5,-1.0,-0.2);
   this.scene.scale(0.9, 0.9, 0.9);
   this.legs.display();
   this.scene.popMatrix();
};
