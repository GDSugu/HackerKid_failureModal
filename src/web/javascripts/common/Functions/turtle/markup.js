const allBlocksMarkup = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none"><category name="Turtle" colour="rgb(140, 192, 175)"><block type="turtle_import"></block><block type="turtle_movement"></block><block type="turtle_turn"></block><block type="turtle_turn_custom"></block><block type="turtle_goto"></block><block type="turtle_setx"></block><block type="turtle_sety"></block><block type="turtle_setheading"></block><block type="turtle_circle"></block><block type="turtle_home"></block><block type="turtle_circle_advanced"></block><block type="turtle_dot"></block><block type="turtle_stamp"></block><block type="turtle_get_stamp"></block><block type="turtle_clearstamp"></block><block type="turtle_clearstamps"></block><block type="turtle_undo"></block><block type="turtle_speed"></block><block type="turtle_set_speed_custom"></block><block type="turtle_get_speed"></block><block type="turtle_get_position"></block><block type="turtle_towards"></block><block type="turtle_xcor"></block><block type="turtle_ycor"></block><block type="turtle_get_heading"></block><block type="turtle_get_distance"></block><block type="turtle_degrees"></block><block type="turtle_radians"></block><block type="turtle_pendown"></block><block type="turtle_penup"></block><block type="turtle_pensize"></block><block type="turtle_get_pensize"></block><block type="turtle_isdown"></block><block type="turtle_pencolor"></block><block type="turtle_pencolor_rgb"></block><block type="turtle_get_pencolor"></block><block type="turtle_fillcolor"></block><block type="turtle_fillcolor_rgb"></block><block type="turtle_get_fillcolor"></block><block type="turtle_color"></block><block type="turtle_getcolor"></block><block type="turtle_filling"></block><block type="turtle_beginfill"></block><block type="turtle_endfill"></block><block type="turtle_reset"></block><block type="turtle_clear"></block><block type="turtle_write"></block><block type="turtle_hide"></block><block type="turtle_show"></block><block type="turtle_isvisible"></block><block type="turtle_set_shape"></block><block type="turtle_get_shape"></block><block type="turtle_set_resizemode"></block><block type="turtle_get_resizemode"></block><block type="turtle_set_size"></block><block type="turtle_get_size"></block><block type="turtle_shearfactor"></block><block type="turtle_get_shearfactor"></block><block type="turtle_tilt"></block><block type="turtle_tiltangle"></block><block type="turtle_get_tiltangle"></block><block type="turtle_bgcolor"></block><block type="turtle_get_bgcolor"></block></category><category name="Logic" colour="%{BKY_LOGIC_HUE}"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category name="Loops" colour="%{BKY_LOOPS_HUE}"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Math" colour="%{BKY_MATH_HUE}"><block type="math_number"><field name="NUM">123</field></block><block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="math_single"><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block><block type="math_trig"><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block><block type="math_constant"></block><block type="math_number_property"><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block><block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value></block><block type="math_on_list"></block><block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_float"></block><block type="math_atan2"><value name="X"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block></category><category name="Text" colour="%{BKY_TEXTS_HUE}"><block type="text"></block><block type="text_join"></block><block type="text_append"><value name="TEXT"><shadow type="text"></shadow></value></block><block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block><block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR"></field></block></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR"></field></block></value></block><block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR"></field></block></value></block><block type="text_changeCase"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_trim"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_prompt_ext"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block></category><category name="Lists" colour="%{BKY_LISTS_HUE}"><block type="lists_create_with"><mutation items="0"></mutation></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR"></field></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR"></field></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR"></field></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR"></field></block></value></block><block type="lists_split"><value name="DELIM"><shadow type="text"><field name="TEXT">,</field></shadow></value></block><block type="lists_sort"></block></category><category name="Colour" colour="%{BKY_COLOUR_HUE}"><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"><value name="RED"><shadow type="math_number"><field name="NUM">100</field></shadow></value><value name="GREEN"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="BLUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block><block type="colour_blend"><value name="COLOUR1"><shadow type="colour_picker"><field name="COLOUR">#ff0000</field></shadow></value><value name="COLOUR2"><shadow type="colour_picker"><field name="COLOUR">#3333ff</field></shadow></value><value name="RATIO"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value></block></category><sep></sep><category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category><category name="Functions" colour="Procedures" custom="PROCEDURE"></category></xml>';

export default allBlocksMarkup;