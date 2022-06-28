// // import * as Blockly from 'blockly/core';
// import 'blockly/blocks';
// import 'blockly/python';
// import * as en from 'blockly/msg/en';
import $ from 'jquery';

function getBlockly({ blocklyObj = { Blocks: {}, Python: {} }, turtleObj = {} }) {
  const BlocklyObj = blocklyObj;
  const TurtleObj = turtleObj;

  // BlocklyObj.setLocale(en);
  BlocklyObj.Blocks.turtle_import = {
    init() {
      this.appendDummyInput()
        .appendField(new BlocklyObj.FieldLabelSerializable('import turtle'), 'NAME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Imports turtle module');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_import = () => 'from turtle import *\n';

  BlocklyObj.Blocks.turtle_movement = {
    init() {
      this.appendValueInput('distance')
        .setCheck('Number')
        .appendField('move')
        .appendField(new BlocklyObj.FieldDropdown([['forward', 'forward'], ['backward', 'backward']]), 'direction');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Move the pen forward and backward');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_movement = (block) => {
    const dropdownDirection = block.getFieldValue('direction');
    const valueDistance = BlocklyObj.Python.valueToCode(block, 'distance', BlocklyObj.Python.ORDER_ATOMIC);
    return `${dropdownDirection}(${valueDistance})\n`;
  };

  BlocklyObj.Blocks.turtle_turn = {
    init() {
      this.appendDummyInput()
        .appendField('turn')
        .appendField(new BlocklyObj.FieldDropdown([['left by', 'left'], ['right by', 'right']]), 'direction')
        .appendField(new BlocklyObj.FieldAngle(90), 'orientation');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Turns the pen to the provided angle. Eg: 100, 180');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_turn = (block) => {
    const dropdownDirection = block.getFieldValue('direction');
    const angleOrientation = block.getFieldValue('orientation');
    return `${dropdownDirection}(${angleOrientation})\n`;
  };

  BlocklyObj.Blocks.turtle_turn_custom = {
    init() {
      this.appendValueInput('angle')
        .setCheck('Number')
        .appendField('turn')
        .appendField(new BlocklyObj.FieldDropdown([['left', 'left'], ['right', 'right']]), 'NAME')
        .appendField('by');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Turns the pen to the provided angle. Eg: 100, 180');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_turn_custom = (block) => {
    const dropdownName = block.getFieldValue('NAME');
    const valueAngle = BlocklyObj.Python.valueToCode(block, 'angle', BlocklyObj.Python.ORDER_ATOMIC);
    return `${dropdownName}(${valueAngle})\n`;
  };

  BlocklyObj.Blocks.turtle_goto = {
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

  BlocklyObj.Python.turtle_goto = (block) => {
    const valueXPosition = BlocklyObj.Python.valueToCode(block, 'x_position', BlocklyObj.Python.ORDER_ATOMIC);
    const valueYPosition = BlocklyObj.Python.valueToCode(block, 'y_position', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    return `goto(${valueXPosition || none}, ${valueYPosition || none})\n`;
  };

  BlocklyObj.Blocks.turtle_setx = {
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

  BlocklyObj.Python.turtle_setx = (block) => {
    const valueXPosition = BlocklyObj.Python.valueToCode(block, 'x_position', BlocklyObj.Python.ORDER_ATOMIC);
    return `setx(${valueXPosition})\n`;
  };

  BlocklyObj.Blocks.turtle_sety = {
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

  BlocklyObj.Python.turtle_sety = (block) => {
    const valueYPosition = BlocklyObj.Python.valueToCode(block, 'y_position', BlocklyObj.Python.ORDER_ATOMIC);
    return `sety(${valueYPosition})\n`;
  };

  BlocklyObj.Blocks.turtle_setheading = {
    init() {
      this.appendDummyInput()
        .appendField('set heading')
        .appendField(new BlocklyObj.FieldAngle(90), 'orientation');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('set the orientation of the turtle');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_setheading = (block) => {
    const angleOrientation = block.getFieldValue('orientation');
    return `setheading(${angleOrientation})\n`;
  };

  BlocklyObj.Blocks.turtle_heading_custom = {
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

  BlocklyObj.Python.turtle_heading_custom = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `setheading(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_circle = {
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

  BlocklyObj.Python.turtle_circle = (block) => {
    const valueRadius = BlocklyObj.Python.valueToCode(block, 'radius', BlocklyObj.Python.ORDER_ATOMIC);
    return `circle(${valueRadius})\n`;
  };

  BlocklyObj.Blocks.turtle_home = {
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

  BlocklyObj.Python.turtle_home = () => 'home()\n';

  BlocklyObj.Blocks.turtle_circle_advanced = {
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

  BlocklyObj.Python.turtle_circle_advanced = (block) => {
    const valueRadius = BlocklyObj.Python.valueToCode(block, 'radius', BlocklyObj.Python.ORDER_ATOMIC);
    const valueExtent = BlocklyObj.Python.valueToCode(block, 'extent', BlocklyObj.Python.ORDER_ATOMIC);
    const valueStep = BlocklyObj.Python.valueToCode(block, 'step', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    return `circle(${valueRadius || none}, ${valueExtent || none}, ${valueStep || none})\n`;
  };

  BlocklyObj.Blocks.turtle_dot = {
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

  BlocklyObj.Python.turtle_dot = (block) => {
    const valueSize = BlocklyObj.Python.valueToCode(block, 'size', BlocklyObj.Python.ORDER_ATOMIC);
    const valueColor = BlocklyObj.Python.valueToCode(block, 'color', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    return `dot(${valueSize || none}, ${valueColor || none})\n`;
  };

  BlocklyObj.Blocks.turtle_stamp = {
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

  BlocklyObj.Python.turtle_stamp = () => 'stamp()\n';

  BlocklyObj.Blocks.turtle_get_stamp = {
    init() {
      this.appendDummyInput()
        .appendField('get stamp');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('Stamp a copy of the turtle shape onto the canvas at the current turtle position. Return a stamp_id for that stamp');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_stamp = () => {
    const code = 'stamp()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_clearstamp = {
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

  BlocklyObj.Python.turtle_clearstamp = (block) => {
    const valueStampid = BlocklyObj.Python.valueToCode(block, 'stampId', BlocklyObj.Python.ORDER_ATOMIC);
    const code = `clearstamp(${valueStampid})\n`;
    return code;
  };

  BlocklyObj.Blocks.turtle_clearstamps = {
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

  BlocklyObj.Python.turtle_clearstamps = (block) => {
    const valueNumberofstamps = BlocklyObj.Python.valueToCode(block, 'numberOfStamps', BlocklyObj.Python.ORDER_ATOMIC);
    return `clearstamps(${valueNumberofstamps})\n`;
  };

  BlocklyObj.Blocks.turtle_undo = {
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

  BlocklyObj.Python.turtle_undo = () => 'undo()\n';

  BlocklyObj.Blocks.turtle_speed = {
    init() {
      this.appendDummyInput()
        .appendField('set speed')
        .appendField(new BlocklyObj.FieldNumber(6, 0, 10), 'speed');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Set the turtle’s speed to an integer value in the range 0..10.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_speed = (block) => {
    const numberSpeed = block.getFieldValue('speed');
    return `speed(${numberSpeed})\n`;
  };

  BlocklyObj.Blocks.turtle_set_speed_custom = {
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

  BlocklyObj.Python.turtle_set_speed_custom = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `speed(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_get_speed = {
    init() {
      this.appendDummyInput()
        .appendField('get speed');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('returns current speed');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_speed = () => {
    const code = 'speed()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_get_position = {
    init() {
      this.appendDummyInput()
        .appendField('get position');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Return the turtle’s current location (x,y)');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_position = () => {
    const code = 'position()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_towards = {
    init() {
      this.appendDummyInput()
        .appendField('get angle');
      this.appendValueInput('x_position')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('x');
      this.appendValueInput('y_position')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('y');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('Return the angle between the line from turtle position to position specified by (x,y)');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_towards = (block) => {
    const valueXPosition = BlocklyObj.Python.valueToCode(block, 'x_position', BlocklyObj.Python.ORDER_ATOMIC);
    const valueYPosition = BlocklyObj.Python.valueToCode(block, 'y_position', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    const code = `towards(${valueXPosition || none}, ${valueYPosition || none})`;
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_xcor = {
    init() {
      this.appendDummyInput()
        .appendField('get x co-ordinate');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('Return the turtle’s x coordinate.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_xcor = () => {
    const code = 'xcor()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_ycor = {
    init() {
      this.appendDummyInput()
        .appendField('get y co-ordinate');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('Return the turtle’s y coordinate.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_ycor = () => {
    const code = 'ycor()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_get_heading = {
    init() {
      this.appendDummyInput()
        .appendField('get heading');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('Return the turtle’s current orientation');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_heading = () => {
    const code = 'heading()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_get_distance = {
    init() {
      this.appendDummyInput()
        .appendField('get distance');
      this.appendValueInput('x_position')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('x');
      this.appendValueInput('y_position')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('y');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Return the distance from the turtle to (x,y)');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_distance = (block) => {
    const valueXPosition = BlocklyObj.Python.valueToCode(block, 'x_position', BlocklyObj.Python.ORDER_ATOMIC);
    const valueYPosition = BlocklyObj.Python.valueToCode(block, 'y_position', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    const code = `distance(${valueXPosition || none}, ${valueYPosition || none})`;
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_degrees = {
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

  BlocklyObj.Python.turtle_degrees = (block) => {
    const valueDegrees = BlocklyObj.Python.valueToCode(block, 'degrees', BlocklyObj.Python.ORDER_ATOMIC);
    return `degrees(${valueDegrees})\n`;
  };

  BlocklyObj.Blocks.turtle_radians = {
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

  BlocklyObj.Python.turtle_radians = (block) => {
    const valueRadians = BlocklyObj.Python.valueToCode(block, 'radians', BlocklyObj.Python.ORDER_ATOMIC);
    return `radians(${valueRadians})\n`;
  };

  BlocklyObj.Blocks.turtle_pendown = {
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

  BlocklyObj.Python.turtle_pendown = () => 'pendown()\n';

  BlocklyObj.Blocks.turtle_penup = {
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

  BlocklyObj.Python.turtle_penup = () => 'penup()\n';

  BlocklyObj.Blocks.turtle_pensize = {
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

  BlocklyObj.Python.turtle_pensize = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `pensize(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_get_pensize = {
    init() {
      this.appendDummyInput()
        .appendField('get pensize');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('returns the current pensize');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_pensize = () => {
    const code = 'pensize()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_isdown = {
    init() {
      this.appendDummyInput()
        .appendField('isdown');
      this.setOutput(true, 'Boolean');
      this.setColour('#0ead69');
      this.setTooltip('Return True if pen is down, False if it’s up.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_isdown = () => {
    const code = 'isdown()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_pencolor = {
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

  BlocklyObj.Python.turtle_pencolor = (block) => {
    const valueColor = BlocklyObj.Python.valueToCode(block, 'color', BlocklyObj.Python.ORDER_ATOMIC);
    return `pencolor(${valueColor})\n`;
  };

  BlocklyObj.Blocks.turtle_pencolor_rgb = {
    init() {
      this.appendDummyInput()
        .appendField('set pencolor');
      this.appendValueInput('r')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('r');
      this.appendValueInput('g')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('g');
      this.appendValueInput('b')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('b');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Set pencolor to the RGB color represented by r, g, and b');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_pencolor_rgb = (block) => {
    const valueR = BlocklyObj.Python.valueToCode(block, 'r', BlocklyObj.Python.ORDER_ATOMIC);
    const valueG = BlocklyObj.Python.valueToCode(block, 'g', BlocklyObj.Python.ORDER_ATOMIC);
    const valueB = BlocklyObj.Python.valueToCode(block, 'b', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    return `pencolor(${valueR || none}, ${valueG || none}, ${valueB || none})\n`;
  };

  BlocklyObj.Blocks.turtle_get_pencolor = {
    init() {
      this.appendDummyInput()
        .appendField('get pencolor');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Return the current pencolor as color specification string or as a tuple (see example). May be used as input to another color/pencolor/fillcolor call.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_pencolor = () => {
    const code = 'pencolor()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_fillcolor = {
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

  BlocklyObj.Python.turtle_fillcolor = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `fillcolor(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_fillcolor_rgb = {
    init() {
      this.appendDummyInput()
        .appendField('set fillcolor');
      this.appendValueInput('r')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('r');
      this.appendValueInput('g')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('g');
      this.appendValueInput('b')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('b');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Set fillcolor to the RGB color represented by r, g, and b');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_fillcolor_rgb = (block) => {
    const valueR = BlocklyObj.Python.valueToCode(block, 'r', BlocklyObj.Python.ORDER_ATOMIC);
    const valueG = BlocklyObj.Python.valueToCode(block, 'g', BlocklyObj.Python.ORDER_ATOMIC);
    const valueB = BlocklyObj.Python.valueToCode(block, 'b', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    return `fillcolor(${valueR || none}, ${valueG || none}, ${valueB || none})\n`;
  };

  BlocklyObj.Blocks.turtle_get_fillcolor = {
    init() {
      this.appendDummyInput()
        .appendField('get fillcolor');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Return the current fillcolor as color specification string, possibly in tuple format (see example). May be used as input to another color/pencolor/fillcolor call.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_fillcolor = () => {
    const code = 'fillcolor()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_color = {
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

  BlocklyObj.Python.turtle_color = (block) => {
    const value = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `color(${value})\n`;
  };

  BlocklyObj.Blocks.turtle_getcolor = {
    init() {
      this.appendDummyInput()
        .appendField('get color');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Return the current pencolor and the current fillcolor as a pair of color specification strings or tuples');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_getcolor = () => {
    const code = 'color()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_filling = {
    init() {
      this.appendDummyInput()
        .appendField('get filling');
      this.setOutput(true, 'Boolean');
      this.setColour('#0ead69');
      this.setTooltip('Return fillstate (True if filling, False else).');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_filling = () => {
    const code = 'filling()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_beginfill = {
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

  BlocklyObj.Python.turtle_beginfill = () => 'begin_fill()\n';

  BlocklyObj.Blocks.turtle_endfill = {
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

  BlocklyObj.Python.turtle_endfill = () => 'end_fill()\n';

  BlocklyObj.Blocks.turtle_reset = {
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

  BlocklyObj.Python.turtle_reset = () => 'reset()\n';

  BlocklyObj.Blocks.turtle_clear = {
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

  BlocklyObj.Python.turtle_clear = () => 'clear()\n';

  BlocklyObj.Blocks.turtle_write = {
    init() {
      this.appendDummyInput()
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('write');
      this.appendValueInput('content')
        .setCheck('String')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('content');
      this.appendValueInput('move')
        .setCheck('Boolean')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('with movement');
      this.appendValueInput('font_name')
        .setCheck('String')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('with font');
      this.appendValueInput('font_size')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('with font size');
      this.appendDummyInput()
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('with alignment')
        .appendField(new BlocklyObj.FieldDropdown([['left', 'left'], ['center', 'center'], ['right', 'right']]), 'NAME');
      this.appendDummyInput()
        .appendField('with font type')
        .appendField(new BlocklyObj.FieldDropdown([['normal', 'normal'], ['bold', 'bold']]), 'font_type');
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Write text - the string representation of arg - at the current turtle position according to align (“left”, “center” or right”) and with the given font. If move is true, the pen is moved to the bottom-right corner of the text. By default, move is False.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_write = (block) => {
    const valueContent = BlocklyObj.Python.valueToCode(block, 'content', BlocklyObj.Python.ORDER_ATOMIC);
    const valueMove = BlocklyObj.Python.valueToCode(block, 'move', BlocklyObj.Python.ORDER_ATOMIC);
    const valueFontName = BlocklyObj.Python.valueToCode(block, 'font_name', BlocklyObj.Python.ORDER_ATOMIC);
    const valueFontSize = BlocklyObj.Python.valueToCode(block, 'font_size', BlocklyObj.Python.ORDER_ATOMIC);
    const dropdownName = block.getFieldValue('NAME');
    const dropdownFontType = block.getFieldValue('font_type');
    const none = 'None';
    // eslint-disable-next-line no-useless-concat
    return `write(${valueContent || none}, ${valueMove || none}, ${dropdownName ? (`"${dropdownName}"`) : none}, ` + `(${valueFontName || none}, ${valueFontSize || none}, ${dropdownFontType ? (`"${dropdownFontType}"`) : none})` + ')\n';
  };

  BlocklyObj.Blocks.turtle_hide = {
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

  BlocklyObj.Python.turtle_hide = () => 'hideturtle()\n';

  BlocklyObj.Blocks.turtle_show = {
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

  BlocklyObj.Python.turtle_show = () => 'showturtle()\n';

  BlocklyObj.Blocks.turtle_isvisible = {
    init() {
      this.appendDummyInput()
        .appendField('isVisible');
      this.setOutput(true, 'Boolean');
      this.setColour('#0ead69');
      this.setTooltip('Return True if the Turtle is shown, False if it’s hidden.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_isvisible = () => {
    const code = 'isvisible()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_set_shape = {
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

  BlocklyObj.Python.turtle_set_shape = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `shape(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_get_shape = {
    init() {
      this.appendDummyInput()
        .appendField('get shape');
      this.setOutput(true, 'String');
      this.setColour('#0ead69');
      this.setTooltip('returns name of current shape');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_shape = () => {
    const code = 'shape()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_set_resizemode = {
    init() {
      this.appendDummyInput()
        .appendField('set resizemode')
        .appendField(new BlocklyObj.FieldDropdown([['auto', '"auto"'], ['user', '"user"'], ['noresize', '"noresize"']]), 'resizemode');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Set resizemode to one of the values: “auto”, “user”, “noresize”');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_set_resizemode = (block) => {
    const dropdownResizeMode = block.getFieldValue('resizemode');
    return `resizemode(${dropdownResizeMode})\n`;
  };

  BlocklyObj.Blocks.turtle_get_resizemode = {
    init() {
      this.appendDummyInput()
        .appendField('get resizemode');
      this.setOutput(true, 'String');
      this.setColour('#0ead69');
      this.setTooltip('returns current resizemode');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_resizemode = () => {
    const code = 'resizemode()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_set_size = {
    init() {
      this.appendDummyInput()
        .appendField('set turtlesize');
      this.appendValueInput('width')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('of width');
      this.appendValueInput('length')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('of length');
      this.appendValueInput('outline')
        .setCheck('Number')
        .setAlign(BlocklyObj.ALIGN_RIGHT)
        .appendField('of outline');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#0ead69');
      this.setTooltip('set the pen’s attributes x/y-stretchfactors and/or outline. Set resizemode to “user”. If and only if resizemode is set to “user”, the turtle will be displayed stretched according to its stretchfactors: stretch_wid is stretchfactor perpendicular to its orientation, stretch_len is stretchfactor in direction of its orientation, outline determines the width of the shapes’s outline.');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_set_size = (block) => {
    const valueWidth = BlocklyObj.Python.valueToCode(block, 'width', BlocklyObj.Python.ORDER_ATOMIC);
    const valueLength = BlocklyObj.Python.valueToCode(block, 'length', BlocklyObj.Python.ORDER_ATOMIC);
    const valueOutline = BlocklyObj.Python.valueToCode(block, 'outline', BlocklyObj.Python.ORDER_ATOMIC);
    const none = 'None';
    return `turtlesize(${valueWidth || none}, ${valueLength || none}, ${valueOutline || none})\n`;
  };

  BlocklyObj.Blocks.turtle_get_size = {
    init() {
      this.appendDummyInput()
        .appendField('get turtlesize');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('Return the pen’s attributes (width, length, ouline)');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_size = () => {
    const code = 'turtlesize()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_shearfactor = {
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

  BlocklyObj.Python.turtle_shearfactor = (block) => {
    const valueFactor = BlocklyObj.Python.valueToCode(block, 'factor', BlocklyObj.Python.ORDER_ATOMIC);
    return `shearfactor(${valueFactor})\n`;
  };

  BlocklyObj.Blocks.turtle_get_shearfactor = {
    init() {
      this.appendDummyInput()
        .appendField('get shearfactor');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('returns the current shearfactor');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_shearfactor = () => {
    const code = 'shearfactor()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_tilt = {
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

  BlocklyObj.Python.turtle_tilt = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `tilt(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_tiltangle = {
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

  BlocklyObj.Python.turtle_tiltangle = (block) => {
    const valueName = BlocklyObj.Python.valueToCode(block, 'NAME', BlocklyObj.Python.ORDER_ATOMIC);
    return `tiltangle(${valueName})\n`;
  };

  BlocklyObj.Blocks.turtle_get_tiltangle = {
    init() {
      this.appendDummyInput()
        .appendField('get tiltangle');
      this.setOutput(true, 'Number');
      this.setColour('#0ead69');
      this.setTooltip('returns the current tilt-angle');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_tiltangle = () => {
    const code = 'tiltangle()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  BlocklyObj.Blocks.turtle_bgcolor = {
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

  BlocklyObj.Python.turtle_bgcolor = (block) => {
    const valueColor = BlocklyObj.Python.valueToCode(block, 'color', BlocklyObj.Python.ORDER_ATOMIC);
    return `Screen().bgcolor(${valueColor})\n`;
  };

  BlocklyObj.Blocks.turtle_get_bgcolor = {
    init() {
      this.appendDummyInput()
        .appendField('get bgcolor');
      this.setOutput(true, null);
      this.setColour('#0ead69');
      this.setTooltip('returns background color of the TurtleScreen as (r, g, b) tuple');
      this.setHelpUrl('');
    },
  };

  BlocklyObj.Python.turtle_get_bgcolor = () => {
    const code = 'Screen().bgcolor()';
    return [code, BlocklyObj.Python.ORDER_NONE];
  };

  TurtleObj.blockColors = (name) => {
    const mapper = {
      turtle: { category: '#0ead69', block: '#0ead69' },
      logic: { category: '#ff3333', block: '#ff3333' },
      loops: { category: '#ffbe33', block: '#ffbe33' },
      math: { category: '#ff5d00', block: '#ff5d00' },
      text: { category: '#06d6a0', block: '#06d6a0' },
      lists: { category: '#fff75e', block: '#fff75e' },
      colour: { category: '#f7f9f9', block: '#f7f9f9' },
      variables: { category: '#4cc9f0', block: '#4cc9f0' },
      functions: { category: '#8338ec', block: '#8338ec' },
      default: { category: '#0ead69', block: '#0ead69' },
    };
    return name in mapper ? mapper[name] : mapper.default;
  };

  TurtleObj.initializeBlockly = (response) => {
    try {
      const xmlBlock = response.questionObject.totalBlocks;
      const maxBlocks = response.questionObject.blockLen;
      document.querySelector('#turtleBlock').innerHTML = xmlBlock;
      // document.querySelector('#turtleBlock').innerHTML = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none"><block type="turtle_movement"></block><block type="math_number"><field name="NUM">100</field></block><block type="turtle_goto"></block><block type="turtle_pendown"></block><block type="turtle_penup"></block><block type="turtle_import"></block><block type="turtle_circle_advanced"></block><block type="turtle_hide"></block><block type="turtle_turn"></block></xml>';
      const xmlTurtleCategoryElement = document.querySelector('#turtleBlock xml [name=Turtle]');
      if (xmlTurtleCategoryElement) {
        xmlTurtleCategoryElement.setAttribute('colour', TurtleObj.blockColors('turtle').category);
      }
      const workspace = BlocklyObj.inject('turtleBlock', {
        media: 'https://unpkg.com/blockly@3.20200625.2/media/',
        toolbox: document.querySelector('#toolbox'),
        scrollbars: true,
        trashcan: true,
        theme: BlocklyObj.Themes.Dark,
        grid: {
          spacing: 20,
          length: 3,
          colour: 'rgba(255, 255, 255, 0.1)',
          snap: true,
        },
        zoom: {
          startScale: 3.0,
        },
        horizontalLayout: (window.innerWidth < 641 && !xmlBlock.includes('category')) || true,
        maxBlocks,
      });
      const xmlDom = BlocklyObj.Xml.textToDom(
        'submissionDetails' in response
        && response.submissionDetails.xmlWorkSpace
        && response.submissionDetails.xmlWorkSpace !== ''
        ? response.submissionDetails.xmlWorkSpace
        : '<xml><block type="turtle_import"></block></xml>',
        );
      BlocklyObj.Xml.domToWorkspace(xmlDom, workspace);
      workspace.addChangeListener();
      TurtleObj.workspace = workspace;
      // const msg = {
      //   type: 'turtle_import',
      //   caller: 'initializeBlockly',
      //   payload: {
      //     status: 'success',
      //   },
      // };
      // window.sendMessage(msg);
    } catch (error) {
      window.ReactNativeWebView.postMessage(`BlocklyObj error:  ${error}`);
    }
  };

  TurtleObj.initializeEditor = () => {
    try {
      if (!TurtleObj.editor) {
        const editor = ace.edit('codeBlock');
        editor.setOptions({
          fontSize: 16,
          wrap: true,
          showGutter: true,
          showLineNumbers: true,
          showPrintMargin: false,
          scrollPastEnd: true,
        });
        editor.setTheme('ace/theme/monokai');
        editor.session.setMode('ace/mode/python');
        editor.setReadOnly(true);
        TurtleObj.editor = editor;
      } else {
        TurtleObj.editor.setValue('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  TurtleObj.handleBlocksChange = () => {
    try {
      if (TurtleObj.workspace && TurtleObj.editor) {
        const code = BlocklyObj.Python.workspaceToCode(TurtleObj.workspace);
        TurtleObj.editor.setValue(code, 1); // 1 moves cursor to the end of the code
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    BlocklyObj,
    TurtleObj,
  };
}

const getEditor = (blocklyObj = {}, editorObj = {}, aceObject = {}) => {
  const BlocklyObj = blocklyObj;
  const managerObj = editorObj;
  const ace = aceObject;

  managerObj.initializeEditor = () => {
    try {
      if (!managerObj.editor) {
        const editor = ace.edit('codeBlock');
        editor.setOptions({
          fontSize: 16,
          wrap: true,
          showGutter: true,
          showLineNumbers: true,
          showPrintMargin: false,
          scrollPastEnd: true,
        });
        editor.setTheme('ace/theme/monokai');
        editor.session.setMode('ace/mode/python');
        editor.setReadOnly(true);
        managerObj.editor = editor;
      } else {
        managerObj.editor.setValue('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.handleBlocksChange = () => {
    try {
      if (managerObj.workspace && managerObj.editor) {
        const code = BlocklyObj.Python.workspaceToCode(managerObj.workspace);
        managerObj.editor.setValue(code, 1); // 1 moves cursor to the end of the code
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    managerObj,
  };
};

const getTurtleOutput = (
  blocklyObj = {}, turtleOutputObj = {}, skulptObj = {}, workerPoolObj = {},
) => {
  const BlocklyObj = blocklyObj;
  const managerObj = turtleOutputObj;
  // const Sk = skulptObj;
  const poolObj = workerPoolObj;

  managerObj.repositionTurtle = () => {
    try {
      const container = $('.outputContainer');
      const content = $('#answerCanvas');
      container.scrollLeft(
        (
          (content[0].scrollWidth * managerObj.canvasScale)
          - container.width()
        ) * 0.50,
      );
      container.scrollTop(
        (
          (content[0].scrollHeight * managerObj.canvasScale)
          - container.height()
        ) * 0.50,
      );
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.updateDebugState = () => {
    try {
      const debugButton = $('#continueDebugger');
      const runButton = $('#runCode');
      if (managerObj.inDebugging) {
        debugButton.show();
        runButton.hide();
      } else {
        debugButton.hide();
        runButton.show();
      }
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.toggleDebugState = () => {
    try {
      const buttonEl = $('.debugToggle');
      const iconEl = $('.debugToggle i');
      if (!managerObj.debuggingEnabled) {
        iconEl.removeClass('fa-pause-circle').addClass('fa-play-circle');
        managerObj.debuggingEnabled = true;
        buttonEl.attr('title', 'Disable debugger');
      } else {
        iconEl.removeClass('fa-play-circle').addClass('fa-pause-circle');
        managerObj.debuggingEnabled = false;
        buttonEl.attr('title', 'Enable debugger');
      }
      managerObj.updateDebugState();
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.toggleDrawingState = () => {
    try {
      const buttonEl = $('.drawingToggle');
      const eyeEl = $('.drawingToggle i');
      const answerCanvasEl = $('#userCanvas');
      if (managerObj.drawingVisible) {
        answerCanvasEl.css('opacity', 0);
        eyeEl.removeClass('fa-eye').addClass('fa-eye-slash');
        managerObj.drawingVisible = false;
        buttonEl.attr('title', 'Show output');
      } else {
        answerCanvasEl.css('opacity', 1);
        eyeEl.removeClass('fa-eye-slash').addClass('fa-eye');
        managerObj.drawingVisible = true;
        buttonEl.attr('title', 'Hide output');
      }
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.runNextStep = (data, resolve, reject) => {
    try {
      // disable continue debugging
      const stepData = data;
      $('#continueDebugger').attr('disabled', true);
      if (!managerObj.drawingVisible) {
        managerObj.toggleDrawingState();
      }
      if (managerObj.windowType === 'mobile' && !$('#outputTab').hasClass('active')) {
        $('#outputTab').tab('show');
      }
      stepData.data.promise.then((x) => {
        stepData.data.result = x;
        resolve(stepData.resume());
      }, (e) => {
        stepData.data.error = e;
        resolve(stepData.resume());
      }).catch((error) => {
        reject(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.attachDebugStepper = () => {
    $(document).on('click', '#continueDebugger', () => {
      if (managerObj.suspension
        && 'resolve' in managerObj.suspension
        && 'reject' in managerObj.suspension
        && 'stepData' in managerObj.suspension) {
        managerObj.runNextStep(
          managerObj.suspension.stepData,
          managerObj.suspension.resolve,
          managerObj.suspension.reject,
        );
      }
    });
  };

  managerObj.runCode = (
    code, target, animate = true, frames = 1, delay = 0, respectDebugger = false,
  ) => {
    window.ReactNativeWebView.postMessage(`script runcode sk, ${code}`);
    window.ReactNativeWebView.postMessage(Object.keys(Sk).toString());
    try {
      Sk.configure({
        read: (x) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
            throw Error(`File not found: ${x}`);
          }
          return Sk.builtinFiles.files[x];
        },
        __future__: Sk.python3,
        killableWhile: true,
        killableFor: true,
      });
      window.ReactNativeWebView.postMessage('skulpt configured');
      (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = target;
      Sk.TurtleGraphics.bufferSize = 1000;
      // const width = 1500;
      // Sk.TurtleGraphics.width = width;
      // Sk.TurtleGraphics.height = width;
      Sk.TurtleGraphics.animate = animate;
      setTimeout(() => {
        managerObj.repositionTurtle();
      }, 500);
      // eslint-disable-next-line new-cap
      Sk.builtins.highlightBlock = new Sk.builtin.func((id) => {
        managerObj.workspace.highlightBlock(id.v);
      });
      Sk.onAfterImport = (library) => {
        if (library === 'turtle') {
          Sk.TurtleGraphics.tracer(frames, delay);
        }
      };
      const attachDebugger = {
        'Sk.promise': (stepData) => {
          if (managerObj.debuggingEnabled && respectDebugger) {
            managerObj.inDebugging = true;
            managerObj.updateDebugState();
  
            // allow continue debugging
            $('#continueDebugger').attr('disabled', false);
            return new Promise((resolve, reject) => {
              managerObj.suspension = {
                stepData,
                resolve,
                reject,
              };
            });
          }
          managerObj.inDebugging = false;
          managerObj.updateDebugState();
          return false;
        },
      };
      window.ReactNativeWebView.postMessage('skulpt imported');
      return Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), attachDebugger);  
    } catch (error) {
      window.ReactNativeWebView.postMessage('script runcode error');
      // window.ReactNativeWebView.postMessage(error);
    }
  };

  managerObj.getPixelData = (selector) => {
    const pixelData = [];
    try {
      const canvases = document.querySelectorAll(selector);
      canvases.forEach((eachCanvas) => {
        const context = eachCanvas.getContext('2d');
        pixelData.push(context.getImageData(0, 0, eachCanvas.height, eachCanvas.width).data);
      });
    } catch (error) {
      console.log(error);
    }
    return pixelData;
  };

  managerObj.validateCode = (answerImages, userImages) => {
    try {
      if (answerImages.length !== userImages.length) {
        return false;
      }
      const pixelErrors = answerImages.map((eachImgData, eachKey) => {
        const minLength = Math.min(eachImgData.length, userImages[eachKey].length);
        let errors = 0;
        for (let itr = 0; itr < minLength; itr += 1) {
          if (Math.abs(eachImgData[itr] - userImages[eachKey][itr]) > 64) {
            errors += 1;
          }
        }
        return errors;
      });
      /*
        for future cases,
        when pixel errors there for correct questions
        we can have some redundant checks, also
        we can show cool maching percentage -- JOHNPK
      */
      for (let itr = 0; itr < pixelErrors.length; itr += 1) {
        if (pixelErrors[itr] > 100) {
          return false;
        }
      }
    } catch (error) {
      const msg = {
        type: 'error',
        caller: 'validateCode -> initiateRunCode',
        payload: {
          error,
        },
      };
      window.sendMessage(msg);
    }
    return true;
  };

  managerObj.resetDebugger = () => {
    // resetting suspensions
    managerObj.suspension = false;
    // reset ongoing debugger
    managerObj.inDebugging = false;
    managerObj.updateDebugState();
  };

  managerObj.initiateRunCode = () => {
    // highlight current running block
    BlocklyObj.Python.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    const code = BlocklyObj.Python.workspaceToCode(managerObj.workspace);
    BlocklyObj.Python.STATEMENT_PREFIX = '';

    let frames = managerObj.turtleConfig && managerObj.turtleConfig.frames
      ? managerObj.turtleConfig.frames : 1;
    let delay = managerObj.turtleConfig && managerObj.turtleConfig.delay
      ? managerObj.turtleConfig.delay : 0;
    if (code.includes('Screen().bgcolor')) {
      frames = 3;
      delay = 0;
    }
    let validated = false;
    managerObj.runCode(code, 'userCanvas', true, frames, delay, true).then(() => {
      managerObj.workspace.highlightBlock(null);
      const selector = $('#userCanvas')[0];
      if (!selector || !selector.turtleInstance) {
        // lets say like no promise in that case but we need to save code -- JPK
        return false;
      }
      return selector.turtleInstance.update();
    }).then(() => {
      // debugging complete
      managerObj.inDebugging = false;
      managerObj.updateDebugState();

      const answerImages = managerObj.getPixelData('#answerCanvas canvas');
      const userImages = managerObj.getPixelData('#userCanvas canvas');
      return poolObj.exec(managerObj.validateCode, [answerImages, userImages]);
    }).then((valid) => {
      validated = valid;
      const request = {
        type: 'validateQuestion',
        questionId: Number(managerObj.initialResponse.questionObject.question_id),
        sourceCode: managerObj.editor.getValue(),
        xmlWorkSpace: BlocklyObj.Xml.domToText(BlocklyObj.Xml.workspaceToDom(managerObj.workspace)),
        validated,
      };
      const msg = {
        type: 'validateQuestion',
        caller: 'initiateRunCode -> runCode',
        payload: {
          request,
        },
      };
      window.sendMessage(msg);
    })
      .catch((error) => {
        // reset debugger in case of error
        managerObj.resetDebugger();
        const msg = {
          type: 'error',
          caller: 'initiateRunCode -> runCode',
          payload: {
            error,
          },
        };
        window.sendMessage(msg);
      });
  };

  return {
    managerObj,
    // Sk,
    poolObj,
  };
};

export default null;

export {
  getBlockly,
  getEditor,
  getTurtleOutput,
};
