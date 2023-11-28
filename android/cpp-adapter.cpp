#include <jni.h>
#include "react-native-ns.h"
using namespace std;
extern "C"
{
    JNIEXPORT jobject JNICALL
    Java_com_ns_NsModule_nativeGetIpsFromMacAddress(JNIEnv *env, jclass type, jstring mac)
    {
        const char *macAddress = env->GetStringUTFChars(mac, 0);

        vector<string> ips = ns::GetIpsFromMacAddress(macAddress);
        jobjectArray ipsArray = env->NewObjectArray(ips.size(), env->FindClass("java/lang/String"), nullptr);
        for (size_t i = 0; i < ips.size(); ++i)
        {
            env->SetObjectArrayElement(ipsArray, i, env->NewStringUTF(ips[i].c_str()));
        }

        env->ReleaseStringUTFChars(mac, macAddress);

        return ipsArray;
    }
    JNIEXPORT jobjectArray JNICALL Java_com_ns_NsModule_nativeFindInterfaces(JNIEnv *env, jclass type)
    {
        vector<ns::NetInterface> interfaces = ns::findInterfaces();
        jclass interfaceClass = env->FindClass("com/ns/NetInterface");
        if (interfaceClass == NULL)
        {
            return NULL;
        }
        jmethodID constructor = env->GetMethodID(interfaceClass, "<init>", "(Ljava/lang/String;Ljava/lang/String;)V");
        if (constructor == NULL)
        {
            return NULL;
        }
        jobjectArray interfaceArray = env->NewObjectArray(interfaces.size(), interfaceClass, NULL);
        if (interfaceArray == NULL)
        {
            return NULL;
        }
        for (size_t i = 0; i < interfaces.size(); i++)
        {
            const ns::NetInterface &interface = interfaces[i];
            jstring ipString = env->NewStringUTF(interface.ip);
            jstring nameString = env->NewStringUTF(interface.name);
            jobject interfaceObj = env->NewObject(interfaceClass, constructor, ipString, nameString);
            env->SetObjectArrayElement(interfaceArray, i, interfaceObj);
            env->DeleteLocalRef(ipString);
            env->DeleteLocalRef(nameString);
            env->DeleteLocalRef(interfaceObj);
        }
        return interfaceArray;
    }
}
