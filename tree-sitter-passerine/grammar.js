module.exports = grammar({
  name: 'passerine',

  rules: {
    // TODO: add the actual grammar rules
      source_file: $ => repeat($._expression),

      _expression: $ => choice(
          $.function_expression,
          $.assignment_expression,
          $.block_expression,
          $.identifier,
          $._literal
      ),

      assignment_expression: $ => seq(
          field("left", $.identifier),
          $.assignment_op,
          field("right", $._expression)
      ),

      function_expression: $ => seq(
          field("arg_list", $.arg_list),
          $.function_op,
          field("body", $._expression)
      ),

      function_op: $ => "->",

      _grouped_arg_list: $ => seq(
          "(",
          $._non_grouped_arg_list,
          ")"
      ),

      _non_grouped_arg_list: $ => choice(
          $.unit,
          repeat1($.identifier)
      ),

      arg_list: $ => choice(
          $._non_grouped_arg_list,
          $._grouped_arg_list,
      ),

      block_expression: $ => seq(
          "{",
          repeat($._expression),
          "}"
      ),

      assignment_op: $ => "=",

      identifier: $ => /[_a-zA-Z][_0-9a-zA-Z]*/,

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
