
import React, { useEffect,useState, props } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/CardStyle";
import { Text, Image, View } from "react-native";
import UserPhotoName from "../component/UserPhotoName";
import * as firebase from "firebase";
import 'firebase/firestore';
export default function Card({ title, state, name, image, location, onPress }) {

  const [pickedImage, setPickedImage] = useState(null);
   const compactLocation = compactWord(location)
  useEffect(() => {

    console.log("------------------------------------------------------------------------------------------------------------------------")
    console.log(" In to Card page " + image)
     getImage(image);
    
  }, []);
  function compactWord(word) {

    if (word.length > 15) {

      var res = word.substr(0, 15);
      return res += "...";
    }
    return word
  };

  const getImage = async (imageName) => {
    console.log(" the image that we are going to look for = " +imageName)  
    let imageRef = firebase.storage().ref('images/' + imageName);
    const url = await imageRef.getDownloadURL();
  //  console.log(" value of source uri " + url)
    setPickedImage(url);

//    console.log(" value of picked image after setting " + pickedImage)
  }
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={{ flexDirection: "row" }} >
          <UserPhotoName nameUser={name} />

          <View style={{ flex: 0.6, marginLeft: 20, marginVertical: 3, overflow: "hidden" }}>
            <Text style={styles.cardTitle}>{title}</Text>

            <Text style={styles.cardDescription}>{state}</Text>

            <Text style={styles.cardLocation}>{location}</Text>
          </View>

          <View style={styles.cardImage}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              source={{ uri:pickedImage, }}
            />

          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}