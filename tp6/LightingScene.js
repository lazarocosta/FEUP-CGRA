var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 100;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
   CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
   CGFscene.prototype.init.call(this, application);

   this.initCameras();

   this.initLights();

   this.UPDATE_PERIOD = 50;
   this.DIRECTION = {
      STATIC:           0,
      ROTATION_LEFT:    1,
      ROTATION_RIGHT:   2,
      FORWARD:          3,
      BACKWARD:         4,
      UP:               5,
      DOWN:             6
   };
   this.droneAppearanceList = {
      CAMOUFLAGE : 1,
      BAMBOO : 2,
      DEFAULT: 10
   };
   this.currentDIR = this.DIRECTION.STATIC;

   this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
   this.gl.clearDepth(100.0);
   this.gl.enable(this.gl.DEPTH_TEST);
   this.gl.enable(this.gl.CULL_FACE);
   this.gl.depthFunc(this.gl.LEQUAL);

   this.axis = new CGFaxis(this);

   // Scene elements
   this.table = new MyTable(this);
   this.wall = new Plane(this);
   this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
   this.floor = new MyQuad(this, 0, 10, 0, 12);
   this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.5, 1.5, 0, 1);
   this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
   //this.droneAppearance = ['hey', 'ho', 'heeeey'];
   this.currDroneAppearance = this.droneAppearanceList.DEFAULT;
   this.cilinder = new MyCilinder(this, 8, 4);
   this.clock = new MyClock(this, 12, 1);
   this.drone = new MyDrone(this);
   this.target = new MyCircle(this, 15);

   this.luz0 = true;
   this.luz1 = true;
   this.luz2 = true;
   this.luz3 = true;
   this.luz4 = true;
   this.wingSpeed = 1;
   this.UpdateTime = true;

   // Materials
   this.materialDefault = new CGFappearance(this);

   this.materialA = new CGFappearance(this);
   this.materialA.setAmbient(0.2, 0.2, 0.2, 1);
   this.materialA.setDiffuse(0.2, 0.2, 0.2, 1);
   this.materialA.setSpecular(0.1, 0.1, 0.1, 1);
   this.materialA.setShininess(1);

   this.materialB = new CGFappearance(this);
   this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
   this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
   this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
   this.materialB.setShininess(1);

   this.materialC = new CGFappearance(this);
   this.materialC.setAmbient(0, 0, 0, 1);
   this.materialC.setDiffuse(0, 0, 0, 1);
   this.materialC.setSpecular(0, 0, 0, 1);
   this.materialC.setShininess(1);

   this.tableAppearance = new CGFappearance(this);
   this.tableAppearance.setAmbient(0.3, 0.3, 0.3, 1);
   this.tableAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
   this.tableAppearance.setSpecular(0.2, 0.2, 0, 2, 1);
   this.tableAppearance.setShininess(20);
   this.tableAppearance.loadTexture("..//resources//images//table.png");

   this.woodAppearance = new CGFappearance(this);
   this.woodAppearance.setAmbient(0.3, 0.3, 0.3, 1);
   this.woodAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
   this.woodAppearance.setSpecular(0.2, 0.2, 0, 2, 1);
   this.woodAppearance.setShininess(20);
   this.woodAppearance.loadTexture("..//resources//images//wood.png");

   this.floorAppearance = new CGFappearance(this);
   this.floorAppearance.loadTexture("..//resources//images//floor.png");

   this.windowAppearance = new CGFappearance(this);
   this.windowAppearance.loadTexture("..//resources//images//window.png");
   this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

   this.slidesAppearance = new CGFappearance(this);
   this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
   this.slidesAppearance.setShininess(20);
   this.slidesAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
   this.slidesAppearance.loadTexture("..//resources//images//slides.png");
   this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

   this.boardAppearance = new CGFappearance(this);
   this.boardAppearance.setSpecular(0.4, 0.4, 0.4, 1.0);
   this.boardAppearance.setShininess(150);
   this.boardAppearance.setDiffuse(0.2, 0.2, 0.2, 1.0);
   this.boardAppearance.loadTexture("..//resources//images//board.png");

   this.clockAppearance = new CGFappearance(this);
   this.clockAppearance.loadTexture("..//resources//images//clock.png");

   this.targetAppearance = new CGFappearance(this);
   this.targetAppearance.loadTexture("..//resources//images//alvo.png");

   this.boxAppearance = new CGFappearance(this);
   this.boxAppearance.loadTexture("..//resources//images//box.png");

   this.frontAppearance = new CGFappearance(this);
   this.frontAppearance.loadTexture("..//resources//images//dronefront.png");

   this.backAppearance = new CGFappearance(this);
   this.backAppearance.loadTexture("..//resources//images//droneback.png");

   this.blueAppearance = new CGFappearance(this);
   this.blueAppearance.loadTexture("..//resources//images//azul.png");

   this.GreenAppearance = new CGFappearance(this);
   this.GreenAppearance.loadTexture("..//resources//images//verde.png");

   this.VioAppearance = new CGFappearance(this);
   this.VioAppearance.loadTexture("..//resources//images//violeta.png");

   this.greyAppearance = new CGFappearance(this);
   this.greyAppearance.loadTexture("..//resources//images//cinza.png");

   this.cameoAppearance = new CGFappearance(this);
   this.cameoAppearance.loadTexture("..//resources//images//camouflage.png");

   this.enableTextures(true);
   this.setUpdatePeriod(this.UPDATE_PERIOD);

};

LightingScene.prototype.initCameras = function() {
   this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
   //this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
   this.setGlobalAmbientLight(0, 0, 0, 1.0);

   // Positions for four lights

   this.lights[0].setPosition(7.25, 7.25, 3, 1);
   this.lights[0].setAmbient(1, 1, 1, 1);
   this.lights[0].setDiffuse(1, 1, 1, 1);
   this.lights[0].setSpecular(1, 1, 1, 1);
   this.lights[0].enable();
   this.lights[0].visible = true;

   this.lights[1].setPosition(10.5, 6, 1, 1.0);
   this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
   this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
   this.lights[1].enable();

   this.lights[2].setPosition(10.5, 6, 5, 1.0);
   this.lights[2].setAmbient(0, 0, 0, 1);
   this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
   this.lights[2].setSpecular(1, 1, 1, 1);
   this.lights[2].setConstantAttenuation(0);
   this.lights[2].setLinearAttenuation(1.0);
   this.lights[2].setQuadraticAttenuation(0);
   this.lights[2].enable();

   this.lights[3].setPosition(4, 6, 5, 1);
   this.lights[3].setAmbient(0, 0, 0, 1);
   this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
   this.lights[3].setSpecular(1, 1, 0, 1);
   this.lights[3].setConstantAttenuation(0);
   this.lights[3].setLinearAttenuation(0);
   this.lights[3].setQuadraticAttenuation(1.0);
   this.lights[3].enable();

   this.lights[4].setPosition(1, 6, 7.5, 1);
   this.lights[4].setAmbient(0, 0, 0, 1);
   this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
   this.lights[4].setSpecular(1, 1, 1, 1);
   this.lights[4].setConstantAttenuation(0);
   this.lights[4].setLinearAttenuation(0);
   this.lights[4].setQuadraticAttenuation(1.0);
   this.lights[4].enable();


};

LightingScene.prototype.updateLights = function() {
   for (i = 0; i < this.lights.length; i++)
      this.lights[i].update();
};


LightingScene.prototype.display = function() {
   // ---- BEGIN Background, camera and axis setup

   // Clear image and depth buffer everytime we update the scene
   this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
   this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
   // Initialize Model-View matrix as identity (no transformation)
   this.updateProjectionMatrix();
   this.loadIdentity();
   // Apply transformations corresponding to the camera position relative to the origin
   this.applyViewMatrix();
   // Update all lights used
   this.updateLights();
   // Draw axis
   this.axis.display();

   this.materialDefault.apply();
   // Floor
   this.pushMatrix();
      this.translate(7.5, 0, 7.5);
      this.rotate(-90 * degToRad, 1, 0, 0);
      this.scale(15, 15, 0.2);
      this.floorAppearance.apply();
      this.floor.display();
   this.popMatrix();

   // Left Wall
   this.pushMatrix();
      this.translate(0, 4, 7.5);
      this.rotate(90 * degToRad, 0, 1, 0);
      this.scale(15, 8, 0.2);
      this.windowAppearance.apply();
      this.leftWall.display();
   this.popMatrix();

   // Plane Wall
   this.pushMatrix();
      this.translate(7.5, 4, 0);
      this.scale(15, 8, 0.2);
      this.materialDefault.apply();
      this.wall.display();
   this.popMatrix();

   // First Table
   this.pushMatrix();
   this.translate(5, 0, 8);
   this.table.display();
   this.popMatrix();

   // Second Table
   this.pushMatrix();
   this.translate(12, 0, 8);
   this.table.display();
   this.popMatrix();

   // Board A
   this.pushMatrix();
   this.translate(4, 4.5, 0.2);
   this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
   this.slidesAppearance.apply();
   this.boardA.display();
   this.popMatrix();

   // Board B
   this.pushMatrix();
   this.translate(10.5, 4.5, 0.2);
   this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
   this.boardAppearance.apply();
   this.boardB.display();
   this.popMatrix();


   // cylinder
   this.pushMatrix();
   this.translate(5, 3.7, 7.9);
   this.rotate(-Math.PI / 2, 1, 0, 0);
   this.scale(0.8, 0.8, 0.8);
   this.greyAppearance.apply();
   this.cilinder.display();
   this.popMatrix();




   this.pushMatrix();
   this.rotate(Math.PI, 0, 1, 0);
   this.translate(-7.25, 7.25, -0.5);
   this.scale(1, 1, 0.5);
   this.rotate(180 * degToRad, 0, 1, 0);
   this.clock.display();
   this.popMatrix();

   this.pushMatrix();
   this.translate(7, 5, 7);
   this.rotate(-180 * degToRad, 0, 1, 0);
   this.materialB.apply();
   this.drone.display();
   this.popMatrix();

   this.pushMatrix();
   this.translate(12, 3.67, 8);
   this.scale(1.5, 1, 1.5);
   this.rotate(Math.PI / 2, 1, 0, 0);
   this.targetAppearance.apply();
   this.target.display();
   this.popMatrix();



   //==========================lights
   this.lights[0].setVisible(this.luz0 === true ? true : false);
   this.lights[1].setVisible(this.luz1 === true ? true : false);
   this.lights[2].setVisible(this.luz2 === true ? true : false);
   this.lights[3].setVisible(this.luz3 === true ? true : false);
   this.lights[4].setVisible(this.luz4 === true ? true : false);
   //==============================================0
};

LightingScene.prototype.update = function(currTime) {

   this.drone.update(this.currentDIR);
   if (this.UpdateTime === true)
      this.clock.update(currTime);
};

LightingScene.prototype.doSomething = function() {
   console.log("Doing something...");

};
