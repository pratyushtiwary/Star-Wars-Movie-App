import React from "react";
import { Text } from "react-native";
import { Modal, ActivityIndicator } from "react-native-paper";
import globalStyles, { primaryColor } from "../styles/global";

export default function Loading({ visible }) {
  const containerStyle = {
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 2.5,
    width: "75%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: primaryColor,
  };

  return (
    <Modal
      visible={visible}
      dismissable={false}
      contentContainerStyle={containerStyle}
    >
      <ActivityIndicator animating={true} color={primaryColor} size="large" />
      <Text
        style={[
          {
            textAlign: "center",
            width: "100%",
            marginTop: 20,
            color: primaryColor,
          },
          globalStyles.subHeading,
        ]}
      >
        Loading...
      </Text>
    </Modal>
  );
}
