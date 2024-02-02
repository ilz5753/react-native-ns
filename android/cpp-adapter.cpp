#include <jni.h>
#include "react-native-ns.h"
using namespace std;
extern "C"
{
    // JNIEXPORT jobject JNICALL
    // Java_com_ns_NsModule_nativeGetIpsFromMacAddress(JNIEnv *env, jclass type, jstring mac)
    // {
    //     const char *macAddress = env->GetStringUTFChars(mac, 0);
    //     vector<string> ips = ns::GetIpsFromMacAddress(macAddress);
    //     jobjectArray ipsArray = env->NewObjectArray(ips.size(), env->FindClass("java/lang/String"), nullptr);
    //     for (size_t i = 0; i < ips.size(); ++i)
    //     {
    //         env->SetObjectArrayElement(ipsArray, i, env->NewStringUTF(ips[i].c_str()));
    //     }
    //     env->ReleaseStringUTFChars(mac, macAddress);
    //     return ipsArray;
    // }
    // JNIEXPORT jobject JNICALL
    // Java_com_ns_NsModule_nativeGetIPs(JNIEnv *env, jclass type, jstring ip, jint port)
    // {
    //     const char *i = env->GetStringUTFChars(ip, 0);
    //     vector<string> ips = ns::GetIPs(i, port);
    //     jobjectArray ipsArray = env->NewObjectArray(ips.size(), env->FindClass("java/lang/String"), nullptr);
    //     for (size_t i = 0; i < ips.size(); ++i)
    //     {
    //         env->SetObjectArrayElement(ipsArray, i, env->NewStringUTF(ips[i].c_str()));
    //     }
    //     env->ReleaseStringUTFChars(ip, i);
    //     return ipsArray;
    // }
}
