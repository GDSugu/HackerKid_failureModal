import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/python';
import * as en from 'blockly/msg/en';

Blockly.setLocale(en);

Blockly.Blocks.turtle_import = {
  init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabelSerializable('import turtle'), 'NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Imports turtle module');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_import = () => 'from turtle import *\n';

Blockly.Blocks.turtle_movement = {
  init() {
    this.appendValueInput('distance')
      .setCheck('Number')
      .appendField('move')
      .appendField(new Blockly.FieldDropdown([['forward', 'forward'], ['backward', 'backward']]), 'direction');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Move the pen forward and backward');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_movement = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const valueDistance = Blockly.Python.valueToCode(block, 'distance', Blockly.Python.ORDER_ATOMIC);
  return `${dropdownDirection}(${valueDistance})\n`;
};

Blockly.Blocks.turtle_turn = {
  init() {
    this.appendDummyInput()
      .appendField('turn')
      .appendField(new Blockly.FieldDropdown([['left by', 'left'], ['right by', 'right']]), 'direction')
      .appendField(new Blockly.FieldAngle(90), 'orientation');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Turns the pen to the provided angle. Eg: 100, 180');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_turn = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const angleOrientation = block.getFieldValue('orientation');
  return `${dropdownDirection}(${angleOrientation})\n`;
};

Blockly.Blocks.turtle_turn_custom = {
  init() {
    this.appendValueInput('angle')
      .setCheck('Number')
      .appendField('turn')
      .appendField(new Blockly.FieldDropdown([['left', 'left'], ['right', 'right']]), 'NAME')
      .appendField('by');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Turns the pen to the provided angle. Eg: 100, 180');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_turn_custom = (block) => {
  const dropdownName = block.getFieldValue('NAME');
  const valueAngle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  return `${dropdownName}(${valueAngle})\n`;
};

Blockly.Blocks.turtle_goto = {
  init() {
    this.appendDummyInput()
      .appendField('goto');
    this.appendValueInput('x_position')
      .setCheck(null)
      .appendField('x');
    this.appendValueInput('y_position')
      .setCheck(null)
      .appendField('y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('goto specified position (x, y)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_goto = (block) => {
  const valueXPosition = Blockly.Python.valueToCode(block, 'x_position', Blockly.Python.ORDER_ATOMIC);
  const valueYPosition = Blockly.Python.valueToCode(block, 'y_position', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  return `goto(${valueXPosition || none}, ${valueYPosition || none})\n`;
};

Blockly.Blocks.turtle_setx = {
  init() {
    this.appendValueInput('x_position')
      .setCheck('Number')
      .appendField('set x');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the turtle’s first coordinate to x, leave second coordinate unchanged.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_setx = (block) => {
  const valueXPosition = Blockly.Python.valueToCode(block, 'x_position', Blockly.Python.ORDER_ATOMIC);
  return `setx(${valueXPosition})\n`;
};

Blockly.Blocks.turtle_sety = {
  init() {
    this.appendValueInput('y_position')
      .setCheck('Number')
      .appendField('set y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the turtle’s second coordinate to y, leave first coordinate unchanged.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_sety = (block) => {
  const valueYPosition = Blockly.Python.valueToCode(block, 'y_position', Blockly.Python.ORDER_ATOMIC);
  return `sety(${valueYPosition})\n`;
};

Blockly.Blocks.turtle_setheading = {
  init() {
    this.appendDummyInput()
      .appendField('set heading')
      .appendField(new Blockly.FieldAngle(90), 'orientation');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('set the orientation of the turtle');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_setheading = (block) => {
  const angleOrientation = block.getFieldValue('orientation');
  return `setheading(${angleOrientation})\n`;
};

Blockly.Blocks.turtle_heading_custom = {
  init() {
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('set heading');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('set the orientation of the turtle');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_heading_custom = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `setheading(${valueName})\n`;
};

Blockly.Blocks.turtle_circle = {
  init() {
    this.appendValueInput('radius')
      .setCheck('Number')
      .appendField('draw circle of radius');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Draw a circle with given radius');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_circle = (block) => {
  const valueRadius = Blockly.Python.valueToCode(block, 'radius', Blockly.Python.ORDER_ATOMIC);
  return `circle(${valueRadius})\n`;
};

Blockly.Blocks.turtle_home = {
  init() {
    this.appendDummyInput()
      .appendField('move to home');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Move turtle to the origin – coordinates (0,0)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_home = () => 'home()\n';

Blockly.Blocks.turtle_circle_advanced = {
  init() {
    this.appendDummyInput()
      .appendField('draw circle');
    this.appendValueInput('radius')
      .setCheck('Number')
      .appendField('of radius');
    this.appendValueInput('extent')
      .setCheck('Number')
      .appendField('with extent');
    this.appendValueInput('step')
      .setCheck('Number')
      .appendField('with step');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Draw a circle with given radius. The center is radius units left of the turtle; extent – an angle – determines which part of the circle is drawn. If extent is not given, draw the entire circle. If extent is not a full circle, one endpoint of the arc is the current pen position. Draw the arc in counterclockwise direction if radius is positive, otherwise in clockwise direction. Finally the direction of the turtle is changed by the amount of extent.  As the circle is approximated by an inscribed regular polygon, steps determines the number of steps to use. If not given, it will be calculated automatically. May be used to draw regular polygons.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_circle_advanced = (block) => {
  const valueRadius = Blockly.Python.valueToCode(block, 'radius', Blockly.Python.ORDER_ATOMIC);
  const valueExtent = Blockly.Python.valueToCode(block, 'extent', Blockly.Python.ORDER_ATOMIC);
  const valueStep = Blockly.Python.valueToCode(block, 'step', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  return `circle(${valueRadius || none}, ${valueExtent || none}, ${valueStep || none})\n`;
};

Blockly.Blocks.turtle_dot = {
  init() {
    this.appendDummyInput()
      .appendField('draw dot');
    this.appendValueInput('size')
      .setCheck('Number')
      .appendField('with size');
    this.appendValueInput('color')
      .setCheck(null)
      .appendField('with color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Draw a circular dot with diameter size, using color. If size is not given, the maximum of pensize+4 and 2*pensize is used. ');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_dot = (block) => {
  const valueSize = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);
  const valueColor = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  return `dot(${valueSize || none}, ${valueColor || none})\n`;
};

Blockly.Blocks.turtle_stamp = {
  init() {
    this.appendDummyInput()
      .appendField('stamp');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Stamp a copy of the turtle shape onto the canvas at the current turtle position');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_stamp = () => 'stamp()\n';

Blockly.Blocks.turtle_get_stamp = {
  init() {
    this.appendDummyInput()
      .appendField('get stamp');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('Stamp a copy of the turtle shape onto the canvas at the current turtle position. Return a stamp_id for that stamp');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_stamp = () => {
  const code = 'stamp()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_clearstamp = {
  init() {
    this.appendValueInput('stampId')
      .setCheck('Number')
      .appendField('clear stamp');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Delete stamp with given stampid.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_clearstamp = (block) => {
  const valueStampid = Blockly.Python.valueToCode(block, 'stampId', Blockly.Python.ORDER_ATOMIC);
  const code = `clearstamp(${valueStampid})\n`;
  return code;
};

Blockly.Blocks.turtle_clearstamps = {
  init() {
    this.appendValueInput('numberOfStamps')
      .setCheck(null)
      .appendField('clear stamps');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Delete all or first/last n of turtle’s stamps. If n is None, delete all stamps, if n > 0 delete first n stamps, else if n < 0 delete last n stamps.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_clearstamps = (block) => {
  const valueNumberofstamps = Blockly.Python.valueToCode(block, 'numberOfStamps', Blockly.Python.ORDER_ATOMIC);
  return `clearstamps(${valueNumberofstamps})\n`;
};

Blockly.Blocks.turtle_undo = {
  init() {
    this.appendDummyInput()
      .appendField('undo');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Undo (repeatedly) the last turtle action(s). Number of available undo actions is determined by the size of the undobuffer.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_undo = () => 'undo()\n';

Blockly.Blocks.turtle_speed = {
  init() {
    this.appendDummyInput()
      .appendField('set speed')
      .appendField(new Blockly.FieldNumber(6, 0, 10), 'speed');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the turtle’s speed to an integer value in the range 0..10.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_speed = (block) => {
  const numberSpeed = block.getFieldValue('speed');
  return `speed(${numberSpeed})\n`;
};

Blockly.Blocks.turtle_set_speed_custom = {
  init() {
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('set speed');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the turtle’s speed to an integer value in the range 0..10.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_set_speed_custom = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `speed(${valueName})\n`;
};

Blockly.Blocks.turtle_get_speed = {
  init() {
    this.appendDummyInput()
      .appendField('get speed');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('returns current speed');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_speed = () => {
  const code = 'speed()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_get_position = {
  init() {
    this.appendDummyInput()
      .appendField('get position');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Return the turtle’s current location (x,y)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_position = () => {
  const code = 'position()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_towards = {
  init() {
    this.appendDummyInput()
      .appendField('get angle');
    this.appendValueInput('x_position')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('x');
    this.appendValueInput('y_position')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('y');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('Return the angle between the line from turtle position to position specified by (x,y)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_towards = (block) => {
  const valueXPosition = Blockly.Python.valueToCode(block, 'x_position', Blockly.Python.ORDER_ATOMIC);
  const valueYPosition = Blockly.Python.valueToCode(block, 'y_position', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  const code = `towards(${valueXPosition || none}, ${valueYPosition || none})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_xcor = {
  init() {
    this.appendDummyInput()
      .appendField('get x co-ordinate');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('Return the turtle’s x coordinate.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_xcor = () => {
  const code = 'xcor()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_ycor = {
  init() {
    this.appendDummyInput()
      .appendField('get y co-ordinate');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('Return the turtle’s y coordinate.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_ycor = () => {
  const code = 'ycor()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_get_heading = {
  init() {
    this.appendDummyInput()
      .appendField('get heading');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('Return the turtle’s current orientation');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_heading = () => {
  const code = 'heading()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_get_distance = {
  init() {
    this.appendDummyInput()
      .appendField('get distance');
    this.appendValueInput('x_position')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('x');
    this.appendValueInput('y_position')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('y');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Return the distance from the turtle to (x,y)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_distance = (block) => {
  const valueXPosition = Blockly.Python.valueToCode(block, 'x_position', Blockly.Python.ORDER_ATOMIC);
  const valueYPosition = Blockly.Python.valueToCode(block, 'y_position', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  const code = `distance(${valueXPosition || none}, ${valueYPosition || none})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_degrees = {
  init() {
    this.appendValueInput('degrees')
      .setCheck('Number')
      .appendField('set degrees');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set angle measurement units, i.e. set number of “degrees” for a full circle. Default value is 360 degrees.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_degrees = (block) => {
  const valueDegrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  return `degrees(${valueDegrees})\n`;
};

Blockly.Blocks.turtle_radians = {
  init() {
    this.appendValueInput('radians')
      .setCheck('Number')
      .appendField('set radians');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the angle measurement units to radians. Equivalent to degrees(2*math.pi)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_radians = (block) => {
  const valueRadians = Blockly.Python.valueToCode(block, 'radians', Blockly.Python.ORDER_ATOMIC);
  return `radians(${valueRadians})\n`;
};

Blockly.Blocks.turtle_pendown = {
  init() {
    this.appendDummyInput()
      .appendField('pendown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Pull the pen down – drawing when moving.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_pendown = () => 'pendown()\n';

Blockly.Blocks.turtle_penup = {
  init() {
    this.appendDummyInput()
      .appendField('penup');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Pull the pen up – no drawing when moving.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_penup = () => 'penup()\n';

Blockly.Blocks.turtle_pensize = {
  init() {
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('set pensize');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the line thickness to pen width');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_pensize = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `pensize(${valueName})\n`;
};

Blockly.Blocks.turtle_get_pensize = {
  init() {
    this.appendDummyInput()
      .appendField('get pensize');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('returns the current pensize');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_pensize = () => {
  const code = 'pensize()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_isdown = {
  init() {
    this.appendDummyInput()
      .appendField('isdown');
    this.setOutput(true, 'Boolean');
    this.setColour('#0ead69');
    this.setTooltip('Return True if pen is down, False if it’s up.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_isdown = () => {
  const code = 'isdown()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_pencolor = {
  init() {
    this.appendValueInput('color')
      .setCheck(null)
      .appendField('set pencolor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set pencolor to colorstring, which is a color specification string, such as "red", "yellow", or "#33cc8c" or (r, g, b) tuple');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_pencolor = (block) => {
  const valueColor = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  return `pencolor(${valueColor})\n`;
};

Blockly.Blocks.turtle_pencolor_rgb = {
  init() {
    this.appendDummyInput()
      .appendField('set pencolor');
    this.appendValueInput('r')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('r');
    this.appendValueInput('g')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('g');
    this.appendValueInput('b')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('b');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set pencolor to the RGB color represented by r, g, and b');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_pencolor_rgb = (block) => {
  const valueR = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC);
  const valueG = Blockly.Python.valueToCode(block, 'g', Blockly.Python.ORDER_ATOMIC);
  const valueB = Blockly.Python.valueToCode(block, 'b', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  return `pencolor(${valueR || none}, ${valueG || none}, ${valueB || none})\n`;
};

Blockly.Blocks.turtle_get_pencolor = {
  init() {
    this.appendDummyInput()
      .appendField('get pencolor');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Return the current pencolor as color specification string or as a tuple (see example). May be used as input to another color/pencolor/fillcolor call.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_pencolor = () => {
  const code = 'pencolor()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_fillcolor = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('set fillcolor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set fillcolor to colorstring, which is a color specification string, such as "red", "yellow", or "#33cc8c" or (r, g, b) tuple');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_fillcolor = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `fillcolor(${valueName})\n`;
};

Blockly.Blocks.turtle_fillcolor_rgb = {
  init() {
    this.appendDummyInput()
      .appendField('set fillcolor');
    this.appendValueInput('r')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('r');
    this.appendValueInput('g')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('g');
    this.appendValueInput('b')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('b');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set fillcolor to the RGB color represented by r, g, and b');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_fillcolor_rgb = (block) => {
  const valueR = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC);
  const valueG = Blockly.Python.valueToCode(block, 'g', Blockly.Python.ORDER_ATOMIC);
  const valueB = Blockly.Python.valueToCode(block, 'b', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  return `fillcolor(${valueR || none}, ${valueG || none}, ${valueB || none})\n`;
};

Blockly.Blocks.turtle_get_fillcolor = {
  init() {
    this.appendDummyInput()
      .appendField('get fillcolor');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Return the current fillcolor as color specification string, possibly in tuple format (see example). May be used as input to another color/pencolor/fillcolor call.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_fillcolor = () => {
  const code = 'fillcolor()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_color = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('set color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('set both, fillcolor and pencolor, to the given value');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_color = (block) => {
  const value = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `color(${value})\n`;
};

Blockly.Blocks.turtle_getcolor = {
  init() {
    this.appendDummyInput()
      .appendField('get color');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Return the current pencolor and the current fillcolor as a pair of color specification strings or tuples');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_getcolor = () => {
  const code = 'color()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_filling = {
  init() {
    this.appendDummyInput()
      .appendField('get filling');
    this.setOutput(true, 'Boolean');
    this.setColour('#0ead69');
    this.setTooltip('Return fillstate (True if filling, False else).');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_filling = () => {
  const code = 'filling()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_beginfill = {
  init() {
    this.appendDummyInput()
      .appendField('begin fill');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('To be called just before drawing a shape to be filled.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_beginfill = () => 'begin_fill()\n';

Blockly.Blocks.turtle_endfill = {
  init() {
    this.appendDummyInput()
      .appendField('end fill');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Fill the shape drawn after the last call to begin fill');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_endfill = () => 'end_fill()\n';

Blockly.Blocks.turtle_reset = {
  init() {
    this.appendDummyInput()
      .appendField('reset');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Delete the turtle’s drawings from the screen, re-center the turtle and set variables to the default values.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_reset = () => 'reset()\n';

Blockly.Blocks.turtle_clear = {
  init() {
    this.appendDummyInput()
      .appendField('clear');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_clear = () => 'clear()\n';

Blockly.Blocks.turtle_write = {
  init() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('write');
    this.appendValueInput('content')
      .setCheck('String')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('content');
    this.appendValueInput('move')
      .setCheck('Boolean')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('with movement');
    this.appendValueInput('font_name')
      .setCheck('String')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('with font');
    this.appendValueInput('font_size')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('with font size');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('with alignment')
      .appendField(new Blockly.FieldDropdown([['left', 'left'], ['center', 'center'], ['right', 'right']]), 'NAME');
    this.appendDummyInput()
      .appendField('with font type')
      .appendField(new Blockly.FieldDropdown([['normal', 'normal'], ['bold', 'bold']]), 'font_type');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Write text - the string representation of arg - at the current turtle position according to align (“left”, “center” or right”) and with the given font. If move is true, the pen is moved to the bottom-right corner of the text. By default, move is False.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_write = (block) => {
  const valueContent = Blockly.Python.valueToCode(block, 'content', Blockly.Python.ORDER_ATOMIC);
  const valueMove = Blockly.Python.valueToCode(block, 'move', Blockly.Python.ORDER_ATOMIC);
  const valueFontName = Blockly.Python.valueToCode(block, 'font_name', Blockly.Python.ORDER_ATOMIC);
  const valueFontSize = Blockly.Python.valueToCode(block, 'font_size', Blockly.Python.ORDER_ATOMIC);
  const dropdownName = block.getFieldValue('NAME');
  const dropdownFontType = block.getFieldValue('font_type');
  const none = 'None';
  // eslint-disable-next-line no-useless-concat
  return `write(${valueContent || none}, ${valueMove || none}, ${dropdownName ? (`"${dropdownName}"`) : none}, ` + `(${valueFontName || none}, ${valueFontSize || none}, ${dropdownFontType ? (`"${dropdownFontType}"`) : none})` + ')\n';
};

Blockly.Blocks.turtle_hide = {
  init() {
    this.appendDummyInput()
      .appendField('hide');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Make the turtle invisible');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_hide = () => 'hideturtle()\n';

Blockly.Blocks.turtle_show = {
  init() {
    this.appendDummyInput()
      .appendField('show');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Make the turtle visible.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_show = () => 'showturtle()\n';

Blockly.Blocks.turtle_isvisible = {
  init() {
    this.appendDummyInput()
      .appendField('isVisible');
    this.setOutput(true, 'Boolean');
    this.setColour('#0ead69');
    this.setTooltip('Return True if the Turtle is shown, False if it’s hidden.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_isvisible = () => {
  const code = 'isvisible()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_set_shape = {
  init() {
    this.appendValueInput('NAME')
      .setCheck('String')
      .appendField('set shape');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set turtle shape to shape with given name. Initially there are the following polygon shapes: “arrow”, “turtle”, “circle”, “square”, “triangle”, “classic”');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_set_shape = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `shape(${valueName})\n`;
};

Blockly.Blocks.turtle_get_shape = {
  init() {
    this.appendDummyInput()
      .appendField('get shape');
    this.setOutput(true, 'String');
    this.setColour('#0ead69');
    this.setTooltip('returns name of current shape');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_shape = () => {
  const code = 'shape()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_set_resizemode = {
  init() {
    this.appendDummyInput()
      .appendField('set resizemode')
      .appendField(new Blockly.FieldDropdown([['auto', '"auto"'], ['user', '"user"'], ['noresize', '"noresize"']]), 'resizemode');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set resizemode to one of the values: “auto”, “user”, “noresize”');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_set_resizemode = (block) => {
  const dropdownResizeMode = block.getFieldValue('resizemode');
  return `resizemode(${dropdownResizeMode})\n`;
};

Blockly.Blocks.turtle_get_resizemode = {
  init() {
    this.appendDummyInput()
      .appendField('get resizemode');
    this.setOutput(true, 'String');
    this.setColour('#0ead69');
    this.setTooltip('returns current resizemode');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_resizemode = () => {
  const code = 'resizemode()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_set_size = {
  init() {
    this.appendDummyInput()
      .appendField('set turtlesize');
    this.appendValueInput('width')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('of width');
    this.appendValueInput('length')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('of length');
    this.appendValueInput('outline')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('of outline');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('set the pen’s attributes x/y-stretchfactors and/or outline. Set resizemode to “user”. If and only if resizemode is set to “user”, the turtle will be displayed stretched according to its stretchfactors: stretch_wid is stretchfactor perpendicular to its orientation, stretch_len is stretchfactor in direction of its orientation, outline determines the width of the shapes’s outline.');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_set_size = (block) => {
  const valueWidth = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  const valueLength = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
  const valueOutline = Blockly.Python.valueToCode(block, 'outline', Blockly.Python.ORDER_ATOMIC);
  const none = 'None';
  return `turtlesize(${valueWidth || none}, ${valueLength || none}, ${valueOutline || none})\n`;
};

Blockly.Blocks.turtle_get_size = {
  init() {
    this.appendDummyInput()
      .appendField('get turtlesize');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Return the pen’s attributes (width, length, ouline)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_size = () => {
  const code = 'turtlesize()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_shearfactor = {
  init() {
    this.appendValueInput('factor')
      .setCheck('Number')
      .appendField('set shearfactor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Shear the turtleshape according to the given shearfactor shear, which is the tangent of the shear angle. Do not change the turtle’s heading (direction of movement)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_shearfactor = (block) => {
  const valueFactor = Blockly.Python.valueToCode(block, 'factor', Blockly.Python.ORDER_ATOMIC);
  return `shearfactor(${valueFactor})\n`;
};

Blockly.Blocks.turtle_get_shearfactor = {
  init() {
    this.appendDummyInput()
      .appendField('get shearfactor');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('returns the current shearfactor');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_shearfactor = () => {
  const code = 'shearfactor()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_tilt = {
  init() {
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('tilt');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Rotate the turtleshape by angle from its current tilt-angle, but do not change the turtle’s heading (direction of movement).');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_tilt = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `tilt(${valueName})\n`;
};

Blockly.Blocks.turtle_tiltangle = {
  init() {
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('set tiltangle');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set the current tilt-angle. If angle is given, rotate the turtleshape to point in the direction specified by angle, regardless of its current tilt-angle. Do not change the turtle’s heading (direction of movement)');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_tiltangle = (block) => {
  const valueName = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return `tiltangle(${valueName})\n`;
};

Blockly.Blocks.turtle_get_tiltangle = {
  init() {
    this.appendDummyInput()
      .appendField('get tiltangle');
    this.setOutput(true, 'Number');
    this.setColour('#0ead69');
    this.setTooltip('returns the current tilt-angle');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_tiltangle = () => {
  const code = 'tiltangle()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks.turtle_bgcolor = {
  init() {
    this.appendValueInput('color')
      .setCheck(null)
      .appendField('set bgcolor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0ead69');
    this.setTooltip('Set background color of the TurtleScreen. A color string or three numbers in the range 0..colormode or a 3-tuple of such numbers');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_bgcolor = (block) => {
  const valueColor = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  return `Screen().bgcolor(${valueColor})\n`;
};

Blockly.Blocks.turtle_get_bgcolor = {
  init() {
    this.appendDummyInput()
      .appendField('get bgcolor');
    this.setOutput(true, null);
    this.setColour('#0ead69');
    this.setTooltip('returns background color of the TurtleScreen as (r, g, b) tuple');
    this.setHelpUrl('');
  },
};

Blockly.Python.turtle_get_bgcolor = () => {
  const code = 'Screen().bgcolor()';
  return [code, Blockly.Python.ORDER_NONE];
};

export default Blockly;
