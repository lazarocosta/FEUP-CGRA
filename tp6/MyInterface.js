/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
   //call CGFinterface constructor
   CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
   // call CGFinterface init
   CGFinterface.prototype.init.call(this, application);

   // init GUI. For more information on the methods, check:
   //  http://workshop.chromeexperiments.com/examples/gui
   this.gui = new dat.GUI();

   // add a button:
   // the first parameter is the object that is being controlled (in this case the scene)
   // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
   // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

   this.gui.add(this.scene, 'UpdateTime');

   // add a group of controls (and open/expand by defult)
   var group = this.gui.addFolder("Luzes");
   group.open();

   group.add(this.scene, 'luz0');
   group.add(this.scene, 'luz1');
   group.add(this.scene, 'luz2');
   group.add(this.scene, 'luz3');
   group.add(this.scene, 'luz4');

	this.gui.add(this.scene, 'wingSpeed', 0.1, 2.0);
   this.gui.add(this.scene, 'currDroneAppearance', this.scene.droneAppearanceList);

   return true;
};

/**
 * processKeyUp
 * @param event {Event}
 */
MyInterface.prototype.processKeyUp = function(event) {
   // call CGFinterface default code (omit if you want to override)
   CGFinterface.prototype.processKeyUp.call(this, event);
	this.scene.currentDIR = this.scene.DIRECTION.STATIC;
};


/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
   // call CGFinterface default code (omit if you want to override)
   CGFinterface.prototype.processKeyboard.call(this, event);

   // Check key codes e.g. here: http://www.asciitable.com/
   // or use String.fromCharCode(event.keyCode) to compare chars

   // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
   switch (event.which || event.keyCode) {
      //A
      case (65): // Uppercase
      case (97): // Lowercase
         this.scene.currentDIR = this.scene.DIRECTION.ROTATION_LEFT;
         break;
      //D
      case (68): // Uppercase
      case (100): // Lowercase
			this.scene.currentDIR = this.scene.DIRECTION.ROTATION_RIGHT;
         break;
      //W
      case (87): // Uppercase
      case (119): // Lowercase
			this.scene.currentDIR = this.scene.DIRECTION.FORWARD;
         break;
      //S
      case (83): // Uppercase
      case (115): // Lowercase
			this.scene.currentDIR = this.scene.DIRECTION.BACKWARD;
         break;
      //I
      case (73): // Uppercase
      case (105): // Lowercase
         this.scene.currentDIR = this.scene.DIRECTION.UP;
         break;
      //J
      case (74): // Uppercase
      case (106): // Lowercase
         this.scene.currentDIR = this.scene.DIRECTION.DOWN;
         break;
      //P
      case (80): // Uppercase
      case (112): // Lowercase
          this.scene.drone.setStrain(-1);
          break;
      //L
      case (76): // Uppercase
      case (108): // Lowercase
          this.scene.drone.setStrain(1);
          break;
   }
};
