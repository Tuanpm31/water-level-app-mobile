import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Switch, ScrollView, ActivityIndicator } from 'react-native';
import colors from '../utils/colors';
import firebase from 'firebase';
import { waterToPercent, waterTankColor } from '../utils/water';

function MonitorScreen() {
  const [pump, setPump] = useState<boolean>();
  const [faucet, setFaucet] = useState<boolean>();
  const [waterLevel, setWaterLevel] = useState<string>();

  const [tankColor, setTankColor] = useState<string>();

  useEffect(() => {
    const controllerRef = firebase.database().ref("/controller");

    const listener = controllerRef.on("value", (snapshot) => {
      setPump(Boolean(snapshot.val().pump));
      setFaucet(Boolean(snapshot.val().faucet));
    });
    return () => {
      controllerRef.off("value", listener);
    }
  }, []);

  useEffect(() => {
    const currentRef = firebase.database().ref("/current")

    const listener = currentRef.on("value", (snapshot) => {
      setWaterLevel(waterToPercent(snapshot.val().level));
      setTankColor(waterTankColor(snapshot.val().level));
    })

    return () => {
      currentRef.off("value", listener);
    }
  }, []);

  const changeFaucetDB = (prevValue: boolean) => {
    firebase.database().ref("/controller").update({"faucet": prevValue ? 1 : 0});
  }

  const changePumpDB = (prevValue: boolean) => {
    firebase.database().ref("/controller").update({"pump": prevValue ? 1 : 0});
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
      <StatusBar />
      <SafeAreaView style={styles.container}> 
        <View style={styles.tank}>
          <View style={waterStyle({'waterLevel': waterLevel, 'tankColor': tankColor}).water}>
            <Text style={{color: "#fff"}}>{waterLevel}</Text>
          </View>
        </View>
        
        <View>
          <View style={styles.controlItem}>
            <Text>Điều khiển máy bơm: </Text>
            <Switch
              thumbColor={"f5dd4b"}
              ios_backgroundColor="#fff"
              onValueChange={changePumpDB}
              value={pump}
            />
          </View>

          <View style={styles.controlItem}>
            <Text>Van Xả: </Text>
            <Switch
              thumbColor={"f5dd4b"}
              ios_backgroundColor="#fff"
              onValueChange={changeFaucetDB}
              value={faucet}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tank: {
    width: 200,
    height: 400,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
    position: "relative"
  },
  controlItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  }
});

const waterStyle = (props: { waterLevel: string; tankColor: string; }) => StyleSheet.create({
  water: {
    marginBottom: 16,
    marginTop: 16,
    position: "absolute",
    backgroundColor: props.tankColor,
    height: props.waterLevel,
    width: "100%",
    bottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default MonitorScreen;