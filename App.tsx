import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Icons = Array.apply(null, {
  length: 40,
}).map((_, index) => index);

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#fff', margin: 25 }}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(!isModalVisible)}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 15,
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
                size={48}
                color="rgba(0, 0, 255, 1)"
              />
            )}
            numColumns={5}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setIsModalVisible(!isModalVisible)}
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
});
