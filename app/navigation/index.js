import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Player } from "pages";

const MainStack = createStackNavigator();

const Navigation = () => {
    return <NavigationContainer>
        <MainStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <MainStack.Screen
                name="Home"
                component={Home}
            />
            <MainStack.Screen
                name="Player"
                component={Player}
            />
        </MainStack.Navigator>
    </NavigationContainer>
};

export default Navigation;