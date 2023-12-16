import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ route }) => {
  const { id, nome, comentario, livroComprado, valorLivro } =
    route?.params || {};
  const [pontos, setPontos] = useState(0);
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    if (id) {
      async function fetchPontosFromApi() {
        try {
          const response = await fetch(
            `https://6mvpsoj7gikhrtrk.vercel.app/alunos/${id}`
          );
          const data = await response.json();
          setPontos(data.pontos);
        } catch (error) {
          console.error("Erro ao buscar pontos da API:", error);
        }
      }

      fetchPontosFromApi();

      const intervalId = setInterval(fetchPontosFromApi, 60000);

      return () => clearInterval(intervalId);
    }
  }, [id]);

  function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) {
      return "Bom dia";
    } else if (hours >= 12 && hours < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Icon name="person" size={24} color="white" />
          <Text style={styles.headerTitleText}>
            {getGreeting()}, {nome}
          </Text>
        </View>
        <View style={styles.headerSubTitle}>
          <Text style={styles.headerSubTitleText}>
            Sua pontuação é:{" "}
            <Text style={{ color: "red", fontSize: 23, fontWeight: "bold" }}>
              {pontos}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.areaExtratoTitle}>
          <Text style={styles.areaExtratoTitleText}>Último Status</Text>
        </View>
        <View style={styles.areaExtrato}>
          <View style={styles.areaExtratoComentario}>
            <Text>Último comentário:</Text>
            <Text>{comentario}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "black",
              marginBottom: 10,
              marginTop: 10,
            }}
          ></View>
          <View style={styles.areaExtratoLivro}>
            <Text>Último livro:</Text>
            <Text>{livroComprado}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "black",
              marginBottom: 10,
              marginTop: 10,
            }}
          ></View>
          <View style={styles.areaExtratoValor}>
            <Text>Último valor gasto:</Text>
            <Text>{valorLivro}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#020202",
    padding: 16,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerTitle: {
    flexDirection: "row",
  },
  headerTitleText: {
    fontSize: 24,
    color: "#FFF",
    marginLeft: 15,
    marginBottom: 10,
  },
  headerSubTitleText: {
    fontSize: 18,
    color: "#FFF",
    marginLeft: 40,
  },
  body: {
    alignItems: "center",
  },
  areaExtratoTitle: {
    backgroundColor: "#FFF",
    width: 180,
    height: 40,
    borderRadius: 10,
    padding: 4,
  },
  areaExtratoTitleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  areaExtrato: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 100,
    width: "95%",
    height: 450,
    padding: 16,
  },
});

export default HomeScreen;