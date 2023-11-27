#include "react-native-ns.h"
#include <iostream>
#include <regex>
#include <fstream>
#include <sstream>
#include <stdexcept>
using namespace std;
namespace ns
{
	double multiply(double a, double b)
	{
		return a * b;
	}
	vector<string> GetIpsFromMacAddress(const char *macAddress)
	{
		vector<string> ips;
		ifstream arpFile("/proc/net/arp");
		string line;

		// Skip the first line (header)
		getline(arpFile, line);

		while (getline(arpFile, line))
		{
			stringstream ss(line);
			string ipAddress, hwType, flags, hwAddress, mask, device;

			ss >> ipAddress >> hwType >> flags >> hwAddress >> mask >> device;

			// Check if MAC address matches the provided one
			if (strcmp(hwAddress.c_str(), macAddress) == 0)
			{
				// Add the IP address to the list
				ips.push_back(ipAddress);
			}
		}

		return ips;
	}
}
