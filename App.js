import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const CustomHeader = ({title, isHome, navigation}) => {
  return (
    <View style={styles.header}>
      <View style={styles.col1}>
        {isHome ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.image}
              source={require('./src/images/menu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.imageBack}
              source={require('./src/images/left.png')}
              resizeMode="contain"
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.col2}>
        <Text> {title}</Text>
      </View>
      <View style={styles.col3} />
    </View>
  );
};

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Home" isHome={true} navigation={navigation} />
      <View style={styles.home}>
        <Text>Home!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeDetail')}>
          <Text>Go Home Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeDetailScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Home Detail" navigation={navigation} />
      <View style={styles.home}>
        <Text>Home Detail!</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Settings" isHome={true} navigation={navigation} />
      <View style={styles.setting}>
        <Text>Settings!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SettingDetail')}>
          <Text>Go Setting Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SettingsDetailScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Settings Detail" navigation={navigation} />
      <View style={styles.setting}>
        <Text>Settings Detail!</Text>
      </View>
    </SafeAreaView>
  );
}

const StackHome = createStackNavigator();
const StackSetting = createStackNavigator();

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.drawerWrapper}>
      <View style={styles.profile}>
        <Image
          source={require('./src/images/profile.png')}
          style={styles.profileImage}
        />
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('MenuTab')}>
          <Text>Menu Tab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Notifications')}>
          <Text>Notifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="HomeDetail"
        component={HomeDetailScreen}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
}

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen
        name="Setting"
        component={SettingsScreen}
        options={navOptionHandler}
      />
      <StackSetting.Screen
        name="SettingDetail"
        component={SettingsDetailScreen}
        options={navOptionHandler}
      />
    </StackSetting.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./src/images/home-color.png')
              : require('./src/images/home.png');
          } else if (route.name === 'Settings') {
            iconName = focused
              ? require('./src/images/setting-color.png')
              : require('./src/images/setting.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="MenuTab"
        drawerContent={props => CustomDrawerContent(props)}>
        <Drawer.Screen name="MenuTab" component={TabNavigator} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
  },
  image: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  imageBack: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  col1: {
    flex: 1,
    justifyContent: 'center',
  },
  col2: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col3: {
    flex: 1,
    justifyContent: 'center',
  },
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  back: {
    flexDirection: 'row',
    //justifyContent: 'center',
  },
  backText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
  },
  drawerWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profile: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },
});
