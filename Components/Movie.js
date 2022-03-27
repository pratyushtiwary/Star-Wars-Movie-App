import React from "react";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import globalStyles, { primaryColor } from "../styles/global";

export default function Movie({
  id,
  title,
  releaseDate,
  director,
  producers,
  onPress,
}) {
  return (
    <TouchableRipple
      style={{
        borderWidth: 1,
        borderColor: primaryColor,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: "#000000",
      }}
      rippleColor={primaryColor}
      onPress={onPress}
    >
      <View>
        <Text
          style={[
            {
              color: primaryColor,
              marginRight: 2.5,
            },
            globalStyles.subHeading,
          ]}
        >
          {title}
        </Text>
        <Text
          style={{
            color: primaryColor,
            fontSize: 18,
          }}
        >
          Release Date :- {releaseDate}
        </Text>
        <Text
          style={{
            color: primaryColor,
            fontSize: 18,
          }}
        >
          Directed By :- {director}
        </Text>
        {producers.length > 1 ? (
          <Text
            style={{
              color: primaryColor,
              paddingBottom: 10,
              fontSize: 18,
            }}
          >
            Producers :- {producers.join(", ")}
          </Text>
        ) : (
          <Text
            style={{
              color: primaryColor,
              paddingBottom: 10,
              fontSize: 18,
            }}
          >
            Producer :- {producers}
          </Text>
        )}
      </View>
    </TouchableRipple>
  );
}
