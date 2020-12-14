import React, {useEffect, useState} from 'react';
import { View, Text, Dimensions, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import firebase from 'firebase';
import {getTimeFromDateTimeList} from '../utils/helper';
import colors from '../utils/colors';


function ChartScreen() {
  const [lTime, setLTime] = useState<any>([]);
  const [lLevel, setLLevel] = useState<any>([]);

  useEffect(() => {
    const trackingRef = firebase.database().ref("tracking");

    const listenner = trackingRef.on('value', (snapshot) => {
      let tempArrLevel: any[] = [];
      let tempArrTime: any[] = [];

      Object.keys(snapshot.val()).forEach((k) => {
        let entry = snapshot.val()[k];
        tempArrLevel.push(entry.level);
        tempArrTime.push(entry.time)
      })
      setLLevel(tempArrLevel);
      setLTime(tempArrTime);
    });
    
    return () => {
      trackingRef.off('value', listenner);
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {
          (lTime.length > 6 && lLevel.length > 6) ? <LineChart
          data={{
            labels: getTimeFromDateTimeList(lTime.slice(lTime.length - 6, lTime.length)),
            datasets: [
              {
                data: lLevel.slice(lLevel.length - 6, lLevel.length)
              }
            ]
          }}
          width={Dimensions.get("window").width}
          height={400}
          yAxisInterval={1}
          chartConfig={{
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            backgroundColor: colors.WATER_COLORS_DEFAULT,
            backgroundGradientFrom: colors.WATER_COLORS_DEFAULT,
            backgroundGradientTo: colors.WATER_COLORS_DEFAULT,
          }}
          bezier
          /> : <ActivityIndicator size="large" color={colors.WATER_COLORS_DEFAULT} />
        }       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  }
})

export default ChartScreen;