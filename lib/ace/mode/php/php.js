/*
  php.js 0.1.0 <http://phpjs.hertzen.com/>
  Copyright (c) 2013 Niklas von Hertzen

  Released under MIT License

  This file contains:
  - [var PHP = {Constants:{}};]
  - src/modules/tokenizer/constants.js
  - src/parser/lexer.js
  - src/parser/parser.js
  - src/parser/yyn.js
  - src/parser/yyn_stmt.js
  - src/parser/yyn_expr.js
  - src/parser/yyn_scalar.js
*/



define(function(require, exports, module) {

var PHP = {Constants:{}};

PHP.Constants.T_THROW = 258
PHP.Constants.T_INCLUDE = 260
PHP.Constants.T_INCLUDE_ONCE = 261
PHP.Constants.T_EVAL = 321
PHP.Constants.T_REQUIRE = 262
PHP.Constants.T_REQUIRE_ONCE = 263
PHP.Constants.T_LOGICAL_OR = 264
PHP.Constants.T_LOGICAL_XOR = 265
PHP.Constants.T_LOGICAL_AND = 266
PHP.Constants.T_PRINT = 267
PHP.Constants.T_YIELD = 268
PHP.Constants.T_DOUBLE_ARROW = 269
PHP.Constants.T_YIELD_FROM = 270
PHP.Constants.T_PLUS_EQUAL = 271
PHP.Constants.T_MINUS_EQUAL = 272
PHP.Constants.T_MUL_EQUAL = 273
PHP.Constants.T_DIV_EQUAL = 274
PHP.Constants.T_CONCAT_EQUAL = 275
PHP.Constants.T_MOD_EQUAL = 276
PHP.Constants.T_AND_EQUAL = 277
PHP.Constants.T_OR_EQUAL = 278
PHP.Constants.T_XOR_EQUAL = 279
PHP.Constants.T_SL_EQUAL = 280
PHP.Constants.T_SR_EQUAL = 281
PHP.Constants.T_POW_EQUAL = 282
PHP.Constants.T_COALESCE_EQUAL = 283
PHP.Constants.T_COALESCE = 284
PHP.Constants.T_BOOLEAN_OR = 285
PHP.Constants.T_BOOLEAN_AND = 286
PHP.Constants.T_IS_EQUAL = 287
PHP.Constants.T_IS_NOT_EQUAL = 288
PHP.Constants.T_IS_IDENTICAL = 289
PHP.Constants.T_IS_NOT_IDENTICAL = 290
PHP.Constants.T_SPACESHIP = 291
PHP.Constants.T_IS_SMALLER_OR_EQUAL = 292
PHP.Constants.T_IS_GREATER_OR_EQUAL = 293
PHP.Constants.T_SL = 294
PHP.Constants.T_SR = 295
PHP.Constants.T_INSTANCEOF = 296
PHP.Constants.T_INC = 384
PHP.Constants.T_DEC = 385
PHP.Constants.T_INT_CAST = 297
PHP.Constants.T_DOUBLE_CAST = 298
PHP.Constants.T_STRING_CAST = 299
PHP.Constants.T_ARRAY_CAST = 300
PHP.Constants.T_OBJECT_CAST = 301
PHP.Constants.T_BOOL_CAST = 302
PHP.Constants.T_UNSET_CAST = 303
PHP.Constants.T_POW = 304
PHP.Constants.T_NEW = 322
PHP.Constants.T_CLONE = 305
PHP.Constants.T_EXIT = 323
PHP.Constants.T_IF = 324
PHP.Constants.T_ELSEIF = 307
PHP.Constants.T_ELSE = 308
PHP.Constants.T_ENDIF = 325
PHP.Constants.T_LNUMBER = 309
PHP.Constants.T_DNUMBER = 310
PHP.Constants.T_STRING = 311
PHP.Constants.T_STRING_VARNAME = 319
PHP.Constants.T_VARIABLE = 315
PHP.Constants.T_NUM_STRING = 320
PHP.Constants.T_INLINE_HTML = 316
PHP.Constants.T_ENCAPSED_AND_WHITESPACE = 317
PHP.Constants.T_CONSTANT_ENCAPSED_STRING = 318
PHP.Constants.T_ECHO = 326
PHP.Constants.T_DO = 327
PHP.Constants.T_WHILE = 328
PHP.Constants.T_ENDWHILE = 329
PHP.Constants.T_FOR = 330
PHP.Constants.T_ENDFOR = 331
PHP.Constants.T_FOREACH = 332
PHP.Constants.T_ENDFOREACH = 333
PHP.Constants.T_DECLARE = 334
PHP.Constants.T_ENDDECLARE = 335
PHP.Constants.T_AS = 336
PHP.Constants.T_SWITCH = 337
PHP.Constants.T_MATCH = 341
PHP.Constants.T_ENDSWITCH = 338
PHP.Constants.T_CASE = 339
PHP.Constants.T_DEFAULT = 340
PHP.Constants.T_BREAK = 342
PHP.Constants.T_CONTINUE = 343
PHP.Constants.T_GOTO = 344
PHP.Constants.T_FUNCTION = 345
PHP.Constants.T_FN = 346
PHP.Constants.T_CONST = 347
PHP.Constants.T_RETURN = 348
PHP.Constants.T_TRY = 349
PHP.Constants.T_CATCH = 350
PHP.Constants.T_FINALLY = 351
PHP.Constants.T_THROW = 258
PHP.Constants.T_USE = 352
PHP.Constants.T_INSTEADOF = 353
PHP.Constants.T_GLOBAL = 354
PHP.Constants.T_STATIC = 355
PHP.Constants.T_ABSTRACT = 356
PHP.Constants.T_FINAL = 357
PHP.Constants.T_PRIVATE = 358
PHP.Constants.T_PROTECTED = 359
PHP.Constants.T_PUBLIC = 360
PHP.Constants.T_VAR = 361
PHP.Constants.T_UNSET = 362
PHP.Constants.T_ISSET = 363
PHP.Constants.T_EMPTY = 364
PHP.Constants.T_HALT_COMPILER = 365
PHP.Constants.T_CLASS = 366
PHP.Constants.T_TRAIT = 367
PHP.Constants.T_INTERFACE = 368
PHP.Constants.T_EXTENDS = 369
PHP.Constants.T_IMPLEMENTS = 370
PHP.Constants.T_OBJECT_OPERATOR = 386
PHP.Constants.T_NULLSAFE_OBJECT_OPERATOR = 387
PHP.Constants.T_DOUBLE_ARROW = 269
PHP.Constants.T_LIST = 372
PHP.Constants.T_ARRAY = 373
PHP.Constants.T_CALLABLE = 374
PHP.Constants.T_CLASS_C = 378
PHP.Constants.T_TRAIT_C = 379
PHP.Constants.T_METHOD_C = 380
PHP.Constants.T_FUNC_C = 381
PHP.Constants.T_LINE = 375
PHP.Constants.T_FILE = 376
PHP.Constants.T_START_HEREDOC = 394
PHP.Constants.T_END_HEREDOC = 395
PHP.Constants.T_DOLLAR_OPEN_CURLY_BRACES = 396
PHP.Constants.T_CURLY_OPEN = 397
PHP.Constants.T_PAAMAYIM_NEKUDOTAYIM = 398
PHP.Constants.T_NAMESPACE = 371
PHP.Constants.T_NS_C = 382
PHP.Constants.T_DIR = 377
PHP.Constants.T_NS_SEPARATOR = 399
PHP.Constants.T_ELLIPSIS = 400
PHP.Constants.T_NAME_FULLY_QUALIFIED = 312
PHP.Constants.T_NAME_QUALIFIED = 314
PHP.Constants.T_NAME_RELATIVE = 313
PHP.Constants.T_ATTRIBUTE = 383

PHP.Lexer = function(src, ini) {
    var heredoc, heredocEndAllowed,

    stateStack = ['INITIAL'], stackPos = 0,
    swapState = function(state) {
        stateStack[stackPos] = state;
    },
    pushState = function(state) {
        stateStack[++stackPos] = state;
    },
    popState = function() {
        --stackPos;
    },

    shortOpenTag = ini === undefined || /^(on|true|1)$/i.test(ini.short_open_tag),
    openTag = shortOpenTag
        ? /^(\<\?php(?:\r\n|[ \t\r\n])|<\?|\<script language\=('|")?php('|")?\>)/i
        : /^(\<\?php(?:\r\n|[ \t\r\n])|\<script language\=('|")?php('|")?\>)/i,
    inlineHtml = shortOpenTag
        ? /[^<]*(?:<(?!\?|script language\=('|")?php('|")?\>)[^<]*)*/i
        : /[^<]*(?:<(?!\?=|\?php[ \t\r\n]|script language\=('|")?php('|")?\>)[^<]*)*/i,
    labelRegexPart = '[a-zA-Z_\\x7f-\\uffff][a-zA-Z0-9_\\x7f-\\uffff]*',
    stringRegexPart = function(quote) {
        // Matches non-interpolated portion of interpolated string
        return '[^' + quote + '\\\\${]*(?:(?:\\\\[\\s\\S]|\\$(?!\\{|[a-zA-Z_\\x7f-\\uffff])|\\{(?!\\$))[^' + quote + '\\\\${]*)*';
    },

    sharedStringTokens = [
        {
            value: PHP.Constants.T_VARIABLE,
            re: new RegExp('^\\$' + labelRegexPart + '(?=\\[)'),
            func: function() {
                pushState('VAR_OFFSET');
            }
        },
        {
            value: PHP.Constants.T_VARIABLE,
            re: new RegExp('^\\$' + labelRegexPart + '(?=->' + labelRegexPart + ')'),
            func: function() {
                pushState('LOOKING_FOR_PROPERTY');
            }
        },
        {
            value: PHP.Constants.T_DOLLAR_OPEN_CURLY_BRACES,
            re: new RegExp('^\\$\\{(?=' + labelRegexPart + '[\\[}])'),
            func: function() {
                pushState('LOOKING_FOR_VARNAME');
            }
        },
        {
            value: PHP.Constants.T_VARIABLE,
            re: new RegExp('^\\$' + labelRegexPart)
        },
        {
            value: PHP.Constants.T_DOLLAR_OPEN_CURLY_BRACES,
            re: /^\$\{/,
            func: function() {
                pushState('IN_SCRIPTING');
            }
        },
        {
            value: PHP.Constants.T_CURLY_OPEN,
            re: /^\{(?=\$)/,
            func: function() {
                pushState('IN_SCRIPTING');
            }
        }
    ],
    data = {
        // Outside of PHP
        'INITIAL': [
            {
                value: PHP.Constants.T_OPEN_TAG_WITH_ECHO,
                re: /^<\?=/i,
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            },
            {
                value: PHP.Constants.T_OPEN_TAG,
                re: openTag,
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            },
            {
                value: PHP.Constants.T_INLINE_HTML,
                re: inlineHtml
            },
        ],
        // In normal PHP code
        'IN_SCRIPTING': [
            // Match whitespace first
            {
                value: PHP.Constants.T_WHITESPACE,
                re: /^[ \n\r\t]+/
            },

			// Keywords, sorted alphabetically
            {
                value: PHP.Constants.T_ABSTRACT,
                re: /^abstract\b/i
            },
            {
                value: PHP.Constants.T_LOGICAL_AND,
                re: /^and\b/i
            },
            {
                value: PHP.Constants.T_ARRAY,
                re: /^array\b/i
            },
            {
                value: PHP.Constants.T_AS,
                re: /^as\b/i
            },
            {
                value: PHP.Constants.T_BREAK,
                re: /^break\b/i
            },
            {
                value: PHP.Constants.T_CALLABLE,
                re: /^callable\b/i
            },
            {
                value: PHP.Constants.T_CASE,
                re: /^case\b/i
            },
            {
                value: PHP.Constants.T_CATCH,
                re: /^catch\b/i
            },
            {
                value: PHP.Constants.T_CLASS,
                re: /^class\b/i,
            },
            {
                value: PHP.Constants.T_CLONE,
                re: /^clone\b/i
            },
            {
                value: PHP.Constants.T_CONST,
                re: /^const\b/i
            },
            {
                value: PHP.Constants.T_CONTINUE,
                re: /^continue\b/i
            },
            {
                value: PHP.Constants.T_DECLARE,
                re: /^declare\b/i
            },
            {
                value: PHP.Constants.T_DEFAULT,
                re: /^default\b/i
            },
            {
                value: PHP.Constants.T_DO,
                re: /^do\b/i
            },
            {
                value: PHP.Constants.T_ECHO,
                re: /^echo\b/i
            },
            {
                value: PHP.Constants.T_ELSE,
                re: /^else\b/i
            },
            {
                value: PHP.Constants.T_ELSEIF,
                re: /^elseif\b/i
            },
            {
                value: PHP.Constants.T_ENDDECLARE,
                re: /^enddeclare\b/i
            },
            {
                value: PHP.Constants.T_ENDFOR,
                re: /^endfor\b/i
            },
            {
                value: PHP.Constants.T_ENDFOREACH,
                re: /^endforeach\b/i
            },
            {
                value: PHP.Constants.T_ENDIF,
                re: /^endif\b/i
            },
            {
                value: PHP.Constants.T_ENDSWITCH,
                re: /^endswitch\b/i
            },
            {
                value: PHP.Constants.T_ENDWHILE,
                re: /^endwhile\b/i
            },
            {
                value: PHP.Constants.T_EMPTY,
                re: /^empty\b/i
            },
            {
                value: PHP.Constants.T_EVAL,
                re: /^eval\b/i
            },
            {
                value: PHP.Constants.T_EXIT,
                re: /^(?:exit|die)\b/i
            },
            {
                value: PHP.Constants.T_EXTENDS,
                re: /^extends\b/i
            },
            {
                value: PHP.Constants.T_FINAL,
                re: /^final\b/i
            },
            {
                value: PHP.Constants.T_FINALLY,
                re: /^finally\b/i
            },
            {
                value: PHP.Constants.T_FN,
                re: /^fn\b/i
            },
            {
                value: PHP.Constants.T_FOR,
                re: /^for\b/i
            },
            {
                value: PHP.Constants.T_FOREACH,
                re: /^foreach\b/i
            },
            {
                value: PHP.Constants.T_FUNCTION,
                re: /^function\b/i
            },
            {
                value: PHP.Constants.T_GLOBAL,
                re: /^global\b/i
            },
            {
                value: PHP.Constants.T_GOTO,
                re: /^goto\b/i
            },
            {
                value: PHP.Constants.T_IF,
                re: /^if\b/i
            },
            {
                value: PHP.Constants.T_IMPLEMENTS,
                re: /^implements\b/i
            },
            {
                value: PHP.Constants.T_INCLUDE,
                re: /^include\b/i
            },
            {
                value: PHP.Constants.T_INCLUDE_ONCE,
                re: /^include_once\b/i
            },
            {
                value: PHP.Constants.T_INSTANCEOF,
                re: /^instanceof\b/i
            },
            {
                value: PHP.Constants.T_INSTEADOF,
                re: /^insteadof\b/i
            },
            {
                value: PHP.Constants.T_INTERFACE,
                re: /^interface\b/i
            },
            {
                value: PHP.Constants.T_ISSET,
                re: /^isset\b/i
            },
            {
                value: PHP.Constants.T_LIST,
                re: /^list\b/i
            },
            {
                value: PHP.Constants.T_NAMESPACE,
                re: /^namespace\b/i
            },
            {
                value: PHP.Constants.T_NEW,
                re: /^new\b/i
            },
            {
                value: PHP.Constants.T_LOGICAL_OR,
                re: /^or\b/i
            },
            {
                value: PHP.Constants.T_PRINT,
                re: /^print\b/i
            },
            {
                value: PHP.Constants.T_PRIVATE,
                re: /^private\b/i
            },
            {
                value: PHP.Constants.T_PROTECTED,
                re: /^protected\b/i
            },
            {
                value: PHP.Constants.T_PUBLIC,
                re: /^public\b/i
            },
            {
                value: PHP.Constants.T_REQUIRE,
                re: /^require\b/i
            },
            {
                value: PHP.Constants.T_REQUIRE_ONCE,
                re: /^require_once\b/i
            },
            {
                value: PHP.Constants.T_STATIC,
                re: /^static\b/i
            },
            {
                value: PHP.Constants.T_SWITCH,
                re: /^switch\b/i
            },
            {
                value: PHP.Constants.T_THROW,
                re: /^throw\b/i
            },
            {
                value: PHP.Constants.T_TRAIT,
                re: /^trait\b/i,
            },
            {
                value: PHP.Constants.T_TRY,
                re: /^try\b/i
            },
            {
                value: PHP.Constants.T_UNSET,
                re: /^unset\b/i
            },
            {
                value: PHP.Constants.T_USE,
                re: /^use\b/i
            },
            {
                value: PHP.Constants.T_VAR,
                re: /^var\b/i
            },
            {
                value: PHP.Constants.T_WHILE,
                re: /^while\b/i
            },
            {
                value: PHP.Constants.T_LOGICAL_XOR,
                re: /^xor\b/i
            },
            {
                value: PHP.Constants.T_YIELD_FROM,
                re: /^yield\s+from\b/i
            },
            {
                value: PHP.Constants.T_YIELD,
                re: /^yield\b/i
            },
            {
                value: PHP.Constants.T_RETURN,
                re: /^return\b/i
            },
            {
                value: PHP.Constants.T_METHOD_C,
                re: /^__METHOD__\b/i
            },
            {
                value: PHP.Constants.T_LINE,
                re: /^__LINE__\b/i
            },
            {
                value: PHP.Constants.T_FILE,
                re: /^__FILE__\b/i
            },
            {
                value: PHP.Constants.T_FUNC_C,
                re: /^__FUNCTION__\b/i
            },
            {
                value: PHP.Constants.T_NS_C,
                re: /^__NAMESPACE__\b/i
            },
            {
                value: PHP.Constants.T_TRAIT_C,
                re: /^__TRAIT__\b/i
            },
            {
                value: PHP.Constants.T_DIR,
                re: /^__DIR__\b/i
            },
            {
                value: PHP.Constants.T_CLASS_C,
                re: /^__CLASS__\b/i
            },
			
            // Other tokens
            {
                value: PHP.Constants.T_AND_EQUAL,
                re: /^&=/
            },
            {
                value: PHP.Constants.T_ARRAY_CAST,
                re: /^\([ \t]*array[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_BOOL_CAST,
                re: /^\([ \t]*(?:bool|boolean)[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_DOUBLE_CAST,
                re: /^\([ \t]*(?:real|float|double)[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_INT_CAST,
                re: /^\([ \t]*(?:int|integer)[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_OBJECT_CAST,
                re: /^\([ \t]*object[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_STRING_CAST,
                re: /^\([ \t]*(?:binary|string)[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_UNSET_CAST,
                re: /^\([ \t]*unset[ \t]*\)/i
            },
            {
                value: PHP.Constants.T_BOOLEAN_AND,
                re: /^&&/
            },
            {
                value: PHP.Constants.T_BOOLEAN_OR,
                re: /^\|\|/
            },
            {
                value: PHP.Constants.T_CLOSE_TAG,
                re: /^(?:\?>|<\/script>)(\r\n|\r|\n)?/i,
                func: function() {
                    swapState('INITIAL');
                }
            },
            {
                value: PHP.Constants.T_DOUBLE_ARROW,
                re: /^=>/
            },
            {
                value: PHP.Constants.T_PAAMAYIM_NEKUDOTAYIM,
                re: /^::/
            },
            {
                value: PHP.Constants.T_INC,
                re: /^\+\+/
            },
            {
                value: PHP.Constants.T_DEC,
                re: /^--/
            },
            {
                value: PHP.Constants.T_CONCAT_EQUAL,
                re: /^\.=/
            },
            {
                value: PHP.Constants.T_DIV_EQUAL,
                re: /^\/=/
            },
            {
                value: PHP.Constants.T_XOR_EQUAL,
                re: /^\^=/
            },
            {
                value: PHP.Constants.T_MUL_EQUAL,
                re: /^\*=/
            },
            {
                value: PHP.Constants.T_MOD_EQUAL,
                re: /^%=/
            },
            {
                value: PHP.Constants.T_SL_EQUAL,
                re: /^<<=/
            },
            {
                value: PHP.Constants.T_START_HEREDOC,
                re: new RegExp('^[bB]?<<<[ \\t]*\'(' + labelRegexPart + ')\'(?:\\r\\n|\\r|\\n)'),
                func: function(result) {
                    heredoc = result[1];
                    swapState('NOWDOC');
                }
            },
            {
                value: PHP.Constants.T_START_HEREDOC,
                re: new RegExp('^[bB]?<<<[ \\t]*("?)(' + labelRegexPart + ')\\1(?:\\r\\n|\\r|\\n)'),
                func: function(result) {
                    heredoc = result[2];
                    heredocEndAllowed = true;
                    swapState('HEREDOC');
                }
            },
            {
                value: PHP.Constants.T_SL,
                re: /^<</
            },
            {
                value: PHP.Constants.T_SPACESHIP,
                re: /^<=>/
            },
            {
                value: PHP.Constants.T_IS_SMALLER_OR_EQUAL,
                re: /^<=/
            },
            {
                value: PHP.Constants.T_SR_EQUAL,
                re: /^>>=/
            },
            {
                value: PHP.Constants.T_SR,
                re: /^>>/
            },
            {
                value: PHP.Constants.T_IS_GREATER_OR_EQUAL,
                re: /^>=/
            },
            {
                value: PHP.Constants.T_OR_EQUAL,
                re: /^\|=/
            },
            {
                value: PHP.Constants.T_PLUS_EQUAL,
                re: /^\+=/
            },
            {
                value: PHP.Constants.T_MINUS_EQUAL,
                re: /^-=/
            },
            {
                value: PHP.Constants.T_OBJECT_OPERATOR,
                re: new RegExp('^->(?=[ \n\r\t]*' + labelRegexPart + ')'),
                func: function() {
                    pushState('LOOKING_FOR_PROPERTY');
                }
            },
            {
                value: PHP.Constants.T_OBJECT_OPERATOR,
                re: /^->/i
            },
            {
                value: PHP.Constants.T_ELLIPSIS,
                re: /^\.\.\./
            },
            {
                value: PHP.Constants.T_POW_EQUAL,
                re: /^\*\*=/
            },
            {
                value: PHP.Constants.T_POW,
                re: /^\*\*/
            },
            {
                value: PHP.Constants.T_COALESCE,
                re: /^\?\?/
            },
            {
                value: PHP.Constants.T_COMMENT,
                re: /^\/\*([\S\s]*?)(?:\*\/|$)/
            },
            {
                value: PHP.Constants.T_COMMENT,
                re: /^(?:\/\/|#)[^\r\n?]*(?:\?(?!>)[^\r\n?]*)*(?:\r\n|\r|\n)?/
            },
            {
                value: PHP.Constants.T_IS_IDENTICAL,
                re: /^===/
            },
            {
                value: PHP.Constants.T_IS_EQUAL,
                re: /^==/
            },
            {
                value: PHP.Constants.T_IS_NOT_IDENTICAL,
                re: /^!==/
            },
            {
                value: PHP.Constants.T_IS_NOT_EQUAL,
                re: /^(!=|<>)/
            },
            {
                value: PHP.Constants.T_DNUMBER,
                re: /^(?:[0-9]+\.[0-9]*|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/
            },
            {
                value: PHP.Constants.T_DNUMBER,
                re: /^[0-9]+[eE][+-]?[0-9]+/
            },
            {
                value: PHP.Constants.T_LNUMBER,
                re: /^(?:0x[0-9A-F]+|0b[01]+|[0-9]+)/i
            },
            {
                value: PHP.Constants.T_VARIABLE,
                re: new RegExp('^\\$' + labelRegexPart)
            },
            {
                value: PHP.Constants.T_CONSTANT_ENCAPSED_STRING,
                re: /^[bB]?'[^'\\]*(?:\\[\s\S][^'\\]*)*'/,
            },
            {
                value: PHP.Constants.T_CONSTANT_ENCAPSED_STRING,
                re: new RegExp('^[bB]?"' + stringRegexPart('"') + '"')
            },
            {
                value: -1,
                re: /^[bB]?"/,
                func: function() {
                    swapState('DOUBLE_QUOTES');
                }
            },
            {
                value: -1,
                re: /^`/,
                func: function() {
                    swapState('BACKTICKS');
                }
            },
            {
                value: PHP.Constants.T_NS_SEPARATOR,
                re: /^\\/
            },
            {
                value: PHP.Constants.T_STRING,
                re: /^[a-zA-Z_\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*/
            },
            {
                value: -1,
                re: /^\{/,
                func: function() {
                    pushState('IN_SCRIPTING');
                }
            },
            {
                value: -1,
                re: /^\}/,
                func: function() {
                    if (stackPos > 0) {
                        popState();
                    }
                }
            },
            {
                value: -1,
                re: /^[\[\];:?()!.,><=+-/*|&@^%"'$~]/
            }
        ],
        'DOUBLE_QUOTES': sharedStringTokens.concat([
            {
                value: -1,
                re: /^"/,
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            },
            {
                value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
                re: new RegExp('^' + stringRegexPart('"'))
            }
        ]),
        'BACKTICKS': sharedStringTokens.concat([
            {
                value: -1,
                re: /^`/,
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            },
            {
                value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
                re: new RegExp('^' + stringRegexPart('`'))
            }
        ]),
        'VAR_OFFSET': [
            {
                value: -1,
                re: /^\]/,
                func: function() {
                    popState();
                }
            },
            {
                value: PHP.Constants.T_NUM_STRING,
                re: /^(?:0x[0-9A-F]+|0b[01]+|[0-9]+)/i
            },
            {
                value: PHP.Constants.T_VARIABLE,
                re: new RegExp('^\\$' + labelRegexPart)
            },
            {
                value: PHP.Constants.T_STRING,
                re: new RegExp('^' + labelRegexPart)
            },
            {
                value: -1,
                re: /^[;:,.\[()|^&+-/*=%!~$<>?@{}"`]/
            }
        ],
        'LOOKING_FOR_PROPERTY': [
            {
                value: PHP.Constants.T_OBJECT_OPERATOR,
                re: /^->/
            },
            {
                value: PHP.Constants.T_STRING,
                re: new RegExp('^' + labelRegexPart),
                func: function() {
                    popState();
                }
            },
            {
                value: PHP.Constants.T_WHITESPACE,
                re: /^[ \n\r\t]+/
            }
        ],
        'LOOKING_FOR_VARNAME': [
            {
                value: PHP.Constants.T_STRING_VARNAME,
                re: new RegExp('^' + labelRegexPart + '(?=[\\[}])'),
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            }
        ],
        'NOWDOC': [
            {
                value: PHP.Constants.T_END_HEREDOC,
                matchFunc: function(src) {
                    var re = new RegExp('^' + heredoc + '(?=;?[\\r\\n])');
                    if (src.match(re)) {
                        return [src.substr(0, heredoc.length)];
                    } else {
                        return null;
                    }
                },
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            },
            {
                value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
                matchFunc: function(src) {
                    var re = new RegExp('[\\r\\n]' + heredoc + '(?=;?[\\r\\n])');
                    var result = re.exec(src);
                    var end = result ? result.index + 1 : src.length;
                    return [src.substring(0, end)];
                }
            }
        ],
        'HEREDOC': sharedStringTokens.concat([
            {
                value: PHP.Constants.T_END_HEREDOC,
                matchFunc: function(src) {
                    if (!heredocEndAllowed) {
                        return null;
                    }
                    var re = new RegExp('^' + heredoc + '(?=;?[\\r\\n])');
                    if (src.match(re)) {
                        return [src.substr(0, heredoc.length)];
                    } else {
                        return null;
                    }
                },
                func: function() {
                    swapState('IN_SCRIPTING');
                }
            },
            {
                value: PHP.Constants.T_ENCAPSED_AND_WHITESPACE,
                matchFunc: function(src) {
                    var end = src.length;
                    // Find next interpolation
                    var re = new RegExp('^' + stringRegexPart(''));
                    var result = re.exec(src);
                    if (result) {
                        end = result[0].length;
                    }
                    // Find heredoc end
                    re = new RegExp('([\\r\\n])' + heredoc + '(?=;?[\\r\\n])');
                    result = re.exec(src.substring(0, end));
                    if (result) {
                        end = result.index + 1;
                        heredocEndAllowed = true;
                    } else {
                        heredocEndAllowed = false;
                    }
                    if (end == 0) {
                        return null;
                    }
                    return [src.substring(0, end)];
                }
            }
        ])
    };

    var results = [],
    line = 1,
    cancel = true;

    if (src === null) {
        return results;
    }

    if (typeof src !== "string") {
        src = src.toString();
    }

    while (src.length > 0 && cancel === true) {
        var state = stateStack[stackPos];
        var tokens = data[state];
        cancel = tokens.some(function(token){
            var result = token.matchFunc !== undefined
                ? token.matchFunc(src)
                : src.match(token.re);
            if (result !== null) {
                if (result[0].length == 0) {
                    // Error in the lexer definition, prevent infinite loop
                    throw new Error("empty match");
                }

                if (token.func !== undefined) {
                    token.func(result);
                }

                if (token.value === -1) {
                    // character token
                    results.push(result[0]);
                } else {
                    var resultString = result[0];
                    results.push([
                        parseInt(token.value, 10),
                        resultString,
                        line
                        ]);
                    line += resultString.split('\n').length - 1;
                }

                src = src.substring(result[0].length);

                return true;
            }
            return false;
        });
    }

    return results;
};

/*
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 15.6.2012
 * @website http://hertzen.com
 */

/*
 * The skeleton for this parser was written by Moriyoshi Koizumi and is based on
 * the work by Masato Bito and is in the PUBLIC DOMAIN.
 * Ported to JavaScript by Niklas von Hertzen
 */


PHP.Parser = function ( preprocessedTokens, evaluate ) {

    var yybase = this.yybase,
    yydefault = this.yydefault,
    yycheck = this.yycheck,
    yyaction = this.yyaction,
    yylen = this.yylen,
    yygbase = this.yygbase,
    yygcheck = this.yygcheck,
    yyp = this.yyp,
    yygoto = this.yygoto,
    yylhs = this.yylhs,
    terminals = this.terminals,
    translate = this.translate,
    yygdefault = this.yygdefault;


    this.pos = -1;
    this.line = 1;

    this.tokenMap = this.createTokenMap( );

    this.dropTokens = {};
    this.dropTokens[ PHP.Constants.T_WHITESPACE ] = 1;
    this.dropTokens[ PHP.Constants.T_OPEN_TAG ] = 1;
    var tokens = [];

    // pre-process
    preprocessedTokens.forEach( function( token, index ) {
        if ( typeof token === "object" && token[ 0 ] === PHP.Constants.T_OPEN_TAG_WITH_ECHO) {
            tokens.push([
                PHP.Constants.T_OPEN_TAG,
                token[ 1 ],
                token[ 2 ]
                ]);
            tokens.push([
                PHP.Constants.T_ECHO,
                token[ 1 ],
                token[ 2 ]
                ]);
        } else {
            tokens.push( token );
        }
    });
    this.tokens = tokens;

    // We start off with no lookahead-token
    var tokenId = this.TOKEN_NONE;

    // The attributes for a node are taken from the first and last token of the node.
    // From the first token only the startAttributes are taken and from the last only
    // the endAttributes. Both are merged using the array union operator (+).
    this.startAttributes = {
        'startLine': 1
    };

    this.endAttributes = {};

    // In order to figure out the attributes for the starting token, we have to keep
    // them in a stack
    var attributeStack = [ this.startAttributes ];

    // Start off in the initial state and keep a stack of previous states
    var state = 0;
    var stateStack = [ state ];

    // AST stack
    this.yyastk = [];

    // Current position in the stack(s)
    this.stackPos  = 0;

    var yyn;

    var origTokenId;


    for (;;) {

        if ( yybase[ state ] === 0 ) {
            yyn = yydefault[ state ];
        } else {
            if (tokenId === this.TOKEN_NONE ) {
                // fetch the next token id from the lexer and fetch additional info by-ref
                origTokenId = this.getNextToken( );

                // map the lexer token id to the internally used token id's
                tokenId = (origTokenId >= 0 && origTokenId < this.TOKEN_MAP_SIZE) ? translate[ origTokenId ] : this.TOKEN_INVALID;

                attributeStack[ this.stackPos ] = this.startAttributes;
            }

            if (((yyn = yybase[ state ] + tokenId) >= 0
                && yyn < this.YYLAST && yycheck[ yyn ] === tokenId
                || (state < this.YY2TBLSTATE
                    && (yyn = yybase[state + this.YYNLSTATES] + tokenId) >= 0
                    && yyn < this.YYLAST
                    && yycheck[ yyn ] === tokenId))
            && (yyn = yyaction[ yyn ]) !== this.YYDEFAULT ) {
                /*
                 * >= YYNLSTATE: shift and reduce
                 * > 0: shift
                 * = 0: accept
                 * < 0: reduce
                 * = -YYUNEXPECTED: error
                 */
                if (yyn > 0) {
                    /* shift */
                    ++this.stackPos;

                    stateStack[ this.stackPos ] = state = yyn;
                    this.yyastk[ this.stackPos ] = this.tokenValue;
                    attributeStack[ this.stackPos ] = this.startAttributes;
                    tokenId = this.TOKEN_NONE;

                    if (yyn < this.YYNLSTATES)
                        continue;

                    /* $yyn >= YYNLSTATES means shift-and-reduce */
                    yyn -= this.YYNLSTATES;
                } else {
                    yyn = -yyn;
                }
            } else {
                yyn = yydefault[ state ];
            }
        }

        for (;;) {
            /* reduce/error */

            if ( yyn === 0 ) {
                /* accept */
                return this.yyval;
            } else if (yyn !== this.YYUNEXPECTED ) {
                /* reduce */
                for (var attr in this.endAttributes) {
                    attributeStack[ this.stackPos - yylen[ yyn ] ][ attr ] = this.endAttributes[ attr ];
                }
                // We do not build an AST!
                // this['yyn' + yyn](attributeStack[ this.stackPos - yylen[ yyn ] ]);

                /* Goto - shift nonterminal */
                this.stackPos -= yylen[ yyn ];
                yyn = yylhs[ yyn ];
                if ((yyp = yygbase[ yyn ] + stateStack[ this.stackPos ]) >= 0
                    && yyp < this.YYGLAST
                    && yygcheck[ yyp ] === yyn) {
                    state = yygoto[ yyp ];
                } else {
                    state = yygdefault[ yyn ];
                }

                ++this.stackPos;

                stateStack[ this.stackPos ] = state;
                this.yyastk[ this.stackPos ] = this.yyval;
                attributeStack[ this.stackPos ] = this.startAttributes;
            } else {
                /* error */
                if (evaluate !== true) {

                    var expected = [];

                    for (var i = 0; i < this.TOKEN_MAP_SIZE; ++i) {
                        if ((yyn = yybase[ state ] + i) >= 0 && yyn < this.YYLAST && yycheck[ yyn ] == i
                         || state < this.YY2TBLSTATE
                            && (yyn = yybase[ state + this.YYNLSTATES] + i)
                            && yyn < this.YYLAST && yycheck[ yyn ] == i
                        ) {
                            if (yyaction[ yyn ] != this.YYUNEXPECTED) {
                                if (expected.length == 4) {
                                    /* Too many expected tokens */
                                    expected = [];
                                    break;
                                }

                                expected.push( this.terminals[ i ] );
                            }
                        }
                    }

                    var expectedString = '';
                    if (expected.length) {
                        expectedString = ', expecting ' + expected.join(' or ');
                    }
                    throw new PHP.ParseError('syntax error, unexpected ' + terminals[ tokenId ] + expectedString, this.startAttributes['startLine']);
                } else {
                    return this.startAttributes['startLine'];
                }

            }

            if (state < this.YYNLSTATES)
                break;
            /* >= YYNLSTATES means shift-and-reduce */
            yyn = state - this.YYNLSTATES;
        }
    }
};

PHP.ParseError = function( msg, line ) {
    this.message = msg;
    this.line = line;
};

PHP.Parser.prototype.getNextToken = function( ) {

    this.startAttributes = {};
    this.endAttributes = {};

    var token,
    tmp;

    while (this.tokens[++this.pos] !== undefined) {
        token = this.tokens[this.pos];

        if (typeof token === "string") {
            this.startAttributes['startLine'] = this.line;
            this.endAttributes['endLine'] = this.line;

            // bug in token_get_all
            if ('b"' === token) {
                this.tokenValue = 'b"';
                return '"'.charCodeAt(0);
            } else {
                this.tokenValue = token;
                return token.charCodeAt(0);
            }
        } else {



            this.line += ((tmp = token[ 1 ].match(/\n/g)) === null) ? 0 : tmp.length;

            if (PHP.Constants.T_COMMENT === token[0]) {

                if (!Array.isArray(this.startAttributes['comments'])) {
                    this.startAttributes['comments'] = [];
                }

                this.startAttributes['comments'].push( {
                    type: "comment",
                    comment: token[1],
                    line: token[2]
                });

            } else if (PHP.Constants.T_DOC_COMMENT === token[0]) {
                this.startAttributes['comments'].push( new PHPParser_Comment_Doc(token[1], token[2]) );
            } else if (this.dropTokens[token[0]] === undefined) {
                this.tokenValue = token[1];
                this.startAttributes['startLine'] = token[2];
                this.endAttributes['endLine'] = this.line;

                return this.tokenMap[token[0]];
            }
        }
    }

    this.startAttributes['startLine'] = this.line;

    // 0 is the EOF token
    return 0;
};

PHP.Parser.prototype.tokenName = function( token ) {
    var constants = ["T_THROW","T_INCLUDE","T_INCLUDE_ONCE","T_EVAL","T_REQUIRE","T_REQUIRE_ONCE","T_LOGICAL_OR","T_LOGICAL_XOR","T_LOGICAL_AND","T_PRINT","T_YIELD","T_DOUBLE_ARROW","T_YIELD_FROM","T_PLUS_EQUAL","T_MINUS_EQUAL","T_MUL_EQUAL","T_DIV_EQUAL","T_CONCAT_EQUAL","T_MOD_EQUAL","T_AND_EQUAL","T_OR_EQUAL","T_XOR_EQUAL","T_SL_EQUAL","T_SR_EQUAL","T_POW_EQUAL","T_COALESCE_EQUAL","T_COALESCE","T_BOOLEAN_OR","T_BOOLEAN_AND","T_IS_EQUAL","T_IS_NOT_EQUAL","T_IS_IDENTICAL","T_IS_NOT_IDENTICAL","T_SPACESHIP","T_IS_SMALLER_OR_EQUAL","T_IS_GREATER_OR_EQUAL","T_SL","T_SR","T_INSTANCEOF","T_INC","T_DEC","T_INT_CAST","T_DOUBLE_CAST","T_STRING_CAST","T_ARRAY_CAST","T_OBJECT_CAST","T_BOOL_CAST","T_UNSET_CAST","T_POW","T_NEW","T_CLONE","T_EXIT","T_IF","T_ELSEIF","T_ELSE","T_ENDIF","T_LNUMBER","T_DNUMBER","T_STRING","T_STRING_VARNAME","T_VARIABLE","T_NUM_STRING","T_INLINE_HTML","T_ENCAPSED_AND_WHITESPACE","T_CONSTANT_ENCAPSED_STRING","T_ECHO","T_DO","T_WHILE","T_ENDWHILE","T_FOR","T_ENDFOR","T_FOREACH","T_ENDFOREACH","T_DECLARE","T_ENDDECLARE","T_AS","T_SWITCH","T_MATCH","T_ENDSWITCH","T_CASE","T_DEFAULT","T_BREAK","T_CONTINUE","T_GOTO","T_FUNCTION","T_FN","T_CONST","T_RETURN","T_TRY","T_CATCH","T_FINALLY","T_THROW","T_USE","T_INSTEADOF","T_GLOBAL","T_STATIC","T_ABSTRACT","T_FINAL","T_PRIVATE","T_PROTECTED","T_PUBLIC","T_VAR","T_UNSET","T_ISSET","T_EMPTY","T_HALT_COMPILER","T_CLASS","T_TRAIT","T_INTERFACE","T_EXTENDS","T_IMPLEMENTS","T_OBJECT_OPERATOR","T_NULLSAFE_OBJECT_OPERATOR","T_DOUBLE_ARROW","T_LIST","T_ARRAY","T_CALLABLE","T_CLASS_C","T_TRAIT_C","T_METHOD_C","T_FUNC_C","T_LINE","T_FILE","T_START_HEREDOC","T_END_HEREDOC","T_DOLLAR_OPEN_CURLY_BRACES","T_CURLY_OPEN","T_PAAMAYIM_NEKUDOTAYIM","T_NAMESPACE","T_NS_C","T_DIR","T_NS_SEPARATOR","T_ELLIPSIS","T_NAME_FULLY_QUALIFIED","T_NAME_QUALIFIED","T_NAME_RELATIVE","T_ATTRIBUTE"];
    var current = "UNKNOWN";
    constants.some(function( constant ) {
        if (PHP.Constants[ constant ] === token) {
            current = constant;
            return true;
        } else {
            return false;
        }
    });

    return current;
};

/**
 * Creates the token map.
 *
 * The token map maps the PHP internal token identifiers
 * to the identifiers used by the PHP.Parser. Additionally it
 * maps T_OPEN_TAG_WITH_ECHO to T_ECHO and T_CLOSE_TAG to ';'.
 *
 * @return array The token map
 */

PHP.Parser.prototype.createTokenMap = function() {
    var tokenMap = {},
    name,
    i;
    // 256 is the minimum possible token number, as everything below
    // it is an ASCII value
    for ( i = 256; i < 1000; ++i ) {
        // T_OPEN_TAG_WITH_ECHO with dropped T_OPEN_TAG results in T_ECHO
        if( PHP.Constants.T_OPEN_TAG_WITH_ECHO === i ) {
            tokenMap[ i ] = PHP.Constants.T_ECHO;
        // T_CLOSE_TAG is equivalent to ';'
        } else if( PHP.Constants.T_CLOSE_TAG === i ) {
            tokenMap[ i ] = 59;
        // and the others can be mapped directly
        } else if ( 'UNKNOWN' !== (name = this.tokenName( i ) ) ) { 
            tokenMap[ i ] =  this[name];
        }
    }
    return tokenMap;
};



/* This is an automatically GENERATED file, which should not be manually edited.
 * Instead edit one of the following:
 *  * the grammar file grammar/zend_language_parser.jsy
 *  * the parser skeleton grammar/kymacc.js.parser
 *  * the preprocessing script grammar/rebuildParser.php
 *
 * The skeleton for this parser was written by Moriyoshi Koizumi and is based on
 * the work by Masato Bito and is in the PUBLIC DOMAIN.
 * Ported to JavaScript by Niklas von Hertzen
 */

PHP.Parser.prototype.TOKEN_NONE    = -1;
PHP.Parser.prototype.TOKEN_INVALID = 165;

PHP.Parser.prototype.TOKEN_MAP_SIZE = 392;

PHP.Parser.prototype.YYLAST       = 1164;
PHP.Parser.prototype.YY2TBLSTATE  = 395;
PHP.Parser.prototype.YYGLAST      = 589;
PHP.Parser.prototype.YYNLSTATES   = 694;
PHP.Parser.prototype.YYUNEXPECTED = 32767;
PHP.Parser.prototype.YYDEFAULT    = -32766;

// {{{ Tokens
PHP.Parser.prototype.YYERRTOK = 256;
PHP.Parser.prototype.T_THROW = 257;
PHP.Parser.prototype.T_INCLUDE = 258;
PHP.Parser.prototype.T_INCLUDE_ONCE = 259;
PHP.Parser.prototype.T_EVAL = 260;
PHP.Parser.prototype.T_REQUIRE = 261;
PHP.Parser.prototype.T_REQUIRE_ONCE = 262;
PHP.Parser.prototype.T_LOGICAL_OR = 263;
PHP.Parser.prototype.T_LOGICAL_XOR = 264;
PHP.Parser.prototype.T_LOGICAL_AND = 265;
PHP.Parser.prototype.T_PRINT = 266;
PHP.Parser.prototype.T_YIELD = 267;
PHP.Parser.prototype.T_DOUBLE_ARROW = 268;
PHP.Parser.prototype.T_YIELD_FROM = 269;
PHP.Parser.prototype.T_PLUS_EQUAL = 270;
PHP.Parser.prototype.T_MINUS_EQUAL = 271;
PHP.Parser.prototype.T_MUL_EQUAL = 272;
PHP.Parser.prototype.T_DIV_EQUAL = 273;
PHP.Parser.prototype.T_CONCAT_EQUAL = 274;
PHP.Parser.prototype.T_MOD_EQUAL = 275;
PHP.Parser.prototype.T_AND_EQUAL = 276;
PHP.Parser.prototype.T_OR_EQUAL = 277;
PHP.Parser.prototype.T_XOR_EQUAL = 278;
PHP.Parser.prototype.T_SL_EQUAL = 279;
PHP.Parser.prototype.T_SR_EQUAL = 280;
PHP.Parser.prototype.T_POW_EQUAL = 281;
PHP.Parser.prototype.T_COALESCE_EQUAL = 282;
PHP.Parser.prototype.T_COALESCE = 283;
PHP.Parser.prototype.T_BOOLEAN_OR = 284;
PHP.Parser.prototype.T_BOOLEAN_AND = 285;
PHP.Parser.prototype.T_IS_EQUAL = 286;
PHP.Parser.prototype.T_IS_NOT_EQUAL = 287;
PHP.Parser.prototype.T_IS_IDENTICAL = 288;
PHP.Parser.prototype.T_IS_NOT_IDENTICAL = 289;
PHP.Parser.prototype.T_SPACESHIP = 290;
PHP.Parser.prototype.T_IS_SMALLER_OR_EQUAL = 291;
PHP.Parser.prototype.T_IS_GREATER_OR_EQUAL = 292;
PHP.Parser.prototype.T_SL = 293;
PHP.Parser.prototype.T_SR = 294;
PHP.Parser.prototype.T_INSTANCEOF = 295;
PHP.Parser.prototype.T_INC = 296;
PHP.Parser.prototype.T_DEC = 297;
PHP.Parser.prototype.T_INT_CAST = 298;
PHP.Parser.prototype.T_DOUBLE_CAST = 299;
PHP.Parser.prototype.T_STRING_CAST = 300;
PHP.Parser.prototype.T_ARRAY_CAST = 301;
PHP.Parser.prototype.T_OBJECT_CAST = 302;
PHP.Parser.prototype.T_BOOL_CAST = 303;
PHP.Parser.prototype.T_UNSET_CAST = 304;
PHP.Parser.prototype.T_POW = 305;
PHP.Parser.prototype.T_NEW = 306;
PHP.Parser.prototype.T_CLONE = 307;
PHP.Parser.prototype.T_EXIT = 308;
PHP.Parser.prototype.T_IF = 309;
PHP.Parser.prototype.T_ELSEIF = 310;
PHP.Parser.prototype.T_ELSE = 311;
PHP.Parser.prototype.T_ENDIF = 312;
PHP.Parser.prototype.T_LNUMBER = 313;
PHP.Parser.prototype.T_DNUMBER = 314;
PHP.Parser.prototype.T_STRING = 315;
PHP.Parser.prototype.T_STRING_VARNAME = 316;
PHP.Parser.prototype.T_VARIABLE = 317;
PHP.Parser.prototype.T_NUM_STRING = 318;
PHP.Parser.prototype.T_INLINE_HTML = 319;
PHP.Parser.prototype.T_ENCAPSED_AND_WHITESPACE = 320;
PHP.Parser.prototype.T_CONSTANT_ENCAPSED_STRING = 321;
PHP.Parser.prototype.T_ECHO = 322;
PHP.Parser.prototype.T_DO = 323;
PHP.Parser.prototype.T_WHILE = 324;
PHP.Parser.prototype.T_ENDWHILE = 325;
PHP.Parser.prototype.T_FOR = 326;
PHP.Parser.prototype.T_ENDFOR = 327;
PHP.Parser.prototype.T_FOREACH = 328;
PHP.Parser.prototype.T_ENDFOREACH = 329;
PHP.Parser.prototype.T_DECLARE = 330;
PHP.Parser.prototype.T_ENDDECLARE = 331;
PHP.Parser.prototype.T_AS = 332;
PHP.Parser.prototype.T_SWITCH = 333;
PHP.Parser.prototype.T_MATCH = 334;
PHP.Parser.prototype.T_ENDSWITCH = 335;
PHP.Parser.prototype.T_CASE = 336;
PHP.Parser.prototype.T_DEFAULT = 337;
PHP.Parser.prototype.T_BREAK = 338;
PHP.Parser.prototype.T_CONTINUE = 339;
PHP.Parser.prototype.T_GOTO = 340;
PHP.Parser.prototype.T_FUNCTION = 341;
PHP.Parser.prototype.T_FN = 342;
PHP.Parser.prototype.T_CONST = 343;
PHP.Parser.prototype.T_RETURN = 344;
PHP.Parser.prototype.T_TRY = 345;
PHP.Parser.prototype.T_CATCH = 346;
PHP.Parser.prototype.T_FINALLY = 347;
PHP.Parser.prototype.T_USE = 348;
PHP.Parser.prototype.T_INSTEADOF = 349;
PHP.Parser.prototype.T_GLOBAL = 350;
PHP.Parser.prototype.T_STATIC = 351;
PHP.Parser.prototype.T_ABSTRACT = 352;
PHP.Parser.prototype.T_FINAL = 353;
PHP.Parser.prototype.T_PRIVATE = 354;
PHP.Parser.prototype.T_PROTECTED = 355;
PHP.Parser.prototype.T_PUBLIC = 356;
PHP.Parser.prototype.T_VAR = 357;
PHP.Parser.prototype.T_UNSET = 358;
PHP.Parser.prototype.T_ISSET = 359;
PHP.Parser.prototype.T_EMPTY = 360;
PHP.Parser.prototype.T_HALT_COMPILER = 361;
PHP.Parser.prototype.T_CLASS = 362;
PHP.Parser.prototype.T_TRAIT = 363;
PHP.Parser.prototype.T_INTERFACE = 364;
PHP.Parser.prototype.T_EXTENDS = 365;
PHP.Parser.prototype.T_IMPLEMENTS = 366;
PHP.Parser.prototype.T_OBJECT_OPERATOR = 367;
PHP.Parser.prototype.T_NULLSAFE_OBJECT_OPERATOR = 368;
PHP.Parser.prototype.T_LIST = 369;
PHP.Parser.prototype.T_ARRAY = 370;
PHP.Parser.prototype.T_CALLABLE = 371;
PHP.Parser.prototype.T_CLASS_C = 372;
PHP.Parser.prototype.T_TRAIT_C = 373;
PHP.Parser.prototype.T_METHOD_C = 374;
PHP.Parser.prototype.T_FUNC_C = 375;
PHP.Parser.prototype.T_LINE = 376;
PHP.Parser.prototype.T_FILE = 377;
PHP.Parser.prototype.T_START_HEREDOC = 378;
PHP.Parser.prototype.T_END_HEREDOC = 379;
PHP.Parser.prototype.T_DOLLAR_OPEN_CURLY_BRACES = 380;
PHP.Parser.prototype.T_CURLY_OPEN = 381;
PHP.Parser.prototype.T_PAAMAYIM_NEKUDOTAYIM = 382;
PHP.Parser.prototype.T_NAMESPACE = 383;
PHP.Parser.prototype.T_NS_C = 384;
PHP.Parser.prototype.T_DIR = 385;
PHP.Parser.prototype.T_NS_SEPARATOR = 386;
PHP.Parser.prototype.T_ELLIPSIS = 387;
PHP.Parser.prototype.T_NAME_FULLY_QUALIFIED = 388;
PHP.Parser.prototype.T_NAME_QUALIFIED = 389;
PHP.Parser.prototype.T_NAME_RELATIVE = 390;
PHP.Parser.prototype.T_ATTRIBUTE = 391;
// }}}

/* @var array Map of token ids to their respective names */
PHP.Parser.prototype.terminals = [
    "EOF",
    "error",
    "T_THROW",
    "T_INCLUDE",
    "T_INCLUDE_ONCE",
    "T_EVAL",
    "T_REQUIRE",
    "T_REQUIRE_ONCE",
    "','",
    "T_LOGICAL_OR",
    "T_LOGICAL_XOR",
    "T_LOGICAL_AND",
    "T_PRINT",
    "T_YIELD",
    "T_DOUBLE_ARROW",
    "T_YIELD_FROM",
    "'='",
    "T_PLUS_EQUAL",
    "T_MINUS_EQUAL",
    "T_MUL_EQUAL",
    "T_DIV_EQUAL",
    "T_CONCAT_EQUAL",
    "T_MOD_EQUAL",
    "T_AND_EQUAL",
    "T_OR_EQUAL",
    "T_XOR_EQUAL",
    "T_SL_EQUAL",
    "T_SR_EQUAL",
    "T_POW_EQUAL",
    "T_COALESCE_EQUAL",
    "'?'",
    "':'",
    "T_COALESCE",
    "T_BOOLEAN_OR",
    "T_BOOLEAN_AND",
    "'|'",
    "'^'",
    "'&'",
    "T_IS_EQUAL",
    "T_IS_NOT_EQUAL",
    "T_IS_IDENTICAL",
    "T_IS_NOT_IDENTICAL",
    "T_SPACESHIP",
    "'<'",
    "T_IS_SMALLER_OR_EQUAL",
    "'>'",
    "T_IS_GREATER_OR_EQUAL",
    "T_SL",
    "T_SR",
    "'+'",
    "'-'",
    "'.'",
    "'*'",
    "'/'",
    "'%'",
    "'!'",
    "T_INSTANCEOF",
    "'~'",
    "T_INC",
    "T_DEC",
    "T_INT_CAST",
    "T_DOUBLE_CAST",
    "T_STRING_CAST",
    "T_ARRAY_CAST",
    "T_OBJECT_CAST",
    "T_BOOL_CAST",
    "T_UNSET_CAST",
    "'@'",
    "T_POW",
    "'['",
    "T_NEW",
    "T_CLONE",
    "T_EXIT",
    "T_IF",
    "T_ELSEIF",
    "T_ELSE",
    "T_ENDIF",
    "T_LNUMBER",
    "T_DNUMBER",
    "T_STRING",
    "T_STRING_VARNAME",
    "T_VARIABLE",
    "T_NUM_STRING",
    "T_INLINE_HTML",
    "T_ENCAPSED_AND_WHITESPACE",
    "T_CONSTANT_ENCAPSED_STRING",
    "T_ECHO",
    "T_DO",
    "T_WHILE",
    "T_ENDWHILE",
    "T_FOR",
    "T_ENDFOR",
    "T_FOREACH",
    "T_ENDFOREACH",
    "T_DECLARE",
    "T_ENDDECLARE",
    "T_AS",
    "T_SWITCH",
    "T_MATCH",
    "T_ENDSWITCH",
    "T_CASE",
    "T_DEFAULT",
    "T_BREAK",
    "T_CONTINUE",
    "T_GOTO",
    "T_FUNCTION",
    "T_FN",
    "T_CONST",
    "T_RETURN",
    "T_TRY",
    "T_CATCH",
    "T_FINALLY",
    "T_USE",
    "T_INSTEADOF",
    "T_GLOBAL",
    "T_STATIC",
    "T_ABSTRACT",
    "T_FINAL",
    "T_PRIVATE",
    "T_PROTECTED",
    "T_PUBLIC",
    "T_VAR",
    "T_UNSET",
    "T_ISSET",
    "T_EMPTY",
    "T_HALT_COMPILER",
    "T_CLASS",
    "T_TRAIT",
    "T_INTERFACE",
    "T_EXTENDS",
    "T_IMPLEMENTS",
    "T_OBJECT_OPERATOR",
    "T_NULLSAFE_OBJECT_OPERATOR",
    "T_LIST",
    "T_ARRAY",
    "T_CALLABLE",
    "T_CLASS_C",
    "T_TRAIT_C",
    "T_METHOD_C",
    "T_FUNC_C",
    "T_LINE",
    "T_FILE",
    "T_START_HEREDOC",
    "T_END_HEREDOC",
    "T_DOLLAR_OPEN_CURLY_BRACES",
    "T_CURLY_OPEN",
    "T_PAAMAYIM_NEKUDOTAYIM",
    "T_NAMESPACE",
    "T_NS_C",
    "T_DIR",
    "T_NS_SEPARATOR",
    "T_ELLIPSIS",
    "T_NAME_FULLY_QUALIFIED",
    "T_NAME_QUALIFIED",
    "T_NAME_RELATIVE",
    "T_ATTRIBUTE",
    "';'",
    "']'",
    "'{'",
    "'}'",
    "'('",
    "')'",
    "'`'",
    "'\"'",
    "'$'"
    , "???"
];

/* @var Map which translates lexer tokens to internal tokens */
PHP.Parser.prototype.translate = [
        0,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,   55,  163,  165,  164,   54,   37,  165,
      160,  161,   52,   49,    8,   50,   51,   53,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,   31,  156,
       43,   16,   45,   30,   67,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,   69,  165,  157,   36,  165,  162,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  158,   35,  159,   57,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,  165,  165,  165,  165,
      165,  165,  165,  165,  165,  165,    1,    2,    3,    4,
        5,    6,    7,    9,   10,   11,   12,   13,   14,   15,
       17,   18,   19,   20,   21,   22,   23,   24,   25,   26,
       27,   28,   29,   32,   33,   34,   38,   39,   40,   41,
       42,   44,   46,   47,   48,   56,   58,   59,   60,   61,
       62,   63,   64,   65,   66,   68,   70,   71,   72,   73,
       74,   75,   76,   77,   78,   79,   80,   81,   82,   83,
       84,   85,   86,   87,   88,   89,   90,   91,   92,   93,
       94,   95,   96,   97,   98,   99,  100,  101,  102,  103,
      104,  105,  106,  107,  108,  109,  110,  111,  112,  113,
      114,  115,  116,  117,  118,  119,  120,  121,  122,  123,
      124,  125,  126,  127,  128,  129,  130,  131,  132,  133,
      134,  135,  136,  137,  138,  139,  140,  141,  142,  143,
      144,  145,  146,  147,  148,  149,  150,  151,  152,  153,
      154,  155
];

PHP.Parser.prototype.yyaction = [
      130,  131,  132,  553,  133,  134,-32766,  704,  705,  706,
      135,   36, -543, -552,  453,-32766, -543,-32766,-32766,-32766,
     -552, 1152,  778,  927, -549,  969,  970,    0,-32766,-32766,
    -32766, -549,-32766, 1219,-32766,  245,-32766,  962,-32766,-32766,
    -32766,-32766,-32766,  459,-32766,-32766,-32766,-32766,-32766,-32766,
    -32766,-32766,  124, -331,  707, -331,-32766,  386, 1031, 1032,
     1033, 1030, 1029, 1028,-32766,  433,  428,    2,  261,  136,
      371,  711,  712,  713,  714,  389,  789,  395, 1031, 1032,
     1033, 1030, 1029, 1028,  715,  716,  717,  718,  719,  720,
      721,  722,  723,  724,  725,  745,  554,  746,  747,  748,
      749,  737,  738,  372,  373,  740,  741,  726,  727,  728,
      730,  731,  732,  332,  771,  772,  773,  774,  775,  733,
      734,  555,  556,  766,  757,  755,  756,  752,  753, -294,
     -189,  557,  558,  751,  559,  560,  561,  562,  563,  564,
     1235,  454,  783, -503,  889,  754,  565,  566,  928,  137,
    -32766,-32766,-32766,  130,  131,  132,  553,  133,  134,  983,
      704,  705,  706,  135,   36,-32766,-32766,-32766,-32766, -552,
    -32766,-32766,-32766, -552, 1152,  545,  101,  102,  103,  581,
     -549,-32766,-32766,-32766, -549,-32766,-32766,-32766,  245,-32766,
       80,-32766,-32766,-32766,-32766,-32766,-32766,-32766,-32766,-32766,
      959,  958,  957,-32766,-32766, -503, -503,  707, 1264,-32766,
      386, 1265,-32766,-32766,-32766,  235,  784,-32766,  778,   19,
     -503,  261,  136,  371,  711,  712,  713,  714,-32766,-32766,
      395,  788, -503,-32766, -509,-32766,-32766,  715,  716,  717,
      718,  719,  720,  721,  722,  723,  724,  725,  745,  554,
      746,  747,  748,  749,  737,  738,  372,  373,  740,  741,
      726,  727,  728,  730,  731,  732,  332,  771,  772,  773,
      774,  775,  733,  734,  555,  556,  766,  757,  755,  756,
      752,  753, -294, -189,  557,  558,  751,  559,  560,  561,
      562,  563,  564,  309,   81,   82,   83,  139,  754,  565,
      566,  681,  137,  729,  699,  700,  701,  702,  703, 1239,
      704,  705,  706,  742,  743,   33, 1238,   84,   85,   86,
       87,   88,   89,   90,   91,   92,   93,   94,   95,   96,
       97,   98,   99,  100,  101,  102,  103,  104,  105,  106,
       31,  263,-32766,-32766,-32766,  104,  105,  106,  575,  263,
     1216,  126, -188,  107,  142,  438,  439,  707,-32766,-32766,
    -32766,  107, -254,-32766,  247,-32766,-32766,-32766,-32766,-32766,
    -32766,  708,  709,  710,  711,  712,  713,  714,  293,-32766,
      776,-32766,-32766,-32766,-32766,-32766,  295,  715,  716,  717,
      718,  719,  720,  721,  722,  723,  724,  725,  745,  768,
      746,  747,  748,  749,  737,  738,  739,  767,  740,  741,
      726,  727,  728,  730,  731,  732,  770,  771,  772,  773,
      774,  775,  733,  734,  735,  736,  766,  757,  755,  756,
      752,  753,  527,  311,  744,  750,  751,  758,  759,  761,
      760,  762,  763,  234,-32766,-32766,-32766,  307,  754,  765,
      764,   48,   49,   50,  484,   51,   52,  479,  395,   18,
      321,   53,   54,  345,   55,-32766,  982,-32766,-32766,-32766,
    -32766,-32766,-32766,-32767,-32767,-32767,-32767,-32767,  349,-32767,
    -32767,-32767,-32767,   99,  100,  101,  102,  103,  814,  354,
      815, 1191,  356, 1152,  871,  271,  406,  871,   56,   57,
      407,  814,  408,  815,   58, -188,   59,  240,  241,   60,
       61,   62,   63,   64,   65,   66,   67,-32766,   26,  262,
       68,  410,  485,  409,  672,  967, 1185, 1186,  486, 1150,
     1216, 1154, 1153, 1155, 1183,   40,   23,  487, 1009,  488,
      -82,  489,  147,  490,  969,  970,  491,  492,  786,  427,
      428,   42,   43,  411,  416,  413,  871,   44,  493,  389,
      494,  495,  248,  344,  320, 1159, 1154, 1153, 1155,  793,
      896,  496,  497,  498,  148, 1008,  861,  692,  787,  861,
      967, 1254,  499,  500,  150, 1173, 1174, 1175, 1176, 1170,
     1171,  281,  622,   24,   26,  -14,  151, 1177, 1172,  969,
      970, 1154, 1153, 1155,  282,  -82, 1216, -502,  152,   69,
     1183,  305,  306,  311,   34,  108,  109,  110,  111,  112,
      113,  114,  115,  116,  117,  118,  119,  120,  154, -149,
     -149, -149,  637,  638,  146,  376, 1159, 1159,  861,  613,
      614,   32,  243,   35, -149, 1216, -149,  121, -149,  873,
     -149,  667,  873,  122,  667,  242, 1067, 1069,  499,  500,
      412, 1173, 1174, 1175, 1176, 1170, 1171, -501,  127, -502,
     -502,  494,  495, 1177, 1172, -504,  128,  871,  422,  423,
      847,  896, -107, -107, -502,   71,  440,  441,  306,  311,
     -107,-32766,  430,  431,  -49,  141, -502, 1152, -508,  155,
      156,  780,  157,  -84,-32766,-32766,-32766,  673,-32766,  -76,
    -32766,  873,-32766,  667, -149,-32766, 1216, 1216, 1179,  282,
    -32766,-32766,-32766,  -73,   73,  -71,-32766,-32766,  311, -501,
     -501,  129,-32766,  386,  -70,  -69,-32766, -504, -504,  -68,
    -32766,  -67, 1152,  -66, -501,  -65,  871,  -64,  275,-32766,
    -32766,-32766, -504,-32766,  -45,-32766, -501,-32766,  -16,  861,
    -32766,  145, -107,  264, -504,-32766,-32766,-32766,  682,   72,
      244,-32766,-32766,-32766,  685,  782,  674,-32766,  386, 1152,
      669,  871, -501,  870,  144,-32766,-32766,-32766,-32766,  272,
    -32766,  282,-32766,  273,-32766,   73,   73,-32766, 1216,  311,
      311,  276,-32766,-32766,-32766,  885,-32766,  246,-32766,-32766,
      277,  677, 1152,  314,-32766,  386,   -4,  871,  263,-32766,
    -32766,-32766,-32766,-32766,  107,-32766,  143,-32766,  861,  778,
    -32766,  871,  873,-32766,  667,-32766,-32766,-32766,  623,  645,
      871,-32766,-32766,-32766, -501, -501,  787,-32766,  386, 1152,
     1037,-32766,  969,  970, 1266,-32766,-32766,-32766,-32766, -501,
    -32766,  529,-32766,  861,-32766,  660,  871,-32766,  628,  533,
      683, -501,-32766,-32766,-32766,  138,-32766,  640,-32766,-32766,
     1023,  311, 1152,   20,-32766,  386,  435,  464,  629,-32766,
    -32766,-32766,-32766,-32766,  641,-32766,  286,-32766, -506,  861,
    -32766,  913,  405,  667,  611,-32766,-32766,-32766,-32766,  284,
     -467,-32766,-32766,  861,   46,  283,  282,-32766,  386,  686,
      897,  412,  861,  400,  898,-32766,  294,   38,  280, -232,
     -232, -232,  494,  495, 1007,  412,  873,   26,  667, 1190,
      786,  806,  896, -107, -107, 1192,  494,  495,  861, 1216,
       47, -457,    8, 1183,   22,  847,  896, -107, -107,  347,
     -506, -506,  539,    9, -231, -231, -231,  579, 1180,  887,
      412,   39,  873,  848,  667,   -4,  289,  290,  689,  690,
      852,  494,  495,  937,  914, 1261,  873, -506,  667, -232,
      847,  896, -107, -107,  921,  873,  911,  667,  922,  850,
     1003, -537,  500,  123, 1173, 1174, 1175, 1176, 1170, 1171,
     1004,  909,  291,  292, 1012, 1015, 1177, 1172, 1016, 1013,
     1014,  873, 1020,  667, -231,   30,  798,  348,   71, 1205,
     1223,  306,  311, 1257,  616, -535,  304,  346, -107,  125,
     -107,  668,  671,  675,  676,  285,  678,  679, -107, -107,
     -107, -107, -107, -107, -107,  680,  684,  670, -471, 1263,
      809,  808,  817,  895,  929,  816, 1262,  894,  892,  893,
     1138,  880,  888,  878,  919,  920, 1260, 1217, 1206, 1224,
     1230, 1233,    0, -509, -508, -507,    1,   27,   28,   37,
       41,   45, -308, -257,   70,   74,   75,   76,   77,   78,
       79,  140,  149,  153,  239,  310,  333,  334,  335,  336,
      337,  338,  339,  340,  341,  342,  343,  401,  402,    0,
     -255, -254,   12,   13,   14,   15,   17,  375,  455,  456,
      463,  466,  467,  468,  469,  473,  474,  475,  482,  654,
     1163, 1106, 1181,  984, 1142, -259,  -99,   11,   16,   25,
      279,  374,  572,  576,  603,  659, 1110, 1158, 1107, 1236,
        0, 1123,    0, 1184
];

PHP.Parser.prototype.yycheck = [
        2,    3,    4,    5,    6,    7,  115,    9,   10,   11,
       12,   13,  157,    1,   31,   73,  161,    9,   10,   11,
        8,   79,   79,   31,    1,  134,  135,    0,   86,   87,
       88,    8,   90,    1,   92,   37,   94,    1,   30,   97,
       32,   33,   34,  101,  102,  103,  104,    9,   10,   11,
      108,  109,   14,  105,   56,  107,  114,  115,  115,  116,
      117,  118,  119,  120,  122,  105,  106,    8,   70,   71,
       72,   73,   74,   75,   76,  115,    1,   79,  115,  116,
      117,  118,  119,  120,   86,   87,   88,   89,   90,   91,
       92,   93,   94,   95,   96,   97,   98,   99,  100,  101,
      102,  103,  104,  105,  106,  107,  108,  109,  110,  111,
      112,  113,  114,  115,  116,  117,  118,  119,  120,  121,
      122,  123,  124,  125,  126,  127,  128,  129,  130,    8,
        8,  133,  134,  135,  136,  137,  138,  139,  140,  141,
        1,  158,   79,   69,    1,  147,  148,  149,  156,  151,
        9,   10,   11,    2,    3,    4,    5,    6,    7,  161,
        9,   10,   11,   12,   13,    9,   10,   11,   73,  157,
        9,   10,   11,  161,   79,   80,   49,   50,   51,   50,
      157,   86,   87,   88,  161,   90,   30,   92,   37,   94,
      158,   30,   97,   32,   33,   34,   35,  102,  103,  104,
      118,  119,  120,  108,  109,  131,  132,   56,   79,  114,
      115,   82,    9,   10,   11,   14,  153,  122,   79,    8,
      146,   70,   71,   72,   73,   74,   75,   76,    9,   10,
       79,  156,  158,   30,  160,   32,   33,   86,   87,   88,
       89,   90,   91,   92,   93,   94,   95,   96,   97,   98,
       99,  100,  101,  102,  103,  104,  105,  106,  107,  108,
      109,  110,  111,  112,  113,  114,  115,  116,  117,  118,
      119,  120,  121,  122,  123,  124,  125,  126,  127,  128,
      129,  130,  161,  161,  133,  134,  135,  136,  137,  138,
      139,  140,  141,   69,    9,   10,   11,  158,  147,  148,
      149,  158,  151,    2,    3,    4,    5,    6,    7,    1,
        9,   10,   11,   12,   13,   30,    8,   32,   33,   34,
       35,   36,   37,   38,   39,   40,   41,   42,   43,   44,
       45,   46,   47,   48,   49,   50,   51,   52,   53,   54,
        8,   56,    9,   10,   11,   52,   53,   54,    1,   56,
       81,    8,    8,   68,    8,  131,  132,   56,    9,   10,
       11,   68,  161,   30,    8,   32,   33,   34,   35,   36,
       37,   70,   71,   72,   73,   74,   75,   76,    8,   30,
       79,   32,   33,   34,   35,   36,    8,   86,   87,   88,
       89,   90,   91,   92,   93,   94,   95,   96,   97,   98,
       99,  100,  101,  102,  103,  104,  105,  106,  107,  108,
      109,  110,  111,  112,  113,  114,  115,  116,  117,  118,
      119,  120,  121,  122,  123,  124,  125,  126,  127,  128,
      129,  130,   84,  164,  133,  134,  135,  136,  137,  138,
      139,  140,  141,   96,    9,   10,   11,    8,  147,  148,
      149,    2,    3,    4,    5,    6,    7,  105,   79,  107,
        8,   12,   13,    8,   15,   30,    1,   32,   33,   34,
       35,   36,   37,   38,   39,   40,   41,   42,    8,   43,
       44,   45,   46,   47,   48,   49,   50,   51,  105,    8,
      107,  143,    8,   79,    1,   30,    8,    1,   49,   50,
        8,  105,    8,  107,   55,  161,   57,   58,   59,   60,
       61,   62,   63,   64,   65,   66,   67,    9,   69,   70,
       71,   72,   73,    8,   31,  115,   77,   78,   79,  115,
       81,  152,  153,  154,   85,   86,   87,   88,  159,   90,
       31,   92,   14,   94,  134,  135,   97,   98,  152,  105,
      106,  102,  103,  104,  105,  106,    1,  108,  109,  115,
      116,  117,   37,  114,  115,    1,  152,  153,  154,    8,
      126,  122,  123,  124,   14,  156,   83,  158,   81,   83,
      115,   84,  133,  134,   14,  136,  137,  138,  139,  140,
      141,  142,   74,   75,   69,   31,   14,  148,  149,  134,
      135,  152,  153,  154,  155,   96,   81,   69,   14,  160,
       85,  162,  163,  164,   16,   17,   18,   19,   20,   21,
       22,   23,   24,   25,   26,   27,   28,   29,   14,   74,
       75,   76,   74,   75,  100,  101,    1,    1,   83,  110,
      111,  144,  145,   14,   89,   81,   91,   16,   93,  156,
       95,  158,  156,   16,  158,   37,   58,   59,  133,  134,
      105,  136,  137,  138,  139,  140,  141,   69,   16,  131,
      132,  116,  117,  148,  149,   69,   16,    1,  105,  106,
      125,  126,  127,  128,  146,  160,  105,  106,  163,  164,
      126,   73,  127,  128,   31,   16,  158,   79,  160,   16,
       16,   79,   16,   31,   86,   87,   88,   31,   90,   31,
       92,  156,   94,  158,  159,   97,   81,   81,    1,  155,
      102,  103,  104,   31,  160,   31,  108,  109,  164,  131,
      132,   31,  114,  115,   31,   31,   73,  131,  132,   31,
      122,   31,   79,   31,  146,   31,    1,   31,   30,   86,
       87,   88,  146,   90,   31,   92,  158,   94,   31,   83,
       97,   31,  126,   31,  158,  102,  103,  104,   31,  151,
       37,  108,  109,   73,   31,  153,   31,  114,  115,   79,
      158,    1,   69,   31,   31,  122,   86,   87,   88,   35,
       90,  155,   92,   35,   94,  160,  160,   97,   81,  164,
      164,   35,  102,  103,  104,   37,   73,   37,  108,  109,
       35,   31,   79,   35,  114,  115,    0,    1,   56,   86,
       87,   88,  122,   90,   68,   92,   69,   94,   83,   79,
       97,    1,  156,  115,  158,  102,  103,  104,   89,   76,
        1,  108,  109,   73,  131,  132,   81,  114,  115,   79,
       81,   84,  134,  135,   82,  122,   86,   87,   88,  146,
       90,   84,   92,   83,   94,   91,    1,   97,   95,   88,
       31,  158,  102,  103,  104,  158,   73,   93,  108,  109,
      121,  164,   79,   96,  114,  115,   96,   96,   99,   86,
       87,   88,  122,   90,   99,   92,  113,   94,   69,   83,
       97,  156,  126,  158,  112,  102,  103,  104,  115,  130,
      146,  108,  109,   83,   69,  129,  155,  114,  115,  159,
      126,  105,   83,  107,  126,  122,  129,  156,  112,   99,
      100,  101,  116,  117,    1,  105,  156,   69,  158,  143,
      152,  125,  126,  127,  128,  143,  116,  117,   83,   81,
       69,  146,  146,   85,  146,  125,  126,  127,  128,  146,
      131,  132,  150,  147,   99,  100,  101,  150,  157,  151,
      105,  156,  156,  159,  158,  159,  131,  132,  156,  156,
      156,  116,  117,  156,  156,  159,  156,  158,  158,  159,
      125,  126,  127,  128,  156,  156,  156,  158,  156,  156,
      156,  160,  134,  158,  136,  137,  138,  139,  140,  141,
      156,  156,  131,  132,  156,  156,  148,  149,  156,  156,
      156,  156,  156,  158,  159,  158,  157,  146,  160,  157,
      157,  163,  164,  157,  157,  160,  158,  158,  105,  158,
      107,  158,  158,  158,  158,  112,  158,  158,  115,  116,
      117,  118,  119,  120,  121,  158,  158,  158,  162,  159,
      159,  159,  159,  159,  159,  159,  159,  159,  159,  159,
      159,  159,  159,  159,  159,  159,  159,  159,  159,  159,
      159,  159,   -1,  160,  160,  160,  160,  160,  160,  160,
      160,  160,  159,  161,  160,  160,  160,  160,  160,  160,
      160,  160,  160,  160,  160,  160,  160,  160,  160,  160,
      160,  160,  160,  160,  160,  160,  160,  160,  160,   -1,
      161,  161,  161,  161,  161,  161,  161,  161,  161,  161,
      161,  161,  161,  161,  161,  161,  161,  161,  161,  161,
      161,  161,  161,  161,  161,  161,  161,  161,  161,  161,
      161,  161,  161,  161,  161,  161,  161,  161,  161,  161,
       -1,  162,   -1,  163
];

PHP.Parser.prototype.yybase = [
        0,   -2,  151,  555,  816,  830,  865,  379,  717,  622,
      864,  676,  780,  780,  839,  780,  493,  745,  301,  301,
      -57,  301,  301,  496,  496,  496,  618,  618,  618,  618,
      -58,  -58,   95,  700,  733,  770,  663,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,  803,  803,
      803,  803,  803,  803,  803,  803,  803,  803,   75,   -8,
      347,  629,  989,  995,  991,  996,  987,  986,  990,  992,
      997,  917,  918,  753,  919,  920,  921,  922,  993,  877,
      988,  994,  285,  285,  285,  285,  285,  285,  285,  285,
      285,  285,  285,  285,  285,  285,  285,  285,  285,  285,
      285,  285,  285,  508,   38,  219,  141,  141,  141,  141,
      141,  141,  141,  141,  141,  141,  141,  141,  141,  141,
      141,  141,  141,  141,  141,  141,  141,  141,  141,  141,
      156,  156,  156,  203,  525,  525,    8,  598,  161,  868,
      868,  868,  868,  868,  868,  868,  868,  868,  868,  349,
      333,  435,  435,  435,  435,  435,  436,  436,  436,  436,
      933,  564,  636,  635,  465,  -52,  127,  127,  718,  718,
      759,  410,  410,  410,  444, -109, -109, -109,   74,  538,
      396,  348,  414,  414,  414,  414,  414,  802, 1000,  139,
      139,  139,  139,  414,  414,  414,  606,  713,  713,  881,
      293,  293,  293,  713,  383,  777,  497,  383,  497,  129,
      793,   32,  -40, -145,  793,  829,  845,   23,   12,  788,
      573,  788,  767,  866,  899,  998,   82,  789,  915,  795,
      916,  224,  678,  984,  984,  984,  984,  984,  984,  984,
      984,  984,  984,  984,  269,  985,   63,  269,  269,  269,
      529,   63,  518,  558,   63,  778,  985,   75,  805,   75,
       75,   75,   75,  946,   75,   75,   75,   75,   75,   75,
      951,  727,  723,  692,  -17,   75,   -8,  143,  143,  419,
       36,  143,  143,  143,  143,  565,  573,  762,  812,  581,
      817,  344,  762,  762,  762,  509,  121,  201,  122,  352,
      750,  750,  768,  769,  926,  926,  750,  765,  750,  769,
      931,  750,  768,  768,  750,  926,  768,  761,  343,  488,
      452,  470,  768,  768,  492,  926,  370,  768,  768,  750,
      750,  750,  797,  768,  494,  750,  356,  346,  750,  750,
      768,  768,  797,  786,   59,  779,  926,  926,  926,  797,
      455,  779,  779,  822,  823,  792,  732,  439,  378,  561,
      332,  768,  732,  732,  750,  481,  792,  732,  792,  732,
      818,  732,  732,  732,  792,  732,  765,  484,  732,  768,
      515,  211,  732,   27,  934,  935,  672,  936,  929,  937,
      957,  938,  939,  883,  794,  798,  944,  930,  940,  928,
      927,  752,  631,  637,  806,  764,  925,  756,  756,  756,
      923,  756,  756,  756,  756,  756,  756,  756,  756,  631,
      811,  813,  776,  781,  947,  652,  660,  796,  814,  896,
      999,  946,  979,  941,  771,  679,  965,  948,  760,  878,
      949,  950,  966,  980,  981,  826,  757,  900,  901,  869,
      952,  884,  756,  934,  939,  930,  940,  928,  927,  716,
      714,  710,  712,  708,  704,  694,  703,  730,  875,  841,
      872,  951,  924,  631,  873,  961,  867,  967,  968,  879,
      790,  772,  876,  902,  953,  954,  955,  885,  982,  886,
      815,  962,  932,  969,  791,  903,  970,  971,  972,  973,
      888,  904,  889,  824,  749,  959,  773,  905,  528,  766,
      775,  958,  560,  945,  897,  906,  907,  974,  975,  976,
      908,  909,  942,  827,  963,  784,  964,  960,  828,  838,
      570,  754,  758,  582,  594,  910,  911,  943,  737,  763,
      840,  842,  983,  912,  614,  843,  683,  913,  978,  844,
      684,  686,  854,  774,  898,  808,  783,  787,  956,  743,
      855,  914,  858,  859,  862,  977,  863,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,  449,  449,  449,  449,  449,
      449,  301,  301,  301,  301,  449,  449,  449,  449,  449,
      449,  449,    0,    0,  301,    0,    0,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  449,  449,  449,  449,  449,  449,  449,  449,
      449,  449,  285,  285,  285,  285,  285,  285,  285,  285,
      285,  285,  285,  285,  285,  285,  285,  285,  285,  285,
      285,  285,  285,  285,  285,  285,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,  285,  285,  285,
      285,  285,  285,  285,  285,  285,  285,  285,  285,  285,
      285,  285,  285,  285,  285,  285,  285,  285,  285,  285,
      285,  285,  285,  285,  285,  285,  285,  285,  414,  414,
      285,    0,  285,  414,  414,  414,  414,  414,  414,  414,
      414,  414,  414,  285,  285,  285,  285,  285,  285,  285,
      293,  293,  293,  293,  761,  414,  414,  414,  414,  -37,
      293,  293,  414,  414,  -37,  414,  414,  414,  761,  414,
      414,  414,    0,    0,   63,  497,    0,    0,    0,    0,
        0,  497,  497,  269,  269,  269,  269,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,   63,  497,
        0,   63,    0,  765,  414,  269,  761,  308,  414,    0,
        0,    0,    0,   63,  765,   63,  497,  143,   75,  308,
        0,  534,  534,  534,  534,    0,  573,  761,  761,  761,
      761,  761,  761,  761,  761,  761,  761,  761,    0,  761,
        0,    0,    0,    0,    0,    0,    0,    0,    0,  765,
      768,    0,  926,    0,    0,    0,    0,  750,    0,    0,
        0,    0,    0,    0,  750,  931,  768,  768,    0,    0,
        0,    0,    0,    0,  765,    0,    0,    0,    0,    0,
        0,  756,  790,    0,  790,    0,  756,  756,  756
];

PHP.Parser.prototype.yydefault = [
        3,32767,   99,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,   97,
    32767,32767,32767,32767,32767,32767,  555,  555,  555,  555,
      236,   99,32767,32767,32767,32767,  431,  350,  350,  350,
    32767,32767,  499,  499,  499,  499,  499,  499,32767,32767,
    32767,32767,32767,32767,  431,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,   97,32767,32767,32767,
       35,    5,    6,    8,    9,   48,   15,32767,32767,32767,
    32767,32767,   99,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,  548,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,  435,  414,  415,  417,  418,  349,  500,  554,
      293,  551,  348,  142,  305,  295,  224,  296,  240,  241,
      267,  345,  146,  379,  432,  381,  430,  434,  380,  355,
      360,  361,  362,  363,  364,  365,  366,  367,  368,  369,
      370,  371,  372,  353,  354,  433,  436,  437,  440,  441,
      411,  410,  409,  377,32767,32767,  378,  352,  382,32767,
    32767,32767,32767,32767,32767,32767,32767,   99,32767,  384,
      383,  400,  401,  398,  399,  402,  403,  404,  405,  406,
    32767,32767,32767,32767,32767,  328,  391,  392,  284,  284,
      330,32767,32767,32767,  108,32767,32767,32767,  493,  408,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,   99,32767,   97,  495,  374,  376,  463,
      386,  387,  385,  356,32767,  470,32767,   99,  472,32767,
    32767,32767,32767,32767,32767,  494,32767,  501,  501,32767,
      456,   97,32767,32767,32767,32767,  262,32767,32767,32767,
    32767,  562,  456,  107,  107,  107,  107,  107,  107,  107,
      107,  107,  107,  107,32767,  107,32767,32767,32767,   97,
      185,32767,  250,  252,   99,  516,  190,32767,  475,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,  468,  190,  190,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,  456,  396,  135,32767,
      135,  501,  388,  389,  390,  458,  501,  501,  501,32767,
    32767,32767,  190,32767,  473,  473,   97,   97,   97,   97,
      468,32767,  190,  190,32767,32767,  190,  108,   96,   96,
       96,   96,  190,  190,   96,  100,   98,  190,  190,32767,
    32767,32767,  205,  190,   96,32767,   98,   98,32767,32767,
      190,  190,  205,  207,   98,  209,32767,  520,  521,  205,
       98,  209,  209,  229,  229,  447,  286,   98,   96,   98,
       98,  190,  286,  286,32767,   98,  447,  286,  447,  286,
      192,  286,  286,  286,  447,  286,32767,   98,  286,  190,
       96,   96,  286,32767,32767,32767,  458,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,  488,32767,  505,  518,  394,  395,  397,
      503,  419,  420,  421,  422,  423,  424,  425,  427,  550,
    32767,  462,32767,32767,32767,32767,  304,  560,32767,  560,
    32767,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,  561,32767,  501,32767,32767,
    32767,32767,  393,    7,   74,   41,   42,   50,   56,  479,
      480,  481,  482,  476,  477,  483,  478,32767,  484,  526,
    32767,32767,  502,  553,32767,32767,32767,32767,32767,32767,
      135,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,  488,32767,  133,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,  501,32767,32767,32767,  281,
      283,32767,32767,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,  501,32767,32767,
    32767,  269,  271,32767,32767,32767,32767,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,  266,32767,32767,32767,
      344,32767,32767,32767,32767,32767,  324,32767,32767,32767,
    32767,32767,32767,32767,32767,32767,32767,  148,  148,    3,
        3,  307,  148,  148,  148,  307,  307,  148,  307,  307,
      148,  148,  148,  148,  148,  148,  180,  244,  247,  229,
      229,  148,  316,  148
];

PHP.Parser.prototype.yygoto = [
      190,  190,  655,  781,  663,  397,  627,  964,  971,  972,
      391,  297,  298,  317,  547,  303,  396,  318,  398,  605,
      361,  365,  532,  570,  574,  161,  161,  161,  161,  187,
      187,  171,  173,  209,  191,  204,  187,  187,  187,  187,
      187,  188,  188,  188,  188,  188,  188,  182,  183,  184,
      185,  186,  206,  204,  207,  507,  508,  387,  509,  511,
      512,  513,  514,  515,  516,  517,  518, 1053,  162,  163,
      164,  189,  165,  166,  167,  160,  168,  169,  170,  172,
      203,  205,  208,  230,  233,  236,  238,  249,  250,  251,
      252,  253,  254,  255,  256,  257,  258,  259,  266,  267,
      300,  301,  302,  392,  393,  394,  552,  210,  211,  212,
      213,  214,  215,  216,  217,  218,  219,  220,  221,  222,
      223,  224,  174,  225,  175,  192,  193,  194,  231,  182,
      183,  184,  185,  186,  206, 1053,  195,  176,  177,  178,
      196,  192,  179,  232,  197,  159,  198,  226,  180,  199,
      227,  228,  181,  229,  200,  201,  202,  807,  328,  274,
      274,  274,  274, 1132,  890,  785,  986, 1133, 1136,  891,
     1137,  569, 1147,  592,  592,  804,  531,  524, 1182, 1182,
     1182, 1182, 1182, 1182, 1182, 1182, 1182, 1182, 1251, 1251,
      812,  805,  860,  855,  856,  869,  800,  813,  857,  810,
      858,  859,  811,  803,  785,  864,  785,  865,  863, 1251,
      936,  910,  910,  908,  910,  687,  363,  524,  590,  624,
      531,  451,  523,  945,  940,  820,  540,  541,  452, 1148,
      832,  370,  550,  819,  800, 1027,  390,  571,  580,  795,
     1026, 1200, 1200,  912,  585,  586, 1200, 1200, 1200, 1200,
     1200, 1200, 1200, 1200, 1200, 1200, 1151, 1151, 1151,  968,
     1149, 1208, 1209,  968,  968,  470,  968,  968,  968,  838,
      968,  968,  968, 1232, 1232, 1232, 1232, 1151, 1151, 1151,
     1151, 1151,    5,   21,    6,  779, 1198, 1198, 1151, 1151,
     1151, 1198, 1198, 1198, 1198, 1198, 1198, 1198, 1198, 1198,
     1198,  521,  521,  521,  544,  876,  510,  510,  325,  877,
     1240,  510,  510,  510,  510,  510,  510,  510,  510,  510,
      510,  933,  425,  906,  906,  906,  906,  385,  385,  385,
      385,  308,  288,  425,  900,  907,  538, 1227, 1228,  800,
      688,  604,  606,  600,  602,  625,  359,  537,  643,  647,
      947,  653,  661,  943,  584,  377,  378,  543,  437,  437,
      633,  626,  634, 1101,  381,  382,  383,  403,  644,  437,
      429,  384,  833,  821,  991,  323,  797,  995,  825,  519,
      519,  519,  519,  319,  525,  535, 1267,  915,  573,  369,
      525,  955,  535,  329,  330,  362,  822,  526,  432,  578,
      593,  596,  597,  598,  599,  617,  618,  619,  665, 1250,
     1250,  905,  992,  442,  551,  443,  417,  417,  417,  830,
      548,  583, 1258, 1259, 1222, 1222, 1222,  691, 1019,  568,
     1250,  666, 1211, 1034,  837, 1144,  449,  881, 1041,  651,
      651,  834,  658, 1017, 1253,  588,  996, 1036,  828,  917,
        0,  952, 1234, 1234, 1234, 1234,    0,  646,  824,    0,
      630,  931,  609,  609,  620,  621,  818,  635,  636,  976,
      973,  974,    0,    0, 1218,  471,    0,  472, 1143,  904,
      379,  662,    0,  478,  526,    0,  448, 1225, 1226,  417,
      417,  417,  417,  417,  417,  417,  417,  417,  417,  417,
        0,  417,    0,    0,    0,    0,    0,  994,    0,    0,
     1220, 1220,  994,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0, 1146,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
        0,    0,    0,    0,  270,  522,  522,  950,  950
];

PHP.Parser.prototype.yygcheck = [
       41,   41,   71,    6,    8,   64,   64,  105,  105,  105,
       64,   64,   64,   64,   64,   64,   64,   64,   64,   64,
       57,   57,   57,   57,   57,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   14,   88,   22,
       22,   22,   22,   76,   76,   11,  111,   76,   76,   76,
       76,  114,   19,   99,   99,   25,   74,   74,   99,   99,
       99,   99,   99,   99,   99,   99,   99,   99,  165,  165,
       14,   26,   14,   14,   14,   14,   21,   14,   14,   14,
       14,   14,   14,   24,   11,   63,   11,   63,   14,  165,
       24,   24,   24,   24,   24,   24,   74,   74,   54,   54,
       74,   80,   24,   24,   24,   34,   74,   74,   80,   19,
       34,   74,   74,   34,   21,  128,   12,   74,   12,   19,
      128,  152,  152,   48,   74,   74,  152,  152,  152,  152,
      152,  152,  152,  152,  152,  152,   71,   71,   71,   71,
       19,   19,   19,   71,   71,   74,   71,   71,   71,   44,
       71,   71,   71,    8,    8,    8,    8,   71,   71,   71,
       71,   71,   45,   74,   45,    5,  153,  153,   71,   71,
       71,  153,  153,  153,  153,  153,  153,  153,  153,  153,
      153,   18,   18,   18,  154,   71,  155,  155,  161,   71,
      163,  155,  155,  155,  155,  155,  155,  155,  155,  155,
      155,   94,   18,   18,   18,   18,   18,   23,   23,   23,
       23,  151,  151,   18,   18,   18,   47,  160,  160,   21,
       47,   47,   47,   81,   81,   47,   60,    8,   47,   47,
       47,   47,   47,   47,    8,   78,   78,   95,  133,  133,
       78,   62,   78,  135,   78,   78,   78,  103,   78,  133,
       79,   78,   15,   15,   15,   78,   17,   15,   38,   98,
       98,   98,   98,   28,    8,    8,   13,   15,   98,   27,
        8,  101,    8,   88,   88,    8,   36,   13,    8,   77,
       77,   77,   77,   77,   77,   77,   77,   77,   77,  164,
      164,   15,  113,    8,    8,    8,   22,   22,   22,    8,
        2,    2,    8,    8,  114,  114,  114,   90,    7,    7,
      164,    7,   13,   15,   15,  144,  141,   16,   16,    7,
        7,   40,    7,    7,  164,   16,  116,  131,    8,   87,
       -1,   16,  114,  114,  114,  114,   -1,   13,   16,   -1,
       16,   16,  107,  107,   82,   82,   16,   82,   82,  107,
      107,  107,   -1,   -1,  114,  139,   -1,  139,   16,   84,
       84,   84,   -1,  139,   13,   -1,  158,  158,  158,   22,
       22,   22,   22,   22,   22,   22,   22,   22,   22,   22,
       -1,   22,   -1,   -1,   -1,   -1,   -1,  114,   -1,   -1,
      114,  114,  114,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   13,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,
       -1,   -1,   -1,   -1,   23,   23,   23,   98,   98
];

PHP.Parser.prototype.yygbase = [
        0,    0, -249,    0,    0,  265,   -6,  421,  -16,    0,
        0, -115,  -83,   77, -167,  -47,    1,   83,   40, -186,
        0,  -78,  156,  324,  199,  171,  187,   70,  103,    0,
        0,    0,    0,    0, -121,    0,   75,    0,   71,    0,
       35,   -1,    0,    0,  250, -409,    0, -332,  226,    0,
        0,    0,    0,    0,  180,    0,    0,  -23,    0,    0,
      306,    0,  126,  192, -229,    0,    0,    0,    0,    0,
        0,   -5,    0,    0, -196,    0, -214,   65, -107,   96,
     -221, -108, -211,    0,  195,    0,    0,   41, -296,    0,
       51,    0,    0,    0,  290,  316,    0,    0,  353,  -61,
        0,   46,    0,   98,    0, -264,    0,  194,    0,    0,
        0,  164,    0,   63,  163,    0,   39,    0,    0,    0,
        0,    0,    0,    0,    0,    0,    0,    0,  -30,    0,
        0,   38,    0,  328,    0,  100,    0,    0,    0,    9,
        0,   31,    0,    0,   33,    0,    0,    0,    0,    0,
        0,   26,    7,   52,  277,   72,    0,    0,  196,    0,
      -10,  280,    0,  281,  122,  -99,    0,    0
];

PHP.Parser.prototype.yygdefault = [
    -32768,  483,  695,    4,  696,  769,  777,  567,  501,  664,
      324,  594,  388,  331,  862, 1040,  549,  796, 1160, 1168,
      426,  799,  312,  326,  844,  845,  846,  366,  351,  357,
      364,  615,  595,  465,  831,  420,  823,  457,  826,  419,
      835,  158,  652,  481,  839,    3,  841,  528,  872,  352,
      849,  353,  639,  851,  534,  853,  854,  360,  367,  368,
     1045,  542,  591,  866,  237,  536,  867,  350,  868,  875,
      355,  358,  648,  436,  476,  380, 1021,  577,  612,  414,
      445,  589,  601,  587,  902,  458,  434,  916,  327,  924,
      693, 1052,  607,  460,  932,  608,  939,  942,  502,  503,
      450,  954,  268,  461,  981,  631,  632,  966,  610,  979,
      444,  985,  421,  993, 1204,  424,  997,  260, 1000,  269,
      649,  399, 1005, 1006,    7, 1011,  656,  657,   10,  265,
      480, 1035,  650,  418, 1051,  404, 1120, 1122,  530,  462,
     1140, 1139,  642,  477, 1145, 1207,  415,  504,  446,  299,
      505,  287,  315,  296,  520,  278,  316,  506,  447, 1213,
     1221,  313,   29, 1241, 1252,  322,  546,  582
];

PHP.Parser.prototype.yylhs = [
        0,    1,    3,    3,    2,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    5,    5,    5,    5,    5,
        5,    5,    5,    5,    5,    6,    6,    6,    6,    6,
        6,    6,    7,    7,    8,    9,   10,   10,   10,   11,
       11,   12,   12,   13,   14,   14,   15,   15,   16,   16,
       17,   17,   20,   20,   21,   22,   22,   23,   23,    4,
        4,    4,    4,    4,    4,    4,    4,    4,    4,    4,
       28,   28,   29,   29,   31,   33,   33,   27,   35,   35,
       32,   37,   37,   34,   34,   36,   36,   38,   38,   30,
       39,   39,   40,   42,   43,   43,   44,   45,   45,   47,
       46,   46,   46,   46,   48,   48,   48,   48,   48,   48,
       48,   48,   48,   48,   48,   48,   48,   48,   48,   48,
       48,   48,   48,   48,   48,   48,   48,   48,   24,   24,
       67,   67,   70,   70,   69,   68,   68,   61,   73,   73,
       74,   74,   75,   75,   76,   76,   25,   25,   26,   26,
       26,   26,   79,   79,   79,   80,   80,   83,   83,   81,
       81,   84,   85,   85,   55,   55,   63,   63,   66,   66,
       66,   65,   86,   86,   87,   56,   56,   56,   56,   88,
       88,   89,   89,   90,   90,   91,   92,   92,   93,   93,
       94,   94,   53,   53,   49,   49,   96,   51,   51,   97,
       50,   50,   52,   52,   62,   62,   62,   62,   77,   77,
      100,  100,  102,  102,  102,  102,  101,  101,  101,  104,
      104,  104,  105,  105,  107,  107,  107,  106,  106,  108,
      108,  109,  109,  109,  103,  103,   78,   78,   78,   19,
       19,  110,  110,  111,  111,  111,  111,   58,  112,  112,
      113,   59,  115,  115,  116,  116,  117,  117,   82,  118,
      118,  118,  118,  118,  123,  123,  124,  124,  125,  125,
      125,  125,  125,  126,  127,  127,  122,  122,  119,  119,
      121,  121,  129,  129,  128,  128,  128,  128,  128,  128,
      120,  130,  130,  132,  131,  131,   60,   95,  133,  133,
       54,   54,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,   41,   41,   41,   41,   41,   41,
       41,   41,   41,   41,  140,  134,  134,  139,  139,  142,
      143,  143,  144,  145,  145,  145,   18,   18,   71,   71,
       71,   71,  135,  135,  135,  135,  147,  147,  136,  136,
      138,  138,  138,  141,  141,  152,  152,  152,  152,  152,
      152,  152,  152,  152,  153,  153,   99,  155,  155,  155,
      155,  137,  137,  137,  137,  137,  137,  137,  137,   57,
       57,  150,  150,  150,  150,  156,  156,  146,  146,  146,
      157,  157,  157,  157,  157,  157,   72,   72,   64,   64,
       64,   64,  114,  114,  114,  114,  160,  159,  149,  149,
      149,  149,  149,  149,  149,  148,  148,  148,  158,  158,
      158,  158,   98,  154,  162,  162,  161,  161,  163,  163,
      163,  163,  163,  163,  163,  163,  151,  151,  151,  151,
      165,  166,  164,  164,  164,  164,  164,  164,  164,  164,
      167,  167,  167,  167
];

PHP.Parser.prototype.yylen = [
        1,    1,    2,    0,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    1,    1,    0,    1,    0,    1,
        1,    2,    1,    3,    4,    1,    2,    0,    1,    1,
        1,    1,    1,    3,    5,    4,    3,    4,    2,    3,
        1,    1,    7,    6,    2,    3,    1,    2,    3,    1,
        2,    3,    1,    1,    3,    1,    3,    1,    2,    2,
        3,    1,    3,    2,    3,    1,    3,    2,    0,    1,
        1,    1,    1,    1,    3,    7,   10,    5,    7,    9,
        5,    3,    3,    3,    3,    3,    3,    1,    2,    5,
        7,    9,    6,    5,    6,    3,    2,    1,    1,    1,
        0,    2,    1,    3,    8,    0,    4,    2,    1,    3,
        0,    1,    0,    1,    3,    1,    8,    9,    7,    8,
        7,    6,    1,    2,    2,    0,    2,    0,    2,    0,
        2,    2,    1,    3,    1,    4,    1,    4,    1,    1,
        4,    2,    1,    3,    3,    3,    4,    4,    5,    0,
        2,    4,    3,    1,    1,    7,    0,    2,    1,    3,
        3,    4,    1,    4,    0,    2,    5,    0,    2,    6,
        0,    2,    0,    3,    1,    2,    1,    1,    2,    0,
        1,    3,    0,    1,    1,    1,    6,    8,    6,    1,
        2,    1,    1,    1,    1,    1,    1,    3,    3,    3,
        3,    1,    2,    1,    0,    1,    0,    2,    2,    2,
        4,    1,    3,    1,    2,    2,    3,    2,    3,    1,
        1,    2,    3,    1,    1,    3,    2,    0,    1,    5,
        5,   10,    3,    1,    1,    3,    0,    2,    4,    5,
        4,    4,    4,    3,    1,    1,    1,    1,    1,    1,
        0,    1,    1,    2,    1,    1,    1,    1,    1,    1,
        2,    1,    3,    1,    1,    3,    2,    2,    3,    1,
        0,    1,    1,    3,    3,    3,    4,    1,    1,    2,
        3,    3,    3,    3,    3,    3,    3,    3,    3,    3,
        3,    3,    3,    2,    2,    2,    2,    3,    3,    3,
        3,    3,    3,    3,    3,    3,    3,    3,    3,    3,
        3,    3,    3,    3,    2,    2,    2,    2,    3,    3,
        3,    3,    3,    3,    3,    3,    3,    3,    3,    5,
        4,    3,    4,    4,    2,    2,    4,    2,    2,    2,
        2,    2,    2,    2,    2,    2,    2,    2,    1,    3,
        2,    1,    2,    4,    2,    2,    8,    9,    8,    9,
        9,   10,    9,   10,    8,    3,    2,    0,    4,    2,
        1,    3,    2,    2,    2,    4,    1,    1,    1,    1,
        1,    1,    1,    1,    3,    1,    1,    1,    0,    3,
        0,    1,    1,    0,    1,    1,    1,    1,    1,    1,
        1,    1,    1,    1,    3,    3,    3,    4,    1,    1,
        3,    1,    1,    1,    1,    1,    3,    2,    3,    0,
        1,    1,    3,    1,    1,    1,    1,    1,    3,    1,
        1,    4,    4,    1,    4,    4,    0,    1,    1,    1,
        3,    3,    1,    4,    2,    2,    1,    3,    1,    4,
        4,    3,    3,    3,    3,    1,    3,    1,    1,    3,
        1,    1,    4,    1,    1,    1,    3,    1,    1,    2,
        1,    3,    4,    3,    2,    0,    2,    2,    1,    2,
        1,    1,    1,    4,    3,    3,    3,    3,    6,    3,
        1,    1,    2,    1
];



exports.PHP = PHP;
});
