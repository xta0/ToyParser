const { Tokenizer } = require('./Tokenizer');

class Parser {
    /**Initialize the parser */
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }
    /**Parses a string into AST */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();
        // Parse recursively starting from the main entry point, the program:
        return this.Program();
    }

    /**
     * Main entry point 
     * 
     * Program
     *  : Literal
     *  ;
     * */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList()
        };
    }

    /**
     * P -> S
     * P -> P S
     * StatementList
     *      : Statement
     *      | StatementList Statement -> Statement Statement Statement Statement ...
     *      ;
     */
    StatementList(stoplookahead_token_type = null) {
        const statementList = [this.Statement()];
        while (this._lookahead != null && this._lookahead.type !== stoplookahead_token_type) {
            statementList.push(this.Statement());
        }
        return statementList;
    }

    /**
     * Statement
     *  : ExpressionStatement
     *  | BlockStatement
     *  | EmptyStatement 
     * ;
     * 
     */
    Statement() {
        switch (this._lookahead.type) {
            case ';':
                return this.EmptyStatement();
            case '{':
                return this.BlockStatement();
            default:
                return this.ExpressionStatement();
        }
    }
    /**
     * EmptyyStatement
     *  : ;
     *  ;
     */
    EmptyStatement() {
        this._eat(';');
        return {
            type: 'EmptyStatement',
        }
    }
    /**
    * BlockStatement
    *   : { OptBlockStatment }
    *   | 
    *   ;
    */
    BlockStatement() {
        this._eat('{')
        const body = this._lookahead.type !== '}' ? this.StatementList('}') : []
        this._eat('}')
        return {
            type: 'BlockStatement',
            body: body
        }
    }

    /**
     * ExpressionStatement
     *  : Expression ;
     *  ;
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';')
        return {
            type: 'ExpressionStatement',
            value: expression
        }
    }

    /**
     * Expression
     *  : Literal()
     *  ;
     */
    Expression() {
        return this.Literal();
    }

    /**
     * Literals:
     *      : NumericLiterals
     *      | String Literals
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericaLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError('Literal: unexpected literal production');
    }
    /**
     * 
     * NumericaLiteral
     *  : NUMBER
     *  ;
     */
    NumericaLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    /**
        * 
        * NumericaLiteral
        *  : STRING
        *  ;
        */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
        };
    }

    _eat(tokenType) {
        const token = this._lookahead;
        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`
            );
        }
        if (token.type != tokenType) {
            throw new SyntaxError(
                `Unexpected token:"${token.type}", expected: "${tokenType}"`
            );
        }
        // advance to next token
        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }
}

module.exports = {
    Parser,
};