import { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Header from "./components/header";
import Content from "./components/content";
import { useFirebase } from "../firebase";
import Toast from "react-native-toast-message";
import appData from "./components/appData";

function QuestionBlock({
  id,
  questions,
  close,
  responses,
  userResponse,
  hosting,
}) {
  const { reload } = useContext(appData);
  const { db, auth } = useFirebase();
  const response = {};
  const disabled = !!userResponse;
  function AnswerInput({ type, options, responseIndex, answer }) {
    const activeColor = "purple";
    const TypeInput = () => {
      const [value, setValue] = useState(answer);
      useEffect(() => {
        if (value != null) {
          response[responseIndex] = value;
        }
      }, [value]);
      return (
        <TextInput
          editable={!disabled}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: "#212121",
            color: "#737373",
            padding: 10,
            maxHeight: 90,
            marginHorizontal: 15,
          }}
          value={value == null ? "" : value}
          onChangeText={setValue}
          placeholder="Your Question here ? (Min: 5 characters)"
          placeholderTextColor="#363636"
          keyboardType="default"
          numberOfLines={3}
          textAlignVertical="top"
          textAlign="left"
          multiline
        />
      );
    };
    const TypeBoolean = () => {
      const [value, setValue] = useState(answer);
      useEffect(() => {
        if (value != null) {
          response[responseIndex] = value;
        }
      }, [value]);
      return (
        <View style={{ flexDirection: "row", marginLeft: 15 }}>
          <Text>{value}</Text>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setValue(true)}
            style={{
              marginRight: 10,
              backgroundColor: value ? activeColor : "#212121",
              paddingHorizontal: 25,
              paddingVertical: 10,
              borderRadius: 50,
            }}>
            <Text style={{ color: "#737373", fontFamily: "montserratMid" }}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setValue(false)}
            style={{
              backgroundColor: value == false ? activeColor : "#212121",
              paddingHorizontal: 25,
              paddingVertical: 10,
              borderRadius: 60,
            }}>
            <Text style={{ color: "#737373", fontFamily: "montserratMid" }}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    const TypeMultichoice = () => {
      const [value, setValue] = useState(answer);
      useEffect(() => {
        if (value != null) {
          response[responseIndex] = value;
        }
      }, [value]);
      return (
        <View style={{ paddingHorizontal: 15 }}>
          {options.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setValue(index)}
                disabled={disabled}>
                <Text
                  style={{
                    backgroundColor: value == index ? activeColor : "#212121",
                    textAlign: "center",
                    marginBottom: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    color: "#737373",
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
    switch (type) {
      case "multichoice":
        return <TypeMultichoice />;
      case "boolean":
        return <TypeBoolean />;
      default:
        return <TypeInput />;
    }
  }
  function submit() {
    if (Object.values(response).includes(null)) {
      Toast.show({
        type: "error",
        text1: "Please answer all questions",
      });
    } else {
      db.read("questions/" + id).then((questionExists) => {
        if (questionExists) {
          db.write(
            "questions/" + id + "/responses/" + auth.auth.currentUser.uid,
            response
          ).then(() => {
            Toast.show({
              type: "success",
              text1: "Poll Completed",
            });
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Poll was closed by admin",
          });
        }
        close();
        reload();
      });
    }
  }
  return (
    <View>
      {questions.map((item, index) => {
        response[index] = null;
        return (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text
              style={{
                color: "#AAAAAA",
                fontFamily: "poppins",
                marginBottom: 10,
              }}>
              {item.question}
            </Text>
            <AnswerInput
              answer={
                userResponse?.[index] ||
                (userResponse?.[index] === 0 || userResponse?.[index] === false
                  ? userResponse?.[index]
                  : null)
              }
              type={item.answerType}
              options={item?.options}
              responseIndex={index}
            />
          </View>
        );
      })}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          disabled={disabled}
          onPress={submit}
          style={{
            backgroundColor: "#212121",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 15,
            marginTop: 10,
            opacity: disabled ? 0.3 : 1
          }}>
          <Text
            style={{
              color: "#cccccc",
              fontFamily: "montserratMid",
              fontSize: 13,
            }}>
            Submit Poll
          </Text>
        </TouchableOpacity>
      </View>
      {hosting && (
        <View style={{ marginTop: 20, paddingLeft: 5 }}>
          <Text style={{ color: "#ccc", fontFamily: "montserratMid" }}>
            {responses + " "}Responses
          </Text>
        </View>
      )}
    </View>
  );
}

export default function Vote({ navigation, route }) {
  const { data, hosting } = route.params;
  return (
    <>
      <Header data={data} hosting={hosting} />
      <Content style={{ paddingTop: 15 }}>
        <QuestionBlock
          questions={data.questions}
          hosting={hosting}
          responses={data.responses}
          userResponse={data.myResponse}
          id={data.id}
          close={() => navigation.goBack()}
        />
      </Content>
    </>
  );
}
