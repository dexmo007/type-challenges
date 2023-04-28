print('{')
for i in range(10):
    print(f'"{i}": {"{"}')
    for j in range(10):
        print(f'"{j}": [{(i+j)%10}, {(i+j) // 10}];')
    print('};')
print('}')
