import React, {
  Fragment,
  useCallback,
  useMemo,
  useState,
  type Key,
  type ReactNode,
} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GetIpsFromMacAddress } from 'react-native-ns';

// const ip = '10.0.2.16';
const mac = '02:15:b2:00:00:00';
const macArr = mac.split(':');
const aic = {
  alignItems: 'center',
} as any;
// const jcse = {
//   justifyContent: 'space-evenly',
// } as any;
const row = {
  flexDirection: 'row',
  ...aic,
} as any;
const phColor = '#bbbbbb';
interface IInput {
  toggle?(): void;
  value: string;
  editable?: boolean;
  onChangeText?(text: string): void;
  size?: number;
  placeholder?: string;
  maxLength?: number;
}
/**
 * toggle will be used for next version!
 */
const Input = ({
  size = 48,
  toggle,
  value,
  editable = true,
  onChangeText,
  placeholder,
  maxLength = 2,
}: IInput) => {
  let [_value, set_value] = useState(value);
  let [Focused, setFocused] = useState(false);
  let onBlur = useCallback(() => setFocused(false), []);
  let onFocus = useCallback(() => setFocused(true), []);
  let _onChangeText = useCallback(
    (txt: string) => {
      set_value(txt);
      if (onChangeText) onChangeText(txt);
    },
    [onChangeText]
  );
  let br = {
    borderRadius: size / 6,
  };
  let onPressIn = useCallback(() => {
    if (!editable && toggle) toggle();
  }, [editable, toggle]);
  let onSubmitEditing = useCallback(() => {
    onBlur();
    onPressIn();
  }, [onBlur, onPressIn]);
  let color = useMemo(() => (Focused ? '#484848' : phColor), [Focused]);
  let __value = useMemo(
    () => (editable ? _value : value),
    [editable, _value, value]
  );
  return (
    <View
      {...{
        style: [
          {
            width: size,
            height: size,
            borderWidth: 1,
            borderColor: color,
          },
          br,
        ],
      }}
    >
      <TextInput
        {...{
          style: [
            {
              paddingHorizontal: size / 8,
              textAlign: 'center',
              fontSize: size * 0.4,
              color: __value.length === 0 ? color : 'black',
            },
            br,
          ],
          editable,
          value: __value,
          onChangeText: _onChangeText,
          onFocus,
          onBlur,
          onSubmitEditing,
          onPressIn,
          placeholder,
          placeholderTextColor: phColor,
          maxLength,
        }}
      />
    </View>
  );
};
interface ITxt {
  children?: ReactNode;
}
const Txt = ({ children }: ITxt) => {
  return (
    <Text
      {...{
        style: [
          {
            fontSize: 15,
            color: 'gray',
          },
        ],
        children,
      }}
    />
  );
};
const _2Point = <Txt>:</Txt>;
interface IMacEntry {
  id: Key;
  value: string;
}

export default function App() {
  let [MacEntity, setMacEntity] = useState<IMacEntry[]>(
    macArr.map((value, id) => ({ id, value }))
  );
  let [devices, setDevices] = useState<string[]>();
  let MacAddress = useMemo(
    () => MacEntity.map(({ value }) => value).join(':'),
    [MacEntity]
  );
  let disabledBtn = useMemo(
    () => MacAddress.length !== 2 * 6 + 5,
    [MacAddress]
  ); // 6 box 2 char and 5 : between items
  let gap = <View {...{ style: [{ marginTop: 12 }] }} />;
  let startScan = useCallback(() => {
    GetIpsFromMacAddress(MacAddress).then(setDevices).catch(console.error);
  }, [MacAddress]);
  return (
    <KeyboardAvoidingView
      {...{
        behavior: Platform.OS === 'android' ? 'height' : 'padding',
        style: [{ flex: 1 }],
      }}
    >
      <SafeAreaView
        {...{
          style: [
            {
              flex: 1,
              padding: 24,
              backgroundColor: 'white',
            },
          ],
        }}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <Text
            {...{
              style: [
                {
                  fontSize: 18,
                  color: '#666666',
                },
              ],
            }}
          >
            Test Printer
          </Text>
          {gap}
          <Text
            {...{
              style: [
                {
                  fontSize: 14,
                  color: '#999999',
                },
              ],
            }}
          >
            Please Enter your mac address{'\n\n'}Each part consist of 2
            hexadecimal character
          </Text>
          {gap}
          {gap}
          {gap}
          <View
            {...{
              style: [row, { justifyContent: 'space-between' }],
            }}
          >
            {MacEntity.map(({ value, id }, i) => {
              return (
                <Fragment
                  {...{
                    key: id,
                  }}
                >
                  {id !== 0 && _2Point}
                  <Input
                    {...{
                      value,
                      onChangeText: (txt) => {
                        setMacEntity((e) => {
                          let c = [...e];
                          c[i].value = txt;
                          return c;
                        });
                      },
                      placeholder: '00',
                    }}
                  />
                </Fragment>
              );
            })}
          </View>
          {gap}
          {gap}
          {gap}
          <View {...{ style: [aic] }}>
            <TouchableOpacity
              {...{
                activeOpacity: 0.75,
                onPress: startScan,
                style: [
                  {
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderRadius: 12,
                    backgroundColor: disabledBtn ? 'gray' : '#045aff',
                  },
                ],
                disabled: disabledBtn,
              }}
            >
              <Text
                {...{
                  style: [
                    {
                      fontSize: 18,
                      color: 'white',
                    },
                  ],
                }}
              >
                Find Near Devices
              </Text>
            </TouchableOpacity>
          </View>
          {gap}
          {gap}
          {gap}
          {devices && (
            <View
              {...{
                style: [
                  {
                    width: '100%',
                    backgroundColor: '#f0f0f0',
                    padding: 12,
                    borderRadius: 12,
                  },
                ],
              }}
            >
              <Text
                {...{
                  style: [
                    {
                      fontSize: 20,
                      color: 'black',
                    },
                  ],
                }}
              >
                IPs:
              </Text>
              {gap}
              <Text
                {...{
                  style: [
                    {
                      fontSize: 24,
                      color: 'black',
                    },
                  ],
                }}
              >
                {JSON.stringify(devices, null, 3)}
              </Text>
            </View>
          )}
          {gap}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
