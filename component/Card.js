
import React, { useEffect,useState, props } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/CardStyle";
import { Text, Image, View } from "react-native";
import UserPhotoName from "../component/UserPhotoName";
import * as firebase from "firebase";
import 'firebase/firestore';
export default function Card({ title, state, name, image,date, onPress }) {

  const [pickedImage, setPickedImage] = useState(null);

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={{ flexDirection: "row" }} >
          <UserPhotoName nameUser={name} />

          <View style={{ flex: 0.6, marginLeft: 20, marginVertical: 3, overflow: "hidden" }}>
            <Text style={styles.cardTitle}>{title}</Text>

            <Text style={styles.cardDescription}>{state}</Text>
            <Text style={styles.cardDate}>{date}</Text>

          </View>

          <View style={styles.cardImage}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              source={{ uri:image, }}
            />

          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}