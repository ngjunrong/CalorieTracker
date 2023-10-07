import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from "react-native";

const TDEECalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [tdee, setTDEE] = useState(0);

  const calculateTDEE = () => {
    let formulaResult = 0;
    if (gender === "male") {
      formulaResult = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      formulaResult = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    switch (activityLevel) {
      case "sedentary":
        formulaResult *= 1.2;
        break;
      case "lightly-active":
        formulaResult *= 1.375;
        break;
      case "moderately-active":
        formulaResult *= 1.55;
        break;
      case "very-active":
        formulaResult *= 1.725;
        break;
      case "extra-active":
        formulaResult *= 1.9;
        break;
      default:
        break;
    }
    setTDEE(formulaResult.toFixed(2));
    Keyboard.dismiss();
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Weight (in kilograms)"
      />
      <TextInput
        style={style.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholder="Height (in centimeters)"
      />
      <TextInput
        style={style.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Age"
      />
      <Text style={style.radioLabel}>Select your gender:</Text>
      <Button
        style={style.button}
        title="Male"
        onPress={() => setGender("male")}
      />
      <Button
        style={style.button}
        title="Female"
        onPress={() => setGender("female")}
      />

      <Text style={style.radioInput}>Select your activity level:</Text>

      <Button
        style={style.button}
        title="Sedentary"
        onPress={() => setActivityLevel("sedentary")}
      />
      <Button
        style={style.button}
        title="Lightly Active"
        onPress={() => setActivityLevel("lightly-active")}
      />
      <Button
        style={style.button}
        title="Moderately Active"
        onPress={() => setActivityLevel("moderately-active")}
      />
      <Button
        style={style.button}
        title="Very Active"
        onPress={() => setActivityLevel("very-active")}
      />
      <Button
        style={style.button}
        title="Extra Active"
        onPress={() => setActivityLevel("extra-active")}
      />

      <Button
        style={style.button}
        title="Calculate TDEE"
        onPress={calculateTDEE}
      />
      <Text style={style.result}> Your daily calorie intake is: {tdee}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  button: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0066cc",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  radioLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioInput: {
    marginRight: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default TDEECalculator;
