//cette page c'est pour recevoir les données de la bdd et ils vont etre utiliser par la page profile
// (format json)
//Firebase
import * as firebase from "firebase";
import {firebaseConfig} from "../config";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
/*const database = firebase.firesltore();
const userEmail =  firebase.auth().currentUser ? firebase.auth().currentUser.email : "user inconnu";
//

const req=() => {
    const data=[];
    let num=1;
    const userData =
        database.collection("Post").where("User", "==", userEmail)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    num++;
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data().Image);
                    data.push({type:'Human',imageUri:doc.data().Image,heading:doc.data().Title,
                        description:doc.data().Description, key:num.toString(),color:'#9dcdfa'});
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    console.log(data);
    return data;
}
export default req;*/
/*

export default [
    {
        type: 'Humlan P',
        imageUri: ('https://firebasestorage.googleapis.com/v0/b/trade-it-4962e.appspot.com/o/images%2F02DB4C08-50D0-4B8A-8C30-AF74AA2128CD.jpg%22?alt=media&token=ed2051fe-107d-49a7-baab-c852900aa167'),
        heading: 'Vibrant colors',
        description: 'Four on-trend colorways to seamlessly suit your style.',
        key: 'first',
        color: '#9dcdfa',
    },ù
    {
        type: 'Pampas',
        imageUri: require('../assets/favicon.png'),
        heading: 'Redefined sound',
        description: 'A bold statement tuned to perfection.',
        key: 'second',
        color: '#db9efa',
    },
    {
        type: 'Humlan P',
        imageUri: require('../assets/favicon.png'),
        heading: 'Great quality',
        description:
            'An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology',
        key: 'third',
        color: '#999',
    },
    {
        type: 'Humlan B',
        imageUri: require('../assets/favicon.png'),
        heading: 'From Sweden',
        description:
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”' +
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”' +
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”' +
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”' +
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”' +
            'The “Plattan” in Plattan headphones is Swedish for “the slab.”',
        key: 'fourth',
        color: '#a1e3a1',
    },
];
*/
