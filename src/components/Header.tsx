import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";


interface HeaderProps {
    title: string;
    onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const handleMenuPress = () => {
      setShowMenu((prev) => !prev);
      if (onMenuPress) {
        onMenuPress();
      }
    };

    return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
        <Entypo name="dots-three-vertical" size={24} color="#fff" />
      </TouchableOpacity>
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
        <Entypo name="info-with-circle" size={20} color="#f5864e" />
        <Text style={styles.menuItemText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
        <Entypo name="log-out" size={20} color="#f5864e" />
        <Text style={styles.menuItemText}>Exit</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      )}
    </View>
)}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5864e",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 5,
  },
  menu: {
    position: "absolute",
    top: 55,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    zIndex: 100,
    minWidth: 120,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    marginLeft: 8,
    color: "#333",
    fontSize: 16,
  },
  versionText: {
    marginTop: 8,
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 22,
  },
});