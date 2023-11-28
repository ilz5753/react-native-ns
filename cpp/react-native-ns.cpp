#include "react-native-ns.h"
// #include <iostream>
// #include <regex>
// #include <fstream>
// #include <sstream>
// #include <stdexcept>
// #include <cstring>
// #include <unistd.h>
// #include <netdb.h>
#include <arpa/inet.h>
#include <ifaddrs.h>
#include <netinet/in.h>
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
	// vector<string> NearestDevicesIps(char *ip, int port)
	// {
	// 	vector<string> ips;
	// 	const int startRange = 1;
	// 	const int endRange = 255;
	// 	struct sockaddr_in server;
	// 	int sock = socket(AF_INET, SOCK_STREAM, 0);

	// 	if (sock == -1)
	// 	{
	// 		std::cerr << "Socket creation failed" << std::endl;
	// 		// return -1;
	// 	}

	// 	server.sin_family = AF_INET;
	// 	server.sin_port = htons(port);
	// 	for (int i = startRange; i <= endRange; ++i)
	// 	{
	// 		char ip[16];
	// 		snprintf(ip, sizeof(ip), "%s.%d", ip, i);
	// 		server.sin_addr.s_addr = inet_addr(ip);
	// 		if (connect(sock, (struct sockaddr *)&server, sizeof(server)) != -1)
	// 		{
	// 			ips.push_back(ip);
	// 			std::cout << "Device found at IP: " << ip << std::endl;
	// 		}
	// 		close(sock);
	// 		sock = socket(AF_INET, SOCK_STREAM, 0);
	// 	}
	// 	close(sock);
	// 	return ips;
	// }
	vector<NetInterface> findInterfaces()
	{
		vector<NetInterface> interfaces;
		struct ifaddrs *ifaddr, *ifa;
		if (getifaddrs(&ifaddr) != -1)
		{
			for (ifa = ifaddr; ifa != nullptr; ifa = ifa->ifa_next)
			{
				if (ifa->ifa_addr == nullptr)
					continue;
				if (ifa->ifa_addr->sa_family == AF_INET)
				{
					struct sockaddr_in *addr = reinterpret_cast<struct sockaddr_in *>(ifa->ifa_addr);
					NetInterface r;
					r.name = ifa->ifa_name;
					r.ip = inet_ntoa(addr->sin_addr);
					interfaces.push_back(r);
				}
			}
			freeifaddrs(ifaddr);
		}
		return interfaces;
	}
}
