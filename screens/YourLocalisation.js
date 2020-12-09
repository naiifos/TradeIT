import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as firebase from "firebase";

export default function Yourlocalisation() {


    const name =firebase.auth().currentUser.name;
    const user =firebase.auth().currentUser.email;
  const [latitude, setLatitude] = useState("null")
  const [longitude, setLongitude] = useState("null")
  const [adress, setAdress] = useState("")

  useEffect(() => {

    const results = firebase.firestore()
        .collection('User')
        .doc(user)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            parseInt(doc.data().Latitude)
            parseInt(doc.data().Longitude)
            const latitude =doc.data().Latitude
            const longitude =doc.data().Longitude
            const HERE_API_KEY= "bQAQCC_Dyl4b1GQuXzCnYcDDU3OoDGDX5ojO9qcJDM8"


            getAddressFromCoordinates(doc.data().Latitude,doc.data().Longitude)
                .then((resJson) => {
                  console.log("adress = "+resJson)
                  setAdress(resJson);
                })
            function getAddressFromCoordinates( latitude, longitude ) {

              return new Promise((resolve) => {
                const HERE_API_KEY= "bQAQCC_Dyl4b1GQuXzCnYcDDU3OoDGDX5ojO9qcJDM8"
                const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}`
                fetch(url)
                    .then(res => res.json())
                    .then((resJson) => {
                      // the response had a deeply nested structure :/
                      if (resJson
                          && resJson.Response
                          && resJson.Response.View
                          && resJson.Response.View[0]
                          && resJson.Response.View[0].Result
                          && resJson.Response.View[0].Result[0]) {
                        resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
                      } else {
                        resolve()
                      }
                    })
                    .catch((e) => {
                      console.log('Error in getAddressFromCoordinates', e)
                      resolve()
                    })
              })
            }

            setLatitude(doc.data().Latitude);
            setLongitude(doc.data().Longitude);

          }else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });

    return () => results
  }, [])

    return (
      <View style={styles.container}>
             <MapView style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}

              region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.008,
              }}>
                  <MapView.Marker
                      coordinate={{
                          latitude:latitude,
                          longitude:longitude}}
                      title={name+" location"}
                      description={adress}
                  />

          </MapView>
      </View>
    );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
