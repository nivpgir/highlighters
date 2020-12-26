module.exports = grammar({
  name: 'passerine',

  rules: {
      source_file: $ => repeat($._expression),

      _expression: $ => prec(1, choice(
	  $._grouped_expression,
          $.block_expression,
          $.lambda_expression,
          $.assignment_expression,
          $.identifier,
          $._literal
      )),

      _grouped_expression: $ => seq(
	  "(",
	  $._expression,
	  ")"
      ),

      pattern: $ => choice(
	  $.grouped_pattern,
	  $.identifier,
	  $._literal		// DATA
      ),

      label: $ => /[A-Z][_0-9a-zA-Z]*/,

      grouped_pattern: $ => seq(
	  "(",
	  $.pattern,
	  ")"
      ),

      assignment_expression: $ => prec(2, seq(
          field("left", $.pattern),
          $._assignment_op,
          field("right", $._expression)
      )),

      lambda_expression: $ => prec(3, seq(
          field("left", repeat1($.pattern)),
          $._function_op,
          field("body", $._expression)
      )),

      _function_op: $ => "->",

      block_expression: $ => seq(
          "{",
          repeat($._expression),
          "}"
      ),

      _assignment_op: $ => "=",

      identifier: $ => /[_a-z][_0-9a-zA-Z]*/,

      _literal: $ => choice(
          $.number_literal,
          $.string_literal,
          $.unit
      ),

      number_literal: $ => /\d+/,

      unit: $ => "()",

      string_literal: $ => /"[^\"]*"/
  }
});
