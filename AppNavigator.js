import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import Login from './Login';
import Form from './Form';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SignupStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };

const LoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  };

const FormStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Signup" component={SignupStack} />
      <Tab.Screen name="Login" component={LoginStack} />
      <Tab.Screen name="Form" component={FormStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      
    </Tab.Navigator>
  );
};

export default AppNavigator;