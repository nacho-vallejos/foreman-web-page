module.exports = {
  env: { 
    browser: true, 
    es2022: true 
  },
  extends: [
    "eslint:recommended",
    "plugin:security/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  },
  plugins: ["security"],
  rules: {
    // Prohibir eval y variantes
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    
    // Prohibir innerHTML directo (usar IVSafe.setHTML)
    "no-restricted-syntax": [
      "error",
      {
        "selector": "AssignmentExpression[left.property.name='innerHTML']",
        "message": "Usá IVSafe.setHTML() para montar HTML sanitizado."
      },
      {
        "selector": "CallExpression[callee.name='setTimeout'][arguments.0.type='Literal']",
        "message": "No uses setTimeout con strings, pasá una función."
      },
      {
        "selector": "CallExpression[callee.name='setInterval'][arguments.0.type='Literal']",
        "message": "No uses setInterval con strings, pasá una función."
      }
    ],
    
    // Security plugin rules
    "security/detect-eval-with-expression": "error",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "error",
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-disable-mustache-escape": "error",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-object-injection": "warn",
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-pseudoRandomBytes": "error"
  },
  overrides: [
    {
      files: ["assets/js/security/*.js"],
      rules: {
        "no-restricted-syntax": "off" // Permitir innerHTML en módulos de sanitización
      }
    }
  ]
};
