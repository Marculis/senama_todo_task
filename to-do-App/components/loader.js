import { Image, StyleSheet } from "react-native";

export const Loader = ({ size }) => {
  const styles = StyleSheet.create({
    loading: {
      width: size,
      height: size,
    },
  });
  return (
    <Image style={styles.loading} source={require("../assets/loader.gif")} />
  );
};
