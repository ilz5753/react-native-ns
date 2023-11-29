#include "react-native-ns.h"
#include <fstream>
#include <sstream>
#include <arpa/inet.h>
#include <ifaddrs.h>
using namespace std;
namespace ns
{
	vector<string> GetIpsFromMacAddress(const char *macAddress)
	{
		vector<string> ips;
		ifstream arpFile("/proc/net/arp");
		string line;
		getline(arpFile, line);

		while (getline(arpFile, line))
		{
			stringstream ss(line);
			string ipAddress, hwType, flags, hwAddress, mask, device;

			ss >> ipAddress >> hwType >> flags >> hwAddress >> mask >> device;
			if (strcmp(hwAddress.c_str(), macAddress) == 0)
			{
				ips.push_back(ipAddress);
			}
		}

		return ips;
	}
}
