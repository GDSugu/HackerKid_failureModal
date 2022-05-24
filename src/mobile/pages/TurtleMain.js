import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import ThemeContext from '../components/theme';
import turtleMainBg from '../../images/turtle/turtleMainBg.png';
import GameQuestion from '../../images/games/question.svg';
import GameCode from '../../images/games/code.svg';
import GameOutput from '../../images/games/output.svg';
import TurtleQuestion from './TurtleQuestion';
import TurtleEditor from './TurtleEditor';
import TurtleOutput from './TurtleOutput';
import GameNavigator from '../components/GameNavigator';
import { useTurtleFetchQuestion, TurtleContext } from '../../hooks/pages/turtle';

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TurtleMain = () => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenTurtleHome;
  const style = getStyles(pageTheme, font, theme.utilColors);

  const [currentGameScreen, setCurrentGameScreen] = React.useState('TurtleQuestion');

  const { state: turtleQuestionState } = useTurtleFetchQuestion({
    type: 'initialQuestion',
    virtualId: 3,
  });

  const TurtleScreenArray = [
    {
      tabTitle: 'Question',
      name: 'TurtleQuestion',
      component: TurtleQuestion,
      Icon: GameQuestion,
    },
    {
      tabTitle: 'Code',
      name: 'TurtleEditor',
      component: TurtleEditor,
      Icon: GameCode,
    },
    {
      tabTitle: 'Output',
      name: 'TurtleOutput',
      component: TurtleOutput,
      Icon: GameOutput,
    },
  ];

  return <>
    <View style={style.container}>
      <ImageBackground
        source={turtleMainBg}
        style={style.container}
      >
        <View style={[style.container, { backgroundColor: currentGameScreen === 'TurtleQuestion' ? 'transparent' : theme.utilColors.dark }]}>
          <TurtleContext.Provider value={turtleQuestionState}>
            <GameNavigator
              ScreenArray={TurtleScreenArray}
              currentScreen={{ currentGameScreen, setCurrentGameScreen }} />
          </TurtleContext.Provider>
        </View>
      </ImageBackground>
    </View>
  </>;
};

export default TurtleMain;
