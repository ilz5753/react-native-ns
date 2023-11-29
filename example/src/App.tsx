import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GetIpsFromMacAddress, GetIPs } from 'react-native-ns';
const f1 = {
  flex: 1,
};

export default function App() {
  let [interfaces, setInterfaces] = useState<string[]>();
  let onPress = useCallback(async () => {
    let i = await GetIPs('127.0.0', 80);
    setInterfaces(i);
  }, []);
  let clear = useCallback(() => setInterfaces(undefined), []);
  return (
    <KeyboardAvoidingView
      {...{
        behavior: Platform.OS === 'android' ? 'height' : 'padding',
        style: [f1],
      }}
    >
      <SafeAreaView
        {...{
          style: [
            f1,
            {
              backgroundColor: 'white',
            },
          ],
        }}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <View
            {...{
              style: [
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: 30,
                },
              ],
            }}
          >
            <TouchableOpacity
              {...{
                onPress,
                activeOpacity: 0.75,
              }}
            >
              <Text
                {...{
                  style: [
                    {
                      fontSize: 21,
                      color: 'black',
                    },
                  ],
                }}
              >
                Find Interfaces
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              {...{
                onPress: clear,
                activeOpacity: 0.75,
              }}
            >
              <Text
                {...{
                  style: [
                    {
                      fontSize: 21,
                      color: 'black',
                    },
                  ],
                }}
              >
                clear
              </Text>
            </TouchableOpacity>
          </View>
          {interfaces && (
            <View
              {...{
                style: [{ paddingHorizontal: 20 }],
              }}
            >
              <Text
                {...{
                  style: [{ fontSize: 24, color: 'black' }],
                }}
              >
                {JSON.stringify(interfaces, null, 3)}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
