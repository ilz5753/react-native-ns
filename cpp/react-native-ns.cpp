#include "react-native-ns.h"
#include <fstream>
#include <sstream>
#include <arpa/inet.h>
#include <ifaddrs.h>
#include <cstring>
#include <unistd.h>
#include <netdb.h>

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
	vector<string> GetIPs(const char *baseIP = "192.168.1", const int port = 80)
	{
		vector<string> ips;
		const int startRange = 1;
		const int endRange = 255;
		struct sockaddr_in server;
		int sock = socket(AF_INET, SOCK_STREAM, 0);
		if (sock != -1)
		{
			server.sin_family = AF_INET;
			server.sin_port = htons(port);
			for (int i = startRange; i <= endRange; ++i)
			{
				char currentIP[16];
				snprintf(currentIP, sizeof(currentIP), "%s.%d", baseIP, i);
				server.sin_addr.s_addr = inet_addr(currentIP);
				if (connect(sock, (struct sockaddr *)&server, sizeof(server)) != -1)
				{
					ips.push_back(currentIP);
				}
				close(sock);
				sock = socket(AF_INET, SOCK_STREAM, 0);
			}
			close(sock);
		}
		return ips;
	}
}
