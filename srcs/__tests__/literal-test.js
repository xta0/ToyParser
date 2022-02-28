module.exports = test => {
    test(`42;`, {
        type: 'Program',
        body: [
            {
                type: "ExpressionStatement",
                value: {
                    type: "NumericLiteral",
                    value: 42
                }
            }
        ]
    }
    );
    test(`"Hello";`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                value: {
                    type: "StringLiteral",
                    value: "Hello"
                }
            },]
    });
    test(`'Hello';`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                value: {
                    type: "StringLiteral",
                    value: "Hello"
                }
            },]
    });
}