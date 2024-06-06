import React from 'react';
import { Deck, Slide, Heading, Text, CodePane, defaultTheme} from 'spectacle'; 
import 'prismjs/themes/prism-tomorrow.css';
const theme = {
    ...defaultTheme,
    colors: {
      primary: '#282c34', 
      secondary: '#61dafb', 
      tertiary: '#ffffff',
      quaternary: '#ffcc00',
    },
    fonts: {
      header: 'Montserrat, Helvetica, Arial, sans-serif',
      text: 'Helvetica, Arial, sans-serif',
    },
  };

const codeSnippet1 = `
useEffect(() => {
    if (runInterval) {
        intervalRef.current = setInterval(() => {
            moveBot()
        }, 16);
    }

    return () => {
        clearInterval(intervalRef.current);
    };
}, [runInterval]);
`;

const codeSnippet2a = `
function moveBot() {
    if(gameInfo.started && !gameInfo.over){
        setBotState(prevBotState => {
            try {
                let newRotation = (prevBotState.rotation + botSpeed) % 360;
                let newLap = prevBotState.lap;
                if (newRotation >= 180) { 
                    newRotation = 0;
                    newLap++;
                    if(newLap === 5){
                        winGame('AI')
                    }
                }
`;
const codeSnippet2b = `
const x = Math.cos((newRotation * Math.PI) / 180) * radius;
const y = Math.sin((newRotation * Math.PI) / 180) * radius;
botRef.current.style.transform = \`rotate(\${newRotation}deg) translate(\${x}px, \${y}px) rotate(\${newRotation}deg)\`;
if (botRef.current.classList.contains('hide')) botRef.current.classList.remove('hide');
return {...botState, rotation: newRotation, lap: newLap };
} catch (error) { 
    console.log(error) 
}
});
}
}
`;

const codeSnippet3a = `
function movePlayer() {
    if(playerRef.current.classList.contains('hide')){
        playerRef.current.classList.remove('hide') 
        setRunInterval(true)
    }
    let newMove = playerState.move + 1
    let newLap = playerState.lap 
    if(newMove === 60){
        newMove = 0;
        newLap++
        if(newLap === 5){
            return winGame(gameInfo.username)
        }
    }
    const newRotation = (playerState.rotation + playerSpeed) % 360;
`;

const codeSnippet3b = `
const x = Math.cos((newRotation * Math.PI) / 180) * radius;
const y = Math.sin((newRotation * Math.PI) / 180) * radius;

playerRef.current.style.transform = \`rotate(\${newRotation}deg) translate(\${x}px, \${y}px) rotate(\${newRotation}deg)\`;
setPlayerState({...playerState, move: newMove, rotation: newRotation, lap: newLap});
}
`;

export default function Prezentacja() {
    return (
        <Deck theme={theme} transition={['fade']} transitionDuration={500}>
            <Slide>
                <Heading>Logika ruchu pojazdów w mojej grze</Heading>
            </Slide>
            <Slide>
                <Heading>Wstęp</Heading>
                <Text>Komponent React <code>Board</code> to interaktywna gra wyścigowa, w której gracz i AI (bot) ścigają się po okrągłej trasie.</Text>
            </Slide>
            <Slide bgColor="primary">
                <Heading color="secondary">Czym jest React?</Heading>
                <Text>React to biblioteka JavaScript służąca do budowy interfejsów użytkownika, szczególnie aplikacji jednostronicowych. Została stworzona przez Facebooka i jest używana do budowy dynamicznych i responsywnych aplikacji internetowych.</Text>
            </Slide>
            <Slide>
                <Heading>Kluczowe zmienne i stany</Heading>
                <Text><code>runInterval</code>: Boolean, steruje czy interwał ruchu bota jest uruchomiony.</Text>
                <Text><code>gameInfo</code>: Obiekt przechowujący informacje o stanie gry.</Text>
                <Text><code>playerState</code> i <code>botState</code>: Obiekty przechowujące stan gracza i bota.</Text>
                <Text><code>playerRef</code> i <code>botRef</code>: Referencje do elementów DOM reprezentujących pojazdy gracza i bota.</Text>
            </Slide>
            <Slide>
                <Heading>Logika ruchu bota: Uruchomienie interwału</Heading>
                <CodePane language="javascript" theme="dark">
                    {codeSnippet1}
                </CodePane>
            </Slide>
            <Slide bgColor="primary">
                <Heading color="secondary">Logika ruchu bota: Funkcja moveBot (Część 1)</Heading>
                <CodePane language="javascript" highlightStart={1} highlightEnd={15}>
                    {codeSnippet2a}
                </CodePane>
            </Slide>
            <Slide bgColor="primary">
                <Heading color="secondary">Logika ruchu bota: Funkcja moveBot (Część 2)</Heading>
                <CodePane language="javascript" highlightStart={1} highlightEnd={14}>
                    {codeSnippet2b}
                </CodePane>
            </Slide>
            <Slide bgColor="primary">
                <Heading color="secondary">Logika ruchu gracza: Funkcja movePlayer (Część 1)</Heading>
                <CodePane language="javascript" highlightStart={1} highlightEnd={27}>
                    {codeSnippet3a}
                </CodePane>
            </Slide>
            <Slide bgColor="primary">
                <Heading color="secondary">Logika ruchu gracza: Funkcja movePlayer (Część 2)</Heading>
                <CodePane language="javascript" highlightStart={1} highlightEnd={27}>
                    {codeSnippet3b}
                </CodePane>
            </Slide>
            <Slide >
                <Heading>Podsumowanie</Heading>
                <Text>Logika ruchu pojazdów w komponencie <code>Board</code> opiera się na regularnym aktualizowaniu stanu rotacji i pozycji zarówno gracza, jak i bota.</Text>
                <Text>Używa funkcji <code>moveBot</code> i <code>movePlayer</code>, aby animować pojazdy po okręgu oraz sprawdza warunki wygranej na podstawie liczby ukończonych okrążeń.</Text>
            </Slide>
        </Deck>
    );
}
