#ifndef NS_H
#define NS_H
#include <vector>
#include <string>
using namespace std;
namespace ns
{
  double multiply(double a, double b);
  vector<string> GetIpsFromMacAddress(const char *mac);
}

#endif /* NS_H */
