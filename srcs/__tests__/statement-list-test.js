module.exports = test => {
    test(`
            "hello";
            42;
        `,
        {
            type: 'Program',
            body: [
                {
                    type: "ExpressionStatement",
                    value: {
                        type: "StringLiteral",
                        value: "hello"
                    }
                },
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
}