module.exports = grammar({
  name: 'passerine',

  rules: {
    // TODO: add the actual grammar rules
      source_file: $ => repeat($._expression),

      _expression: $ => choice(
          $.assignment_expression,
          $._literal
      ),

      assignment_expression: $ => seq(
          field("left", $.identifier),
          $.assignment_op,
          field("right", $._expression)
      ),

      assignment_op: $ => "=",

      identifier: $ => /[_a-zA-Z][_0-9a-zA-Z]*/,

      _literal: $ => choice(
          $.number_literal,
          $.string_literal
      ),

      number_literal: $ => /\d+/,

      string_literal: $ => /"[^\"]*"/
  }
});
