module.exports = grammar({
  name: 'passerine',

  rules: {
      source_file: $ => $.body,
      // source_file: $ => repeat($._expression),

      body: $ => seq(
	  repeat1(seq(
	      $._expression,
	      $._SEP)),
	  optional($._expression)
      ),

      _SEP: $ => /[\n;]/,

      _expression: $ => prec(1, choice(
	  seq("(", $._expression, "("),  // $._grouped_expression,
          seq("{", $.body, "}"),  // $.block_expression,
	  // macro goes here
	  $.operator_expression
      )),

      operator_expression: $ => choice(
          $.assignment_expression,
          $.lambda_expression,
	  // other operators
	  $.lambda_application_expression
      ),

      lambda_application_expression: $ => prec(4, choice(
	  repeat1($._expression),
	  $.label_lambda_application,
          $.IDENTIFIER,
          $._data
      )),

      label_lambda_application: $ => seq(
	  $.LABEL,
	  repeat1($._expression)
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

      _ASSIGNMENT_OP: $ => "=",

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
