import React from "react";
import { Modal, IconButton } from "react-native-paper";
import { View } from "react-native";
import { primaryColor } from "../styles/global";

export default function Screen({ visible, children, onClose }) {
  const containerStyle = {
    backgroundColor: "#000000",
    paddingTop: 20,
    paddingBottom: 30,
    paddingRight: 5,
    paddingLeft: 0,
    borderRadius: 2.5,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: primaryColor,
  };

  return (
    <Modal
      visible={visible}
      dismissable={true}
      onDismiss={onClose}
      contentContainerStyle={containerStyle}
    >
      <IconButton
        icon="close"
        color={primaryColor}
        style={{
          alignSelf: "flex-end",
          borderWidth: 1,
          borderColor: primaryColor,
          marginTop: 25,
        }}
        onPress={onClose}
      />
      <View
        style={{
          height: "100%",
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
