import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  debug,
  Easing,
  eq,
  Extrapolate,
  interpolate,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const Icons = Array.apply(null, {
  length: 40,
}).map((_, index) => index);

const runProgress = (clock: Clock) => {
  const state: Animated.TimingState = {
    finished: new Animated.Value(0),
    position: new Animated.Value(0),
    frameTime: new Animated.Value(0),
    time: new Animated.Value(0),
  };

  const config: Animated.TimingConfig = {
    toValue: new Animated.Value(1),
    duration: 500,
    easing: Easing.inOut(Easing.linear),
  };

  return block([
    cond(clockRunning(clock), timing(clock, state, config)),

    cond(eq(state.finished, 1), [
      stopClock(clock),
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),

      set(config.toValue, not(state.position)),
    ]),
    state.position,
  ]);
};

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(0);

  const clock = useRef(new Animated.Clock()).current;

  const progress = runProgress(clock);

  const animatedHeight = interpolate(progress, {
    inputRange: [0, 0.7, 1],
    outputRange: [70, 100, height],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedWidth = interpolate(progress, {
    inputRange: [0, 0.7, 1],
    outputRange: [70, 100, width],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedLeft = interpolate(progress, {
    inputRange: [0, 0.7, 1],
    outputRange: [width / 2 - 70 / 2, width / 2 - 100 / 2, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBorderRadius = interpolate(progress, {
    inputRange: [0, 0.7, 1],
    outputRange: [35, 100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBottom = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [25, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(() => cond(isModalVisible, startClock(clock)), [isModalVisible]);

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible === 1} transparent={true}>
        <Animated.View
          style={[
            styles.modal_wrapper,
            {
              height: animatedHeight,
              width: animatedWidth,
              left: animatedLeft,
              bottom: animatedBottom,
              borderRadius: animatedBorderRadius,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsModalVisible(isModalVisible ? 0 : 1)}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 25,
            }}
          >
            <AntDesign name="closecircle" size={24} color="black" />
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={Icons}
            renderItem={({ index }) => (
              <FontAwesome
                style={{ margin: 10 }}
                key={index}
                name="facebook-square"
                size={58}
                color="#171717"
              />
            )}
            numColumns={5}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Animated.View>
      </Modal>
      <TouchableOpacity
        onPress={() => setIsModalVisible(isModalVisible ? 0 : 1)}
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          backgroundColor: '#f8f8f8',
        }}
      >
        <MaterialIcons
          style={{
            position: 'absolute',
            left: 70 / 2 - 45 / 2,
            top: 70 / 2 - 45 / 2,
          }}
          name="menu"
          size={45}
          color="black"
        />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
  modal_wrapper: {
    backgroundColor: '#fff',
    height: 70,
    width: 70,
    borderRadius: 35,
    position: 'absolute',
    left: width / 2 - 70 / 2,
    bottom: 25,
  },
});
