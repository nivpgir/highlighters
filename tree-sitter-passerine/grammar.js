module.exports = grammar({
  name: 'passerine',

  rules: {
      source_file: $ => repeat($._expression),

      _expression: $ => prec(1, choice(
	  $._grouped_expression,
          $.block_expression,
          $.lambda_expression,
          $.assignment_expression,
          $.IDENTIFIER,
          $._literal
      )),

      _grouped_expression: $ => seq(
	  "(",
	  $._expression,
	  ")"
      ),

      pattern: $ => choice(
	  $.grouped_pattern,
	  $.label_pattern,
	  $.DISCARD,
	  $.IDENTIFIER,
	  $._literal		// DATA
      ),

      label_pattern: $ => seq($.LABEL, $.pattern),

      LABEL: $ => /[A-Z][_0-9a-zA-Z]*/,

      grouped_pattern: $ => seq(
	  "(",
	  $.pattern,
	  ")"
      ),

      assignment_expression: $ => prec(2, seq(
          field("left", $.pattern),
          $._ASSIGNMENT_OP,
          field("right", $._expression)
      )),

      lambda_expression: $ => prec(3, seq(
          field("left", repeat1($.pattern)),
          $._FUNCTION_OP,
          field("body", $._expression)
      )),

      _FUNCTION_OP: $ => "->",

      block_expression: $ => seq(
          "{",
          repeat($._expression),
          "}"
      ),

      _ASSIGNMENT_OP: $ => "=",

      IDENTIFIER: $ => /[_a-z][_0-9a-zA-Z]*/,

      _literal: $ => choice(
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
