/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

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

	var group=this.gui.addFolder("Luzes");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	group.add(this.scene, 'luz0');
	group.add(this.scene, 'luz1');
	group.add(this.scene, 'luz2');
	group.add(this.scene, 'luz3');
	group.add(this.scene, 'luz4');


	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	//this.gui.add(this.scene, 'speed', -5, 5);
//	this.gui.add(this.scene, 'Luzes');

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.drone.setAngle(10);
			break;
		case (97):	// only works for capital 'a', as it is
			this.scene.drone.setAngle(10);
			break;

		case (68):	// only works for capital 'D', as it is
			this.scene.drone.setAngle(-10);
			break;
		case (100):	// only works for capital 'd', as it is
			this.scene.drone.setAngle(-10);
				break;

		case (87):	// only works for capital 'W', as it is
			this.scene.drone.move(1);
			break;
	  case (119):	// only works for capital 'w', as it is
			this.scene.drone.move(1);
			break;

		case (83):	// only works for capital 'S', as it is
			this.scene.drone.move(-1);
			break;
		case (115):	// only works for capital 's', as it is
			this.scene.drone.move(-1);
			break;

		case (73):	// only works for capital 'I', as it is
			this.scene.drone.up(0.5);
			break;
		case (105):	// only works for capital 'i', as it is
			this.scene.drone.up(0.5);
			break;

		case (74):	// only works for capital 'J', as it is
			this.scene.drone.up(-0.5);
			break;
		case (106):	// only works for capital 'j', as it is
			this.scene.drone.up(-0.5);
			break;
	};
};