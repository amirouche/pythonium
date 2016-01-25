#!/usr/bin/env python3
"""Usage: pythonium [-h]|[-v]|[-r]|[FILE]

Options:
  -h --help        show this
  -v --version     show version
  -r --runtime     output pythonium runtime (exclusive option)

You will need to use the library generated with -r or --runtime
option to run the code.
"""
import os
import sys
from ast import parse

from .compliant.compliant import Compliant


from . import __version__


def main(argv=None):
    from docopt import docopt
    args = docopt(__doc__, argv, version='pythonium ' + __version__)
    if not args['--runtime'] and not args['FILE']:
        main(['-h'])
        sys.exit(1)

    if args['--runtime']:
        # call ourself for each file in pythonium.lib:
        from pythonium.compliant import builtins

        path = os.path.dirname(__file__)
        filepath = os.path.join(path, 'pythonium.js')
        with open(filepath) as f:
            print(f.read())

        # compile builtins
        for path in builtins.__path__:
            for name in sorted(os.listdir(path)):
                if name.endswith('.py'):
                    argv = [os.path.join(path, name)]
                    main(argv)
        return

    filepath = args['FILE']
    dirname = os.path.abspath(os.path.dirname(filepath))
    basename = os.path.basename(filepath)

    with open(os.path.join(dirname, basename)) as f:
        input = f.read()

    # generate javascript
    tree = parse(input)
    translator = Compliant()
    translator.visit(tree)
    output = translator.writer.value()
    print(output)


if __name__ == '__main__':
    main()
