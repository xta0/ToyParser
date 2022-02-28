module.exports = test => {
    test(`
            {
                "Hello";
                42;
            }   
        `,
        {
            type: 'Program',
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ExpressionStatement",
                            value: {
                                type: "StringLiteral",
                                value: "Hello"
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
                },
            ]
        }
    );
    // empty block
    test(`{}`,
        {
            type: 'Program',
            body: [
                {
                    type: "BlockStatement",
                    body: []
                }
            ]
        }
    );

    test(`
    {
        "Hello";
        {
            42;
        }
    
    }`,
        {
            type: 'Program',
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ExpressionStatement",
                            value: {
                                type: "StringLiteral",
                                value: "Hello"
                            }
                        },
                        {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    value: {
                                        type: "NumericLiteral",
                                        value: 42
                                    }
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    );
}