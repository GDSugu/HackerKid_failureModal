const regexMatcher = (string) => {
  const regex = /(.*)\((.*)\)/;
  const match = string.match(regex);
  if (match && match[1]) {
    match[1] = match[1].trim();
  }
  try {
    switch (match[1]) {
      case 'left':
        return `Turn left by ${match[2]} degrees`;
      case 'right':
        return `Turn right by ${match[2]} degrees`;
      case 'forward':
        return `Move forward by ${match[2]} units`;
      case 'backward':
        return `Move backward by ${match[2]} units`;
      case 'goto':
        if (match[2]) {
          const parameterArray = match[2].split(',').map((value) => value.trim());
          return `Goto${(parameterArray[0] && parameterArray[0] !== 'None') ? ` x position by ${parameterArray[0]}` : ''}${(parameterArray[1] && parameterArray[1] !== 'None') ? ` y position by ${parameterArray[1]}` : ''}`;
        }
        return '';
      case 'setx':
        return `Goto${(match[2] && match[2] !== 'None') ? ` x position by ${match[2]}` : ''}`;
      case 'sety':
        return `Goto${(match[2] && match[2] !== 'None') ? ` y position by ${match[2]}` : ''}`;
      case 'setheading':
        return `Turn turtle head by ${match[2]} degrees`;
      case 'home':
        return 'Move turtle to home';
      case 'circle':
        if (match[2]) {
          const parameterArray = match[2].split(',').map((value) => value.trim());
          return `Draw a circle${(parameterArray[0] && parameterArray[0] !== 'None') ? ` of radius ${parameterArray[0]} units` : ''}${(parameterArray[1] && parameterArray[1] !== 'None') ? ` with extent ${parameterArray[1]} units` : ''}${(parameterArray[2] && parameterArray[2] !== 'None') ? ` with step ${parameterArray[2]} units` : ''}`;
        }
        return '';
      case 'dot':
        if (match[2]) {
          const parameterArray = match[2].split(',').map((value) => value.trim());
          return `Draw a dot${(parameterArray[0] && parameterArray[0] !== 'None') ? ` of diameter ${parameterArray[0]} units` : ''}${(parameterArray[1] && parameterArray[1] !== 'None') ? ` with color ${parameterArray[1]}` : ''}`;
        }
        return '';
      case 'stamp':
        return 'Stamp a copy of turtle shape';
      case 'clearstamp':
        return `Clear the stamp with id ${match[2]}`;
      case 'clearstamps':
        return `Clear the last ${match[2]} stamps`;
      case 'undo':
        return 'Undo the previous action';
      case 'speed':
        return (match[2] && match[2] !== '') ? `Set the speed of the turtle to ${match[2]}` : '';
      case 'degrees':
        return `Set the angle measurement degree units to ${match[2]}`;
      case 'radians':
        return `Set the angle measurement radians units to ${match[2]}`;
      case 'pendown':
        return 'Use pendown';
      case 'penup':
        return 'Use penup';
      case 'pensize':
        return (match[2] && match[2] !== '') ? `Set the pensize of the turtle to ${match[2]} units` : '';
      case 'pencolor':
        return (match[2] && match[2] !== '') ? `Set the pencolor of the turtle to ${match[2]}` : '';
      case 'fillcolor':
        return (match[2] && match[2] !== '') ? `Set the fillcolor of the turtle to ${match[2]}` : '';
      case 'color':
        return (match[2] && match[2] !== '') ? `Set the color of the turtle to ${match[2]}` : '';
      case 'begin_fill':
        return 'Begin color fill';
      case 'end_fill':
        return 'End fill color';
      case 'reset':
        return 'Reset the turtle drawing';
      case 'clear':
        return 'Clear the turtle drawing';
      case 'hideturtle':
        return 'Hide the turtle';
      case 'showturtle':
        return 'Show the turtle';
      case 'shape':
        return (match[2] && match[2] !== '') ? `Set the shape of the turtle to ${match[2]}` : '';
      case 'resizemode':
        return (match[2] && match[2] !== '') ? `Set the resizemode of the turtle to ${match[2]}` : '';
      case 'turtlesize':
        if (match[2]) {
          const parameterArray = match[2].split(',').map((value) => value.trim());
          return `Set the turtle size of ${(parameterArray[0] && parameterArray[0] !== 'None') ? ` width ${parameterArray[0]} units` : ''}${(parameterArray[1] && parameterArray[1] !== 'None') ? ` length ${parameterArray[1]} units` : ''}${(parameterArray[2] && parameterArray[2] !== 'None') ? ` outline ${parameterArray[2]} units` : ''}`;
        }
        return '';
      case 'shearfactor':
        return (match[2] && match[2] !== '') ? `Set the Shear Factor of the turtle to ${match[2]}` : '';
      case 'tilt':
        return (match[2] && match[2] !== '') ? `Tilt the turtle shape by ${match[2]} degrees` : '';
      case 'tiltangle':
        return (match[2] && match[2] !== '') ? `Set Tilt angle of the turtle to ${match[2]} degrees` : '';
      case 'Screen().bgcolor':
        return (match[2] && match[2] !== '') ? `Set background color of the turtle to ${match[2]}` : '';
      default:
        // do nothing;
    }
  } catch (error) {
    return '';
  }
  const turtleWriteRegex = /write\((.*), (.*), (.*), \((.*), (.*), (.*)\)\)/;
  const turtleWriteRegexMatch = string.match(turtleWriteRegex);
  if (turtleWriteRegexMatch && turtleWriteRegexMatch[1]) {
    const parameterArray = turtleWriteRegexMatch.map((value) => value.trim());
    return `Write text${(parameterArray[1] && parameterArray[1] !== 'None') ? ` with content ${parameterArray[1]}` : ''}${(parameterArray[2] && parameterArray[2] !== 'None') ? ` with movement ${parameterArray[2]}` : ''}${(parameterArray[3] && parameterArray[3] !== 'None') ? ` with alignment ${parameterArray[3]}` : ''}${(parameterArray[4] && parameterArray[4] !== 'None') ? ` with font name ${parameterArray[4]}` : ''}${(parameterArray[5] && parameterArray[5] !== 'None') ? ` with font size ${parameterArray[5]}` : ''}${(parameterArray[6] && parameterArray[6] !== 'None') ? ` with font weight ${parameterArray[6]}` : ''}`;
  }
  const forLoopRegex = /for (.*) in range\((.*)\)/;
  const forLoopRegexMatch = string.match(forLoopRegex);
  if (forLoopRegexMatch && forLoopRegexMatch[1]) {
    return `Repeat for the loop for ${forLoopRegexMatch[2]} times`;
  }
  const whileLoopRegex = /while (.*):/;
  const whileLoopRegexMatch = string.match(whileLoopRegex);
  if (whileLoopRegexMatch && whileLoopRegexMatch[1]) {
    return `Loop untill the condition ${whileLoopRegexMatch[2]}`;
  }
  const listLoopRegex = /for (.*) in \[(.*)\]/;
  const listLoopRegexMatch = string.match(listLoopRegex);
  if (listLoopRegexMatch && listLoopRegexMatch[1]) {
    return `Loop for each item in the list ${listLoopRegexMatch[2]}`;
  }
  const ifElseConditionRegex = /(elif|if) (.*):/;
  const ifElseConditionRegexMatch = string.match(ifElseConditionRegex);
  if (ifElseConditionRegexMatch && ifElseConditionRegexMatch[1]) {
    return (ifElseConditionRegexMatch[1] === 'if') ? `Check for the condition ${ifElseConditionRegexMatch[2]}` : `Else Check for the condition ${ifElseConditionRegexMatch[2]}`;
  }
  const elseRegex = /else:/;
  const elseRegexMatch = string.match(elseRegex);
  if (elseRegexMatch) {
    return 'Else do the Below';
  }
  return '';
};

const instructionGenerator = (sourceCode) => {
  const instructionArray = [];
  try {
    const codeArray = sourceCode.split('\n');
    codeArray.forEach((value) => {
      const instruction = regexMatcher(value);
      if (instruction && instruction !== '') {
        instructionArray.push(instruction);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return instructionArray;
};

export default instructionGenerator;
