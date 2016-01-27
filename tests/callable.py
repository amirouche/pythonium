print('abs', callable(abs))
print('int', callable(int))
print('True', callable(True))
print('bool', callable(bool))


class GenerateCallable:

    def __call__(self):
        return 42
print('GenerateCallable', callable(GenerateCallable))
print('GenerateCallable()', callable(GenerateCallable()))


class GenerateNonCallable:

    def method(self):
        pass
print('GenerateNonCallable', callable(GenerateNonCallable))
print('GenerateNonCallable()', callable(GenerateNonCallable()))


def generator():
    yield 42
print('generator', callable(generator))
print('generator()', callable(generator()))
