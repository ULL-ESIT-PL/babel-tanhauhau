# Tests for the left-side assignment packages
- By Pablo Santana González [@PSantanaGlez13](https://github.com/PSantanaGlez13)
## Structure
The structure of this directory goes as follows:
- `in` contains the file with the source code with the left-side assignment syntax.
- `out` contains the code after being transformed with Babel and the left-side plugin.
- `exec_out` contains the expected output when executing the transformed code with node.
- `test-description.test.js` describes the logic of the tests.

## Test logic
The file in `in` is processed and its output is written in `out`. This output is then run with node. If the result matches the result given in `exec_out`

## Adding more tests
To add more tests you can add the input file to `in` and the expected result when executing in `exec_out`. Make sure both files have the same name.