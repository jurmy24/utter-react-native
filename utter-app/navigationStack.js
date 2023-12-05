import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingView from './Views/Intro/OnboardingView';
import LoginView from './Views/Intro/LoginView';
import MainContainer from './Views/Intro/MainContainerIntro';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingView} />
      <Stack.Screen name="Login" component={LoginView} />
      {/* <Stack.Screen name="Intro" component={MainContainer}/> */}
    </Stack.Navigator>
  );
}


export default MyStack;
