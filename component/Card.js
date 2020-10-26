
import React, { useEffect, props } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/CardStyle";
import { Text, Image, View } from "react-native";


export default function Card({ title, state, nameUser, image, location, onPress }) {
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
          <View style={styles.cardProfile}>
            <Image
              style={{ width: "30%", height: "30%", borderRadius: 10 }}
              source={iconProfile.icon} />
            <Text  style={styles.nameUser} >
             {nameUser}  
            </Text>
          </View>
         
          <View style={{ flex: 0.6, marginHorizontal: 12,marginVertical: 3, overflow: "hidden" }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardLocation}>{location}</Text>
            <Text style={styles.cardDescription}>{state}</Text>
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