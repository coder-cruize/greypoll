import { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { RadioButton, ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
// import { auth, db } from "../firebase";
import { useFirebase } from "../firebase";
import shortid from "shortid";
import Content from "./components/content";
import Modal from "./components/modal";
import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import appData from "./components/appData";

const ClickOption = ({ isActive = false, text, style, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}>
      <RadioButton
        onPress={onPress}
        status={isActive ? "checked" : "unchecked"}
        uncheckedColor="#8a8a8a"
        color="#36ae22"
      />
      <Text style={{ color: "#8a8a8a", fontFamily: "montserratMid" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const Options = ({ animation, options, setOptions }) => {
  const [optionInput, setOptionInput] = useState("");
  const maxHeight = animation.height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });
  const removeOption = (id) => {
    const arr = [...options];
    arr.splice(id, 1);
    setOptions(arr);
  };
  const addOption = () => {
    const arr = [...options];
    arr.push(optionInput);
    setOptions(arr);
    setOptionInput("");
  };
  return (
    <Animated.View
      style={{
        opacity: animation.opacity,
        maxHeight: maxHeight,
      }}>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
        <TextInput
          value={optionInput}
          onChangeText={setOptionInput}
          placeholder="Add an Option"
          placeholderTextColor="#363636"
          Add
          editable={options.length < 20}
          selectTextOnFocus={options.length < 20}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#8a8a8a",
            minWidth: 250,
            marginLeft: 5,
            color: "#8a8a8a",
            fontFamily: "montserratMid",
          }}
        />
        <TouchableOpacity
          disabled={optionInput.length < 1}
          onPress={addOption}
          style={{
            backgroundColor: "#8a8a8a",
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginLeft: 10,
            borderRadius: 10,
            opacity: optionInput.length < 1 ? 0.1 : 1,
          }}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "montserratMid",
              fontSize: 10,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      {options.length < 2 ? (
        <Text style={{ color: "orange", fontFamily: "montserratMid" }}>
          Should have atleast 2 options.
        </Text>
      ) : null}
      {options.length == 20 ? (
        <Text style={{ color: "orange", fontFamily: "montserratMid" }}>
          Max option length reached.
        </Text>
      ) : null}
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ margin: 5 }}
              onPress={() => {
                removeOption(index);
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontFamily: "montserratMid",
                  backgroundColor: "rgba(138, 138, 138, 0.1)",
                  borderRadius: 10,
                  color: "#b1b1b1",
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};
const Questions = ({ questions, setQuestions }) => {
  const removeQuestion = (id) => {
    const arr = [...questions];
    arr.splice(id, 1);
    setQuestions(arr);
  };
  const Icon = ({ type, count }) => {
    switch (type) {
      case "multichoice":
        return (
          <>
            <Feather name="list" size={16} color="#36ae22" />
            <Text
              style={{
                marginLeft: 5,
                color: "#36ae22",
                fontFamily: "montserratMid",
              }}>
              {count}
            </Text>
          </>
        );
        break;
      case "boolean":
        return (
          <>
            <Feather name="check" size={16} color="#36ae22" />
            <Feather name="x" size={16} color="#780000" />
          </>
        );
        break;
      default:
        return <Feather name="type" size={16} color="#36ae22" />;
    }
  };
  const showDelete = (width, opacity) => {
    const starting = width._value == 0;
    function Opening() {
      Animated.timing(width, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }
    function Closing() {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(width, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      });
    }
    if (starting) {
      Opening();
    } else {
      Closing();
    }
  };
  const Question = ({ item, id }) => {
    const animations = {
      showDelete: {
        width: new Animated.Value(0),
        opacity: new Animated.Value(0),
      },
    };
    const maxWidth = animations.showDelete.width.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            showDelete(
              animations.showDelete.width,
              animations.showDelete.opacity
            )
          }
          style={{
            backgroundColor: "rgba(138, 138, 138, 0.1)",
            flexWrap: "wrap",
            flexDirection: "row",
            borderRadius: 15,
            padding: 15,
            flex: 1,
          }}>
          <View
            style={{
              width: "100%",
              marginBottom: 5,
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Icon type={item.answerType} count={item.options?.length} />
          </View>
          <Text style={{ color: "#b1b1b1", fontFamily: "montserratMid" }}>
            {item.question}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            maxWidth: maxWidth,
            height: "100%",
            opacity: animations.showDelete.opacity,
          }}>
          <TouchableOpacity
            onPress={() => removeQuestion(id)}
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Feather name="trash-2" size={24} color="#a30000" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  return (
    <View style={{ width: "100%", flex: 1, marginBottom: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {questions.map((item, index) => {
          return <Question item={item} id={index} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

function submitData(auth, db, pollData, navigation, setLoading, reload) {
  const pollId = shortid.generate();
  db.write("questions/" + pollId, pollData)
    .then(() => {
      db.write(
        "users/" + auth.auth.currentUser.uid + "/hostedIds/" + pollId,
        true
      )
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Successfully created Poll.",
          });
          navigation.goBack();
          navigation.goBack();
          reload();
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch(() => {
      Toast.show({
        type: "error",
        text1: "Could not create poll",
      });
    })
    .finally(() => {
      setLoading(false);
    });
}

function TitlePage({ navigation }) {
  const [pollTitle, setPollTitle] = useState("");
  const disabled = pollTitle.length < 5;
  const Done = () => {
    navigation.navigate("page2", { pollTitle: pollTitle });
  };
  return (
    <Content style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderText}>Create a </Text>
          <Text style={{ ...styles.pageHeaderText, color: "#36ae22" }}>
            Title
          </Text>
        </View>
        <Text style={styles.pageSubText}>
          Start by choosing a title for your poll.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPollTitle}
          value={pollTitle}
          placeholder="My First Poll"
          placeholderTextColor="#363636"
          keyboardType="default"
          autoCapitalize="words"
          maxLength={60}
        />
        <View style={styles.pageBtnContainer}>
          <TouchableOpacity
            onPress={Done}
            disabled={disabled}
            style={[styles.pageBtn, disabled ? styles.pageBtnDisabled : null]}>
            <Text
              style={[
                styles.pageBtnText,
                disabled ? styles.pageBtnTextDisabled : null,
              ]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Content>
  );
}

function QuestionsPage({ navigation, route }) {
  const [questionInput, setQuestionInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [answerType, setAnswerType] = useState("textbox");
  const [loading, setLoading] = useState(false);
  const [pageAnimations] = useState({
    showOptions: {
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
    },
    inputBox: new Animated.Value(0),
  });
  const { reload } = useContext(appData);
  const { auth, db } = useFirebase();
  const { pollTitle } = route.params;
  const disabledQuestionBtn =
    questionInput.length < 5 ||
    (answerType == "multichoice" && options.length < 2);
  const disabledCreateBtn = questions.length < 1;

  const showOptions = (starting, answertype) => {
    function Opening() {
      Animated.timing(pageAnimations.showOptions.height, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(pageAnimations.showOptions.opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }
    function Closing() {
      Animated.timing(pageAnimations.showOptions.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(pageAnimations.showOptions.height, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      });
    }
    if (starting) {
      setAnswerType("multichoice");
      Opening();
    } else {
      setAnswerType(answertype);
      Closing();
    }
  };
  const createQuestion = () => {
    const animateQuestion = new Promise((resolve, reject) => {
      Animated.timing(pageAnimations.inputBox, {
        toValue: Dimensions.get("window").width / 4,
        duration: 300,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(pageAnimations.inputBox, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => resolve())
      );
    });
    animateQuestion.then(() => {
      setQuestions([
        ...questions,
        {
          question: questionInput,
          answerType: answerType,
          options: answerType == "multichoice" ? options : null,
        },
      ]);
      setQuestionInput("");
      setOptions([]);
    });
  };
  const Done = () => {
    setLoading(true);
    const pollData = {
      questionList: questions,
      title: pollTitle,
    };
    submitData(auth, db, pollData, navigation, setLoading, reload);
  };
  return (
    <Content style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ ...styles.page, marginBottom: 0, flex: 1 }}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderText}>Create your </Text>
          <Text style={{ ...styles.pageHeaderText, color: "#36ae22" }}>
            Poll
          </Text>
        </View>
        <Text style={styles.pageSubText}>
          Now create questions for your poll.
        </Text>
        <Animated.View
          style={{ transform: [{ translateX: pageAnimations.inputBox }] }}>
          <TextInput
            style={{ ...styles.input, padding: 10 }}
            onChangeText={setQuestionInput}
            value={questionInput}
            placeholder="Your Question here ? (Min: 5 characters)"
            placeholderTextColor="#363636"
            keyboardType="default"
            autoCapitalize="sentences"
            maxLength={120}
            numberOfLines={3}
            textAlignVertical="top"
            textAlign="left"
            multiline
          />
        </Animated.View>
        <View style={{ marginTop: 10, flexWrap: "wrap", flexDirection: "row" }}>
          <ClickOption
            text={"Textbox"}
            isActive={answerType == "textbox"}
            onPress={() => showOptions(false, "textbox")}
          />
          <ClickOption
            text={"Options"}
            isActive={answerType == "multichoice"}
            style={{ marginLeft: 10 }}
            onPress={() => showOptions(true)}
          />
          <ClickOption
            text={"Yes/No"}
            isActive={answerType == "boolean"}
            style={{ marginLeft: 10 }}
            onPress={() => showOptions(false, "boolean")}
          />
        </View>
        <Options
          animation={pageAnimations.showOptions}
          options={options}
          setOptions={setOptions}
        />
        <View style={styles.pageBtnContainer}>
          <TouchableOpacity
            onPress={createQuestion}
            disabled={disabledQuestionBtn}
            style={{
              ...styles.pageBtn,
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}>
            <Text
              style={[
                styles.pageBtnText,
                { color: "#36ae22" },
                disabledQuestionBtn ? { color: "#4a4a4a" } : null,
              ]}>
              + Add Question
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomItems}>
          <Questions questions={questions} setQuestions={setQuestions} />
          <View style={styles.bottomItemsBtnContainer}>
            <TouchableOpacity
              onPress={Done}
              disabled={disabledCreateBtn}
              style={[
                styles.bottomItemsBtn,
                { backgroundColor: "rgba(138, 138, 138, 0.2)" },
              ]}>
              <Text
                style={{
                  fontFamily: "montserratMid",
                  color: disabledCreateBtn ? "#1a1a1a" : "#fff",
                }}>
                Create Poll
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal show={loading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#36ae22" />
        </View>
      </Modal>
    </Content>
  );
}

export default function HostPoll({ route }) {
  const { reload } = route.params;
  const Stack = createStackNavigator();
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  const config = {
    animation: "timing",
    config: {
      duration: 600,
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#1a1a1a",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        cardStyleInterpolator: forFade,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen name="page1" component={TitlePage} />
      <Stack.Screen
        name="page2"
        component={QuestionsPage}
        initialParams={{ reload: reload }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  page: {
    marginBottom: 100,
    width: "95%",
  },
  pageHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pageHeaderText: { color: "#fff", fontFamily: "poppins", fontSize: 30 },
  pageSubText: {
    color: "#8a8a8a",
    fontFamily: "montserratMid",
    fontSize: 15,
  },
  input: {
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#212121",
    backgroundColor: "#212121",
    color: "#737373",
    width: "100%",
  },
  addOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  addOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  addOptionsText: {
    color: "#616161",
    fontSize: 12,
    fontFamily: "montserratMid",
    marginLeft: 5,
  },
  pageBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 25,
  },
  pageBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14500b",
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  pageBtnDisabled: {
    opacity: 0.4,
    backgroundColor: "#8a8a8a",
  },
  pageBtnDisabled2: {
    opacity: 0.1,
    backgroundColor: "#8a8a8a",
  },
  pageBtnText: {
    color: "#d7d7d7",
    fontFamily: "montserratMid",
  },
  pageBtnTextDisabled: {
    color: "#1a1a1a",
  },
  bottomItems: {
    flex: 1,
    width: "100%",
    height: 50,
    marginBottom: 10,
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-between",
  },
  bottomItemsBtnContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  bottomItemsBtn: {
    width: "60%",
    minWidth: 150,
    maxWidth: 300,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
});
