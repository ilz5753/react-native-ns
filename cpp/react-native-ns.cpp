#include "react-native-ns.h"
#include <iostream>
#include <regex>
#include <fstream>
#include <sstream>
#include <stdexcept>
#include <cstring>
#include <arpa/inet.h>
#include <unistd.h>
#include <netdb.h>
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
	vector<string> NearestDevicesIps(char *ip, int port)
	{
		vector<string> ips;
		const int startRange = 1;
		const int endRange = 255;
		struct sockaddr_in server;
		int sock = socket(AF_INET, SOCK_STREAM, 0);

		if (sock == -1)
		{
			std::cerr << "Socket creation failed" << std::endl;
			// return -1;
		}

		server.sin_family = AF_INET;
		server.sin_port = htons(port);
		for (int i = startRange; i <= endRange; ++i)
		{
			char ip[16];
			snprintf(ip, sizeof(ip), "%s.%d", ip, i);
			server.sin_addr.s_addr = inet_addr(ip);
			if (connect(sock, (struct sockaddr *)&server, sizeof(server)) != -1)
			{
				ips.push_back(ip);
				std::cout << "Device found at IP: " << ip << std::endl;
			}
			close(sock);
			sock = socket(AF_INET, SOCK_STREAM, 0);
		}
		close(sock);
		return ips;
	}
}
