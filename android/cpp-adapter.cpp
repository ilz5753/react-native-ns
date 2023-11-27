#include <jni.h>
#include "react-native-ns.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_ns_NsModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return ns::multiply(a, b);
}
