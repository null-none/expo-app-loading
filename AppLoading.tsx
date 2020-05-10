import React from "react";
import { Image, StyleSheet } from "react-native";
import { SplashScreen } from "expo";
import { Asset } from "expo-asset";

interface IProps {
  image: string;
}

interface IState {}

export default class AppLoading extends React.Component<IProps, IState> {
  render() {
    if (!this.props.image) {
      return null;
    }
    return (
      <Image
        style={styles.loading}
        source={this.props.image}
        onLoad={this._cacheResourcesAsync.bind(this)}
      />
    );
  }

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [this.props.image,];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    await Promise.all(cacheImages);
  };
}

const styles = StyleSheet.create({
  loading: {
    resizeMode: "cover",
    flex: 1,
    width: null,
    height: null,
  },
});
