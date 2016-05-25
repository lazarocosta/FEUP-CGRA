/**
 * MyHook
 * @constructor
 */
 function MyHook(scene) {
 	CGFobject.call(this, scene);

  this.hookTip = new MyUnitCubeQuad(this.scene);
  this.hook = new MyCilinder(this.scene, 3, 1);

  this.strain=1;
 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;


MyHook.prototype.setStrain = function(direction){
    if(direction == -1)
    {
      if(this.strain > 0.3)
        this.strain -= 0.1;
    }
    if(direction == 1)
    this.strain += 0.1;
  }


 MyHook.prototype.display = function() {


   this.scene.pushMatrix();
   this.scene.rotate(Math.PI/2,1,0,0);
   this.scene.scale(0.1,0.1,this.strain);
   this.hook.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(Math.PI/2,1,0,0);
   this.scene.translate(0,0,this.strain);
   this.scene.scale(0.2,0.2,0.2);
   this.hookTip.display();
   this.scene.popMatrix();
 }
