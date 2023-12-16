import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RecPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const requestOptions = useMemo(() => ({
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      novaSenha: senha,
      confirmarSenha: confSenha,
    }),
  }), [email, senha, confSenha]);

  const handleRecPassword = async () => {
    try {
      const response = await fetch(
        "https://6mvpsoj7gikhrtrk.vercel.app/alunos/change-password",
        requestOptions
      );

      const data = await response.json();

      if (response.ok) {
        setMensagemSucesso("Senha alterada com sucesso!");
        setMensagemErro("");
      } else {
        setMensagemErro(
          data.message || "Erro ao alterar a senha. Tente novamente."
        );
        setMensagemSucesso("");
      }
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
      setMensagemErro("Erro ao processar solicitação. Tente novamente.");
      setMensagemSucesso("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#FFF"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Icon name="mail-outline" size={20} style={styles.icon} />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#FFF"
            secureTextEntry
            onChangeText={(text) => setSenha(text)}
            value={senha}
          />
          <Icon name="lock-closed-outline" size={20} style={styles.icon} />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#FFF"
            secureTextEntry
            onChangeText={(text) => setConfSenha(text)}
            value={confSenha}
          />
          <Icon name="lock-closed-outline" size={20} style={styles.icon} />
        </View>
      </View>

      {mensagemSucesso ? (
        <View style={styles.mensagemSucesso}>
          <Text style={styles.mensagemSucessoText}>{mensagemSucesso}</Text>
        </View>
      ) : null}

      {mensagemErro ? (
        <View style={styles.mensagemErro}>
          <Text style={styles.mensagemErroText}>{mensagemErro}</Text>
        </View>
      ) : null}

      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.Button} onPress={handleRecPassword}>
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#020202",
  },
  inputContainer: {
    width: "80%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    marginBottom: 10,
    marginTop: 50,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#FFF",
  },
  icon: {
    marginLeft: 10,
    color: "#FFF",
  },
  areaBtn: {
    marginBottom: 300,
  },
  Button: {
    backgroundColor: "#FF3131",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  mensagemSucesso: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  mensagemSucessoText: {
    color: "#FFF",
    textAlign: "center",
  },
  mensagemErro: {
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  mensagemErroText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default RecPassword;