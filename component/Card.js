
import React, { useEffect, props } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/CardStyle";
import { Text, Image, View } from "react-native";
import UserPhotoName from "../component/UserPhotoName";

export default function Card({ title, state, name, image, location, onPress }) {

  const compactLocation = compactWord(location)

  function compactWord(word) {


    if (word.length > 15) {

      var res = word.substr(0, 15);
      return res += "...";
    }
    return word
  };
  const iconTrade = {
    icon: require('../assets/favicon.png')
  }
  const iconProfile = {
    icon: require('../assets/profilepicture.jpg')
  }
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={{ flexDirection: "row" }} >
          <UserPhotoName nameUser={name} />

          <View style={{ flex: 0.6, marginLeft: 20, marginVertical: 3, overflow: "hidden" }}>
            <Text style={styles.cardTitle}>{title}</Text>

            <Text style={styles.cardDescription}>{state}</Text>

            <Text style={styles.cardLocation}>{compactLocation}</Text>
          </View>

          <View style={styles.cardImage}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              source={image}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}