#include <jni.h>
#include "react-native-ns.h"
using namespace std;
extern "C"
{
    JNIEXPORT jdouble JNICALL
    Java_com_ns_NsModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b)
    {
        return ns::multiply(a, b);
    }

    JNIEXPORT jobject JNICALL
    Java_com_ns_NsModule_nativeGetIpsFromMacAddress(JNIEnv *env, jclass type, jstring mac)
    {
        const char *macAddress = env->GetStringUTFChars(mac, 0);

        vector<string> ips = ns::GetIpsFromMacAddress(macAddress);

        // Create a Java string array to hold the IP addresses
        jobjectArray ipsArray = env->NewObjectArray(ips.size(), env->FindClass("java/lang/String"), nullptr);

        // Populate the Java string array with IP addresses
        for (size_t i = 0; i < ips.size(); ++i)
        {
            env->SetObjectArrayElement(ipsArray, i, env->NewStringUTF(ips[i].c_str()));
        }

        env->ReleaseStringUTFChars(mac, macAddress);

        return ipsArray;
    }
}
