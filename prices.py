x = [3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750]
y = 40450000 * (10 ** 9)

one_wei = 1000000000000000000

for v in x:
    p = v * one_wei
    print "%d wei, // per token, total sale %s ether" % (p / y, v)