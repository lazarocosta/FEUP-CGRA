/**
 *MyClockHand
 * @constructor
 */
 function MyClockHand(scene, width, length) {
 	CGFobject.call(this, scene);
  this.angle = 0;
  this.width = width;
  this.length = length;
  
 	this.quad = new MyQuad(this.scene,0,1,0,1);
 };

  MyClockHand.prototype = Object.create(CGFobject.prototype);
  MyClockHand.prototype.constructor =MyClockHand;

  MyClockHand.prototype.setAngle = function(angle){
  this.angle = angle*degToRad;
};

  MyClockHand.prototype.display = function() {

  this.scene.pushMatrix();

 //==========0
  this.scene.rotate(this.angle, 0, 0,1);
 //========
  this.scene.rotate(180*degToRad,0,1,0);
  this.scene.scale(this.width,this.length,1);
  this.scene.translate(0,0.5,0.01);//desloco o ponteiro para rodar em torno do eixo
  this.quad.display();
  this.scene.popMatrix();
 };
