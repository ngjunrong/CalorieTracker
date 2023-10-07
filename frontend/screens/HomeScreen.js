import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LogBox,
} from "react-native";

export default function HomeScreen() {
  // if dont want console warning on expo
  LogBox.ignoreAllLogs();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const url = "http://192.168.43.106:3000/api/food";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [data]);

  const handleAddToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    setTotalCalories(totalCalories + item.calorie);
    setTotalProtein(totalProtein + item.protein);
    setTotalCarbs(totalCarbs + item.carbs);
    setTotalFat(totalFat + item.fat);
  };

  const handleRemoveFromCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      setTotalCalories(totalCalories - item.calorie);
      setTotalProtein(totalProtein - item.protein);
      setTotalCarbs(totalCarbs - item.carbs);
      setTotalFat(totalFat - item.fat);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          data.map((post) => (
            <View key={post._id} style={styles.foodContainer}>
              <Text style={styles.name}>{post.name}</Text>
              <View style={styles.nutritionContainer}>
                <Text style={styles.nutritionItem}>
                  Calories: {post.calorie}
                </Text>
                <Text style={styles.nutritionItem}>
                  Protein: {post.protein}
                </Text>
                <Text style={styles.nutritionItem}>Carbs: {post.carbs}</Text>
                <Text style={styles.nutritionItem}>Fat: {post.fat}</Text>
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity onPress={() => handleAddToCart(post)}>
                    <Text style={styles.addButton}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRemoveFromCart(post)}>
                    <Text style={styles.removeButton}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
      <View style={styles.cartContainer}>
        <Text style={styles.cartText}>Total Calories: {totalCalories}</Text>
        <Text style={styles.cartText}>Total Protein: {totalProtein}</Text>
        <Text style={styles.cartText}>Total Carbs: {totalCarbs}</Text>
        <Text style={styles.cartText}>Total Fat: {totalFat}</Text>
      </View>
      {cart.length > 0 && (
        <View style={styles.cartItemsContainer}>
          {cart.map((item) => (
            <View key={item._id} style={styles.cartItem}>
              <Text style={styles.cartItemText}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                <Text style={styles.removeButton}>x</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {cart.length === 0 && (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>
            Your have not selected anything yet
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  foodContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nutritionItem: {
    fontSize: 14,
  },
  addButtonContainer: {
    backgroundColor: "#007aff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cartContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  cartText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cartItemsContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartItemText: {
    fontSize: 16,
  },
  removeButton: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 16,
  },
});

// searchbar code

// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

// const API_URL = "http://192.168.1.62:3000/api/food";

// const HomeScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [foods, setFoods] = useState([]);
//   const [originalFoods, setOriginalFoods] = useState([]);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         setFoods(data);
//         setOriginalFoods(data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     const filteredFoods = originalFoods.filter((food) =>
//       food.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setFoods(filteredFoods);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{item.name}</Text>
//       <Text>{item.calorie}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         onChangeText={handleSearch}
//         value={searchQuery}
//         placeholder="Search for food..."
//       />
//       <FlatList
//         data={foods}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//   },
//   input: {
//     height: 40,
//     width: "100%",
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default HomeScreen;

// wrong test code
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";

// const API_URL = "http://192.168.1.62:3000/api/food";

// const HomeScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [foods, setFoods] = useState([]);
//   const [originalFoods, setOriginalFoods] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [totalCalories, setTotalCalories] = useState(0);
//   const [totalProtein, setTotalProtein] = useState(0);
//   const [totalCarbs, setTotalCarbs] = useState(0);
//   const [totalFat, setTotalFat] = useState(0);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         setFoods(data);
//         setOriginalFoods(data);
//       })
//       .then((json) => setData(json))
//       .catch((error) => console.log(error))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     const filteredFoods = originalFoods.filter((food) =>
//       food.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setFoods(filteredFoods);
//   };

//   const handleAddToCart = (item) => {
//     const newCart = [...cart, item];
//     setCart(newCart);
//     setTotalCalories(totalCalories + item.calorie);
//     setTotalProtein(totalProtein + item.protein);
//     setTotalCarbs(totalCarbs + item.carbs);
//     setTotalFat(totalFat + item.fat);
//   };

//   const handleRemoveFromCart = (item) => {
//     const index = cart.findIndex((cartItem) => cartItem._id === item._id);
//     if (index !== -1) {
//       const newCart = [...cart];
//       newCart.splice(index, 1);
//       setCart(newCart);
//       setTotalCalories(totalCalories - item.calorie);
//       setTotalProtein(totalProtein - item.protein);
//       setTotalCarbs(totalCarbs - item.carbs);
//       setTotalFat(totalFat - item.fat);
//     }
//   };

//   const renderItem = ({ post }) => (
//     <View key={post._id} style={styles.foodContainer}>
//       <Text style={styles.name}>{post.name}</Text>
//       <View style={styles.nutritionContainer}>
//         <Text style={styles.nutritionItem}>Calories: {post.calorie}</Text>
//         <Text style={styles.nutritionItem}>Protein: {post.protein}</Text>
//         <Text style={styles.nutritionItem}>Carbs: {post.carbs}</Text>
//         <Text style={styles.nutritionItem}>Fat: {post.fat}</Text>
//         <View style={styles.addButtonContainer}>
//           <TouchableOpacity onPress={() => handleAddToCart(post)}>
//             <Text style={styles.addButton}>+</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleRemoveFromCart(post)}>
//             <Text style={styles.removeButton}>-</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         onChangeText={handleSearch}
//         value={searchQuery}
//         placeholder="Search for food..."
//       />
//       <FlatList
//         data={foods}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//   },
//   input: {
//     height: 40,
//     width: "100%",
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default HomeScreen;
