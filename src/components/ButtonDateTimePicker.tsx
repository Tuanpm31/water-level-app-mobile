import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import colors from '../utils/colors';

type ButtonDateTimePickerProps = {
  type: string,
  startOrEnd: string,
  onPress: (event: GestureResponderEvent) => void,
  date: string
}

const ButtonDateTimePicker: React.FC<ButtonDateTimePickerProps> = ({
  type,
  startOrEnd,
  onPress,
  date
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{type}</Text>
        <Text>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    paddingVertical: 17,
    borderRadius: 5,
    marginBottom: 16
  },
  text: {
    fontSize: 13,
    color: "#434657"
  }
})

export default ButtonDateTimePicker;