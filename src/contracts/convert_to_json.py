import sys
import os

sol_file = sys.argv[1]

os.system("solcjs " + sol_file + " --abi -o ABI")
os.system("solcjs " + sol_file + " --bin -o BIN")

abiCode = 'ABI/' + sol_file.split('.')[0] + "_sol_" + sol_file.split('.')[0] + ".abi"
binCode = 'BIN/' + sol_file.split('.')[0] + "_sol_" + sol_file.split('.')[0] + ".bin"  

f1 = open(abiCode, "r");
f2 = open(binCode, "r");

contractName = sol_file.split('.')[0].capitalize();

abi = f1.read()
b = f2.read()

abi = abi[:len(abi)-1]
b = b[:len(b)-1]

f3 = open(contractName + ".js", "w")

f3.write("var " + contractName + "Contract={\nabi:'" + abi + "',\nbin:'" + b + "'\n}")
