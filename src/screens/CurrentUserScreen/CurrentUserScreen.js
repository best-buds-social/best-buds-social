import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CurrentUserScreen() {
  const [currentUser, setCurrentUser] = useState([]);

  const currentPerson = firebase.auth().currentUser.uid;

  useEffect(() => {
    (async () => {
      //query gets loggedin user doc from firestore
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(currentPerson)
        .get()
        .then((doc) => {
          return doc.data();
        });

      setCurrentUser(snapshot);
    })();
  }, []);

  const getDogData = () => {
    firebase
    .firestore()
    .collection("users")
    .doc(currentPerson)
    .get(dogData)
    .then({
        dogName,
        dogSize,
        dogGender,
        dogBreed,
        dogTemperament,
    })
  }
    

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} colors="#EC2379"></Ionicons>
          <Ionicons name="md-more" size={24} colors="#EC2379"></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: currentUser.image }}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>

          <View style={styles.chat}>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </View>

          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>
            {currentUser.fullName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Best Buds Dog Lover
          </Text>
        </View>

        <View style={styles.userBio}>
        <Text style={[styles.text, { fontSize: 14 }]}>
            {currentUser.userBio}
          </Text>
        </View>

        <View style={styles.dogData}>
        <Text style={[styles.text, { fontSize: 14 }]}>
             <Text>{getDogData}</Text>)
          </Text>
        </View>



      </ScrollView>
    </SafeAreaView>
  );
}
