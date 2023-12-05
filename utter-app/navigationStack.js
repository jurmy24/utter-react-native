import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingView from './Views/Intro/OnboardingView';
import LoginView from './Views/Intro/LoginView';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingView} />
      <Stack.Screen name="Login" component={LoginView} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
}


export default MyStack;
