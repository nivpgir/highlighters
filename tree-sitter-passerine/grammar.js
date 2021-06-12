module.exports = grammar({
  name: 'passerine',

  rules: {
      source_file: $ => $._body,
      // source_file: $ => repeat($._expression),

      _body: $ => seq(
	  repeat(seq($._expression, $._SEP)),
	  $._expression, optional($._SEP)
      ),

      _SEP: $ => /[\n;]/,

      _expression: $ => choice(
	  $._prefix_expression,
	  $._infix_expression
      ),

      _prefix_expression: $ => prec(8, choice(
	  // $.syntax,
	  $.grouping,
	  $.block,
	  // $.symbol,
	  // $.magic,
	  $.pattern,
	  // $.keyword,
	  $._data,
	  $.form
      )),

      form: $ => repeat1(
	  $._prefix_expression
      ),

      _infix_expression: $ => choice(
	  prec(1, $.assignment),
	  prec(2, $.pair),
	  prec(3, $.func),
	  prec(4, $.equality),
	  prec(4, $.greater_equal),
	  prec(4, $.greater),
	  prec(4, $.lesser_equal),
	  prec(4, $.lesser),
	  prec(5, $.addition),
	  prec(5, $.subtraction),
	  prec(6, $.multiplication),
	  prec(6, $.division),
	  prec(6, $.remainder),
	  prec(7, $.compose),
      ),

      grouping: $ => seq(
	  "(", $._expression, ")"
      ),

      block: $ => seq(
	  "{",
	  repeat(seq($._expression, $._SEP)),
	  $._expression,
	  "}"
      ),

      assignment: $ => seq(
	  $._prefix_expression,
	  $._OP_ASSIGN,
	  $._expression
      ),
      pair: $ => seq(
	  $._prefix_expression,
	  $._OP_PAIR,
	  $._expression
      ),
      func: $ => seq(
	  $._prefix_expression,
	  $._OP_FUNCTION,
	  $._expression
      ),
      equality: $ => seq(
	  $._prefix_expression,
	  $._OP_EQUAL,
	  $._expression
      ),
      greater_equal: $ => seq(
	  $._prefix_expression,
	  $._OP_GEQ,
	  $._expression
      ),
      greater: $ => seq(
	  $._prefix_expression,
	  $._OP_GREATER,
	  $._expression
      ),
      lesser_equal: $ => seq(
	  $._prefix_expression,
	  $._OP_LEQ,
	  $._expression
      ),
      lesser: $ => seq(
	  $._prefix_expression,
	  $._OP_LESSER,
	  $._expression
      ),
      addition: $ => seq(
	  $._prefix_expression,
	  $._OP_ADD,
	  $._expression
      ),
      subtraction: $ => seq(
	  $._prefix_expression,
	  $._OP_SUB,
	  $._expression
      ),
      multiplication: $ => seq(
	  $._prefix_expression,
	  $._OP_MUL,
	  $._expression
      ),
      division: $ => seq(
	  $._prefix_expression,
	  $._OP_DIV,
	  $._expression
      ),
      remainder: $ => seq(
	  $._prefix_expression,
	  $._OP_REM,
	  $._expression
      ),
      compose: $ => seq(
	  $._prefix_expression,
	  $._OP_COMPOSE,
	  $._expression
      ),

      pattern: $ => choice(
	  $.grouped_pattern,
	  $.label_pattern,
	  $.DISCARD,
	  $.IDENTIFIER,
	  $._data
      ),

      label_pattern: $ => seq($.LABEL, $.pattern),

      LABEL: $ => /[A-Z][_0-9a-zA-Z]*/,

      grouped_pattern: $ => seq(
	  "(",
	  $.pattern,
	  ")"
      ),

      _OP_ASSIGN: $ => "=",
      _OP_PAIR: $ => ",",
      _OP_FUNCTION: $ => "->",
      _OP_EQUAL: $ => "==",
      _OP_GEQ: $ => "<=",
      _OP_GREATER: $ => "<",
      _OP_LEQ: $ => ">=",
      _OP_LESSER: $ => ">",
      _OP_ADD: $ => "+",
      _OP_SUB: $ => "-",
      _OP_MUL: $ => "*",
      _OP_DIV: $ => "/",
      _OP_REM: $ => "%",
      _OP_COMPOSE: $ => ".",

      IDENTIFIER: $ => /[_a-z][_0-9a-zA-Z]*/,

      _data: $ => choice(
          $.NUMBER_LITERAL,
          $.STRING_LITERAL,
          $.UNIT
      ),

      NUMBER_LITERAL: $ => /\d+/,

      UNIT: $ => "()",

      STRING_LITERAL: $ => /"[^\"]*"/,

      DISCARD: $ => "_"
  }
});
